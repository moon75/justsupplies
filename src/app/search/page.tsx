import type { Metadata } from "next";
import { Suspense } from "react";
import CollectionPage from "@/components/collection/CollectionPage";
import { allProducts, toCollectionCard } from "@/lib/catalog";

export const metadata: Metadata = { title: "Search" };

async function Results({ searchParams }: { searchParams: PageProps<"/search">["searchParams"] }) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : raw ?? "").replace(/\*/g, "").trim().toLowerCase();
  const terms = q.split(/\s+/).filter(Boolean);
  const results = terms.length
    ? allProducts().filter(p => { const text = `${p.title} ${p.vendor} ${p.type} ${p.tags.join(" ")}`.toLowerCase(); return terms.every(t => text.includes(t)); }).slice(0, 200)
    : [];
  return <CollectionPage
    key={q}
    title={q ? `Search results for "${q}"` : "Search"}
    description={q ? `${results.length} product${results.length === 1 ? "" : "s"} found` : "Type a keyword in the search bar to find products."}
    products={results.map(toCollectionCard)}
    foodFilters={false}
  />;
}

export default function SearchPage(props: PageProps<"/search">) {
  return <main id="main-content" className="site-content">
    <Suspense fallback={null}><Results searchParams={props.searchParams} /></Suspense>
  </main>;
}
