import type { Metadata } from "next";
import CollectionFaq from "@/components/collection/CollectionFaq";
import CollectionPage from "@/components/collection/CollectionPage";
import { newCollectionProducts, newProductFaqs } from "@/components/collection/collectionProducts";

export const metadata: Metadata = { title: "New Products" };

export default function NewProductsPage() {
  return <main id="main-content" className="site-content">
    <CollectionPage title="New Products" products={newCollectionProducts} />
    <CollectionFaq eyebrow="NEW PRODUCTS" faqs={newProductFaqs} />
  </main>;
}
