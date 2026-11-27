import type { Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import styles from "./Home.module.css";

const sized = (src: string, w: number) => `${src}${src.includes("?") ? "&" : "?"}width=${w}`;

export default function HomeHero({ picks, productCount }: { picks: Product[]; productCount: number }) {
  return <section className={styles.hero}>
    <div className={styles.heroInner}>
      <div className={styles.heroText}>
        <p className={styles.pill}><span aria-hidden="true">●</span> New season gear just landed</p>
        <h1 className={styles.heroTitle}>Gear up for every <em>wild</em> adventure.</h1>
        <p className={styles.heroLead}>Tents, stoves, sleep systems and bushcraft kit from the brands outdoor people trust — picked, packed and shipped from the UK by JustSupplies.</p>
        <div className={styles.heroCtas}>
          <a className={styles.cta} href="/collections/all"><span>Shop all gear</span><span aria-hidden="true">→</span></a>
          <a className={styles.ghost} href="#shop-by-adventure">Find your adventure</a>
        </div>
        <ul className={styles.trust}>
          <li><strong>{productCount.toLocaleString("en-GB")}+</strong><span>products in stock</span></li>
          <li><strong>1–2 day</strong><span>UK delivery</span></li>
          <li><strong>£80+</strong><span>ships free</span></li>
        </ul>
      </div>
      <div className={styles.collage} aria-label="Featured gear">
        {picks.slice(0, 4).map((p, i) => <a key={p.handle} href={`/products/${p.handle}`} className={`${styles.tile} ${styles[`tile${i}`]}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- remote client images */}
          <img src={sized(p.images[0], 500)} alt={p.title} />
          <span className={styles.tag}><small>{p.vendor}</small>{formatPrice(p.price).replace(" GBP", "")}</span>
        </a>)}
        <span className={styles.blob} aria-hidden="true" />
      </div>
    </div>
  </section>;
}
