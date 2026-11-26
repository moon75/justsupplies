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

const tagline = "Outdoor · Camping · Bushcraft";

export const metadata: Metadata = {
  // Every page title carries the brand and tagline, e.g. "About Us | JustSupplies – Outdoor · Camping · Bushcraft".
  title: { default: `JustSupplies – ${tagline}`, template: `%s | JustSupplies – ${tagline}` },
  description: "JustSupplies: outdoor, camping and bushcraft gear from trusted brands, with fast UK delivery.",
  applicationName: "JustSupplies",
  openGraph: { siteName: "JustSupplies", title: `JustSupplies – ${tagline}` },
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
