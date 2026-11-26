"use client";

import { useState } from "react";
import type { Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/components/cart/CartContext";
import { useAdded } from "@/components/cart/useAdded";
import styles from "./Product.module.css";

const infoTabs = [
  ["Interest Free Finance", "Pay in 3 interest-free instalments on orders over £50.00 at checkout."],
  ["Delivery and Shipping", "Free UK shipping on orders over £80. Orders under £80 are charged at checkout."],
  ["When will I get my item?", "Orders placed before 1pm (Monday to Friday) are dispatched the same day, with 1 to 2 day UK delivery."],
];

export default function ProductMain({ product }: { product: Product }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>(product.variants[0]?.options ?? []);
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const [added, flash] = useAdded();

  const variant = product.variants.find(v => v.options.every((o, i) => o === selected[i])) ?? product.variants[0];
  const price = variant?.price ?? product.price;
  const compareAt = variant?.compareAtPrice ?? null;
  const available = variant?.available ?? product.available;
  const images = product.images.length ? product.images : ["/products/poncho.webp"];

  const swatchImage = (oi: number, value: string) => product.variants.find(v => v.options[oi] === value && v.image)?.image ?? null;
  const choose = (optionIndex: number, value: string) => {
    setSelected(prev => prev.map((v, i) => (i === optionIndex ? value : v)));
    const img = swatchImage(optionIndex, value);
    const idx = img ? images.findIndex(src => src.split("?")[0] === img.split("?")[0]) : -1;
    if (idx >= 0) setImageIndex(idx);
  };

  return <section className={styles.main}>
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        {/* eslint-disable-next-line @next/next/no-img-element -- remote client images */}
        <img src={images[imageIndex]} alt={product.title} />
      </div>
      {images.length > 1 && <div className={styles.thumbs}>
        {images.map((src, i) => <button key={src + i} type="button" className={i === imageIndex ? styles.thumbActive : styles.thumb} onClick={() => setImageIndex(i)} aria-label={`Show image ${i + 1}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- remote client images */}
          <img src={src} alt="" loading="lazy" />
        </button>)}
      </div>}
    </div>

    <div className={styles.info}>
      <p className={styles.vendor}>{product.vendor}</p>
      <h1 className={styles.title}>{product.title}</h1>
      <p className={styles.price}>
        {compareAt && <s className={styles.compare}>{formatPrice(compareAt)}</s>}
        <span className={compareAt ? styles.sale : undefined}>{formatPrice(price)}</span>
      </p>
      <p className={styles.small}>Tax included. Shipping calculated at checkout.</p>

      {product.options.map((option, oi) => <div className={styles.box} key={option.name}>
        <span className={styles.label}>{option.name}:</span>
        <div className={styles.values}>
          {option.values.map(value => {
            const img = /colou?r/i.test(option.name) ? swatchImage(oi, value) : null;
            return img
              ? <button key={value} type="button" title={value} aria-label={value} className={selected[oi] === value ? styles.swatchActive : styles.swatch} onClick={() => choose(oi, value)}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- remote client images */}
                  <img src={img} alt="" loading="lazy" />
                </button>
              : <button key={value} type="button" className={selected[oi] === value ? styles.valueActive : styles.value} onClick={() => choose(oi, value)}>{value}</button>;
          })}
        </div>
      </div>)}

      <div className={styles.box}>
        <span className={styles.label}>Quantity:</span>
        <div className={styles.qty}>
          <button type="button" onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
          <span>{qty}</span>
          <button type="button" onClick={() => setQty(q => q + 1)} aria-label="Increase quantity">+</button>
        </div>
      </div>

      <button type="button" className={`${styles.addToCart} ${added ? "is-added" : ""}`} disabled={!available} onClick={() => { flash(); add({ handle: product.handle, title: product.title, variant: product.options.length ? variant?.title : undefined, variantId: product.options.length ? variant?.id : undefined, price, image: variant?.image ?? images[0] }, qty); }}>
        {added ? <><span>Added to cart!</span><span className="atc-check" aria-hidden="true">✓</span></> : <>{available ? "Add to cart" : "Sold out"}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 8V6a5 5 0 0 1 10 0v2h3l-1 14H5L4 8h3Zm2 0h6V6a3 3 0 0 0-6 0v2Z" /></svg></>}
      </button>

      <p className={styles.stock}>
        <span className={available ? styles.dotIn : styles.dotOut} aria-hidden="true" />
        {available ? "In stock and ready for shipping" : "Out of stock"}
      </p>

      <div className={styles.accordions}>
        {infoTabs.map(([title, text]) => <details key={title} className={styles.accordion}>
          <summary>{title}<span aria-hidden="true">+</span></summary>
          <p>{text}</p>
        </details>)}
      </div>
    </div>
  </section>;
}
