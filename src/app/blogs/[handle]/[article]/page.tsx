import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleGrid from "@/components/blog/ArticleGrid";
import styles from "@/components/blog/Blog.module.css";
import { articles, formatDate, getArticle, getBlog, getBlogArticles, toCard } from "@/lib/blog";

export function generateStaticParams() {
  return articles.map(a => ({ handle: a.blog, article: a.handle }));
}

export async function generateMetadata(props: PageProps<"/blogs/[handle]/[article]">): Promise<Metadata> {
  const { handle, article } = await props.params;
  const a = getArticle(handle, article);
  return a ? { title: a.title, description: a.excerpt.slice(0, 160) } : {};
}

export default async function ArticleRoute(props: PageProps<"/blogs/[handle]/[article]">) {
  const { handle, article } = await props.params;
  const a = getArticle(handle, article);
  if (!a) notFound();
  const blog = getBlog(a.blog);
  const blogHref = `/blogs/${a.blog.replace(/-1$/, "")}`;
  const related = getBlogArticles(a.blog).filter(o => o.handle !== a.handle).slice(0, 3).map(toCard);
  const heroInBody = a.image ? a.html.includes(a.image.split("?")[0].split("/").pop() ?? "§") : true;

  return <main id="main-content" className="site-content">
    <article className={styles.article}>
      <p className={styles.crumbs}><a href="/">Home</a> › <a href={blogHref}>{blog?.title ?? "Blog"}</a></p>
      <h1 className={styles.articleTitle}>{a.title}</h1>
      <p className={styles.meta}>{formatDate(a.publishedAt)}{a.author && <> · {a.author}</>}</p>
      {a.image && !heroInBody && <div className={styles.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element -- remote client images */}
        <img src={a.image} alt="" />
      </div>}
      <div className={styles.body} dangerouslySetInnerHTML={{ __html: a.html }} />
      {a.tags.length > 0 && <ul className={styles.tags}>{a.tags.map(t => <li key={t}>{t}</li>)}</ul>}
      <a className={styles.back} href={blogHref}>← Back to {blog?.title ?? "blog"}</a>
    </article>
    {related.length > 0 && <section className={styles.related}>
      <h2>More articles</h2>
      <ArticleGrid items={related} />
    </section>}
  </main>;
}
