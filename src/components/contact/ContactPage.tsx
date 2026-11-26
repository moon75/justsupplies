"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { contactFaqs } from "./contactFaqs";
import styles from "./ContactPage.module.css";

const warehouseImage = "https://www.woodtowater.co.uk/cdn/shop/files/Wood_to_Water_-_Our_Warehouse.webp?v=1783345344&width=2000";

export default function ContactPage() {
  // TODO: connect to the client's form/email service.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => event.preventDefault();

  return <>
    <div className={styles.top}>
      <h1 className={styles.pageTitle}>Contact Us</h1>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link> <span aria-hidden="true">•</span> <span>Contact Us</span></nav>
    </div>

    <section className={styles.formSection} aria-labelledby="contact-form-title">
      <h2 id="contact-form-title" className={styles.formTitle}>Contact Form</h2>
      <p className={styles.formIntro}>Please fill out the form below and we&apos;ll get back to you within 24 hours.</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}><span>Name*</span><input name="name" autoComplete="name" required /></label>
        <label className={styles.field}><span>Email *</span><input type="email" name="email" autoComplete="email" required /></label>
        <label className={`${styles.field} ${styles.full}`}><span>Phone Number</span><input type="tel" name="phone" autoComplete="tel" /></label>
        <label className={`${styles.field} ${styles.full}`}><span>Custom Field</span><input name="custom" /></label>
        <label className={`${styles.field} ${styles.full}`}><span>Message *</span><textarea name="message" rows={6} required /></label>
        <button className={styles.send} type="submit">
          <span>Send</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m14.7 5.3-1.4 1.4 4.3 4.3H4v2h13.6l-4.3 4.3 1.4 1.4 6.7-6.7-6.7-6.7Z" /></svg>
        </button>
      </form>
    </section>

    <section className={styles.faq} aria-labelledby="contact-faq-title">
      <div className={styles.media}>
        {/* eslint-disable-next-line @next/next/no-img-element -- remote image from client-approved source */}
        <img src={warehouseImage} alt="Our warehouse" loading="lazy" decoding="async" />
      </div>
      <div className={styles.panel} style={{ backgroundImage: `linear-gradient(rgb(27 40 56 / 78%), rgb(27 40 56 / 78%)), url("${warehouseImage}")` }}>
        <div className={styles.panelContent}>
          <p className={styles.eyebrow}><span aria-hidden="true" />WANT TO KNOW MORE?</p>
          <h2 id="contact-faq-title" className={styles.faqHeading}>FAQs</h2>
          <div className={styles.list}>
            {contactFaqs.map(faq => <details className={styles.item} key={faq.question}>
              <summary className={styles.question}>{faq.question}</summary>
              <p className={styles.answer}>{faq.answer}</p>
            </details>)}
          </div>
        </div>
      </div>
    </section>
  </>;
}
