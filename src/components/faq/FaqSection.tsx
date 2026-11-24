import { faqs } from "./faqs";
import styles from "./FaqSection.module.css";

export default function FaqSection() {
  return <section className={styles.section} aria-labelledby="faq-title">
    {/* Placeholder until client images are supplied */}
    <div className={styles.media} aria-hidden="true" />
    <div className={styles.panel}>
      <div className={styles.content}>
        <p className={styles.eyebrow}><span aria-hidden="true" />IF YOU&apos;D LIKE TO KNOW MORE...</p>
        <h2 id="faq-title" className={styles.heading}>FAQs</h2>
        <div className={styles.list}>
          {faqs.map(faq => <details className={styles.item} key={faq.question}>
            <summary className={styles.question}>{faq.question}</summary>
            <p className={styles.answer}>{faq.answer}</p>
          </details>)}
        </div>
      </div>
    </div>
  </section>;
}
