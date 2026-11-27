import { readData } from "./store";

export type SiteSettings = {
  heroPill: string;
  heroTitle: string;      // wrap a word in *stars* to highlight it, e.g. "Gear up for every *wild* adventure."
  heroLead: string;
  heroButton: string;
  storyTitle: string;
  storyText: string;
};

export const defaultSettings: SiteSettings = {
  heroPill: "New season gear just landed",
  heroTitle: "Gear up for every *wild* adventure.",
  heroLead: "Tents, stoves, sleep systems and bushcraft kit from the brands outdoor people trust — picked, packed and shipped from the UK by JustSupplies.",
  heroButton: "Shop all gear",
  storyTitle: "Tested outdoors. Packed with care.",
  storyText: "We're a small team of campers, hikers and bushcrafters. Everything we sell is gear we'd happily take on our own trips — and if you're not sure what you need, just ask. We'll point you to the right kit, not the most expensive one.",
};

export const getSettings = (): SiteSettings => ({ ...defaultSettings, ...readData<Partial<SiteSettings>>("settings", {}) });
