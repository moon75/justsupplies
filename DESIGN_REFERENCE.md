# Wood To Water design reference

Captured on 24 November 2026 from [woodtowater.co.uk](https://www.woodtowater.co.uk/) with Playwright and local Google Chrome. All recorded pages returned HTTP 200. The raw `getComputedStyle()` values, element rectangles, loaded font list, headings, and interaction results are in [reference/design-tokens.json](reference/design-tokens.json). Coordinates and sizes below are CSS pixels. Screenshots use a 900 px viewport height and device scale factor 1; they are full page unless their names describe an open control.

## Screenshots

| View | Width | File |
| --- | ---: | --- |
| Homepage desktop | 1440 | [home_1440.png](reference/screenshots/home_1440.png) |
| Homepage laptop | 1280 | [home_1280.png](reference/screenshots/home_1280.png) |
| Homepage tablet | 768 | [home_768.png](reference/screenshots/home_768.png) |
| Homepage mobile | 390 | [home_390.png](reference/screenshots/home_390.png) |
| Lightweight tents collection | 1440, 390 | [desktop](reference/screenshots/collection_tents_1440.png), [mobile](reference/screenshots/collection_tents_390.png) |
| Camping gas stoves collection | 1440 | [collection_stoves_1440.png](reference/screenshots/collection_stoves_1440.png) |
| Bathtub footprint product | 1440, 390 | [desktop](reference/screenshots/product_1440.png), [mobile](reference/screenshots/product_390.png) |
| Lanshan 2 Classic product | 1440 | [product_tent_1440.png](reference/screenshots/product_tent_1440.png) |
| Empty and filled cart pages | 1440 | [empty](reference/screenshots/cart_page_1440.png), [filled](reference/screenshots/cart-page-filled-desktop.png) |
| Navigation, search, cart drawer | 1440 or 390 | [desktop menu](reference/screenshots/navigation-desktop.png), [mobile menu](reference/screenshots/navigation-mobile.png), [tent search](reference/screenshots/search-tent-desktop.png), [empty cart drawer](reference/screenshots/cart-drawer-desktop.png) |

The capture script scrolls through each page before taking its screenshot so images that load on entry into view appear in the full page image. The homepage carousel rotates automatically, so the visible hero slide and its text can vary between captures.

## Measured visual system

| Property | Computed value / measured layout |
| --- | --- |
| Main typeface | `Instrument Sans, sans-serif`; body weight 400, 16 px at 1440/1280/390, 14.4 px at 768 |
| Promotion bar typeface | `Josefin Sans`, 16 px, 20 px line height on the measured desktop bar |
| Page background | `rgb(244, 244, 244)` / `#f4f4f4` |
| Main text | `rgb(35, 35, 35)` / `#232323` |
| Header background | `rgb(58, 61, 66)` / `#3a3d42` |
| Main green / promotion background | `rgb(10, 89, 71)` / `#0a5947` |
| Card background | `rgb(255, 255, 255)` / `#fff` |
| Footer background | `rgb(33, 33, 33)` / `#212121` |
| Standard content wrapper | `max-width: 1660px`; measured horizontal padding 55 px at 1440/1280/768 and 22 px on the mobile homepage/product page. The mobile collection header wrapper uses 10 px. |
| Primary buttons | Green background, white 16 px weight 700 text, 50 px radius, 1 px transparent border, no box shadow; measured height 50.39 px in the desktop card and product form |
| Product cards | White, 20 px radius, no computed border or box shadow, 20 px padding on the first desktop homepage card |
| Header search field | White, 50 px radius; 485 × 55 px at 1440, with `10px 45px 10px 28px` padding |
| Header cart icon | 53 × 53 px green circle at 1440; 45 × 45 px white circle with green foreground at 390 |

These are actual computed CSS values. The JSON retains the unrounded fractional rectangles and the full set of measured margins, padding, borders, shadows, font styles, and layout fields for each selected element.

### Header and typography by viewport

| Width | Promotion height | Header height | Logo box | Hero box | Active hero title | First homepage card |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1440 | 44 | 210.33 | 280 × 79.33 | 1440 × 800 | 80 px / 700 | 266 × 520.39 |
| 1280 | 44 | 210.33 | 248 × 79.33 | 1280 × 800 | 80 px / 700 | 234 × 542.77 |
| 768 | 45 | 210.33 | 175 × 79.33 | 768 × 800 | 64.8 px / 700 | 131.59 × 652.17 |
| 390 | 30.75 | 103.45 | 140 × 63.45 | 390 × 520 | 50.4 px / 700 | 259.5 × 518.89 |

The 1440 desktop section heading measured 46.8 px / 700. The 390 mobile heading measured 40 px / 700. Desktop product card titles measured 22 px / 400, while the mobile homepage card title measured 19 px / 400. The desktop header navigation links measured 15 px / 600. The promotion bar is fixed at the top in the inspected page state.

## Page structure and responsive behavior

### Homepage

The page has the promotion bar, dark header, full width carousel, “Newest Products” carousel, a photographic category section with six tiles, “Back in Stock” products, three “What Makes Us Different” panels, an introductory text block, three promise items, eight brand logo cards, newsletter form, FAQ section, and footer. The desktop hero begins at y=253.33 px and is 800 px high. The first product row starts at y=1281.63 px at 1440.

At 1440, five homepage product slots begin at x=55, 332, 609, 886, and 1163 px; each slot is 277 px wide. At 768, five narrower slots remain visible (about 142.6 px each). At 390, the product section becomes a horizontally scrollable carousel: the first slot is 259.5 px wide at x=22, and the second begins at x=303.5, outside the viewport. Category tiles form two columns on mobile. The three difference panels also scroll horizontally on mobile. Promise items and footer columns stack vertically.

### Collections

[Lightweight Hiking Tents](https://www.woodtowater.co.uk/collections/lightweight-hiking-tents) and [Camping Gas Stoves](https://www.woodtowater.co.uk/collections/camping-gas-stoves) show breadcrumbs, collection title and count, description, grid/list controls, sorting, a filter sidebar, product cards, pagination, FAQ content, and footer. The tents page displayed 58 products during capture. The desktop tents grid begins at x=439 px; its first three product slots are 315.33 px wide and begin at x=439, 754.33, and 1069.66. The visible card itself is 304.33 px wide with 20 px radius. On a 390 px viewport the product grid has two 190 px slots per row, with 180 px white cards and 10 px inner horizontal padding. Filters and sort controls move above the cards in the mobile layout.

### Products

[Bathtub Footprint](https://www.woodtowater.co.uk/products/3fulgear-bathtub-footprint-small-medium) has a two column desktop detail layout: image gallery on the left, product information on the right. The right information box begins at x=725.5 px and is 579.5 px wide; its title is 32 px / 700. It includes price, tax/shipping message, size choice, quantity stepper, add to cart, stock notice, and expandable delivery/finance details. The page continues with description/specification table, related products, newsletter, FAQ, and footer. At 390, gallery and information stack; the information box is 346 px wide at x=22 and its title is 20.8 px / 700. The add button is 346 × 50.39 px.

The [Lanshan 2 Classic](https://www.woodtowater.co.uk/collections/lightweight-hiking-tents/products/3fulgear-lanshan-2-tent-green) product was also captured to compare a second product layout and related items.

### Navigation, search, and cart

Desktop navigation has New, All Products, Back in Stock, Sale, Brands, Blog, About, Contact, and Collabs. Hovering “All Products” opens a white dropdown measured at 231.67 × 479 px, with 13 top level groups, including Clothing, Cookers and Stoves, Sleeping, Tarps, and Tents. At 390, the header uses search, cart, and hamburger controls. The open mobile menu spans 390 × 742 px at y=133 and lists the same nine primary links; it overlays/dims the page.

The desktop header search input has placeholder “Keywords ...”. Submitting `tent` navigated to `/search?q=tent*`; the page reported “1000 results for ‘tent’” and used a product results list with price/brand filters. The search screenshot records this result state. Clicking the search submit control with an empty query instead navigated to `/search?q=*`; that behavior is recorded in the JSON.

Clicking the empty cart icon opened a 400 px wide drawer anchored to the right edge at x=1040 on a 1440 px viewport. It displayed a shipping restriction notice, empty-cart message, and “Keep Shopping” action. `/cart` showed an empty state with “Back to Home”. In a fresh anonymous Playwright session, adding one `Lanshan 1` footprint at £32 led to a populated cart page with product row, quantity controls, order notes, subtotal, and Checkout button. The promotion changed to “Only £48 away from free shipping”. No checkout was attempted.

## Limits and asset handling

- These are representative pages and one query, not an inventory of every category, product, search state, or locale.
- Account, checkout, payment, and shipping calculation pages were not inspected. The filled cart drawer did not render visibly during the automated add flow, though the filled `/cart` page did.
- Carousel timing, inventory, prices, review counts, and promotional text are live site data and may change after capture.
- Screenshots are reference observations. No source images, fonts, logos, or other site assets were copied into the frontend; reuse rights must be confirmed before implementation.
- The existing frontend was not edited. Playwright was installed locally only for this analysis; no package manifest or lockfile changes were made.
