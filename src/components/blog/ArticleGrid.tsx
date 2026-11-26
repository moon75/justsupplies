import { articleHref, formatDate, type Article } from "@/lib/blog";
import styles from "./Blog.module.css";

export default function ArticleGrid({ items }: { items: Omit<Article, "html">[] }) {
  if (!items.length) return <p className={styles.empty}>No articles yet.</p>;
  return <div className={styles.grid}>
    {items.map(a => <article key={a.blog + a.handle} className={styles.card}>
      <a href={articleHref(a as Article)} className={styles.cardImage} aria-label={a.title}>
        {/* eslint-disable-next-line @next/next/no-img-element -- remote client images */}
        {a.image ? <img src={a.image.includes("?") ? `${a.image}&width=600` : `${a.image}?width=600`} alt="" loading="lazy" decoding="async" /> : <span />}
      </a>
      <div className={styles.cardBody}>
        <p className={styles.meta}>{formatDate(a.publishedAt)}{a.author && <> · {a.author}</>}</p>
        <h2 className={styles.cardTitle}><a href={articleHref(a as Article)}>{a.title}</a></h2>
        {a.excerpt && <p className={styles.excerpt}>{a.excerpt}</p>}
        <a href={articleHref(a as Article)} className={styles.readMore}>Read more →</a>
      </div>
    </article>)}
  </div>;
}
