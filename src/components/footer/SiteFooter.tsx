"use client";

import { useState, type FormEvent } from "react";
import { shopOrigin } from "@/components/header/navigation";
import styles from "./SiteFooter.module.css";

const footerLinks = [
  ["New", "/collections/new-products"],
  ["All Products", "/collections/all"],
  ["Back in Stock", "/collections/back-in-stock-1"],
  ["Sale", "/collections/clearance"],
  ["Brands", "/pages/all-brands"],
  ["Blog", "/pages/all-blog-posts"],
  ["About", "/pages/about"],
  ["Contact", "/pages/contact-us"],
  ["Returns", "/pages/returns"],
  ["Terms and Conditions", "/pages/terms-and-conditions"],
  ["Camping", "/apps/sitemap"],
] as const;

const currencies = ["United Kingdom (GBP £)", "Isle of Man (GBP £)", "Jersey (GBP £)"] as const;
const payments = ["AMEX", "Apple Pay", "Diners", "Discover", "G Pay", "Klarna", "Maestro", "Mastercard", "PayPal", "shop", "VISA"];

function SocialIcon({ name }: { name: "facebook" | "instagram" | "youtube" }) {
  if (name === "facebook") return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-5.1v-8h2.7l.4-3.1h-3.1V8.8c0-.9.3-1.4 1.5-1.4H18V4.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H8.5V14h2.8v8H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" /></svg>;
  if (name === "instagram") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.4"/><circle cx="18.2" cy="5.9" r="1" fill="currentColor" stroke="none"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="3" fill="currentColor"/><path d="m10 8 6 4-6 4Z" fill="#0a5947"/></svg>;
}

function CheckIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12 5 5L20 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function SiteFooter() {
  const [currency, setCurrency] = useState<(typeof currencies)[number]>(currencies[0]);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState("");

  function submitNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNewsletterMessage("Newsletter signup is currently unavailable.");
  }

  return <footer className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.columns}>
        <section className={styles.column} aria-labelledby="footer-about">
          <h2 id="footer-about" className={styles.heading}>justsupplies</h2>
          <p className={styles.paragraph}>We are an online retailer for outdoor gear and equipment, specialising in unique, cult-favourite brands with a strong selection of household names in between.</p>
          <p className={styles.paragraph}>New products and restocks flow in weekly, so be sure to check back regularly for your next camping essential.</p>
          <a className={styles.follow} href="#">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20.8 4.7a5.6 5.6 0 0 0-7.9 0l-.9.9-.9-.9a5.6 5.6 0 0 0-7.9 7.9L12 21l8.8-8.4a5.6 5.6 0 0 0 0-7.9Z"/></svg>
            Follow on shop
          </a>
          <div className={styles.currencyWrap}>
            <button className={styles.currency} type="button" aria-label="Currency" aria-expanded={currencyOpen} onClick={() => setCurrencyOpen(!currencyOpen)}>{currency}<span aria-hidden="true">⌄</span></button>
            {currencyOpen && <div className={styles.currencyOptions}>{currencies.map(option => <button type="button" key={option} onClick={() => { setCurrency(option); setCurrencyOpen(false); }}>{option}</button>)}</div>}
          </div>
          <ul className={styles.socials} aria-label="Social media">
            {([
              ["facebook", "Facebook", "#"],
              ["instagram", "Instagram", "#"],
              ["youtube", "YouTube", "#"],
            ] as const).map(([name, label, href]) => <li key={name}><a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><SocialIcon name={name}/></a></li>)}
          </ul>
        </section>

        <nav className={styles.column} aria-labelledby="footer-menu">
          <h2 id="footer-menu" className={styles.heading}>Main Menu</h2>
          <ul className={styles.menu}>{footerLinks.map(([label, path]) => <li key={label}><a href={shopOrigin + path}>{label}</a></li>)}</ul>
        </nav>

        <section className={styles.column} aria-labelledby="footer-newsletter">
          <h2 id="footer-newsletter" className={styles.heading}>Join our mailing list!</h2>
          <p className={styles.paragraph}>Our weekly newsletter keeps you up to date on all of our latest products, restocks and deals.</p>
          <p className={styles.paragraph}>Sign up now and save. You will receive an email with a code unique to your account.</p>
          <form className={styles.newsletter} onSubmit={submitNewsletter}>
            <label className={styles.visuallyHidden} htmlFor="footer-email">Email address</label>
            <input id="footer-email" type="email" autoComplete="email" required placeholder="Email address" />
            <button type="submit" aria-label="Submit newsletter email"><CheckIcon /></button>
          </form>
          {newsletterMessage && <p className={styles.formMessage} role="status">{newsletterMessage}</p>}
        </section>
      </div>

      <div className={styles.bottom}>
        <small className={styles.copyright}>© 2026, justsupplies</small>
        <ul className={styles.payments} aria-label="Payment methods">{payments.map(payment => <li key={payment}><span data-payment={payment}>{payment}</span></li>)}</ul>
      </div>
    </div>
  </footer>;
}
