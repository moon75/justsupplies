"use client";

import { useActionState, type ReactNode } from "react";
import type { ActionState } from "@/lib/admin/actions";
import styles from "./Admin.module.css";

/** Form wired to a server action, with saving state and success/error message. */
export default function ActionForm({ action, children, submitLabel = "Save", multipart = false }: {
  action: (state: ActionState, fd: FormData) => Promise<ActionState>;
  children: ReactNode;
  submitLabel?: string;
  multipart?: boolean;
}) {
  const [state, formAction, pending] = useActionState(action, null);
  return <form action={formAction} className={styles.form} encType={multipart ? "multipart/form-data" : undefined}>
    {children}
    <div className={styles.saveBar}>
      {state?.error && <p className={styles.error}>{state.error}</p>}
      {state?.ok && <p className={styles.ok}>{state.ok}</p>}
      <button type="submit" className={styles.primary} disabled={pending}>{pending ? "Saving…" : submitLabel}</button>
    </div>
  </form>;
}
