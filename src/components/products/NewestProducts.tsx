import Image from "next/image";
import { newestProducts, type FeaturedProduct } from "./products";
import styles from "./NewestProducts.module.css";

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m14.7 5.3-1.4 1.4 4.3 4.3H4v2h13.6l-4.3 4.3 1.4 1.4 6.7-6.7-6.7-6.7Z" /></svg>;
}

function BagIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 8h12l1 13H5L6 8Zm3-1V5a3 3 0 0 1 6 0v2h-2V5a1 1 0 0 0-2 0v2H9Z" /></svg>;
}

function ProductCard({ product }: { product: FeaturedProduct }) {
  return <article className={styles.card}>
    <a className={styles.imageWrap} href={product.href} aria-label={product.title}>
      <Image className={styles.image} src={product.image} alt={product.title} fill sizes="(max-width: 749px) 220px, 20vw" />
    </a>
    <div className={styles.details}>
      <p className={styles.vendor}>{product.vendor}</p>
      <h3 className={styles.productTitle}><a href={product.href}>{product.title}</a></h3>
      <p className={styles.price}>{product.price}</p>
    </div>
    <a className={styles.action} href={product.href}>
      <span>{product.action}</span>
      {product.action === "Add to cart" ? <BagIcon /> : <ArrowIcon />}
    </a>
  </article>;
}

type ProductRailProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  products?: readonly FeaturedProduct[];
};

export default function NewestProducts({
  id = "newest-products",
  eyebrow = "NOW AVAILABLE",
  title = "NEWEST PRODUCTS",
  products = newestProducts,
}: ProductRailProps) {
  return <section className={styles.section} aria-labelledby={`${id}-title`}>
    <header className={styles.header}>
      <p className={styles.eyebrow}><span aria-hidden="true" />{eyebrow}</p>
      <h2 id={`${id}-title`} className={styles.heading}>{title}</h2>
    </header>
    <div className={styles.rail}>
      <div className={styles.track}>
        {products.map(product => <div className={styles.slot} key={product.title}><ProductCard product={product} /></div>)}
      </div>
    </div>
    <div className={styles.progress} aria-hidden="true"><span /></div>
  </section>;
}
