import type { Metadata } from "next";
import CollabsPage from "@/components/collabs/CollabsPage";

export const metadata: Metadata = { title: "Collabs" };

export default function Collabs() {
  return <main id="main-content" className="site-content"><CollabsPage /></main>;
}
