"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { dietary, mealTypes, type CollectionProduct } from "./collectionProducts";
import styles from "./CollectionPage.module.css";

type Sort = "featured" | "price-asc" | "price-desc" | "title-asc" | "title-desc";

const formatPrice = (price: number) => `£${price.toFixed(2)} GBP`;

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m14.7 5.3-1.4 1.4 4.3 4.3H4v2h13.6l-4.3 4.3 1.4 1.4 6.7-6.7-6.7-6.7Z" /></svg>;
}

function BagIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 8h12l1 13H5L6 8Zm3-1V5a3 3 0 0 1 6 0v2h-2V5a1 1 0 0 0-2 0v2H9Z" /></svg>;
}

function CheckList({ name, items, selected, onToggle, label = item => item }: { name: string; items: readonly string[]; selected?: string[]; onToggle?: (item: string) => void; label?: (item: string) => string }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? items : items.slice(0, 5);
  return <>
    <ul className={styles.checkList}>
      {visible.map(item => <li key={item}><label>
        <input type="checkbox" checked={selected?.includes(item) ?? undefined} onChange={() => onToggle?.(item)} />
        <span>{label(item)}</span>
      </label></li>)}
    </ul>
    {items.length > 5 && <button type="button" className={styles.showAll} onClick={() => setShowAll(!showAll)}>{showAll ? "Show less" : `Show all ${name}`}</button>}
  </>;
}

type CollectionPageProps = {
  title: string;
  description?: string;
  products: readonly CollectionProduct[];
  /** Brand filter options with counts; defaults to brands found in `products`. */
  brandCounts?: Record<string, number>;
  /** Show the Meal Type and Dietary Requirement filter groups. */
  foodFilters?: boolean;
};

export default function CollectionPage({ title, description, products, brandCounts, foodFilters = true }: CollectionPageProps) {
  const maxPrice = Math.ceil(Math.max(...products.map(p => p.price)));
  const counts = useMemo(() => brandCounts ?? products.reduce<Record<string, number>>((acc, p) => ({ ...acc, [p.vendor]: (acc[p.vendor] ?? 0) + 1 }), {}), [brandCounts, products]);
  const brands = useMemo(() => Object.keys(counts).sort((a, b) => a.localeCompare(b)), [counts]);
  const [query, setQuery] = useState("");
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(maxPrice);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("featured");
  const [view, setView] = useState<"grid" | "list">("grid");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter(p =>
      (!q || p.title.toLowerCase().includes(q)) &&
      p.price >= minValue && p.price <= maxValue &&
      (!selectedBrands.length || selectedBrands.includes(p.vendor)));
    const sorters: Record<Sort, ((a: CollectionProduct, b: CollectionProduct) => number) | null> = {
      featured: null,
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      "title-asc": (a, b) => a.title.localeCompare(b.title),
      "title-desc": (a, b) => b.title.localeCompare(a.title),
    };
    const sorter = sorters[sort];
    return sorter ? [...list].sort(sorter) : list;
  }, [products, query, minValue, maxValue, selectedBrands, sort]);

  const toggleBrand = (brand: string) => setSelectedBrands(current => current.includes(brand) ? current.filter(b => b !== brand) : [...current, brand]);

  return <div className={styles.page}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link> <span aria-hidden="true">•</span> <span>{title}</span></nav>

    <div className={styles.topBar}>
      <h1 className={styles.title}>{title} <span className={styles.count}>{visible.length} products</span></h1>
      <div className={styles.controls}>
        <button type="button" className={`${styles.viewButton} ${view === "grid" ? styles.activeView : ""}`} onClick={() => setView("grid")} aria-label="Grid view" aria-pressed={view === "grid"}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5 5h3v3H5zm5.5 0h3v3h-3zM16 5h3v3h-3zM5 10.5h3v3H5zm5.5 0h3v3h-3zm5.5 0h3v3h-3zM5 16h3v3H5zm5.5 0h3v3h-3zM16 16h3v3h-3z" /></svg>
        </button>
        <button type="button" className={`${styles.viewButton} ${view === "list" ? styles.activeView : ""}`} onClick={() => setView("list")} aria-label="List view" aria-pressed={view === "list"}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5 6h3v3H5zm5 0h9v3h-9zM5 15h3v3H5zm5 0h9v3h-9z" /></svg>
        </button>
        <label className={styles.sort}>
          <span>Sort by:</span>
          <select value={sort} onChange={e => setSort(e.target.value as Sort)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
            <option value="title-asc">Alphabetically, A-Z</option>
            <option value="title-desc">Alphabetically, Z-A</option>
          </select>
        </label>
      </div>
    </div>

    {description && <p className={styles.description}>{description}</p>}

    <div className={styles.layout}>
      <aside className={styles.sidebar} aria-label="Filters">
        <label className={styles.search}>
          <input type="search" aria-label="Search products" placeholder="Search" value={query} onChange={e => setQuery(e.target.value)} />
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M10 3a7 7 0 0 1 5.6 11.2l4.6 4.6-1.4 1.4-4.6-4.6A7 7 0 1 1 10 3Zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" /></svg>
        </label>

        <details className={styles.group} open>
          <summary>Price</summary>
          <div className={styles.priceInputs}>
            <input type="number" min={0} max={maxValue} value={minValue} aria-label="Minimum price" onChange={e => setMinValue(Math.min(Number(e.target.value) || 0, maxValue))} />
            <span>-</span>
            <input type="number" min={minValue} max={maxPrice} value={maxValue} aria-label="Maximum price" onChange={e => setMaxValue(Math.max(Number(e.target.value) || 0, minValue))} />
          </div>
          <input className={styles.range} type="range" min={0} max={maxPrice} value={maxValue} aria-label="Maximum price slider" onChange={e => setMaxValue(Math.max(Number(e.target.value), minValue))} />
        </details>

        <details className={styles.group} open>
          <summary>Brand</summary>
          <CheckList name="Brand" items={brands} selected={selectedBrands} onToggle={toggleBrand} label={brand => `${brand} (${counts[brand]})`} />
        </details>

        {foodFilters && <>
        <details className={styles.group} open>
          <summary>Meal Type</summary>
          <CheckList name="Meal Type" items={mealTypes} />
        </details>

        <details className={styles.group} open>
          <summary>Dietary Requirement</summary>
          <CheckList name="Dietary Requirement" items={dietary} />
        </details>
        </>}
      </aside>

      <div className={`${styles.grid} ${view === "list" ? styles.list : ""}`}>
        {visible.map(product => <article className={styles.card} key={product.href}>
          <a className={styles.imageWrap} href={product.href} aria-label={product.title}>
            {product.compareAtPrice && product.compareAtPrice > product.price && <span className={styles.badge}>{formatPrice(product.compareAtPrice - product.price)} Off</span>}
            <Image className={styles.image} src={product.image} alt={product.title} fill sizes="(max-width: 749px) 45vw, 200px" />
          </a>
          <div className={styles.details}>
            <p className={styles.vendor}>{product.vendor}</p>
            <h2 className={styles.productTitle}><a href={product.href}>{product.title}</a></h2>
            {product.compareAtPrice && product.compareAtPrice > product.price
              ? <p className={styles.price}><span className={styles.salePrice}>{formatPrice(product.price)}</span> <s className={styles.comparePrice}>{formatPrice(product.compareAtPrice)}</s></p>
              : <p className={styles.price}>{formatPrice(product.price)}</p>}
            <a className={styles.action} href={product.href}>
              <span>{product.action}</span>
              {product.action === "Add to cart" ? <BagIcon /> : <ArrowIcon />}
            </a>
          </div>
        </article>)}
        {!visible.length && <p className={styles.empty}>No products match these filters.</p>}
      </div>
    </div>
  </div>;
}
