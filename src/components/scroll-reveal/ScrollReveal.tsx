"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Fades/slides page sections in as they scroll into view (site-wide).
const SELECTOR = "main section, main h1, footer > *";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
