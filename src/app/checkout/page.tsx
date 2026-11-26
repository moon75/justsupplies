import type { Metadata } from "next";
import CheckoutPage from "@/components/cart/CheckoutPage";

export const metadata: Metadata = { title: "Checkout" };

export default function Page() {
  return <main id="main-content"><CheckoutPage /></main>;
}
