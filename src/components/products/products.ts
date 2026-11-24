export type FeaturedProduct = {
  vendor: string;
  title: string;
  price: string;
  image: string;
  href: string;
  action: "Choose Options" | "Add to cart";
};

export const newestProducts: readonly FeaturedProduct[] = [
  {
    vendor: "Kombat UK",
    title: "Kombat UK US Style Poncho- Various Colours",
    price: "£24.00 GBP",
    image: "/products/poncho.webp",
    href: "/products/us-style-poncho",
    action: "Choose Options",
  },
  {
    vendor: "Kombat UK",
    title: "Kombat UK Tactical Glasses Case (Various Colours)",
    price: "£9.00 GBP",
    image: "/products/glasses-case.webp",
    href: "/products/tactical-glasses-case",
    action: "Choose Options",
  },
  {
    vendor: "UCO",
    title: "UCO Original Candle Lantern Kit (Various Colours)",
    price: "£43.95 GBP",
    image: "/products/candle-lantern.webp",
    href: "/products/original-candle-lantern-kit",
    action: "Choose Options",
  },
  {
    vendor: "Origin Outdoors",
    title: "Origin Outdoors Stainless Steel Cooking Set 'Personally'",
    price: "£29.95 GBP",
    image: "/products/cooking-set.webp",
    href: "/products/stainless-steel-cooking-set",
    action: "Add to cart",
  },
  {
    vendor: "Origin Outdoors",
    title: "Origin Outdoors Fatwood 'Maya Stick' (approx. 1kg)",
    price: "£10.95 GBP",
    image: "/products/kindling.webp",
    href: "/products/fatwood-maya-stick",
    action: "Add to cart",
  },
];

// Placeholder data: reuses local product images until the client supplies restocked items.
export const backInStockProducts: readonly FeaturedProduct[] = [
  newestProducts[3],
  newestProducts[1],
  newestProducts[0],
  newestProducts[4],
  newestProducts[2],
];
