import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { productGroups } from "@/components/header/navigation";
import { groupSlug } from "@/components/header/groups";
import { getCollection, getCollectionProducts } from "@/lib/catalog";
import styles from "@/components/categories/CategoryGroup.module.css";

const findGroup = (slug: string) => productGroups.find(g => groupSlug(g.label) === slug);


// Content can change from the control panel: render on demand after a save (params read outside Suspense).
export const instant = false;
export function generateStaticParams() {
  return productGroups.filter(g => g.links.length > 1).map(g => ({ slug: groupSlug(g.label) }));
}

export async function generateMetadata(props: PageProps<"/categories/[slug]">): Promise<Metadata> {
  const group = findGroup((await props.params).slug);
  return group ? { title: `${group.label} Categories` } : {};
}

export default async function CategoryGroupPage(props: PageProps<"/categories/[slug]">) {
  const group = findGroup((await props.params).slug);
  if (!group) notFound();

  const cards = group.links.map(link => {
    const collection = getCollection(link.href.split("/").pop() ?? "");
    const image = collection?.image ?? (collection ? getCollectionProducts(collection)[0]?.images[0] : undefined) ?? null;
    return { ...link, image };
  });

  return <main id="main-content" className="site-content">
    <section className={styles.section}>
      <header className={styles.header}>
        <p className={styles.eyebrow}><span aria-hidden="true" />CATEGORIES</p>
        <h1 className={styles.heading}>{group.label} Categories</h1>
      </header>
      <div className={styles.grid}>
        {cards.map(card => <a key={card.href} href={card.href} className={styles.card}>
          <span className={styles.imageWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element -- remote client images */}
            {card.image && <img src={`${card.image}${card.image.includes("?") ? "&" : "?"}width=400`} alt="" loading="lazy" />}
          </span>
          <span className={styles.title}>{card.label}</span>
        </a>)}
      </div>
    </section>
  </main>;
}
