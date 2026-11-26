"use client";

import { FREE_SHIPPING, money, useCart } from "./CartContext";
import styles from "./Cart.module.css";

/** Cart line items with qty controls; used by the drawer and the /cart page. */
export function CartLines({ compact = false }: { compact?: boolean }) {
  const { items, setQty, remove } = useCart();
  return <ul className={compact ? styles.linesCompact : styles.lines}>
    {items.map(item => <li key={item.key} className={styles.line}>
      <a href={`/products/${item.handle}`} className={styles.thumb}>
        {/* eslint-disable-next-line @next/next/no-img-element -- remote client images */}
        <img src={item.image} alt="" />
      </a>
      <div className={styles.lineInfo}>
        <a href={`/products/${item.handle}`} className={styles.lineTitle}>{item.title}</a>
        {item.variant && <p className={styles.lineVariant}>{item.variant}</p>}
        <p className={styles.linePrice}>{money(item.price)}</p>
        <div className={styles.lineActions}>
          <div className={styles.qty}>
            <button type="button" onClick={() => setQty(item.key, item.qty - 1)} aria-label="Decrease quantity">−</button>
            <span>{item.qty}</span>
            <button type="button" onClick={() => setQty(item.key, item.qty + 1)} aria-label="Increase quantity">+</button>
          </div>
          <button type="button" className={styles.remove} onClick={() => remove(item.key)}>Remove</button>
        </div>
      </div>
      <p className={styles.lineTotal}>{money(item.price * item.qty)}</p>
    </li>)}
  </ul>;
}

export function FreeShippingBar() {
  const { subtotal } = useCart();
  const left = FREE_SHIPPING - subtotal;
  return <div className={styles.freeBar}>
    <p>{left > 0 ? <>Spend <strong>{money(left)}</strong> more for free shipping</> : <strong>You qualify for free shipping!</strong>}</p>
    <div className={styles.track}><span style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING) * 100)}%` }} /></div>
  </div>;
}

export function CartDrawerBody({ onClose }: { onClose: () => void }) {
  const { items, subtotal } = useCart();
  if (!items.length) return <>
    <p className={styles.empty}>No products in the cart.</p>
    <button className={styles.secondary} type="button" onClick={onClose}>Keep Shopping</button>
  </>;
  return <div className={styles.drawerBody}>
    <FreeShippingBar />
    <CartLines compact />
    <div className={styles.drawerFooter}>
      <p className={styles.row}><span>Subtotal</span><strong>{money(subtotal)}</strong></p>
      <p className={styles.note}>Tax included. Shipping calculated at checkout.</p>
      <a className={styles.primary} href="/checkout">Checkout</a>
      <a className={styles.secondary} href="/cart">View cart</a>
    </div>
  </div>;
}
