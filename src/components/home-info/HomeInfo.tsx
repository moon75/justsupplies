import { brands, promises, reviews } from "./content";
import styles from "./HomeInfo.module.css";

const icons = {
  truck: <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7zM7 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM1 8h5M0 11h5" />,
  tent: <path d="M12 3 2 20h20L12 3Zm0 7 4 10H8l4-10ZM10 3l2 3 2-3" />,
  stars: <path d="m12 2 1.2 2.5 2.8.4-2 2 .5 2.7L12 8.3 9.5 9.6l.5-2.7-2-2 2.8-.4L12 2Zm-6 10 1.2 2.5 2.8.4-2 2 .5 2.7L6 18.3l-2.5 1.3.5-2.7-2-2 2.8-.4L6 12Zm12 0 1.2 2.5 2.8.4-2 2 .5 2.7-2.5-1.3-2.5 1.3.5-2.7-2-2 2.8-.4L18 12Z" />,
};

function Eyebrow({ children }: { children: string }) {
  return <p className={styles.eyebrow}><span aria-hidden="true" />{children}</p>;
}

export default function HomeInfo() {
  return <>
    <section className={styles.intro}>
      <h2 className={styles.introTitle}>Camping Equipment and Outdoor Gear from Wood To Water</h2>
      <p>We are an online retailer specialising in outdoor, camping and bushcraft products. Our experienced team have handpicked our product range to offer you the best products available backed by our exceptional product knowledge and customer services.</p>
      <p>All our orders are dispatched from our fully stocked warehouse based in Fleet, Hampshire using fast shipping and dispatch. This means you spend less time indoors waiting for your order and more time out under canvas.</p>
    </section>

    <section className={styles.promise} aria-labelledby="promise-title">
      <Eyebrow>BEST QUALITY GUARANTEED</Eyebrow>
      <h2 id="promise-title" className={styles.heading}>OUR PROMISE</h2>
      <div className={styles.promiseGrid}>
        {promises.map(item => <div className={styles.promiseItem} key={item.title}>
          <span className={styles.icon}><svg viewBox="0 0 24 24" aria-hidden="true" fill={item.icon === "truck" ? "none" : "currentColor"} stroke={item.icon === "truck" ? "currentColor" : "none"} strokeWidth="2">{icons[item.icon]}</svg></span>
          <div>
            <h3 className={styles.promiseTitle}>{item.title}</h3>
            <p className={styles.promiseText}>{item.text}{"strong" in item && <strong>{item.strong}</strong>}</p>
          </div>
        </div>)}
      </div>
    </section>

    <section className={styles.reviews} aria-label="Customer reviews">
      <div className={styles.summary}>
        <p className={styles.excellent}>EXCELLENT</p>
        <p className={styles.stars} aria-label="5 out of 5 stars">★★★★★</p>
        <p className={styles.based}>Based on <u>2,439 reviews</u></p>
        <p className={styles.source}>Trustindex</p>
      </div>
      <div className={styles.reviewRail}>
        {reviews.map((review, index) => <article className={styles.review} key={index}>
          <div className={styles.reviewHead}>
            <span className={styles.avatar} aria-hidden="true" />
            <div><p className={styles.reviewName}>{review.name}</p><p className={styles.reviewDate}>{review.date}</p></div>
          </div>
          <p className={styles.reviewText}>{review.text}</p>
        </article>)}
      </div>
    </section>

    <section className={styles.brands} aria-labelledby="brands-title">
      <h2 id="brands-title" className={styles.heading}>OUR TRUSTED BRANDS</h2>
      <ul className={styles.brandGrid}>
        {brands.map(brand => <li key={brand}><a className={styles.brand} href={`/collections/${brand.toLowerCase().replace(/\s+/g, "-")}`}>{brand}</a></li>)}
      </ul>
    </section>
  </>;
}
