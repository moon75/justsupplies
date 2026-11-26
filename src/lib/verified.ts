import verified from "@/data/verified-collections.json";

// Collections whose product lists were fetched from the store; others aren't shown in navigation yet.
const set = new Set<string>([...verified, "all", "new-products"]);

export const isVerifiedHandle = (handle: string) => set.has(handle);
/** Non-collection links always pass; /collections/<handle> passes only when verified. */
export const isVerifiedHref = (href: string) => {
  const m = href.match(/^\/collections\/([^/?#]+)/);
  return !m || set.has(m[1]);
};
