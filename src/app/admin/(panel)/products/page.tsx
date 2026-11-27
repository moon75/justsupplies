import { requireAdmin } from "@/lib/admin/auth";
import { allProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import styles from "@/components/admin/Admin.module.css";

const PAGE = 50;

export default async function ProductsAdmin(props: PageProps<"/admin/products">) {
  await requireAdmin(); // auth check per page: layouts alone are not a security boundary
  const sp = await props.searchParams;
  const q = String(sp.q ?? "").trim().toLowerCase();
  const stock = String(sp.stock ?? "");
  const page = Math.max(1, Number(sp.page ?? 1) || 1);
  const list = allProducts().filter(p =>
    (!q || `${p.title} ${p.vendor} ${p.handle} ${p.type}`.toLowerCase().includes(q)) &&
    (stock !== "out" || !p.available));
  const pages = Math.max(1, Math.ceil(list.length / PAGE));
  const rows = list.slice((page - 1) * PAGE, page * PAGE);
  const link = (n: number) => `?${new URLSearchParams({ ...(q ? { q } : {}), ...(stock ? { stock } : {}), page: String(n) })}`;

  return <div>
    <div className={styles.titleRow}><h1 className={styles.h1}>Products <small>({list.length})</small></h1><a className={styles.primary} href="/admin/products/new">+ New product</a></div>
    {sp.deleted && <p className={styles.ok}>Product deleted.</p>}
    <form className={styles.searchRow}>
      <input name="q" defaultValue={q} placeholder="Search title, brand, handle…" />
      <select name="stock" defaultValue={stock}><option value="">All</option><option value="out">Out of stock</option></select>
      <button className={styles.secondary} type="submit">Search</button>
    </form>
    <table className={styles.table}>
      <thead><tr><th></th><th>Product</th><th>Brand</th><th>Price</th><th>Stock</th></tr></thead>
      <tbody>{rows.map(p => <tr key={p.handle}>
        {/* eslint-disable-next-line @next/next/no-img-element -- admin preview */}
        <td>{p.images[0] && <img className={styles.rowImg} src={p.images[0]} alt="" loading="lazy" />}</td>
        <td><a href={`/admin/products/${p.handle}`}>{p.title}</a></td>
        <td>{p.vendor}</td>
        <td>{formatPrice(p.price).replace(" GBP", "")}</td>
        <td>{p.available ? <span className={styles.badgeOk}>In stock</span> : <span className={styles.badgeOff}>Out</span>}</td>
      </tr>)}</tbody>
    </table>
    <div className={styles.pager}>
      {page > 1 && <a href={link(page - 1)}>← Prev</a>}<span>Page {page} of {pages}</span>{page < pages && <a href={link(page + 1)}>Next →</a>}
    </div>
  </div>;
}
