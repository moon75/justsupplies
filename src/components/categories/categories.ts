export type Category = {
  title: string;
  image: string;
  href: string;
  crop?: "circle" | "contain";
};

export const categories: readonly Category[] = [
  { title: "All Tents", image: "/hero/temporary-6.webp", href: "/collections/all-tents", crop: "circle" },
  { title: "Sleeping Bags", image: "/products/poncho.webp", href: "/collections/sleeping-bags" },
  { title: "Camping Meals", image: "/products/kindling.webp", href: "/collections/camping-meals" },
  { title: "Water Bottles and Flasks", image: "/products/candle-lantern.webp", href: "/collections/water-bottles-and-flasks" },
  { title: "All Camping Stoves, Cookers & Systems", image: "/products/cooking-set.webp", href: "/collections/camping-stoves" },
  { title: "Headtorches", image: "/products/glasses-case.webp", href: "/collections/headtorches", crop: "circle" },
];
