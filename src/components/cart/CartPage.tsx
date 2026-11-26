"use client";

import { money, shippingFor, useCart } from "./CartContext";
import { CartLines, FreeShippingBar } from "./CartLines";
import styles from "./Cart.module.css";

export default function CartPage() {
  const { items, subtotal } = useCart();
  const shipping = shippingFor(subtotal);

  return <section className={styles.page}>
    <h1 className={styles.pageTitle}>Your cart</h1>
    {!items.length ? <div className={styles.emptyPage}>
      <p>Your cart is currently empty.</p>
      <a className={styles.primary} href="/collections/all">Continue shopping</a>
    </div> : <div className={styles.layout}>
      <div><CartLines /></div>
      <aside className={styles.summary}>
        <h2>Order summary</h2>
        <FreeShippingBar />
        <p className={styles.row}><span>Subtotal</span><span key={subtotal} className={styles.bump}>{money(subtotal)}</span></p>
        <p className={styles.row}><span>Shipping</span><span>{shipping ? money(shipping) : "Free"}</span></p>
        <p className={styles.rowTotal}><span>Total</span><span key={subtotal + shipping} className={styles.bump}>{money(subtotal + shipping)} GBP</span></p>
        <p className={styles.note}>Tax included.</p>
        <a className={styles.primary} href="/checkout">Checkout</a>
        <a className={styles.secondary} href="/collections/all">Continue shopping</a>
      </aside>
    </div>}
  </section>;
}
