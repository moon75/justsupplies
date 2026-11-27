import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionPage from "@/components/collection/CollectionPage";
import styles from "@/components/text-page/TextPage.module.css";
import TextPage from "@/components/text-page/TextPage";
import { allCollections, getCollection, getCollectionProducts, stripHtml, toCollectionCard } from "@/lib/catalog";


// Content can change from the control panel: render on demand after a save (params read outside Suspense).
export const instant = false;
export function generateStaticParams() {
  return [...allCollections().map(c => ({ handle: c.handle })), { handle: "all" }];
}

export async function generateMetadata(props: PageProps<"/collections/[handle]">): Promise<Metadata> {
  const collection = getCollection((await props.params).handle);
  return collection ? { title: collection.title } : {};
}

export default async function CollectionRoute(props: PageProps<"/collections/[handle]">) {
  const collection = getCollection((await props.params).handle);
  if (!collection) notFound();
  if (!collection.verified) return <main id="main-content" className="site-content">
    <TextPage title={collection.title}>
      <p>This collection is being added. In the meantime, you can find everything in <a href="/collections/all">All Products</a>.</p>
      <p><a className={styles.button} href="/collections/all">Shop all products</a></p>
    </TextPage>
  </main>;
  const items = getCollectionProducts(collection).map(toCollectionCard);
  const description = stripHtml(collection.descriptionHtml);

  return <main id="main-content" className="site-content">
    <CollectionPage
      title={collection.title}
      description={description || undefined}
      products={items}
      foodFilters={/meal|food/i.test(collection.handle)}
    />
  </main>;
}
