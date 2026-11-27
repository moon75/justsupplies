import { brands } from "@/components/home-info/content";
import styles from "./Home.module.css";

export default function BrandMarquee() {
  const row = [...brands, ...brands];
  return <section className={styles.brandsBlock}>
    <header className={styles.blockHead}>
      <p className={styles.kicker}>Brands we stock</p>
      <h2 className={styles.blockTitle}>Trusted by the trail</h2>
    </header>
    <div className={styles.marquee}>
      <div className={styles.marqueeTrack}>
        {row.map((b, i) => <a key={`${b.href}${i}`} href={b.href} className={styles.logo} aria-label={b.name} tabIndex={i >= brands.length ? -1 : 0}>
          {/* eslint-disable-next-line @next/next/no-img-element -- remote logo */}
          <img src={b.logo} alt="" loading="lazy" />
        </a>)}
      </div>
    </div>
    <p className={styles.more}><a href="/pages/all-brands">See all brands →</a></p>
  </section>;
}
