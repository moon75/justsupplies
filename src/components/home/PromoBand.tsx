import styles from "./Home.module.css";

const perks = [
  ["🚚", "Free UK delivery", "on orders over £80"],
  ["⚡", "Same-day dispatch", "order before 1pm, Mon–Fri"],
  ["↩", "Easy 14-day returns", "on unused items"],
  ["☎", "Real outdoor experts", "advice before you buy"],
];

export default function PromoBand() {
  return <section className={styles.band} aria-label="Why shop with JustSupplies">
    <ul className={styles.perks}>
      {perks.map(([icon, title, text]) => <li key={title}>
        <span className={styles.perkIcon} aria-hidden="true">{icon}</span>
        <span><strong>{title}</strong><small>{text}</small></span>
      </li>)}
    </ul>
  </section>;
}
