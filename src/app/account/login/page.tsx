import type { Metadata } from "next";
import TextPage from "@/components/text-page/TextPage";
import styles from "@/components/text-page/TextPage.module.css";

export const metadata: Metadata = { title: "Login" };

// UI only until customer accounts are connected.
export default function Login() {
  return <main id="main-content" className="site-content">
    <TextPage title="Login">
      <form className={styles.form} action="#">
        <input type="email" name="email" placeholder="Email address" aria-label="Email address" required />
        <input type="password" name="password" placeholder="Password" aria-label="Password" required />
        <button type="submit">Sign in</button>
      </form>
      <p>Don&apos;t have an account? <a href="/account/login">Create account</a></p>
    </TextPage>
  </main>;
}
