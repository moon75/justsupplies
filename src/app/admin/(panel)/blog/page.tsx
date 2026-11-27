import { requireAdmin } from "@/lib/admin/auth";
import { allArticles, formatDate } from "@/lib/blog";
import styles from "@/components/admin/Admin.module.css";

const PAGE = 50;

export default async function BlogAdmin(props: PageProps<"/admin/blog">) {
  await requireAdmin(); // auth check per page: layouts alone are not a security boundary
  const sp = await props.searchParams;
  const q = String(sp.q ?? "").trim().toLowerCase();
  const page = Math.max(1, Number(sp.page ?? 1) || 1);
  const list = allArticles().filter(a => !q || `${a.title} ${a.blog}`.toLowerCase().includes(q));
  const pages = Math.max(1, Math.ceil(list.length / PAGE));
  return <div>
    <div className={styles.titleRow}><h1 className={styles.h1}>Blog <small>({list.length})</small></h1><a className={styles.primary} href="/admin/blog/new">+ New post</a></div>
    {sp.deleted && <p className={styles.ok}>Post deleted.</p>}
    <form className={styles.searchRow}><input name="q" defaultValue={q} placeholder="Search posts…" /><button className={styles.secondary} type="submit">Search</button></form>
    <table className={styles.table}>
      <thead><tr><th>Title</th><th>Blog</th><th>Date</th></tr></thead>
      <tbody>{list.slice((page - 1) * PAGE, page * PAGE).map(a => <tr key={a.blog + a.handle}>
        <td><a href={`/admin/blog/${a.blog}/${a.handle}`}>{a.title}</a></td><td>{a.blog}</td><td>{formatDate(a.publishedAt)}</td>
      </tr>)}</tbody>
    </table>
    <div className={styles.pager}>
      {page > 1 && <a href={`?q=${encodeURIComponent(q)}&page=${page - 1}`}>← Prev</a>}<span>Page {page} of {pages}</span>{page < pages && <a href={`?q=${encodeURIComponent(q)}&page=${page + 1}`}>Next →</a>}
    </div>
  </div>;
}
