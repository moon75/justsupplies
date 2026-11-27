import type { Product } from "@/lib/catalog";
import { allCollections } from "@/lib/catalog";
import { saveProduct } from "@/lib/admin/actions";
import ActionForm from "./ActionForm";
import VariantRows from "./VariantRows";
import CheckList from "./CheckList";
import ImagesField from "./ImagesField";
import styles from "./Admin.module.css";

export default function ProductForm({ product }: { product?: Product }) {
  const p = product;
  const single = !p || p.variants.length <= 1;
  const collections = allCollections();
  const inCollections = p ? collections.filter(c => c.productHandles.includes(p.handle)).map(c => c.handle) : [];
  return <ActionForm action={saveProduct} multipart submitLabel={p ? "Save product" : "Create product"}>
    <input type="hidden" name="originalHandle" value={p?.handle ?? ""} />
    <div className={styles.grid2}>
      <label className={styles.field}><span>Title *</span><input name="title" defaultValue={p?.title} required /></label>
      <label className={styles.field}><span>URL handle</span><input name="handle" defaultValue={p?.handle} placeholder="auto from title" /></label>
      <label className={styles.field}><span>Brand</span><input name="vendor" defaultValue={p?.vendor} /></label>
      <label className={styles.field}><span>Product type</span><input name="type" defaultValue={p?.type} /></label>
    </div>

    <fieldset className={styles.box}>
      <legend>Price & stock</legend>
      <div className={styles.grid3}>
        <label className={styles.field}><span>Price £</span><input name="price" type="number" step="0.01" min="0" defaultValue={single ? p?.variants[0]?.price ?? p?.price : p?.price} /></label>
        <label className={styles.field}><span>Was £ (sale)</span><input name="compareAtPrice" type="number" step="0.01" min="0" defaultValue={p?.compareAtPrice ?? ""} /></label>
        <label className={styles.check}><input type="checkbox" name="available" defaultChecked={p ? p.available : true} /> In stock</label>
      </div>
      <p className={styles.hint}>If the product has options below, each option&apos;s own price and stock are used instead.</p>
    </fieldset>

    <fieldset className={styles.box}>
      <legend>Options (colours, sizes…)</legend>
      <label className={styles.field}><span>Option label</span><input name="optionName" defaultValue={p?.options[0]?.name ?? "Colour"} /></label>
      <VariantRows variants={p?.variants ?? []} />
    </fieldset>

    <fieldset className={styles.box}>
      <legend>Images</legend>
      <ImagesField images={p?.images ?? []} />
    </fieldset>

    <fieldset className={styles.box}>
      <legend>Description</legend>
      <textarea name="descriptionHtml" rows={12} defaultValue={p?.descriptionHtml} placeholder="Text or HTML" />
      <label className={styles.field}><span>Tags (comma separated)</span><input name="tags" defaultValue={p?.tags.join(", ")} /></label>
    </fieldset>

    <fieldset className={styles.box}>
      <legend>Categories</legend>
      <CheckList name="collections" options={collections.map(c => ({ value: c.handle, label: c.title }))} selected={inCollections} />
    </fieldset>
  </ActionForm>;
}
