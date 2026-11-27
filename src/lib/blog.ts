import { readData } from "./store";

export type Article = { handle: string; blog: string; title: string; author: string; image: string | null; publishedAt: string; excerpt: string; tags: string[]; html: string };
export type Blog = { handle: string; title: string; description: string };

const byDate = (a: Article, b: Article) => b.publishedAt.localeCompare(a.publishedAt);
const base = (handle: string) => handle.replace(/-1$/, "");

export const allBlogs = () => readData<Blog[]>("blogs", []);
let artSource: Article[] | null = null;
let artSorted: Article[] = [];
/** Unique articles, newest first. */
export const allArticles = () => {
  const raw = readData<Article[]>("articles", []);
  if (raw !== artSource) { artSource = raw; artSorted = raw.filter((a, i, all) => all.findIndex(o => o.handle === a.handle) === i).sort(byDate); }
  return artSorted;
};

export const getBlog = (handle: string) => allBlogs().find(b => b.handle === handle);
/** "x" and "x-1" are duplicate Shopify blogs; show both together. */
export const getBlogArticles = (handle: string) => allArticles().filter(a => base(a.blog) === base(handle));
export const getArticle = (blog: string, handle: string) => allArticles().find(a => a.handle === handle && base(a.blog) === base(blog));
export const articleHref = (a: Article) => `/blogs/${a.blog}/${a.handle}`;
export const formatDate = (iso: string) => (iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "");
export const toCard = ({ html: _html, ...a }: Article) => a; // eslint-disable-line @typescript-eslint/no-unused-vars
