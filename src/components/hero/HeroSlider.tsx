"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides } from "./slides";
import styles from "./HeroSlider.module.css";

const ROTATION_MS = 5000;
const SWIPE_DISTANCE = 40;

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const goTo = useCallback((index: number) => {
    setActive((index + heroSlides.length) % heroSlides.length);
  }, []);
  const previous = useCallback(() => setActive((index) => (index - 1 + heroSlides.length) % heroSlides.length), []);
  const next = useCallback(() => setActive((index) => (index + 1) % heroSlides.length), []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(next, ROTATION_MS);
    return () => window.clearTimeout(timer);
  }, [active, next, paused]);

  return (
    <section
      className={styles.slider}
      aria-label="Featured promotions"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") { event.preventDefault(); previous(); }
        if (event.key === "ArrowRight") { event.preventDefault(); next(); }
      }}
      onTouchStart={(event) => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
      onTouchEnd={(event) => {
        if (!touchStart.current) return;
        const dx = event.changedTouches[0].clientX - touchStart.current.x;
        const dy = event.changedTouches[0].clientY - touchStart.current.y;
        if (Math.abs(dx) >= SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? next : previous)();
        touchStart.current = null;
      }}
    >
      {heroSlides.map((slide, index) => (
        <div
          className={`${styles.slide} ${index === active ? styles.active : ""}`}
          key={slide.title}
          id={`hero-slide-${index + 1}`}
          aria-hidden={index !== active}
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${heroSlides.length}: ${slide.title}`}
        >
          <Image
            className={styles.image}
            src={slide.image}
            unoptimized={slide.image.startsWith("http")}
            alt=""
            fill
            sizes="100vw"
            preload={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            style={{ objectPosition: slide.position }}
          />
          <div className={styles.overlay} style={{ backgroundColor: slide.overlay }} />
          <div className={styles.content}>
            <div className={styles.copy}>
              <h1 className={styles.title}>{slide.title}</h1>
              <p className={styles.subtitle}>{slide.subtitle}</p>
            </div>
            <a className={styles.cta} href={slide.href} tabIndex={index === active ? 0 : -1}>
              <span>SHOP NOW</span>
              <svg className={styles.arrow} viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M22.707 11.293 15 3.586 13.586 5l6 6H2a1 1 0 0 0 0 2h17.586l-6 6L15 20.414l7.707-7.707a1 1 0 0 0 0-1.414Z" /></svg>
            </a>
          </div>
        </div>
      ))}

      <div className={styles.edgeControls}>
        <button type="button" onClick={previous} aria-label="Previous slide" className={styles.edgeButton}>Previous slide</button>
        <button type="button" onClick={next} aria-label="Next slide" className={styles.edgeButton}>Next slide</button>
      </div>
      <div className={styles.controls} aria-label="Choose a promotion">
        {heroSlides.map((slide, index) => (
          <button
            type="button"
            key={slide.title}
            className={`${styles.dot} ${active === index ? styles.current : ""}`}
            onClick={() => goTo(index)}
            aria-label={`Load slide ${index + 1}`}
            aria-current={active === index ? "true" : undefined}
            aria-controls={`hero-slide-${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
