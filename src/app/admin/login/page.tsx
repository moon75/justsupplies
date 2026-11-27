import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";
import styles from "@/components/admin/Admin.module.css";

export const metadata: Metadata = { title: "Admin login", robots: { index: false, follow: false } };

export default function AdminLogin() {
  return <div className={styles.shell}>
    <div className={styles.loginBox}>
      <h1>JustSupplies<small>Control Panel</small></h1>
      <LoginForm />
    </div>
  </div>;
}
