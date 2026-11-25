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
    image: "https://www.woodtowater.co.uk/cdn/shop/files/3FUL_Gear_Fast_Sil.jpg?v=1794999844&width=2000",
    position: "25.9113% 47.0839%",
    overlay: "rgb(0 0 0 / 47%)",
    href: "/collections/lightweight-hiking-tents?sort_by=&filter.v.price.gte=&filter.v.price.lte=&filter.p.vendor=3F+UL+GEAR",
  },
  {
    title: "FireMaple Antarcti Cups",
    subtitle: "Free Sierra Cups with selected Fire Maple stoves - Added automatically at checkout.",
    image: "https://www.woodtowater.co.uk/cdn/shop/files/FireMaple_Antarcti_Banner_1.webp?v=1794994705&width=2000",
    position: "86.1038% 36.5428%",
    overlay: "rgb(0 0 0 / 44%)",
    href: "/collections/camping-gas-stoves",
  },
  {
    title: "Nikwax",
    subtitle: "Waterproofing for Outdoor Gear - Made Simple",
    image: "https://www.woodtowater.co.uk/cdn/shop/files/Nikewax_Waterproofing_Banner.webp?v=1793099167&width=2000",
    position: "27.5092% 52.7173%",
    overlay: "rgb(0 0 0 / 28%)",
    href: "/collections/nikwax",
  },
  {
    title: "Robens",
    subtitle: "Quality Titanium Mugs - Lightweight and Durable",
    image: "https://www.woodtowater.co.uk/cdn/shop/files/Website_Banner_-_Robens_Mug_1-min.webp?v=1791389289&width=2000",
    position: "51.6043% 46.1381%",
    overlay: "rgb(0 0 0 / 30%)",
    href: "/collections/robens-outdoors",
  },
  {
    title: "3F UL Gear",
    subtitle: "3F UL Gear provide lightweight, affordable products with exciting designs to keep your pack weight down.",
    image: "https://www.woodtowater.co.uk/cdn/shop/files/Website_Banner_-_Qidian_Backpack_3-min.webp?v=1791389603&width=2000",
    position: "30.8399% 53.0351%",
    overlay: "rgb(35 35 35 / 40%)",
    href: "/collections/3fulgear",
  },
  {
    title: "Shop Tents",
    subtitle: "You plan the trip - we provide the shelter",
    image: "https://www.woodtowater.co.uk/cdn/shop/files/Website_Banner_-_Cloud_Up_3_1.webp?v=1791553382&width=2000",
    position: "50% 50%",
    overlay: "rgb(0 0 0 / 40%)",
    href: "/collections/all-tents",
  },
];
