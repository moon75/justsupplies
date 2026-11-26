import type { MenuGroup } from "./navigation";

export const groupSlug = (label: string) => label.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
/** Parent link: single-child groups go straight to that collection, others to /categories/<slug>. */
export const groupHref = (group: MenuGroup) => (group.links.length === 1 ? group.links[0].href : `/categories/${groupSlug(group.label)}`);
