export type HeroSlide = {
  title: string;
  subtitle: string;
  image: string;
  position: string;
  overlay: string;
  href: string;
};

// Slide copy written for JustSupplies; images are temporary until the client supplies its own.
export const heroSlides: readonly HeroSlide[] = [
  {
    title: "Welcome to JustSupplies",
    subtitle: "Everything you need for the outdoors - tents, stoves, sleep systems and bushcraft kit, hand-picked and tested by our team.",
    image: "https://www.woodtowater.co.uk/cdn/shop/files/3FUL_Gear_Fast_Sil.jpg?v=1794999844&width=2000",
    position: "25.9113% 47.0839%",
    overlay: "rgb(0 0 0 / 47%)",
    href: "/collections/all",
  },
  {
    title: "Cook Anywhere",
    subtitle: "Gas, liquid fuel and solid fuel stoves from the brands you trust. Fast UK delivery from JustSupplies.",
    image: "https://www.woodtowater.co.uk/cdn/shop/files/FireMaple_Antarcti_Banner_1.webp?v=1794994705&width=2000",
    position: "86.1038% 36.5428%",
    overlay: "rgb(0 0 0 / 44%)",
    href: "/collections/camping-gas-stoves",
  },
  {
    title: "Built for British Weather",
    subtitle: "Waterproofing and kit care that keeps your gear going season after season.",
    image: "https://www.woodtowater.co.uk/cdn/shop/files/Nikewax_Waterproofing_Banner.webp?v=1793099167&width=2000",
    position: "27.5092% 52.7173%",
    overlay: "rgb(0 0 0 / 28%)",
    href: "/collections/nikwax",
  },
  {
    title: "Light Pack, Big Adventures",
    subtitle: "Titanium mugs, cookware and lightweight essentials to keep your pack weight down.",
    image: "https://www.woodtowater.co.uk/cdn/shop/files/Website_Banner_-_Robens_Mug_1-min.webp?v=1791389289&width=2000",
    position: "51.6043% 46.1381%",
    overlay: "rgb(0 0 0 / 30%)",
    href: "/collections/robens-outdoors",
  },
  {
    title: "Ultralight Shelters",
    subtitle: "Affordable lightweight tents and tarps for wild camping and long-distance hikes.",
    image: "https://www.woodtowater.co.uk/cdn/shop/files/Website_Banner_-_Qidian_Backpack_3-min.webp?v=1791389603&width=2000",
    position: "30.8399% 53.0351%",
    overlay: "rgb(35 35 35 / 40%)",
    href: "/collections/3fulgear",
  },
  {
    title: "Your Shelter Starts Here",
    subtitle: "You plan the trip - JustSupplies provides the shelter. Shop our full range of tents.",
    image: "https://www.woodtowater.co.uk/cdn/shop/files/Website_Banner_-_Cloud_Up_3_1.webp?v=1791553382&width=2000",
    position: "50% 50%",
    overlay: "rgb(0 0 0 / 40%)",
    href: "/collections/all-tents",
  },
];
