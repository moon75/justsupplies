import { requireAdmin } from "@/lib/admin/auth";
import ArticleForm from "@/components/admin/ArticleForm";
import styles from "@/components/admin/Admin.module.css";

export default async function NewArticle() {
  await requireAdmin(); // auth check per page: layouts alone are not a security boundary
  return <div><p className={styles.back}><a href="/admin/blog">← Blog</a></p><h1 className={styles.h1}>New blog post</h1><ArticleForm /></div>;
}
