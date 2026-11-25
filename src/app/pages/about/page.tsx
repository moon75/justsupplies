import type { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";

export const metadata: Metadata = { title: "About Us" };

export default function About() {
  return <main id="main-content" className="site-content"><AboutPage /></main>;
}
