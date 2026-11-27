import type { Article } from "@/lib/blog";
import { allBlogs } from "@/lib/blog";
import { saveArticle } from "@/lib/admin/actions";
import ActionForm from "./ActionForm";
import ImagesField from "./ImagesField";
import styles from "./Admin.module.css";

export default function ArticleForm({ article }: { article?: Article }) {
  const a = article;
  return <ActionForm action={saveArticle} multipart submitLabel={a ? "Save post" : "Publish post"}>
    <input type="hidden" name="originalHandle" value={a?.handle ?? ""} />
    <input type="hidden" name="originalBlog" value={a?.blog ?? ""} />
    <div className={styles.grid2}>
      <label className={styles.field}><span>Title *</span><input name="title" defaultValue={a?.title} required /></label>
      <label className={styles.field}><span>Blog *</span><select name="blog" defaultValue={a?.blog ?? "bushcraft-camping-guides"}>{allBlogs().map(b => <option key={b.handle} value={b.handle}>{b.title} ({b.handle})</option>)}</select></label>
      <label className={styles.field}><span>URL handle</span><input name="handle" defaultValue={a?.handle} placeholder="auto from title" /></label>
      <label className={styles.field}><span>Author</span><input name="author" defaultValue={a?.author} /></label>
      <label className={styles.field}><span>Publish date</span><input name="publishedAt" type="date" defaultValue={a?.publishedAt?.slice(0, 10)} /></label>
      <label className={styles.field}><span>Tags (comma separated)</span><input name="tags" defaultValue={a?.tags.join(", ")} /></label>
    </div>
    <ImagesField images={a?.image ? [a.image] : []} name="image" uploadName="newImage" multiple={false} label="Cover image" />
    <label className={styles.field}><span>Short excerpt (shown on blog cards)</span><textarea name="excerpt" rows={3} defaultValue={a?.excerpt} /></label>
    <label className={styles.field}><span>Article content (text or HTML)</span><textarea name="html" rows={18} defaultValue={a?.html} /></label>
  </ActionForm>;
}
