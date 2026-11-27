import { requireAdmin } from "@/lib/admin/auth";
import ProductForm from "@/components/admin/ProductForm";
import styles from "@/components/admin/Admin.module.css";

export default async function NewProduct() {
  await requireAdmin(); // auth check per page: layouts alone are not a security boundary
  return <div>
    <p className={styles.back}><a href="/admin/products">← Products</a></p>
    <h1 className={styles.h1}>New product</h1>
    <ProductForm />
  </div>;
}
