import styles from "./Home.module.css";

export default function StoryBlock({ image, title, text }: { image: string | null; title: string; text: string }) {
  return <section className={styles.story}>
    <div className={styles.storyMedia}>
      {/* eslint-disable-next-line @next/next/no-img-element -- remote client images */}
      {image && <img src={`${image}${image.includes("?") ? "&" : "?"}width=900`} alt="" loading="lazy" />}
    </div>
    <div className={styles.storyText}>
      <p className={styles.kicker}>Why JustSupplies</p>
      <h2 className={styles.blockTitle}>{title}</h2>
      <p>{text}</p>
      <ul className={styles.ticks}>
        <li>Hand-picked range from 80+ outdoor brands</li>
        <li>Fully stocked UK warehouse</li>
        <li>Friendly phone and email support</li>
      </ul>
      <a className={styles.cta} href="/pages/about"><span>Our story</span><span aria-hidden="true">→</span></a>
    </div>
  </section>;
}
