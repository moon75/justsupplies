"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = { key: string; handle: string; title: string; variant?: string; price: number; image: string; qty: number };
export type CartInput = Omit<CartItem, "key" | "qty"> & { variantId?: number | string };

export const FREE_SHIPPING = 80;
export const SHIPPING_FEE = 4.99; // placeholder until client confirms rates
export const shippingFor = (subtotal: number) => (subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : SHIPPING_FEE);
export const money = (n: number) => `£${n.toFixed(2)}`;

type CartState = {
  items: CartItem[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (item: CartInput, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartState | null>(null);
const STORAGE_KEY = "js-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try { const saved = localStorage.getItem(STORAGE_KEY); if (saved) setItems(JSON.parse(saved)); } catch { /* storage unavailable */ }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { /* storage unavailable */ }
  }, [items, loaded]);

  const add = useCallback((input: CartInput, qty = 1) => {
    const { variantId, ...item } = input;
    const key = `${item.handle}:${variantId ?? ""}`;
    setItems(prev => prev.some(i => i.key === key)
      ? prev.map(i => (i.key === key ? { ...i, qty: i.qty + qty } : i))
      : [...prev, { ...item, key, qty }]);
    setOpen(true);
  }, []);
  const setQty = useCallback((key: string, qty: number) => setItems(prev => (qty < 1 ? prev.filter(i => i.key !== key) : prev.map(i => (i.key === key ? { ...i, qty } : i)))), []);
  const remove = useCallback((key: string) => setItems(prev => prev.filter(i => i.key !== key)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => ({
    items, open, setOpen, add, setQty, remove, clear,
    count: items.reduce((n, i) => n + i.qty, 0),
    subtotal: items.reduce((n, i) => n + i.qty * i.price, 0),
  }), [items, open, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
