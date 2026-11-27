import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { logout } from "@/lib/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import styles from "@/components/admin/Admin.module.css";

export const metadata: Metadata = { title: "Control Panel", robots: { index: false, follow: false } };

const nav = [["Dashboard", "/admin"], ["Products", "/admin/products"], ["Categories", "/admin/collections"], ["Blog", "/admin/blog"], ["Homepage", "/admin/homepage"]];

async function Guard({ children }: { children: ReactNode }) {
  await requireAdmin();
  return <>{children}</>;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className={styles.shell}>
    <aside className={styles.sidebar}>
      <a href="/admin" className={styles.brand}>JustSupplies<small>Control Panel</small></a>
      <nav>{nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <div className={styles.sideFoot}>
        <a href="/" target="_blank" rel="noreferrer">View site ↗</a>
        <form action={logout}><button type="submit">Log out</button></form>
      </div>
    </aside>
    <div className={styles.content}>
      <Suspense fallback={<p className={styles.hint}>Loading…</p>}><Guard>{children}</Guard></Suspense>
    </div>
  </div>;
}
