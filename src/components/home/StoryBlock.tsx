import styles from "./Home.module.css";

export default function StoryBlock({ image }: { image: string | null }) {
  return <section className={styles.story}>
    <div className={styles.storyMedia}>
      {/* eslint-disable-next-line @next/next/no-img-element -- remote client images */}
      {image && <img src={`${image}${image.includes("?") ? "&" : "?"}width=900`} alt="" loading="lazy" />}
    </div>
    <div className={styles.storyText}>
      <p className={styles.kicker}>Why JustSupplies</p>
      <h2 className={styles.blockTitle}>Tested outdoors. Packed with care.</h2>
      <p>We&apos;re a small team of campers, hikers and bushcrafters. Everything we sell is gear we&apos;d happily take on our own trips — and if you&apos;re not sure what you need, just ask. We&apos;ll point you to the right kit, not the most expensive one.</p>
      <ul className={styles.ticks}>
        <li>Hand-picked range from 80+ outdoor brands</li>
        <li>Fully stocked UK warehouse</li>
        <li>Friendly phone and email support</li>
      </ul>
      <a className={styles.cta} href="/pages/about"><span>Our story</span><span aria-hidden="true">→</span></a>
    </div>
  </section>;
}
