import styles from "./Home.module.css";

export type Adventure = { label: string; blurb: string; href: string; image: string | null; count: number };

export default function Adventures({ items }: { items: Adventure[] }) {
  return <section id="shop-by-adventure" className={styles.block}>
    <header className={styles.blockHead}>
      <p className={styles.kicker}>Shop by adventure</p>
      <h2 className={styles.blockTitle}>Where are you heading next?</h2>
    </header>
    <div className={styles.gridAdventures}>
      {items.map((a, i) => <a key={a.href} href={a.href} className={`${styles.adventure} ${styles[`tone${i % 5}`]}`}>
        <span className={styles.advText}>
          <strong>{a.label}</strong>
          <span>{a.blurb}</span>
          <small>{a.count} products →</small>
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element -- remote client images */}
        {a.image && <img src={`${a.image}${a.image.includes("?") ? "&" : "?"}width=400`} alt="" loading="lazy" />}
      </a>)}
    </div>
  </section>;
}
