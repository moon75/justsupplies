import { requireAdmin } from "@/lib/admin/auth";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/catalog";
import { deleteProduct } from "@/lib/admin/actions";
import ProductForm from "@/components/admin/ProductForm";
import ConfirmButton from "@/components/admin/ConfirmButton";
import styles from "@/components/admin/Admin.module.css";

export default async function EditProduct(props: PageProps<"/admin/products/[handle]">) {
  await requireAdmin(); // auth check per page: layouts alone are not a security boundary
  const { handle } = await props.params;
  const product = getProduct(handle);
  if (!product) notFound();
  return <div>
    <p className={styles.back}><a href="/admin/products">← Products</a></p>
    <div className={styles.titleRow}>
      <h1 className={styles.h1}>{product.title}</h1>
      <a className={styles.secondary} href={`/products/${product.handle}`} target="_blank" rel="noreferrer">View on site ↗</a>
    </div>
    {(await props.searchParams).saved && <p className={styles.ok}>Product saved.</p>}
    <ProductForm key={product.handle} product={product} />
    <form action={deleteProduct} className={styles.danger}>
      <input type="hidden" name="handle" value={product.handle} />
      <ConfirmButton message={`Delete "${product.title}"? This cannot be undone.`}>Delete product</ConfirmButton>
    </form>
  </div>;
}
