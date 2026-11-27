# Payment integration handover

The site's cart and checkout UI are complete. Only the payment step is left for your gateway.

## Stack
- Next.js 16 (App Router), React 19, TypeScript, CSS Modules. Deployed on Vercel.
- No backend or database yet. Products are static JSON in `src/data/products.json`, 1,883 products.

## Cart (client side)
- State lives in `src/components/cart/CartContext.tsx` (`CartProvider` and the `useCart()` hook). It is saved in the browser's `localStorage` under the key `js-cart`.
- Cart line shape:
  ```ts
  type CartItem = {
    key: string;      // "<productHandle>:<variantId>"; variantId is empty for single-variant products
    handle: string;   // product handle; matches products.json
    title: string;
    variant?: string; // variant title, e.g. "Green"
    price: number;    // GBP, tax included
    image: string;
    qty: number;
  };
  ```
- Helpers available: `items`, `subtotal`, `count`, `add`, `setQty`, `remove`, `clear`.
- Shipping rules are placeholders in `CartContext.tsx` and `CheckoutPage.tsx`. Free over £80, otherwise £4.99 standard or £7.99 next day.

## Checkout
- Page: `/checkout`, component `src/components/cart/CheckoutPage.tsx`.
- It collects contact (email, phone), delivery address, shipping method and billing address (same as delivery or different).
- The card fields on the page are **visual placeholders only**. They are not named, stored or sent. Replace them with your gateway's hosted fields, iframe or redirect.
- The integration point is the `submit()` handler in `CheckoutPage.tsx`. It currently just shows a thank-you screen and clears the cart.

## What we need from your side
1. How the gateway is called: a redirect to a hosted payment page, embedded fields/iframe, or a server-to-server API.
2. The endpoint and auth method. Secret keys must stay server side; we can add a Next.js route handler such as `/api/checkout` to hold them.
3. The order payload format you expect. Our suggested starting point:
   ```json
   {
     "items": [{ "handle": "...", "variant": "...", "qty": 1, "price": 24.0 }],
     "subtotal": 24.0, "shipping": 4.99, "total": 28.99, "currency": "GBP",
     "shippingMethod": "standard",
     "contact": { "email": "...", "phone": "..." },
     "shippingAddress": { "firstName": "", "lastName": "", "address1": "", "address2": "", "city": "", "postcode": "", "country": "GB" },
     "billingAddress": { "...": "same shape, or null if same as shipping" }
   }
   ```
4. The success and failure flow: the return/callback URLs and any webhook for payment confirmation.
5. Whether **prices and stock must be validated on the server** against your system before charging. Recommended: never trust client prices.
6. Where orders should go after payment, for example your order system, an email, or a database.
7. Sandbox/test credentials to test with first. Keep them in Vercel environment variables, not in code or chat.
