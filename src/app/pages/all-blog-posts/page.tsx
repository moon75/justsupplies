import type { Metadata } from "next";
import BlogListing from "@/components/blog/BlogListing";
import { allArticles, toCard } from "@/lib/blog";

export const metadata: Metadata = { title: "Blog" };

export default function AllBlogPosts() {
  return <main id="main-content" className="site-content">
    <BlogListing title="Blog" items={allArticles().map(toCard)} />
  </main>;
}
