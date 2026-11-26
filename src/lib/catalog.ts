import productsData from "@/data/products.json";
import collectionsData from "@/data/collections.json";
import type { FeaturedProduct } from "@/components/products/products";
import type { CollectionProduct } from "@/components/collection/collectionProducts";

export type Variant = { id: number; title: string; price: number; compareAtPrice: number | null; available: boolean; sku: string | null; options: string[]; image: string | null };
export type Product = {
  handle: string; title: string; vendor: string; type: string; tags: string[];
  price: number; compareAtPrice: number | null; available: boolean; images: string[];
  descriptionHtml: string; description: string;
  options: { name: string; values: string[] }[]; variants: Variant[];
  createdAt: string; publishedAt: string;
};
export type Collection = { handle: string; title: string; descriptionHtml: string; image: string | null; productHandles: string[]; verified?: boolean };

export const products = productsData as Product[];
export const collections = collectionsData as Collection[];
const byHandle = new Map(products.map(p => [p.handle, p]));

export const getProduct = (handle: string) => byHandle.get(handle);
export const getCollection = (handle: string): Collection | undefined =>
  collections.find(c => c.handle === handle) ??
  (handle === "all" ? { handle: "all", title: "All Products", descriptionHtml: "", image: null, productHandles: products.map(p => p.handle), verified: true } : undefined);
export const getCollectionProducts = (c: Collection) => c.productHandles.map(h => byHandle.get(h)).filter((p): p is Product => !!p);

export { formatPrice } from "./format";
import { formatPrice } from "./format";

export const toCard = (p: Product): FeaturedProduct => ({
  vendor: p.vendor,
  title: p.title,
  price: formatPrice(p.price),
  image: p.images[0] ?? "/products/poncho.webp",
  href: `/products/${p.handle}`,
  action: p.variants.length > 1 ? "Choose Options" : "Add to cart",
});

export function getRelated(p: Product, count = 4) {
  const others = products.filter(o => o.handle !== p.handle && o.available);
  const score = (o: Product) => (o.type && o.type === p.type ? 2 : 0) + (o.vendor === p.vendor ? 1 : 0);
  return others.sort((a, b) => score(b) - score(a)).slice(0, count);
}

export const toCollectionCard = (p: Product): CollectionProduct => ({
  vendor: p.vendor,
  title: p.title,
  price: p.price,
  ...(p.compareAtPrice ? { compareAtPrice: p.compareAtPrice } : {}),
  image: p.images[0] ?? "/products/poncho.webp",
  href: `/products/${p.handle}`,
  action: p.variants.length > 1 ? "Choose Options" : "Add to cart",
});

export const stripHtml = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

export const getNewest = (count: number) =>
  products.filter(p => p.available).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, count);

export const getCollectionByHandle = (handle: string, count?: number) => {
  const c = getCollection(handle);
  const list = c ? getCollectionProducts(c) : [];
  return count ? list.slice(0, count) : list;
};
