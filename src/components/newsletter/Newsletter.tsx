"use client";

import type { FormEvent } from "react";
import styles from "./Newsletter.module.css";

export default function Newsletter() {
  // TODO: connect to the client's newsletter provider.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => event.preventDefault();

  return <section className={styles.section} aria-labelledby="newsletter-title">
    <h2 id="newsletter-title" className={styles.title}>Subscribe to our newsletter</h2>
    <p className={styles.subtitle}>For all the latest releases and offers.</p>
    <form className={styles.form} onSubmit={handleSubmit}>
      <input className={styles.input} name="firstName" placeholder="First name" aria-label="First name" autoComplete="given-name" />
      <input className={styles.input} name="lastName" placeholder="Last name" aria-label="Last name" autoComplete="family-name" />
      <input className={`${styles.input} ${styles.full}`} type="email" name="email" placeholder="Email address" aria-label="Email address" autoComplete="email" required />
      <button className={styles.submit} type="submit">
        <span>Submit</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m14.7 5.3-1.4 1.4 4.3 4.3H4v2h13.6l-4.3 4.3 1.4 1.4 6.7-6.7-6.7-6.7Z" /></svg>
      </button>
    </form>
  </section>;
}
