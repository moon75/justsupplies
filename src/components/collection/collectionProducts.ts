export type CollectionProduct = {
  vendor: string;
  title: string;
  price: number;
  image: string;
  href: string;
  action: "Choose Options" | "Add to cart";
};

// Placeholder catalogue: reuses local images until client product data is supplied.
export const newCollectionProducts: readonly CollectionProduct[] = [
  { vendor: "Kombat UK", title: "Kombat UK US Style Poncho (Various Colours)", price: 24, image: "/products/poncho.webp", href: "/products/us-style-poncho", action: "Choose Options" },
  { vendor: "Kombat UK", title: "Kombat UK Tactical Glasses Case (Various Colours)", price: 9, image: "/products/glasses-case.webp", href: "/products/tactical-glasses-case", action: "Choose Options" },
  { vendor: "UCO", title: "UCO Original Candle Lantern Kit (Various Colours)", price: 43.95, image: "/products/candle-lantern.webp", href: "/products/original-candle-lantern-kit", action: "Choose Options" },
  { vendor: "Origin Outdoors", title: "Origin Outdoors Stainless Steel Cooking Set 'Personally'", price: 29.95, image: "/products/cooking-set.webp", href: "/products/stainless-steel-cooking-set", action: "Add to cart" },
  { vendor: "Origin Outdoors", title: "Origin Outdoors Fatwood 'Maya Stick' (approx. 1 kg)", price: 10.95, image: "/products/kindling.webp", href: "/products/fatwood-maya-stick", action: "Add to cart" },
  { vendor: "Origin Outdoors", title: "Origin Outdoors Spice Grinder 'Press'", price: 7.95, image: "/products/glasses-case.webp", href: "/products/spice-grinder-press", action: "Add to cart" },
  { vendor: "Primus", title: "Primus Primetech Stove Set 1x2.3L with pan", price: 154.95, image: "/products/cooking-set.webp", href: "/products/primetech-stove-set", action: "Add to cart" },
  { vendor: "3F UL GEAR", title: "3F UL Gear Lanshan 2 Pro 3 Season Metal Grey SilNylon", price: 175, image: "/products/poncho.webp", href: "/products/lanshan-2-pro", action: "Add to cart" },
  { vendor: "3F UL GEAR", title: "3F UL Gear Lanshan 1 Pro 4 Season Khaki SilNylon", price: 170, image: "/products/poncho.webp", href: "/products/lanshan-1-pro", action: "Add to cart" },
  { vendor: "True Utility", title: "True Utility Twistick Keyring Corkscrew", price: 6.99, image: "/products/candle-lantern.webp", href: "/products/twistick-keyring-corkscrew", action: "Add to cart" },
  { vendor: "True Utility", title: "True Utility Cardsmart 30 in 1 Wallet Tool", price: 14.95, image: "/products/kindling.webp", href: "/products/cardsmart-30-in-1", action: "Add to cart" },
  { vendor: "True Utility", title: "True Utility Tweezer Tool Pro", price: 12.99, image: "/products/candle-lantern.webp", href: "/products/tweezer-tool-pro", action: "Add to cart" },
];

// Shown in the sidebar for layout only until product data includes these attributes.
export const mealTypes = ["Beef (8)", "Chicken (9)", "Dessert (1)", "Egg (4)", "Pork (5)"];
export const dietary = ["Gluten Free (26)", "Lactose free (41)", "Vegan (32)", "Vegetarian (38)"];

// Placeholder answers: replace with client-supplied copy.
export const newProductFaqs = [
  { question: "How often do you add new products?", answer: "New products and restocks arrive weekly, so check back regularly." },
  { question: "Do new products get free delivery?", answer: "Orders over £80 qualify for free shipping to GB Mainland addresses." },
  { question: "How quickly will my order be sent?", answer: "Orders placed before 1PM are dispatched the same day." },
  { question: "Can I return a new product if it's not right?", answer: "Answer to be supplied by the client." },
  { question: "Can I collect my order?", answer: "Answer to be supplied by the client." },
] as const;
