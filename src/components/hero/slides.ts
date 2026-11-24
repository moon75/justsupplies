export type HeroSlide = {
  title: string;
  subtitle: string;
  image: string;
  position: string;
  overlay: string;
  href: string;
};

// The photos are locally generated temporary replacements. Promotional details
// follow the reference site, except the opening title requested for this demo.
export const heroSlides: readonly HeroSlide[] = [
  {
    title: "this is demo",
    subtitle: "Keep the inside of your tent dry - Free sealant automatically added at checkout with selected Lanshan tents.",
    image: "/hero/temporary-1.webp",
    position: "25.9113% 47.0839%",
    overlay: "rgb(0 0 0 / 47%)",
    href: "/collections/lightweight-hiking-tents?sort_by=&filter.v.price.gte=&filter.v.price.lte=&filter.p.vendor=3F+UL+GEAR",
  },
  {
    title: "FireMaple Antarcti Cups",
    subtitle: "Free Sierra Cups with selected Fire Maple stoves - Added automatically at checkout.",
    image: "/hero/temporary-2.webp",
    position: "86.1038% 36.5428%",
    overlay: "rgb(0 0 0 / 44%)",
    href: "/collections/camping-gas-stoves",
  },
  {
    title: "Nikwax",
    subtitle: "Waterproofing for Outdoor Gear - Made Simple",
    image: "/hero/temporary-3.webp",
    position: "27.5092% 52.7173%",
    overlay: "rgb(0 0 0 / 28%)",
    href: "/collections/nikwax",
  },
  {
    title: "Robens",
    subtitle: "Quality Titanium Mugs - Lightweight and Durable",
    image: "/hero/temporary-4.webp",
    position: "51.6043% 46.1381%",
    overlay: "rgb(0 0 0 / 30%)",
    href: "/collections/robens-outdoors",
  },
  {
    title: "3F UL Gear",
    subtitle: "3F UL Gear provide lightweight, affordable products with exciting designs to keep your pack weight down.",
    image: "/hero/temporary-5.webp",
    position: "30.8399% 53.0351%",
    overlay: "rgb(35 35 35 / 40%)",
    href: "/collections/3fulgear",
  },
  {
    title: "Shop Tents",
    subtitle: "You plan the trip - we provide the shelter",
    image: "/hero/temporary-6.webp",
    position: "50% 50%",
    overlay: "rgb(0 0 0 / 40%)",
    href: "/collections/all-tents",
  },
];
