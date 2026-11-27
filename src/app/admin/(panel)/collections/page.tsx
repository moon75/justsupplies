import { requireAdmin } from "@/lib/admin/auth";
import { allCollections } from "@/lib/catalog";
import styles from "@/components/admin/Admin.module.css";

export default async function CollectionsAdmin(props: PageProps<"/admin/collections">) {
  await requireAdmin(); // auth check per page: layouts alone are not a security boundary
  const q = String((await props.searchParams).q ?? "").trim().toLowerCase();
  const list = allCollections().filter(c => !q || `${c.title} ${c.handle}`.toLowerCase().includes(q)).sort((a, b) => a.title.localeCompare(b.title));
  return <div>
    <h1 className={styles.h1}>Categories <small>({list.length})</small></h1>
    <form className={styles.searchRow}><input name="q" defaultValue={q} placeholder="Search categories…" /><button className={styles.secondary} type="submit">Search</button></form>
    <table className={styles.table}>
      <thead><tr><th>Category</th><th>URL</th><th>Products</th></tr></thead>
      <tbody>{list.map(c => <tr key={c.handle}>
        <td><a href={`/admin/collections/${c.handle}`}>{c.title}</a></td>
        <td><code>/collections/{c.handle}</code></td>
        <td>{c.productHandles.length}</td>
      </tr>)}</tbody>
    </table>
  </div>;
}
