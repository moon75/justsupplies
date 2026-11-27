"use client";

import { useState } from "react";
import type { FeaturedProduct } from "@/components/products/products";
import AddToCartButton from "@/components/cart/AddToCartButton";
import styles from "./Home.module.css";

export default function ProductTabs({ tabs }: { tabs: { label: string; href: string; items: FeaturedProduct[] }[] }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  return <section className={styles.block}>
    <header className={styles.tabsHead}>
      <div>
        <p className={styles.kicker}>Fresh picks</p>
        <h2 className={styles.blockTitle}>This week at JustSupplies</h2>
      </div>
      <div className={styles.tabs} role="tablist">
        {tabs.map((t, i) => <button key={t.label} type="button" role="tab" aria-selected={i === active} className={i === active ? styles.tabOn : styles.tab} onClick={() => setActive(i)}>{t.label}</button>)}
      </div>
    </header>
    <div key={tab.label} className={styles.gridProducts}>
      {tab.items.map(p => <article key={p.href} className={styles.card}>
        <a href={p.href} className={styles.cardImg}>
          {/* eslint-disable-next-line @next/next/no-img-element -- remote client images */}
          <img src={p.image} alt={p.title} loading="lazy" />
        </a>
        <p className={styles.cardVendor}>{p.vendor}</p>
        <h3 className={styles.cardTitle}><a href={p.href}>{p.title}</a></h3>
        <div className={styles.cardFoot}>
          <span className={styles.cardPrice}>{p.price.replace(" GBP", "")}</span>
          {p.action === "Add to cart"
            ? <AddToCartButton className={styles.action} href={p.href} title={p.title} price={p.price} image={p.image}><span>Add</span><span aria-hidden="true">+</span></AddToCartButton>
            : <a className={styles.action} href={p.href}><span>Options</span><span aria-hidden="true">→</span></a>}
        </div>
      </article>)}
    </div>
    <p className={styles.more}><a href={tab.href}>View all {tab.label.toLowerCase()} →</a></p>
  </section>;
}
