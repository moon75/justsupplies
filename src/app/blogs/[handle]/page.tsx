import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogListing from "@/components/blog/BlogListing";
import { blogs, getBlog, getBlogArticles, toCard } from "@/lib/blog";
import { stripHtml } from "@/lib/catalog-text";

export function generateStaticParams() {
  return blogs.map(b => ({ handle: b.handle }));
}

export async function generateMetadata(props: PageProps<"/blogs/[handle]">): Promise<Metadata> {
  const blog = getBlog((await props.params).handle);
  return blog ? { title: blog.title, description: stripHtml(blog.description).slice(0, 160) } : {};
}

export default async function BlogRoute(props: PageProps<"/blogs/[handle]">) {
  const { handle } = await props.params;
  const blog = getBlog(handle);
  if (!blog) notFound();
  return <main id="main-content" className="site-content">
    <BlogListing title={blog.title} active={handle} items={getBlogArticles(handle).map(toCard)} />
  </main>;
}
