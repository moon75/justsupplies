import type { Metadata } from "next";
import CartPage from "@/components/cart/CartPage";

export const metadata: Metadata = { title: "Cart" };

export default function Page() {
  return <main id="main-content" className="site-content"><CartPage /></main>;
}
