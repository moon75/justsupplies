import type { Metadata } from "next";
import CollectionPage from "@/components/collection/CollectionPage";
import { getCollectionByHandle, toCollectionCard } from "@/lib/catalog";

export const metadata: Metadata = { title: "Clearance" };

export default function ClearancePage() {
  return <main id="main-content" className="site-content">
    <CollectionPage title="Clearance" description="End of Line or Clearance products" products={getCollectionByHandle("clearance").map(toCollectionCard)} foodFilters={false} />
  </main>;
}
