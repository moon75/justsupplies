import styles from "./CollectionFaq.module.css";

type Faq = { question: string; answer: string };

export default function CollectionFaq({ eyebrow, faqs }: { eyebrow: string; faqs: readonly Faq[] }) {
  return <section className={styles.section} aria-labelledby="collection-faq-title">
    {/* Background image placeholder until client images are supplied */}
    <div className={styles.content}>
      <p className={styles.eyebrow}><span aria-hidden="true" />{eyebrow}</p>
      <h2 id="collection-faq-title" className={styles.heading}>FAQs</h2>
      <div className={styles.list}>
        {faqs.map(faq => <details className={styles.item} key={faq.question}>
          <summary className={styles.question}>{faq.question}</summary>
          <p className={styles.answer}>{faq.answer}</p>
        </details>)}
      </div>
    </div>
  </section>;
}
