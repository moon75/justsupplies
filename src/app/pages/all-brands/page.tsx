import type { Metadata } from "next";
import AllBrands from "@/components/brands/AllBrands";

export const metadata: Metadata = { title: "Our Brands" };

export default function AllBrandsPage() {
  return <main id="main-content" className="site-content"><AllBrands /></main>;
}
