import { requireAdmin } from "@/lib/admin/auth";
import { allCollections, allProducts } from "@/lib/catalog";
import { allArticles } from "@/lib/blog";
import { DATA_DIR } from "@/lib/store";
import styles from "@/components/admin/Admin.module.css";

export default async function Dashboard() {
  await requireAdmin(); // auth check per page: layouts alone are not a security boundary
  const products = allProducts();
  const stats = [
    ["Products", products.length, "/admin/products"],
    ["Out of stock", products.filter(p => !p.available).length, "/admin/products?stock=out"],
    ["Categories", allCollections().length, "/admin/collections"],
    ["Blog posts", allArticles().length, "/admin/blog"],
  ] as const;
  return <div>
    <h1 className={styles.h1}>Dashboard</h1>
    <div className={styles.stats}>{stats.map(([label, value, href]) => <a key={label} href={href} className={styles.stat}><strong>{value.toLocaleString("en-GB")}</strong><span>{label}</span></a>)}</div>
    <div className={styles.quick}>
      <a className={styles.primary} href="/admin/products/new">+ New product</a>
      <a className={styles.secondary} href="/admin/blog/new">+ New blog post</a>
      <a className={styles.secondary} href="/admin/homepage">Edit homepage</a>
    </div>
    <p className={styles.hint}>Changes appear on the website straight away. Content is stored in <code>{DATA_DIR}</code> — back up this folder to keep your data safe.</p>
  </div>;
}
