import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogListing from "@/components/blog/BlogListing";
import { allBlogs, getBlog, getBlogArticles, toCard } from "@/lib/blog";
import { stripHtml } from "@/lib/catalog-text";


// Content can change from the control panel: render on demand after a save (params read outside Suspense).
export const instant = false;
export function generateStaticParams() {
  return allBlogs().map(b => ({ handle: b.handle }));
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
