"use client";

import { useMemo, useState } from "react";
import { blogLinks } from "@/components/header/navigation";
import type { Article } from "@/lib/blog";
import styles from "./Blog.module.css";

type Item = Omit<Article, "html">;
const href = (a: Item) => `/blogs/${a.blog}/${a.handle}`;
const sized = (src: string, w: number) => `${src}${src.includes("?") ? "&" : "?"}width=${w}`;
const PAGE = 12;
const trim = (t: string, n = 180) => (t.length <= n ? t : `${t.slice(0, t.lastIndexOf(" ", n))}...`);

export default function BlogListing({ title, items, active }: { title: string; items: Item[]; active?: string }) {
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE);
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter(a => `${a.title} ${a.excerpt}`.toLowerCase().includes(q)) : items;
  }, [items, query]);
  const popular = items.filter(a => a.image).slice(0, 5);
  const current = active ? `/blogs/${active.replace(/-1$/, "")}` : "";

  return <section className={styles.page}>
    <h1 className={styles.title}>{title}</h1>
    <div className={styles.toolbar}>
      <select className={styles.select} aria-label="Blog category" value={current} onChange={e => { window.location.href = e.target.value || "/pages/all-blog-posts"; }}>
        <option value="">All posts</option>
        {blogLinks.map(b => <option key={b.href} value={b.href}>{b.label}</option>)}
      </select>
    </div>

    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <label className={styles.search}>
          <input type="search" placeholder="Search" aria-label="Search articles" value={query} onChange={e => { setQuery(e.target.value); setShown(PAGE); }} />
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M10 2a8 8 0 0 1 6.3 12.9l5.4 5.4-1.4 1.4-5.4-5.4A8 8 0 1 1 10 2Zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z" /></svg>
        </label>
        {popular.length > 0 && <div className={styles.sideBlock}>
          <h2 className={styles.sideTitle}>Popular posts</h2>
          <ul className={styles.popular}>
            {popular.map(a => <li key={a.handle}><a href={href(a)}>
              {/* eslint-disable-next-line @next/next/no-img-element -- remote client images */}
              <img src={sized(a.image!, 120)} alt="" loading="lazy" />
              <span>{a.title}</span>
            </a></li>)}
          </ul>
        </div>}
      </aside>

      <div>
        {!visible.length ? <p className={styles.empty}>No articles found.</p> : <div className={styles.grid}>
          {visible.slice(0, shown).map(a => <article key={a.blog + a.handle} className={styles.card}>
            {a.image && <a href={href(a)} className={styles.cardImage} aria-label={a.title}>
              {/* eslint-disable-next-line @next/next/no-img-element -- remote client images */}
              <img src={sized(a.image, 600)} alt="" loading="lazy" decoding="async" />
            </a>}
            <div className={styles.cardBody}>
              <h2 className={styles.cardTitle}><a href={href(a)}>{a.title}</a></h2>
              {a.excerpt && <p className={styles.excerpt}>{trim(a.excerpt)}</p>}
            </div>
          </article>)}
        </div>}
        {shown < visible.length && <div className={styles.more}><button type="button" onClick={() => setShown(n => n + PAGE)}>Load more</button></div>}
      </div>
    </div>
  </section>;
}
