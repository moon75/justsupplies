import type { ReactNode } from "react";
import styles from "./TextPage.module.css";

export default function TextPage({ title, children }: { title: string; children: ReactNode }) {
  return <section className={styles.page}>
    <h1 className={styles.title}>{title}</h1>
    <div className={styles.body}>{children}</div>
  </section>;
}
