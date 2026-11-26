import styles from "./CollabsPage.module.css";

const postTips = [
  ["YouTube", "Video descriptions, Channel bio, Posts (these are the static images you sometimes see in your feed from channels that you've subscribed to)"],
  ["Facebook", "Nice and simple. You can put your links on posts, comments, stories, wherever. Only be cautious around the bladed tools that we sell, such as knives and axes - Facebook bots sometimes take issue with this."],
  ["Instagram Stories and Profile Bios", "Instagram doesn't allow functioning links on posts and reels - links only work on IG stories. You can add your link to your profile bio, so be sure to round off with 'Link in Bio'."],
];

const gallery = ["/products/cooking-set.webp", "/products/candle-lantern.webp", "/products/kindling.webp", "/products/poncho.webp"];

export default function CollabsPage() {
  return <>
    <section className={styles.content}>
      <h1 className={styles.pageTitle}>Collabs</h1>
      <h2 className={styles.hero}>We&apos;re looking for trusted voices, exciting creators and those who simply love the outdoors...</h2>
      <p>Our new Partner Programme is a chance for community-engaging folk to earn something back for spreading the word about JustSupplies.</p>

      <h2 className={styles.heading}>Earn Commission via Affiliate Links:</h2>
      <p>If you&apos;ve been accepted into the Partner Programme, you will receive a personalised <strong><em>affiliate link</em></strong> that is unique to you. If a new customer clicks your link and makes their first JustSupplies purchase within 30 days, you will earn 10% commission on their entire sale!</p>
      <p>Keep reading for tips on where to include your link.</p>

      <h2 className={styles.heading}>Content Guide - What do I have to do?</h2>
      <p><strong>No Hard-Selling -</strong> If you choose to push a certain product, please refrain from labelling your video &apos;🔥🔥 THIS IS THE BEST TENT EVER!!! 🔥🔥&apos;, or something equally exaggerated. <strong>Keep it down-to-earth.</strong></p>
      <p><strong>Minimal AI-generated content -</strong> Posts which consist largely of AI-generated content will not be supported. Whilst we keep AI-generated material out of our own social media content, we understand that some of you may rely on it for certain tasks.</p>

      <h2 className={styles.heading}>Here&apos;s a few suggestions on where to post this link:</h2>
      <ul className={styles.list}>
        {postTips.map(([title, text]) => <li key={title}><strong>{title} -</strong> {text}</li>)}
        <li><strong>TikTok</strong> treats links very strangely. Sometimes it will delete any link that takes you away from TikTok itself. It&apos;s similar to Instagram in that it mainly accepts links in your bio and on your story.</li>
      </ul>

      <h2 className={styles.heading}>The JustSupplies Partner Program is a great opportunity for:</h2>
      <ul className={styles.list}>
        <li><strong>Content Creators</strong> of all kinds; especially those growing their following</li>
        <li><strong>Camping and hiking enthusiasts</strong> who post casually, but are trusted in their recommendations</li>
      </ul>

      <h2 className={styles.heading}>Application requirements:</h2>
      <ul className={styles.list}>
        <li><strong>Must be UK-based due to our current shipping arrangements.</strong></li>
        <li>Have an outdoors-related presence on at least 1 social media platform. We don&apos;t mind if its your main, personal account, as long you regularly post relevant content of your own.</li>
        <li>Must be over 18.</li>
      </ul>
      <p>You have an opportunity to explain what makes you a suitable JustSupplies affiliate in your application. We look forward to working with you - apply below!</p>
    </section>

    <section className={styles.signup}>
      <h2 className={styles.signupTitle}>Sign up today!</h2>
      <a className={styles.apply} href="#">Apply now</a>
      <p className={styles.member}>Already a member?<br /><a href="/account/login">Log in</a></p>
      <div className={styles.gallery}>
        {/* eslint-disable-next-line @next/next/no-img-element -- local placeholders */}
        {gallery.map(src => <img key={src} src={src} alt="" loading="lazy" decoding="async" />)}
      </div>
      <h2 className={styles.partner}>Partnership opportunities</h2>
    </section>
  </>;
}
