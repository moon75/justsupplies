import type { Metadata } from "next";
import TextPage from "@/components/text-page/TextPage";
import styles from "@/components/text-page/TextPage.module.css";
import { collections } from "@/lib/catalog";

export const metadata: Metadata = { title: "Sitemap" };

const pages = [["Home", "/"], ["All Products", "/collections/all"], ["New Products", "/collections/new-products"], ["Back in Stock", "/collections/back-in-stock-1"], ["Sale", "/collections/clearance"], ["Brands", "/pages/all-brands"], ["Blog", "/pages/all-blog-posts"], ["About", "/pages/about"], ["Contact", "/pages/contact-us"], ["Collabs", "/pages/collab"], ["Returns", "/pages/returns"], ["Terms and Conditions", "/pages/terms-and-conditions"]];

export default function Sitemap() {
  const list = collections.filter(c => c.productHandles.length).sort((a, b) => a.title.localeCompare(b.title));
  return <main id="main-content" className="site-content">
    <TextPage title="Sitemap">
      <h2>Pages</h2>
      <ul className={styles.linkList}>{pages.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ul>
      <h2>Collections</h2>
      <ul className={styles.linkList}>{list.map(c => <li key={c.handle}><a href={`/collections/${c.handle}`}>{c.title}</a></li>)}</ul>
    </TextPage>
  </main>;
}
