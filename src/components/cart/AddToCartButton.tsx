"use client";

import type { ReactNode } from "react";
import { useCart } from "./CartContext";
import { useAdded } from "./useAdded";

/** Card-level "Add to cart" for single-variant products. */
export default function AddToCartButton({ href, title, price, image, className, children }: { href: string; title: string; price: number | string; image: string; className?: string; children: ReactNode }) {
  const { add } = useCart();
  const [added, flash] = useAdded();
  const value = typeof price === "number" ? price : parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
  return <button type="button" className={`atc-button ${added ? "is-added" : ""} ${className ?? ""}`} onClick={() => { add({ handle: href.split("/").pop() ?? href, title, price: value, image }); flash(); }}>{added ? <><span>Added!</span><span className="atc-check" aria-hidden="true">✓</span></> : children}</button>;
}
