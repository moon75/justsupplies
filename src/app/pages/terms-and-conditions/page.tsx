import type { Metadata } from "next";
import TextPage from "@/components/text-page/TextPage";

export const metadata: Metadata = { title: "Terms and Conditions" };

export default function Terms() {
  return <main id="main-content" className="site-content">
    <TextPage title="Terms and Conditions">
      {/* Placeholder: replace with the client's terms text. */}
      <p>Our full terms and conditions will be published here shortly. For any questions, please <a href="/pages/contact-us">contact us</a>.</p>
      <p>See also our <a href="/pages/returns">returns policy</a>.</p>
    </TextPage>
  </main>;
}
