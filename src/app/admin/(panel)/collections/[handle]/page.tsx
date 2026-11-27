import { requireAdmin } from "@/lib/admin/auth";
import { notFound } from "next/navigation";
import { getCollection, getProduct } from "@/lib/catalog";
import { saveCollection } from "@/lib/admin/actions";
import ActionForm from "@/components/admin/ActionForm";
import ImagesField from "@/components/admin/ImagesField";
import styles from "@/components/admin/Admin.module.css";

export default async function EditCollection(props: PageProps<"/admin/collections/[handle]">) {
  await requireAdmin(); // auth check per page: layouts alone are not a security boundary
  const { handle } = await props.params;
  const c = getCollection(handle);
  if (!c || handle === "all") notFound();
  return <div>
    <p className={styles.back}><a href="/admin/collections">← Categories</a></p>
    <div className={styles.titleRow}><h1 className={styles.h1}>{c.title}</h1><a className={styles.secondary} href={`/collections/${c.handle}`} target="_blank" rel="noreferrer">View on site ↗</a></div>
    <ActionForm action={saveCollection} multipart>
      <input type="hidden" name="handle" value={c.handle} />
      <label className={styles.field}><span>Title</span><input name="title" defaultValue={c.title} required /></label>
      <label className={styles.field}><span>Description (text or HTML)</span><textarea name="descriptionHtml" rows={4} defaultValue={c.descriptionHtml} /></label>
      <ImagesField images={c.image ? [c.image] : []} name="image" uploadName="newImage" multiple={false} label="Category image" />
      <label className={styles.field}>
        <span>Products in this category — one product handle per line (top = shown first)</span>
        <textarea name="productHandles" rows={14} defaultValue={c.productHandles.join("\n")} className={styles.mono} />
      </label>
      <p className={styles.hint}>Tip: you can also tick categories on each product&apos;s edit page. First products here: {c.productHandles.slice(0, 3).map(h => getProduct(h)?.title).filter(Boolean).join(", ") || "none"}.</p>
    </ActionForm>
  </div>;
}
