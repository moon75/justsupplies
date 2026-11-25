import { allBrands } from "./allBrands";
import styles from "./AllBrands.module.css";

export default function AllBrands() {
  return <section className={styles.page} aria-labelledby="all-brands-title">
    <h1 id="all-brands-title" className={styles.heading}>OUR BRANDS</h1>
    <ul className={styles.grid}>
      {allBrands.map(brand => <li key={brand.href}>
        <a className={styles.card} href={brand.href}>
          <span className={styles.logo}>
            {/* eslint-disable-next-line @next/next/no-img-element -- remote logos, mixed formats incl. SVG */}
            <img src={brand.logo} alt="" loading="lazy" decoding="async" />
          </span>
          <span className={styles.name}>{brand.name}</span>
        </a>
      </li>)}
    </ul>
  </section>;
}
