import type { Metadata } from "next";
import TextPage from "@/components/text-page/TextPage";

export const metadata: Metadata = { title: "Returns" };

export default function Returns() {
  return <main id="main-content" className="site-content">
    <TextPage title="Returns">
      <p>All unused items can be returned <strong>within 14 days</strong> of delivery, excluding any food items or camping gas which cannot be returned.</p>
      <p>If you are returning an unused item, please ensure that the original packaging is intact and resealable, fit for resale. If an item has proven faulty over a short-term period of use, the original packaging is not required for return, though the item must be securely packaged and a reason <strong><em>must</em></strong> be provided.</p>
      <p>To keep this process as simple as possible, please include your reason on a note within the returned package. If you would prefer to provide the reason via email, be sure that your returned item has your original order number or contact information included within so that we can easily match the returned item to your email. Any items that are returned without a stated reason or contact information are likely to cause delays within our overall return process.</p>
      <p>If you are returning a faulty item, please be aware that it will undergo an inspection by our team to ascertain the fault before a refund can be issued. In most cases, we recommend contacting us first, and we will happily provide suggestions or solutions (such as replacement parts) towards the issue if you would prefer to keep the item. Should we inspect the item upon return and it proves not to be faulty, but it shows signs of use, we cannot provide a refund as it is not in a resalable condition.</p>
      <p>Items can be returned in exchange for store credit if agreed upon. Please note the awarded store credit will not cover any return postage fees.</p>
    </TextPage>
  </main>;
}
