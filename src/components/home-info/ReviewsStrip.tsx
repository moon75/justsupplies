"use client";

import { useRef } from "react";
import { reviews } from "./content";
import styles from "./HomeInfo.module.css";

const avatarColors = ["#b98a5e", "#5865b8", "#b5509a", "#4f93a8", "#7a9a52"];

function Avatar({ color }: { color: string }) {
  return <svg className={styles.avatar} viewBox="0 0 40 40" aria-hidden="true">
    <circle cx="20" cy="20" r="20" fill={color} />
    <circle cx="20" cy="15" r="7" fill="#fff" fillOpacity=".75" />
    <path d="M7 34a13 11 0 0 1 26 0 19 19 0 0 1-26 0Z" fill="#fff" fillOpacity=".75" />
  </svg>;
}

function EbayMark() {
  return <span className={styles.ebay} aria-label="eBay"><span style={{ color: "#e53238" }}>e</span><span style={{ color: "#0064d2" }}>b</span><span style={{ color: "#f5af02" }}>a</span><span style={{ color: "#86b817" }}>y</span></span>;
}

function Badges() {
  return <span className={styles.badges} aria-hidden="true">
    <svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#47b04b" /><path d="M10 5v10M5 10h10" stroke="#fff" strokeWidth="2.6" /></svg>
    <svg viewBox="0 0 20 20"><path fill="#3a83f1" d="m10 0 2.4 1.8 3 .1.9 2.9 2.4 1.8-1 2.8 1 2.9-2.4 1.7-.9 2.9-3 .1L10 20l-2.4-1.8-3-.1-.9-2.9-2.4-1.7 1-2.9-1-2.8 2.4-1.8.9-2.9 3-.1Z" /><path d="m6 10.2 2.7 2.6L14 7.6" fill="none" stroke="#fff" strokeWidth="2" /></svg>
  </span>;
}

export default function ReviewsStrip() {
  const railRef = useRef<HTMLDivElement>(null);
  const next = () => {
    const rail = railRef.current;
    if (!rail) return;
    const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
    rail.scrollTo({ left: atEnd ? 0 : rail.scrollLeft + rail.clientWidth * 0.8, behavior: "smooth" });
  };

  return <section className={styles.reviews} aria-label="Customer reviews">
    <div className={styles.summary}>
      <p className={styles.excellent}>EXCELLENT</p>
      <p className={styles.stars} aria-label="5 out of 5 stars">★★★★★</p>
      <p className={styles.based}>Based on <u>2,439 reviews</u></p>
      <p className={styles.source}>
        <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="#1aa05e" /><path d="m5.5 10.3 3 2.9 6-6" fill="none" stroke="#fff" strokeWidth="2.4" /></svg>
        Trustindex
      </p>
    </div>
    <div className={styles.railWrap}>
      <div className={styles.reviewRail} ref={railRef}>
        {reviews.map((review, index) => <article className={styles.review} key={index}>
          <div className={styles.reviewHead}>
            <Avatar color={avatarColors[index % avatarColors.length]} />
            <div className={styles.reviewMeta}><p className={styles.reviewName}>{review.name}</p><p className={styles.reviewDate}>{review.date}</p></div>
            <EbayMark />
          </div>
          <Badges />
          <p className={styles.reviewText}>{review.text}</p>
        </article>)}
      </div>
      <button type="button" className={styles.nextButton} onClick={next} aria-label="Next reviews">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
      </button>
    </div>
  </section>;
}
