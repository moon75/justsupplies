import { differences } from "./differences";
import styles from "./WhatMakesUsDifferent.module.css";

export default function WhatMakesUsDifferent() {
  return <section className={styles.section} aria-labelledby="difference-title">
    <header className={styles.header}>
      <p className={styles.eyebrow}><span aria-hidden="true" />WE ARE JUSTSUPPLIES</p>
      <h2 id="difference-title" className={styles.heading}>WHAT MAKES US DIFFERENT</h2>
    </header>
    <div className={styles.rail}>
      {differences.map(item => <article className={styles.card} key={item.title}>
        <div className={styles.placeholder}>
          {/* eslint-disable-next-line @next/next/no-img-element -- remote image from client-approved source */}
          <img src={item.image} alt="" loading="lazy" decoding="async" />
        </div>
        <div className={styles.body}>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.text}>{item.text}</p>
        </div>
      </article>)}
    </div>
  </section>;
}
