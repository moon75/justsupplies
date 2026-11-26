import HeroSlider from "@/components/hero/HeroSlider";
import NewestProducts from "@/components/products/NewestProducts";
import { getCollectionByHandle, getNewest, toCard } from "@/lib/catalog";
import WhatMakesUsDifferent from "@/components/difference/WhatMakesUsDifferent";
import HomeInfo from "@/components/home-info/HomeInfo";
import Newsletter from "@/components/newsletter/Newsletter";
import FaqSection from "@/components/faq/FaqSection";
import CategoryShowcase from "@/components/categories/CategoryShowcase";

export default function Home() {
  return <main id="main-content" className="site-content"><HeroSlider /><NewestProducts products={getNewest(5).map(toCard)} /><CategoryShowcase /><NewestProducts id="back-in-stock" eyebrow="AVAILABLE AGAIN" title="BACK IN STOCK" products={getCollectionByHandle("back-in-stock-1", 5).map(toCard)} /><WhatMakesUsDifferent /><HomeInfo /><Newsletter /><FaqSection /></main>;
}
