"use server";

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, endSession, requireAdmin, startSession } from "./auth";
import { readData, UPLOAD_DIR, writeData } from "@/lib/store";
import type { Collection, Product, Variant } from "@/lib/catalog";
import type { Article } from "@/lib/blog";
import { defaultSettings, type SiteSettings } from "@/lib/settings";

export type ActionState = { ok?: string; error?: string } | null;

const str = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();
const num = (fd: FormData, key: string) => { const v = parseFloat(str(fd, key)); return Number.isFinite(v) ? v : null; };
const lines = (v: string) => v.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
const slugify = (v: string) => v.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90);
const stripHtml = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

function refreshSite() {
  revalidatePath("/", "layout"); // re-render every page with the new content
}

function saveFile(name: string, data: unknown): string | null {
  try { writeData(name, data); return null; }
  catch (e) {
    const code = (e as NodeJS.ErrnoException).code;
    return code === "EROFS" || code === "EACCES" ? "This server doesn't allow saving files (read-only hosting). Run the site on your own server to save changes." : `Could not save: ${(e as Error).message}`;
  }
}

async function storeUploads(fd: FormData, field: string): Promise<string[]> {
  const files = fd.getAll(field).filter((f): f is File => f instanceof File && f.size > 0);
  if (!files.length) return [];
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  const urls: string[] = [];
  for (const file of files) {
    if (!file.type.startsWith("image/") || file.type === "image/svg+xml") continue; // no SVG (can carry scripts)
    const ext = (path.extname(file.name) || ".jpg").toLowerCase().replace(/[^.a-z0-9]/g, "");
    const name = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}${ext}`;
    fs.writeFileSync(path.join(UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
    urls.push(`/uploads/${name}`);
  }
  return urls;
}

/* ---------------- Auth ---------------- */

export async function login(_: ActionState, fd: FormData): Promise<ActionState> {
  if (!process.env.ADMIN_PASSWORD) return { error: "ADMIN_PASSWORD is not set on the server. See INSTALL.md." };
  if (!checkPassword(str(fd, "password"))) return { error: "Wrong password." };
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

/* ---------------- Products ---------------- */

export async function saveProduct(_: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin();
  const products = [...readData<Product[]>("products", [])];
  const original = str(fd, "originalHandle");
  const title = str(fd, "title");
  if (!title) return { error: "Title is required." };
  const handle = slugify(str(fd, "handle") || title);
  if (!handle) return { error: "Handle is required." };
  if (handle !== original && products.some(p => p.handle === handle)) return { error: `A product with handle "${handle}" already exists.` };

  const existing = products.find(p => p.handle === original);
  const optionName = str(fd, "optionName") || existing?.options[0]?.name || "Option";

  // Variants: rows variant_title_N / variant_price_N / ...
  const variants: Variant[] = [];
  const rowCount = Number(str(fd, "variantRows") || 0);
  for (let i = 0; i < rowCount; i++) {
    const vTitle = str(fd, `variant_title_${i}`);
    const price = num(fd, `variant_price_${i}`);
    if (fd.get(`variant_delete_${i}`) || (!vTitle && price === null)) continue;
    const prev = existing?.variants.find(v => String(v.id) === str(fd, `variant_id_${i}`));
    variants.push({
      id: prev?.id ?? Date.now() + i,
      title: vTitle || "Default Title",
      price: price ?? 0,
      compareAtPrice: num(fd, `variant_compare_${i}`),
      available: fd.get(`variant_available_${i}`) === "on",
      sku: str(fd, `variant_sku_${i}`) || null,
      options: prev && prev.title === vTitle ? prev.options : [vTitle || "Default Title"],
      image: prev?.image ?? null,
    });
  }
  if (!variants.length) {
    const price = num(fd, "price") ?? 0;
    variants.push({ id: existing?.variants[0]?.id ?? Date.now(), title: "Default Title", price, compareAtPrice: num(fd, "compareAtPrice"), available: fd.get("available") === "on", sku: null, options: ["Default Title"], image: null });
  }

  const multi = variants.length > 1;
  const keepOptions = existing && multi && variants.every(v => existing.variants.some(e => e.id === v.id && e.title === v.title));
  const options = !multi ? [] : keepOptions ? existing!.options : [{ name: optionName, values: variants.map(v => v.title) }];
  if (multi && !keepOptions) variants.forEach(v => { v.options = [v.title]; });

  const uploaded = await storeUploads(fd, "newImages");
  const images = [...lines(str(fd, "images")), ...uploaded];
  const descriptionHtml = str(fd, "descriptionHtml");
  const compare = variants.map(v => v.compareAtPrice ?? 0);
  const minPrice = Math.min(...variants.map(v => v.price));
  const now = new Date().toISOString();

  const product: Product = {
    handle, title,
    vendor: str(fd, "vendor"),
    type: str(fd, "type"),
    tags: str(fd, "tags").split(",").map(t => t.trim()).filter(Boolean),
    price: minPrice,
    compareAtPrice: Math.max(...compare) > minPrice ? Math.max(...compare) : null,
    available: variants.some(v => v.available),
    images,
    descriptionHtml,
    description: stripHtml(descriptionHtml).slice(0, 300),
    options, variants,
    createdAt: existing?.createdAt ?? now,
    publishedAt: existing?.publishedAt ?? now,
  };

  const idx = products.findIndex(p => p.handle === original);
  if (idx >= 0) products[idx] = product; else products.unshift(product);

  // Category membership
  const chosen = new Set(fd.getAll("collections").map(String));
  const collections = readData<Collection[]>("collections", []).map(c => {
    const list = c.productHandles.filter(h => h !== original && h !== handle);
    return chosen.has(c.handle) ? { ...c, productHandles: [handle, ...list] } : { ...c, productHandles: list };
  });

  const err = saveFile("products", products) ?? saveFile("collections", collections);
  if (err) return { error: err };
  refreshSite();
  if (handle !== original) redirect(`/admin/products/${handle}?saved=1`);
  return { ok: "Product saved." };
}

export async function deleteProduct(fd: FormData) {
  await requireAdmin();
  const handle = str(fd, "handle");
  const products = readData<Product[]>("products", []).filter(p => p.handle !== handle);
  const collections = readData<Collection[]>("collections", []).map(c => ({ ...c, productHandles: c.productHandles.filter(h => h !== handle) }));
  saveFile("products", products); saveFile("collections", collections);
  refreshSite();
  redirect("/admin/products?deleted=1");
}

/* ---------------- Collections ---------------- */

export async function saveCollection(_: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin();
  const handle = str(fd, "handle");
  const collections = [...readData<Collection[]>("collections", [])];
  const idx = collections.findIndex(c => c.handle === handle);
  if (idx < 0) return { error: "Collection not found." };
  const known = new Set(readData<Product[]>("products", []).map(p => p.handle));
  const handles = [...new Set(lines(str(fd, "productHandles")))];
  const unknown = handles.filter(h => !known.has(h));
  const uploaded = await storeUploads(fd, "newImage");
  collections[idx] = {
    ...collections[idx],
    title: str(fd, "title") || collections[idx].title,
    descriptionHtml: str(fd, "descriptionHtml"),
    image: uploaded[0] ?? (str(fd, "image") || null),
    productHandles: handles.filter(h => known.has(h)),
    verified: true,
  };
  const err = saveFile("collections", collections);
  if (err) return { error: err };
  refreshSite();
  return { ok: unknown.length ? `Saved. Skipped unknown product handles: ${unknown.join(", ")}` : "Collection saved." };
}

/* ---------------- Blog ---------------- */

export async function saveArticle(_: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin();
  const articles = [...readData<Article[]>("articles", [])];
  const original = str(fd, "originalHandle");
  const originalBlog = str(fd, "originalBlog");
  const title = str(fd, "title");
  const blog = str(fd, "blog");
  if (!title || !blog) return { error: "Title and blog are required." };
  const handle = slugify(str(fd, "handle") || title);
  if ((handle !== original || blog !== originalBlog) && articles.some(a => a.handle === handle && a.blog === blog)) return { error: `An article "${handle}" already exists in that blog.` };
  const uploaded = await storeUploads(fd, "newImage");
  const html = str(fd, "html");
  const existing = articles.find(a => a.handle === original && a.blog === originalBlog);
  const article: Article = {
    handle, blog, title,
    author: str(fd, "author"),
    image: uploaded[0] ?? (str(fd, "image") || null),
    publishedAt: str(fd, "publishedAt") ? new Date(str(fd, "publishedAt")).toISOString() : existing?.publishedAt ?? new Date().toISOString(),
    excerpt: str(fd, "excerpt") || stripHtml(html).slice(0, 200),
    tags: str(fd, "tags").split(",").map(t => t.trim()).filter(Boolean),
    html,
  };
  const idx = articles.findIndex(a => a.handle === original && a.blog === originalBlog);
  if (idx >= 0) articles[idx] = article; else articles.unshift(article);
  const err = saveFile("articles", articles);
  if (err) return { error: err };
  refreshSite();
  if (handle !== original || blog !== originalBlog) redirect(`/admin/blog/${blog}/${handle}?saved=1`);
  return { ok: "Article saved." };
}

export async function deleteArticle(fd: FormData) {
  await requireAdmin();
  const handle = str(fd, "handle"); const blog = str(fd, "blog");
  saveFile("articles", readData<Article[]>("articles", []).filter(a => !(a.handle === handle && a.blog === blog)));
  refreshSite();
  redirect("/admin/blog?deleted=1");
}

/* ---------------- Homepage ---------------- */

export async function saveSettings(_: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin();
  const next = Object.fromEntries(Object.keys(defaultSettings).map(k => [k, str(fd, k) || defaultSettings[k as keyof SiteSettings]])) as SiteSettings;
  const err = saveFile("settings", next);
  if (err) return { error: err };
  refreshSite();
  return { ok: "Homepage saved." };
}
