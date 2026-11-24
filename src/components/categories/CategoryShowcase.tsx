import Image from "next/image";
import { categories } from "./categories";
import styles from "./CategoryShowcase.module.css";

export default function CategoryShowcase() {
  return <section className={styles.section} aria-labelledby="category-title">
    <Image className={styles.background} src="/hero/temporary-6.webp" alt="" fill sizes="100vw" />
    <div className={styles.overlay} />

    <div className={styles.content}>
      <header className={styles.header}>
        <p className={styles.eyebrow}><span aria-hidden="true" />FOR ANY ADVENTURE</p>
        <h2 id="category-title" className={styles.heading}>CAMPING. HIKING. WE<br />HAVE IT ALL.</h2>
      </header>

      <div className={styles.grid}>
        {categories.map(category => <a className={styles.card} href={category.href} key={category.title}>
          <span className={`${styles.imageWrap} ${category.crop === "circle" ? styles.circle : ""}`}>
            <Image src={category.image} alt="" fill sizes="(max-width: 749px) 120px, 160px" className={styles.categoryImage} />
          </span>
          <span className={styles.title}>{category.title}</span>
        </a>)}
      </div>
    </div>
  </section>;
}
