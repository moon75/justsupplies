"use client";

import type { ReactNode } from "react";
import styles from "./Admin.module.css";

export default function ConfirmButton({ message, children }: { message: string; children: ReactNode }) {
  return <button type="submit" className={styles.dangerBtn} onClick={e => { if (!window.confirm(message)) e.preventDefault(); }}>{children}</button>;
}
