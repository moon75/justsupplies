"use client";

import { useState } from "react";
import type { Variant } from "@/lib/catalog";
import styles from "./Admin.module.css";

type Row = Partial<Variant> & { key: number };

export default function VariantRows({ variants }: { variants: Variant[] }) {
  const initial: Row[] = variants.length > 1 || (variants[0] && variants[0].title !== "Default Title")
    ? variants.map((v, i) => ({ ...v, key: i }))
    : [];
  const [rows, setRows] = useState<Row[]>(initial);
  return <div>
    <input type="hidden" name="variantRows" value={rows.length} />
    {rows.length === 0 && <p className={styles.hint}>No options — this product uses the single price above. Add options for colours, sizes etc.</p>}
    {rows.length > 0 && <table className={styles.table}>
      <thead><tr><th>Option name</th><th>Price £</th><th>Was £</th><th>SKU</th><th>In stock</th><th>Remove</th></tr></thead>
      <tbody>{rows.map((r, i) => <tr key={r.key}>
        <td><input type="hidden" name={`variant_id_${i}`} value={r.id ?? ""} /><input name={`variant_title_${i}`} defaultValue={r.title ?? ""} placeholder="e.g. Green" required /></td>
        <td><input name={`variant_price_${i}`} type="number" step="0.01" min="0" defaultValue={r.price ?? ""} required /></td>
        <td><input name={`variant_compare_${i}`} type="number" step="0.01" min="0" defaultValue={r.compareAtPrice ?? ""} /></td>
        <td><input name={`variant_sku_${i}`} defaultValue={r.sku ?? ""} /></td>
        <td><input name={`variant_available_${i}`} type="checkbox" defaultChecked={r.available ?? true} /></td>
        <td><input name={`variant_delete_${i}`} type="checkbox" /></td>
      </tr>)}</tbody>
    </table>}
    <button type="button" className={styles.secondary} onClick={() => setRows(r => [...r, { key: Date.now(), available: true }])}>+ Add option</button>
  </div>;
}
