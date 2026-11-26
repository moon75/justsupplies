import type { Metadata } from "next";
import CollectionFaq from "@/components/collection/CollectionFaq";
import CollectionPage from "@/components/collection/CollectionPage";
import { newProductFaqs } from "@/components/collection/collectionProducts";
import { getNewest, toCollectionCard } from "@/lib/catalog";

export const metadata: Metadata = { title: "New Products" };

export default function NewProductsPage() {
  return <main id="main-content" className="site-content">
    <CollectionPage title="New Products" products={getNewest(60).map(toCollectionCard)} />
    <CollectionFaq eyebrow="NEW PRODUCTS" faqs={newProductFaqs} />
  </main>;
}
