import type { Metadata } from "next";
import CollectionFaq from "@/components/collection/CollectionFaq";
import CollectionPage from "@/components/collection/CollectionPage";
import { newProductFaqs } from "@/components/collection/collectionProducts";
import { getCollectionByHandle, toCollectionCard } from "@/lib/catalog";

export const metadata: Metadata = { title: "Back in Stock" };

export default function BackInStockPage() {
  return <main id="main-content" className="site-content">
    <CollectionPage
      title="Back in Stock"
      description="Products that have just arrived back in stock with us. We have regular deliveries from our suppliers so you are normally no more than 7 to 10 days away from having your product back in stock."
      products={getCollectionByHandle("back-in-stock-1").map(toCollectionCard)} />
    <CollectionFaq eyebrow="NEW PRODUCTS" faqs={newProductFaqs} />
  </main>;
}
