import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allProducts, getProduct, getRelated, toCard } from "@/lib/catalog";
import ProductMain from "@/components/product/ProductMain";
import NewestProducts from "@/components/products/NewestProducts";
import Newsletter from "@/components/newsletter/Newsletter";
import CollectionFaq from "@/components/collection/CollectionFaq";
import styles from "@/components/product/Product.module.css";


// Content can change from the control panel: render on demand after a save (params read outside Suspense).
export const instant = false;
export function generateStaticParams() {
  return allProducts().map(p => ({ handle: p.handle }));
}

export async function generateMetadata(props: PageProps<"/products/[handle]">): Promise<Metadata> {
  const product = getProduct((await props.params).handle);
  return product ? { title: product.title, description: product.description } : {};
}

// Generic FAQs until per-product FAQ data is supplied.
const faqs = [
  { question: "How fast is delivery?", answer: "Orders placed before 1pm (Monday to Friday) are dispatched the same day, with 1 to 2 day UK delivery." },
  { question: "Is shipping free?", answer: "Shipping is free on orders over £80." },
  { question: "Can I return this item?", answer: "Unused items can be returned within 14 days of delivery. See our returns page for details." },
];

export default async function ProductRoute(props: PageProps<"/products/[handle]">) {
  const product = getProduct((await props.params).handle);
  if (!product) notFound();

  return <main id="main-content" className="site-content">
    <ProductMain product={product} />
    {product.descriptionHtml && <section className={styles.description} dangerouslySetInnerHTML={{ __html: product.descriptionHtml.replace(/https?:\/\/(www\.)?woodtowater\.co\.uk(?=\/(collections|products|pages|blogs)\/)/g, "") }} />}
    <NewestProducts id="related-products" eyebrow="RECOMMENDED" title="You may also like..." products={getRelated(product).map(toCard)} />
    <Newsletter />
    <CollectionFaq eyebrow={product.title.toUpperCase()} faqs={faqs} />
  </main>;
}
