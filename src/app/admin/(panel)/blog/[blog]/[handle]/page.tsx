import { requireAdmin } from "@/lib/admin/auth";
import { notFound } from "next/navigation";
import { allArticles, articleHref } from "@/lib/blog";
import { deleteArticle } from "@/lib/admin/actions";
import ArticleForm from "@/components/admin/ArticleForm";
import ConfirmButton from "@/components/admin/ConfirmButton";
import styles from "@/components/admin/Admin.module.css";

export default async function EditArticle(props: PageProps<"/admin/blog/[blog]/[handle]">) {
  await requireAdmin(); // auth check per page: layouts alone are not a security boundary
  const { blog, handle } = await props.params;
  const a = allArticles().find(x => x.blog === blog && x.handle === handle);
  if (!a) notFound();
  return <div>
    <p className={styles.back}><a href="/admin/blog">← Blog</a></p>
    <div className={styles.titleRow}><h1 className={styles.h1}>{a.title}</h1><a className={styles.secondary} href={articleHref(a)} target="_blank" rel="noreferrer">View on site ↗</a></div>
    {(await props.searchParams).saved && <p className={styles.ok}>Post saved.</p>}
    <ArticleForm key={a.blog + a.handle} article={a} />
    <form action={deleteArticle} className={styles.danger}>
      <input type="hidden" name="handle" value={a.handle} /><input type="hidden" name="blog" value={a.blog} />
      <ConfirmButton message={`Delete "${a.title}"?`}>Delete post</ConfirmButton>
    </form>
  </div>;
}
