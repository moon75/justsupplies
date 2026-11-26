import productGroupsData from "./product-groups.json";

// Site-relative links; set to an external origin only if needed.
export const shopOrigin = "";

export type MenuLink = { label: string; href: string };
export type MenuGroup = { label: string; links: MenuLink[] };

export const productGroups: MenuGroup[] = productGroupsData;

export const blogLinks: MenuLink[] = [
  { label: "Guides", href: "/blogs/bushcraft-camping-guides" },
  { label: "Product Information", href: "/blogs/outdoor-product-information" },
  { label: "Product Reviews and Updates", href: "/blogs/camping-products-reviews" },
  { label: "Top Tips", href: "/blogs/top-tips" },
  { label: "Uncategorized", href: "/blogs/uncategorized" },
  { label: "Video Guides / Experiences / How tos", href: "/blogs/bushcraft-camping-videos" },
];

export const primaryLinks: MenuLink[] = [
  { label: "New", href: "/collections/new-products" },
  { label: "Back in Stock", href: "/collections/back-in-stock-1" },
  { label: "Sale", href: "/collections/clearance" },
  { label: "Brands", href: "/pages/all-brands" },
  { label: "About", href: "/pages/about" },
  { label: "Contact", href: "/pages/contact-us" },
  { label: "Collabs", href: "/pages/collab" },
];
