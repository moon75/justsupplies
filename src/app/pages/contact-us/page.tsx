import type { Metadata } from "next";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = { title: "Contact Us" };

export default function Contact() {
  return <main id="main-content" className="site-content"><ContactPage /></main>;
}
