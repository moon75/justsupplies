import type { Metadata } from "next";
import BlogListing from "@/components/blog/BlogListing";
import { articles, toCard } from "@/lib/blog";

export const metadata: Metadata = { title: "Blog" };

export default function AllBlogPosts() {
  return <main id="main-content" className="site-content">
    <BlogListing title="Blog" items={articles.map(toCard)} />
  </main>;
}
