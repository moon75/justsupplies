"use client";

import { useState } from "react";
import styles from "./Admin.module.css";

/** Filterable checkbox list (used for picking categories). */
export default function CheckList({ name, options, selected }: { name: string; options: { value: string; label: string }[]; selected: string[] }) {
  const [q, setQ] = useState("");
  const [picked, setPicked] = useState(new Set(selected));
  const term = q.trim().toLowerCase();
  return <div className={styles.checkList}>
    <input type="search" placeholder={`Filter (${picked.size} selected)`} value={q} onChange={e => setQ(e.target.value)} />
    <div className={styles.checkScroll}>
      {options.map(o => <label key={o.value} style={term && !o.label.toLowerCase().includes(term) && !picked.has(o.value) ? { display: "none" } : undefined}>
        <input type="checkbox" name={name} value={o.value} checked={picked.has(o.value)} onChange={e => setPicked(prev => { const n = new Set(prev); if (e.target.checked) n.add(o.value); else n.delete(o.value); return n; })} />
        {o.label}
      </label>)}
    </div>
  </div>;
}
