import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionPage from "@/components/collection/CollectionPage";
import { collections, getCollection, getCollectionProducts, stripHtml, toCollectionCard } from "@/lib/catalog";

export function generateStaticParams() {
  return [...collections.map(c => ({ handle: c.handle })), { handle: "all" }];
}

export async function generateMetadata(props: PageProps<"/collections/[handle]">): Promise<Metadata> {
  const collection = getCollection((await props.params).handle);
  return collection ? { title: collection.title } : {};
}

export default async function CollectionRoute(props: PageProps<"/collections/[handle]">) {
  const collection = getCollection((await props.params).handle);
  if (!collection) notFound();
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
