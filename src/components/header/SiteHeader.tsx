"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { blogLinks, primaryLinks, productGroups, shopOrigin } from "./navigation";
import styles from "./SiteHeader.module.css";

function Icon({ name, size = 20 }: { name: "search" | "bag" | "menu" | "close" | "user" | "chevron"; size?: number }) {
  if (name === "search") return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.7" /><path d="m16 16 5 5" /></svg>;
  if (name === "bag") return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 8h14l1 13H4L5 8Zm4-1V5a3 3 0 0 1 6 0v2h-2V5a1 1 0 0 0-2 0v2H9Z" /></svg>;
  if (name === "user") return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="9" r="3" /><path d="M5.5 19c1-3 3.2-4.5 6.5-4.5s5.5 1.5 6.5 4.5" /></svg>;
  if (name === "menu") return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" /></svg>;
  if (name === "close") return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m4 4 16 16M20 4 4 20" /></svg>;
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>;
}

type OpenMenu = "products" | "blog" | "account" | "currency" | null;

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [country, setCountry] = useState("United Kingdom (GBP £)");
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.body.style.overflow = mobileOpen || cartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen, cartOpen]);

  const closeMenus = () => { setOpenMenu(null); setActiveGroup(null); };

  return <>
    <div className={styles.announcementSpacer} />
    <div className={styles.announcement} role="region" aria-label="Shipping promotion">Free shipping for orders over £80</div>
    <a className={styles.skipLink} href="#main-content">Skip to content</a>
    <header className={styles.header}>
      <div className={styles.desktopTop}>
        <div className={styles.contactLinks}>
          <a href="mailto:contact@woodtowater.co.uk">contact@woodtowater.co.uk</a>
          <a href="tel:01252615977">01252 615977</a>
        </div>
        <Link className={styles.desktopLogo} href="/" aria-label="justsupplies home"><span className={styles.logoArt} aria-hidden="true" /></Link>
        <div className={styles.topActions}>
          <div className={styles.topDropdown} onMouseEnter={() => setOpenMenu("account")} onMouseLeave={closeMenus}>
            <button type="button" className={styles.topPill} aria-expanded={openMenu === "account"} onClick={() => setOpenMenu(openMenu === "account" ? null : "account")}><Icon name="user" size={10} /> My Account</button>
            {openMenu === "account" && <div className={styles.smallDropdown}><a href={`${shopOrigin}/customer_authentication/redirect`}>Login</a><a href={`${shopOrigin}/customer_authentication/redirect`}>Create Account</a></div>}
          </div>
          <div className={styles.topDropdown} onMouseEnter={() => setOpenMenu("currency")} onMouseLeave={closeMenus}>
            <button type="button" className={styles.topPill} aria-expanded={openMenu === "currency"} onClick={() => setOpenMenu(openMenu === "currency" ? null : "currency")}>{country}</button>
            {openMenu === "currency" && <div className={styles.smallDropdown}>{["United Kingdom (GBP £)", "Isle of Man (GBP £)", "Jersey (GBP £)"].map(option => <button type="button" key={option} onClick={() => { setCountry(option); setOpenMenu(null); }}>{option}</button>)}</div>}
          </div>
        </div>
      </div>

      <div className={styles.desktopBottom}>
        <nav className={styles.desktopNav} aria-label="Main navigation">
          <a href={shopOrigin + primaryLinks[0].href}>NEW</a>
          <div className={styles.navEntry} onMouseEnter={() => setOpenMenu("products")} onMouseLeave={closeMenus}>
            <button type="button" aria-expanded={openMenu === "products"} onClick={() => setOpenMenu(openMenu === "products" ? null : "products")}>ALL PRODUCTS <span className={styles.downCaret} /></button>
            {openMenu === "products" && <div className={styles.productMenu}>
              {productGroups.map(group => <div className={styles.groupRow} key={group.label} onMouseEnter={() => setActiveGroup(group.label)}>
                <button type="button" aria-expanded={activeGroup === group.label} onClick={() => setActiveGroup(activeGroup === group.label ? null : group.label)}>{group.label}<Icon name="chevron" size={13} /></button>
                {activeGroup === group.label && <div className={styles.subMenu}>{group.links.map(link => <a key={link.href} href={shopOrigin + link.href}>{link.label}</a>)}</div>}
              </div>)}
            </div>}
          </div>
          <a href={shopOrigin + primaryLinks[1].href}>BACK IN STOCK</a>
          <a href={shopOrigin + primaryLinks[2].href}>SALE</a>
          <a href={shopOrigin + primaryLinks[3].href}>BRANDS</a>
          <div className={styles.navEntry} onMouseEnter={() => setOpenMenu("blog")} onMouseLeave={closeMenus}>
            <button type="button" aria-expanded={openMenu === "blog"} onClick={() => setOpenMenu(openMenu === "blog" ? null : "blog")}>BLOG <span className={styles.downCaret} /></button>
            {openMenu === "blog" && <div className={styles.blogMenu}>{blogLinks.map(link => <a key={link.href} href={shopOrigin + link.href}>{link.label}</a>)}</div>}
          </div>
          <a href={shopOrigin + primaryLinks[4].href}>ABOUT</a>
          <span className={styles.desktopContactBreak} aria-hidden="true" />
          <a href={shopOrigin + primaryLinks[5].href}>CONTACT</a>
          <a href={shopOrigin + primaryLinks[6].href}>COLLABS</a>
        </nav>
        <form className={styles.desktopSearch} role="search" action={`${shopOrigin}/search`} method="get"><input aria-label="Keywords ..." placeholder="Keywords ..." value={query} onChange={event => setQuery(event.target.value)} /><input type="hidden" name="q" value={`${query.trim()}*`} /><button type="submit" aria-label="Search"><Icon name="search" size={21} /></button></form>
        <button type="button" className={`${styles.iconButton} ${styles.tabletSearch}`} aria-label="Search" onClick={() => setMobileSearch(!mobileSearch)}><Icon name="search" size={21} /></button>
        <button type="button" className={`${styles.iconButton} ${styles.desktopCart}`} aria-label="Shopping cart" onClick={() => setCartOpen(true)}><Icon name="bag" size={21} /><span className={styles.cartCount}>0</span></button>
      </div>

      <div className={styles.mobileBar}>
        <Link className={styles.mobileLogo} href="/" aria-label="justsupplies home"><span className={styles.logoArt} aria-hidden="true" /></Link>
        <div className={styles.mobileActions}>
          <button type="button" className={styles.mobileIcon} aria-label="Search" aria-expanded={mobileSearch} onClick={() => { setMobileSearch(!mobileSearch); setMobileOpen(false); }}><Icon name="search" size={22} /></button>
          <button type="button" className={styles.mobileIcon} aria-label="Shopping cart" onClick={() => setCartOpen(true)}><Icon name="bag" size={20} /><span className={styles.cartCount}>0</span></button>
          <button type="button" className={styles.mobileIcon} aria-label="Navigation" aria-expanded={mobileOpen} onClick={() => { setMobileOpen(!mobileOpen); setMobileSearch(false); }}><Icon name={mobileOpen ? "close" : "menu"} size={28} /></button>
        </div>
      </div>
      {mobileSearch && <form className={styles.mobileSearch} role="search" action={`${shopOrigin}/search`} method="get"><input autoFocus aria-label="Keywords ..." placeholder="Keywords ..." value={query} onChange={event => setQuery(event.target.value)} /><input type="hidden" name="q" value={`${query.trim()}*`} /><button type="submit" aria-label="Search"><Icon name="search" size={20} /></button></form>}
      {mobileOpen && <nav className={styles.mobileNav} aria-label="Mobile navigation">
        <a href={shopOrigin + primaryLinks[0].href}>New</a>
        <button type="button" onClick={() => setMobileSection(mobileSection === "products" ? null : "products")} aria-expanded={mobileSection === "products"}>All Products <Icon name="chevron" size={19} /></button>
        {mobileSection === "products" && <div className={styles.mobileSubNav}>{productGroups.map(group => <div key={group.label}><button type="button" onClick={() => setActiveGroup(activeGroup === group.label ? null : group.label)} aria-expanded={activeGroup === group.label}>{group.label}<Icon name="chevron" size={17} /></button>{activeGroup === group.label && <div className={styles.mobileNested}>{group.links.map(link => <a href={shopOrigin + link.href} key={link.href}>{link.label}</a>)}</div>}</div>)}</div>}
        <a href={shopOrigin + primaryLinks[1].href}>Back in Stock</a><a href={shopOrigin + primaryLinks[2].href}>Sale</a><a href={shopOrigin + primaryLinks[3].href}>Brands</a>
        <button type="button" onClick={() => setMobileSection(mobileSection === "blog" ? null : "blog")} aria-expanded={mobileSection === "blog"}>Blog <Icon name="chevron" size={19} /></button>
        {mobileSection === "blog" && <div className={styles.mobileSubNav}>{blogLinks.map(link => <a key={link.href} href={shopOrigin + link.href}>{link.label}</a>)}</div>}
        <a href={shopOrigin + primaryLinks[4].href}>About</a><a href={shopOrigin + primaryLinks[5].href}>Contact</a><a href={shopOrigin + primaryLinks[6].href}>Collabs</a>
      </nav>}
    </header>

    {cartOpen && <div className={styles.cartLayer}>
      <button className={styles.cartBackdrop} type="button" aria-label="Close cart" onClick={() => setCartOpen(false)} />
      <aside className={styles.cartDrawer} aria-label="Shopping Cart">
        <div className={styles.cartHeading}><h2>Shopping Cart</h2><button type="button" aria-label="Close cart" onClick={() => setCartOpen(false)}><Icon name="close" size={22} /></button></div>
        <p className={styles.cartNotice}><strong>Notice:</strong> We cannot ship camping gas, knives or batteries to Northern Ireland, the Scottish Highlands nor the Channel Islands.</p>
        <p className={styles.cartEmpty}>No products in the cart.</p>
        <button className={styles.keepShopping} type="button" onClick={() => setCartOpen(false)}>Keep Shopping</button>
      </aside>
    </div>}
  </>;
}
