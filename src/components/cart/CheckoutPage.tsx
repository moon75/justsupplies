"use client";

import type React from "react";
import { useState, type FormEvent } from "react";
import { FREE_SHIPPING, money, useCart } from "./CartContext";
import styles from "./Checkout.module.css";

const methods = [
  { id: "standard", label: "Standard UK Delivery", detail: "1 to 2 business days", price: 4.99 },
  { id: "express", label: "Next Day Delivery", detail: "Order before 1pm, Mon–Fri", price: 7.99 },
];

function Summary({ shipping, total, open }: { shipping: number | null; total: number; open?: boolean }) {
  const { items, subtotal } = useCart();
  const [code, setCode] = useState("");
  const [codeMsg, setCodeMsg] = useState("");
  return <div className={`${styles.summaryInner} ${open === false ? styles.collapsed : ""}`}>
    <ul className={styles.items}>
      {items.map(item => <li key={item.key} className={styles.item}>
        <div className={styles.thumb}>
          {/* eslint-disable-next-line @next/next/no-img-element -- remote client images */}
          <img src={item.image} alt="" /><span>{item.qty}</span>
        </div>
        <div className={styles.itemInfo}><p>{item.title}</p>{item.variant && <small>{item.variant}</small>}</div>
        <p className={styles.itemPrice}>{money(item.price * item.qty)}</p>
      </li>)}
    </ul>
    <div className={styles.discount}>
      <input placeholder="Discount code or gift card" aria-label="Discount code or gift card" value={code} onChange={e => { setCode(e.target.value); setCodeMsg(""); }} />
      <button type="button" disabled={!code.trim()} onClick={() => setCodeMsg("Enter a valid discount code or gift card")}>Apply</button>
    </div>
    {codeMsg && <p className={styles.error}>{codeMsg}</p>}
    <dl className={styles.totals}>
      <div><dt>Subtotal · {items.reduce((n, i) => n + i.qty, 0)} items</dt><dd>{money(subtotal)}</dd></div>
      <div><dt>Shipping</dt><dd>{shipping === null ? <span className={styles.muted}>Enter shipping address</span> : shipping ? money(shipping) : "FREE"}</dd></div>
      <div className={styles.total}><dt>Total</dt><dd key={total} className={styles.bump}><small>GBP</small> {money(total)}</dd></div>
      <p className={styles.muted}>Including {money(total / 6)} in taxes</p>
    </dl>
  </div>;
}

// Design only: no payment is taken. Connect a payment provider before launch.
export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [method, setMethod] = useState("standard");
  const [billingSame, setBillingSame] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [orderNo, setOrderNo] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const base = methods.find(m => m.id === method)!.price;
  const shippingCost = (id: string, price: number) => (id === "standard" && subtotal >= FREE_SHIPPING ? 0 : price);
  const shipping = shippingCost(method, base);
  const total = subtotal + shipping;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setOrderNo(`#JS${Date.now().toString().slice(-5)}`);
    clear();
  };

  if (orderNo) return <div className={styles.shell} data-checkout>
    <div className={styles.thanks}>
      <div className={styles.confetti} aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ "--i": i } as React.CSSProperties} />)}</div>
      <div className={styles.check} aria-hidden="true">✓</div>
      <p className={styles.muted}>Confirmation {orderNo}</p>
      <h1>Thank you!</h1>
      <div className={styles.box}><h2>Your order is confirmed</h2><p>You&apos;ll receive a confirmation email{email ? <> at <strong>{email}</strong></> : ""} with your order number shortly.</p></div>
      <a className={styles.pay} href="/collections/all">Continue shopping</a>
    </div>
  </div>;

  if (!items.length) return <div className={styles.shell} data-checkout>
    <div className={styles.thanks}><h1>Your cart is empty</h1><a className={styles.pay} href="/collections/all">Continue shopping</a></div>
  </div>;

  return <div className={styles.shell} data-checkout>
    <button type="button" className={styles.summaryToggle} onClick={() => setShowSummary(s => !s)}>
      <span>{showSummary ? "Hide" : "Show"} order summary {showSummary ? "▴" : "▾"}</span><strong>{money(total)}</strong>
    </button>
    <div className={styles.mobileSummary}>{showSummary && <Summary shipping={shipping} total={total} />}</div>

    <div className={styles.columns}>
      <div className={styles.main}>
        <div className={styles.mainInner}>
          <nav className={styles.crumbs} aria-label="Checkout steps"><a href="/cart">Cart</a><span>›</span><strong>Information</strong><span>›</span><span>Shipping</span><span>›</span><span>Payment</span></nav>

          <div className={styles.express}>
            <p>Express checkout</p>
            <div className={styles.expressBtns}>
              <button type="button" className={styles.shopPay}>shop<b>Pay</b></button>
              <button type="button" className={styles.paypal}>PayPal</button>
              <button type="button" className={styles.gpay}>G Pay</button>
            </div>
          </div>
          <div className={styles.or}><span>OR</span></div>

          <form onSubmit={submit}>
            <section className={styles.section}>
              <div className={styles.sectionHead}><h2>Contact</h2><a href="/account/login">Log in</a></div>
              <input className={styles.input} type="email" placeholder="Email" aria-label="Email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} />
              <label className={styles.checkbox}><input type="checkbox" defaultChecked /> Email me with news and offers</label>
            </section>

            <section className={styles.section}>
              <h2>Delivery</h2>
              <div className={styles.floating}><label>Country/Region</label><select className={styles.input} defaultValue="GB" aria-label="Country/Region"><option value="GB">United Kingdom</option></select></div>
              <div className={styles.row2}>
                <input className={styles.input} placeholder="First name (optional)" aria-label="First name" autoComplete="given-name" />
                <input className={styles.input} placeholder="Last name" aria-label="Last name" autoComplete="family-name" required />
              </div>
              <input className={styles.input} placeholder="Company (optional)" aria-label="Company" autoComplete="organization" />
              <input className={styles.input} placeholder="Address" aria-label="Address" autoComplete="address-line1" required />
              <input className={styles.input} placeholder="Apartment, suite, etc. (optional)" aria-label="Apartment, suite, etc." autoComplete="address-line2" />
              <div className={styles.row2}>
                <input className={styles.input} placeholder="City" aria-label="City" autoComplete="address-level2" required />
                <input className={styles.input} placeholder="Postcode" aria-label="Postcode" autoComplete="postal-code" required />
              </div>
              <input className={styles.input} type="tel" placeholder="Phone (optional)" aria-label="Phone" autoComplete="tel" />
              <label className={styles.checkbox}><input type="checkbox" /> Save this information for next time</label>
            </section>

            <section className={styles.section}>
              <h2>Shipping method</h2>
              <div className={styles.radioGroup}>
                {methods.map(m => <label key={m.id} className={`${styles.radio} ${method === m.id ? styles.radioActive : ""}`}>
                  <input type="radio" name="shipping" checked={method === m.id} onChange={() => setMethod(m.id)} />
                  <span className={styles.radioText}>{m.label}<small>{m.detail}</small></span>
                  <strong>{shippingCost(m.id, m.price) ? money(m.price) : "FREE"}</strong>
                </label>)}
              </div>
            </section>

            <section className={styles.section}>
              <h2>Payment</h2>
              <p className={styles.muted}>All transactions are secure and encrypted.</p>
              <div className={styles.radioGroup}>
                <div className={`${styles.radio} ${styles.radioActive}`}>
                  <input type="radio" checked readOnly aria-label="Credit card" />
                  <span className={styles.radioText}>Credit card</span>
                  <span className={styles.cards}><i>VISA</i><i>MC</i><i>AMEX</i></span>
                </div>
                <div className={styles.cardFields}>
                  {/* Preview only: these fields are not named, stored or submitted. */}
                  <input className={styles.input} placeholder="Card number" aria-label="Card number" inputMode="numeric" autoComplete="off" />
                  <div className={styles.row2}>
                    <input className={styles.input} placeholder="Expiration date (MM / YY)" aria-label="Expiration date" autoComplete="off" />
                    <input className={styles.input} placeholder="Security code" aria-label="Security code" autoComplete="off" />
                  </div>
                  <input className={styles.input} placeholder="Name on card" aria-label="Name on card" autoComplete="off" />
                </div>
              </div>
              <p className={styles.notice}>Preview only — payments are not connected yet and no card will be charged.</p>
            </section>

            <section className={styles.section}>
              <h2>Billing address</h2>
              <div className={styles.radioGroup}>
                <label className={`${styles.radio} ${billingSame ? styles.radioActive : ""}`}><input type="radio" name="billing" checked={billingSame} onChange={() => setBillingSame(true)} /><span className={styles.radioText}>Same as shipping address</span></label>
                <label className={`${styles.radio} ${!billingSame ? styles.radioActive : ""}`}><input type="radio" name="billing" checked={!billingSame} onChange={() => setBillingSame(false)} /><span className={styles.radioText}>Use a different billing address</span></label>
                {!billingSame && <div className={styles.cardFields}>
                  <div className={styles.row2}><input className={styles.input} placeholder="First name" aria-label="Billing first name" /><input className={styles.input} placeholder="Last name" aria-label="Billing last name" required /></div>
                  <input className={styles.input} placeholder="Address" aria-label="Billing address" required />
                  <div className={styles.row2}><input className={styles.input} placeholder="City" aria-label="Billing city" required /><input className={styles.input} placeholder="Postcode" aria-label="Billing postcode" required /></div>
                </div>}
              </div>
            </section>

            <button type="submit" className={styles.pay}>Pay now</button>
          </form>

          <footer className={styles.policies}>
            <a href="/pages/returns">Refund policy</a><a href="/pages/returns">Shipping</a><a href="/pages/terms-and-conditions">Privacy policy</a><a href="/pages/terms-and-conditions">Terms of service</a><a href="/pages/contact-us">Contact</a>
          </footer>
        </div>
      </div>

      <aside className={styles.side}><div className={styles.sideInner}><Summary shipping={shipping} total={total} /></div></aside>
    </div>
  </div>;
}
