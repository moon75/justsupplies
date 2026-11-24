import type { Metadata } from "next";
import CollectionFaq from "@/components/collection/CollectionFaq";
import CollectionPage from "@/components/collection/CollectionPage";
import { newCollectionProducts, newProductFaqs } from "@/components/collection/collectionProducts";

export const metadata: Metadata = { title: "Back in Stock" };

export default function BackInStockPage() {
  return <main id="main-content" className="site-content">
    <CollectionPage title="Back in Stock" products={newCollectionProducts} />
    <CollectionFaq eyebrow="NEW PRODUCTS" faqs={newProductFaqs} />
  </main>;
}
