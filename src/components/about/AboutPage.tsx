import Link from "next/link";
import ReviewsStrip from "@/components/home-info/ReviewsStrip";
import styles from "./AboutPage.module.css";

const reasons = [
  "Free shipping on orders over £80",
  "1 to 2 days UK delivery",
  "Huge product range",
  "Knowledgeable team (plus phone support)",
  "Fully stocked UK warehouse",
  "Same-day dispatch if ordered before 1pm (Monday to Friday)",
];

export default function AboutPage() {
  return <>
    <div className={styles.top}>
      <h1 className={styles.pageTitle}>About Us</h1>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link> <span aria-hidden="true">•</span> <span>About Us</span></nav>
    </div>

    <section className={styles.content}>
      <h2 className={styles.heading}>WE ARE JUSTSUPPLIES</h2>
      <p>Founded from a love of the outdoors, wild camping and bushcraft, JustSupplies was founded in late 2019 where our team began to formulate a <a className={styles.inlineLink} href="/collections/all">selection of products</a> that they have purchased, tested and continued to use. The mission was very simple - Launch a site that was not only a central source of knowledge and information but also packed with high-quality products from top brands.</p>
      <p>We are &apos;JustSupplies&apos;, an online retailer specialising in outdoor, camping and bushcraft products. Our team (with over 25 years of combined experience) have handpicked our product range to offer you the best products available backed by our exceptional product knowledge and customer services. All our orders are dispatched from our fully stocked warehouse based in Fleet, Hampshire using fast shipping and dispatch - This means you spend less time indoors waiting for your order and more time out under canvas.</p>
      <a className={styles.cta} href="/collections/all">View our products</a>

      <h2 className={styles.subheading}>Why shop with us?</h2>
      <ul className={styles.list}>{reasons.map(reason => <li key={reason}>{reason}</li>)}</ul>
      <a className={styles.cta} href="/collections/all">Shop now</a>
    </section>

    <ReviewsStrip />

    <section className={styles.warehouse} aria-labelledby="warehouse-title">
      <div className={styles.map}>
        {/* eslint-disable-next-line @next/next/no-img-element -- remote image from client-approved source */}
        <img src="https://www.woodtowater.co.uk/cdn/shop/files/We_Are_-_Wood_to_Water_Location.jpg?v=1783950988&width=2000" alt="Map showing our warehouse location" loading="lazy" decoding="async" />
      </div>
      <div className={styles.card}>
        <h2 id="warehouse-title" className={styles.cardTitle}>Our Warehouse</h2>
        <p>If you&apos;re picking up a &apos;click &amp; collect&apos; order, you can find our warehouse at the following address:</p>
        <address className={styles.address}>GU52 8EA<br />Unit 6 Quantum Business Park<br />Beacon Hill Road<br />Fleet<br />Hampshire</address>
        <p><strong>Mon–Fri</strong> - 9:30am–5pm<br /><strong>Saturday and Sunday</strong> - Closed</p>
        <p>Although the estate is a few years old now, Google Maps still shows an incomplete version with our warehouse misplaced. As you turn into Quantum Business Park, follow the road straight forward - Unit 6 is directly ahead.</p>
        <p>Below is an edited map pointing to the correct location. Some maps may display &apos;Socom Tactical Airsoft&apos; instead, which is our sister company, based in the same warehouse.</p>
        <a className={styles.directions} href="https://www.google.com/maps/search/?api=1&query=Unit+6+Quantum+Business+Park+Beacon+Hill+Road+Fleet+GU52+8EA" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" /></svg>
          Get directions
        </a>
      </div>
    </section>
  </>;
}
