"use client";

import { useActionState } from "react";
import { login } from "@/lib/admin/actions";
import styles from "./Admin.module.css";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, null);
  return <form action={action} className={styles.form}>
    <label className={styles.field}><span>Password</span><input type="password" name="password" autoComplete="current-password" required autoFocus /></label>
    {state?.error && <p className={styles.error}>{state.error}</p>}
    <button type="submit" className={styles.primary} disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>
  </form>;
}
