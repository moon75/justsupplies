import HomeHero from "@/components/home/HomeHero";
import Adventures, { type Adventure } from "@/components/home/Adventures";
import ProductTabs from "@/components/home/ProductTabs";
import PromoBand from "@/components/home/PromoBand";
import StoryBlock from "@/components/home/StoryBlock";
import BrandMarquee from "@/components/home/BrandMarquee";
import Newsletter from "@/components/newsletter/Newsletter";
import FaqSection from "@/components/faq/FaqSection";
import { groupSlug } from "@/components/header/groups";
import { productGroups } from "@/components/header/navigation";
import { getSettings } from "@/lib/settings";
import { getCollection, getCollectionByHandle, getCollectionProducts, getNewest, allProducts, toCard, type Product } from "@/lib/catalog";

const firstWithImage = (handle: string) => getCollectionByHandle(handle).find(p => p.available && p.images.length);

const adventureDefs = [
  { group: "Tents", label: "Camping", blurb: "Tents, pegs and shelters" },
  { group: "Cookers and Stoves", label: "Camp Cooking", blurb: "Stoves, fuel and fire kit" },
  { group: "Sleeping", label: "Wild Sleeping", blurb: "Bags, mats and pillows" },
  { group: "Hiking", label: "Hiking", blurb: "Poles and navigation" },
  { group: "Tools, Gadgets and Accessories", label: "Bushcraft", blurb: "Knives, axes and gadgets" },
];

function buildAdventures(): Adventure[] {
  return adventureDefs.flatMap(def => {
    const group = productGroups.find(g => g.label === def.group);
    if (!group) return [];
    const handles = new Set<string>();
    let image: string | null = null;
    for (const link of group.links) {
      const c = getCollection(link.href.split("/").pop() ?? "");
      if (!c) continue;
      getCollectionProducts(c).forEach(p => { handles.add(p.handle); if (!image && p.available && p.images[0]) image = p.images[0]; });
    }
    const href = group.links.length > 1 ? `/categories/${groupSlug(group.label)}` : group.links[0].href;
    return [{ label: def.label, blurb: def.blurb, href, image, count: handles.size }];
  });
}

export default function Home() {
  const picks = ["camping-stoves-cookers", "all-tents", "headtorches", "sleeping-bags"].map(firstWithImage).filter((p): p is Product => !!p);
  const sale = getCollectionByHandle("clearance").filter(p => p.available).slice(0, 8);
  const tabs = [
    { label: "New in", href: "/collections/new-products", items: getNewest(8).map(toCard) },
    { label: "Back in stock", href: "/collections/back-in-stock-1", items: getCollectionByHandle("back-in-stock-1").filter(p => p.available).slice(0, 8).map(toCard) },
    { label: "On sale", href: "/collections/clearance", items: sale.map(toCard) },
  ].filter(t => t.items.length);
  const settings = getSettings();
  const storyImage = firstWithImage("lightweight-hiking-tents")?.images[0] ?? null;

  return <main id="main-content" className="site-content">
    <HomeHero picks={picks} productCount={allProducts().length} settings={settings} />
    <Adventures items={buildAdventures()} />
    <ProductTabs tabs={tabs} />
    <PromoBand />
    <StoryBlock image={storyImage} title={settings.storyTitle} text={settings.storyText} />
    <BrandMarquee />
    <Newsletter />
    <FaqSection />
  </main>;
}
