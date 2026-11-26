export type Category = {
  title: string;
  image: string;
  href: string;
  crop?: "circle" | "contain";
};

export const categories: readonly Category[] = [
  { title: "All Tents", image: "https://www.woodtowater.co.uk/cdn/shop/collections/naturehike-cloud-up-1-new-3_4b4cef5c-d8f8-4040-bf2f-29d9d5f9cdba.webp?v=1783329036&width=400", href: "/collections/all-tents", crop: "circle" },
  { title: "Sleeping Bags", image: "https://www.woodtowater.co.uk/cdn/shop/collections/RobensMoraineI_11_C_4.webp?v=1782310106&width=400", href: "/collections/sleeping-bags" },
  { title: "Camping Meals", image: "https://www.woodtowater.co.uk/cdn/shop/collections/Dehydrated-Camping-Meals.jpg?v=1741252678&width=400", href: "/collections/dehydrated-camping-expedition-meals" },
  { title: "Water Bottles and Flasks", image: "https://www.woodtowater.co.uk/cdn/shop/collections/BOTTLES-AND-FLASKS-FILTERS.webp?v=1741252600&width=400", href: "/collections/outdoors-hydration" },
  { title: "All Camping Stoves, Cookers & Systems", image: "https://www.woodtowater.co.uk/cdn/shop/collections/jetboil-zip-cooking-system-carbon-1.png?v=1741252618&width=400", href: "/collections/camping-stoves-cookers" },
  { title: "Headtorches", image: "https://www.woodtowater.co.uk/cdn/shop/collections/Petzl_Bindi_Headlamp_Emerald_Orange_Black_M2.jpg?v=1781189037&width=400", href: "/collections/camping-lights-and-lanterns", crop: "circle" },
];
