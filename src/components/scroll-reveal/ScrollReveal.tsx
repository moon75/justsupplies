"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Fades/slides page sections in as they scroll into view (site-wide).
const SELECTOR = "main section, main h1, footer > *";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -60px 0px", threshold: 0.05 });

    document.querySelectorAll<HTMLElement>(SELECTOR).forEach(el => {
      if (el.classList.contains("is-revealed") || el.closest(".reveal:not(:scope)")) return;
      el.classList.add("reveal");
      // Stagger cards inside grids/rows so they cascade in.
      el.querySelectorAll<HTMLElement>('[class*="__grid"] > *, [class*="__track"] > *, [class*="__items"] > *').forEach(child => {
        const siblings = child.parentElement ? Array.from(child.parentElement.children) : [];
        child.style.setProperty("--i", String(Math.min(siblings.indexOf(child), 8)));
        child.classList.add("reveal-item");
      });
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
