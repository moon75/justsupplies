import { differences } from "./differences";
import styles from "./WhatMakesUsDifferent.module.css";

export default function WhatMakesUsDifferent() {
  return <section className={styles.section} aria-labelledby="difference-title">
    <header className={styles.header}>
      <p className={styles.eyebrow}><span aria-hidden="true" />WE ARE WOOD TO WATER</p>
      <h2 id="difference-title" className={styles.heading}>WHAT MAKES US DIFFERENT</h2>
    </header>
    <div className={styles.rail}>
      {differences.map(item => <article className={styles.card} key={item.title}>
        {/* Placeholder until client images are supplied */}
        <div className={styles.placeholder} aria-hidden="true" />
        <div className={styles.body}>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.text}>{item.text}</p>
        </div>
      </article>)}
    </div>
  </section>;
}
