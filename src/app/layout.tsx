import type { Metadata } from "next";
import { Instrument_Sans, Josefin_Sans } from "next/font/google";
import { SiteHeader } from "@/components/header/SiteHeader";
import { SiteFooter } from "@/components/footer/SiteFooter";
import ScrollReveal from "@/components/scroll-reveal/ScrollReveal";
import { CartProvider } from "@/components/cart/CartContext";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
  display: "swap",
});

export const metadata: Metadata = {
  title: "justsupplies",
  description: "Outdoor equipment and camping supplies",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${josefinSans.variable}`}>
      <body suppressHydrationWarning>
        <CartProvider>
        <SiteHeader />
        {children}
        <SiteFooter />
        </CartProvider>
        <ScrollReveal />
      </body>
    </html>
  );
}
