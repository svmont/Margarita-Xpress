# Margarita Xpress

Marketing website for **Margarita Xpress** — commercial frozen drink &amp; margarita
machine **rentals, leasing, and sales** for the **greater Houston area**.

This is **Phase 1: the marketing site**. It is a fast, dependency-free static
website (plain HTML/CSS/JS, no build step) designed so the **AI chatbot** and
**online booking/purchasing** can be added cleanly in Phase 2.

> Note: The content (machines, prices, phone, email, testimonials, stats) is
> realistic **placeholder** data. Replace it with real details before launch —
> see [Editing content](#editing-content) below.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero, services, how it works, featured machines, testimonials |
| `machines.html` | Full machine catalog with specs &amp; pricing |
| `pricing.html` | Event rental packages, commercial leasing tiers, sales, FAQ |
| `about.html` | Story, values, service-area cities |
| `contact.html` | Quote / booking request form + contact details |

Shared assets: `css/styles.css`, `js/main.js`, `assets/` (logo + favicon).

## Run locally

It's static — just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Any static host works. Once the business close completes and you control the
domain, point `margaritaxpress.com` at whichever you choose:

- **Netlify / Vercel / Cloudflare Pages** — drag-and-drop the folder or connect this repo.
- **GitHub Pages** — enable Pages on this repo's branch; the site serves from the root.

No build command is needed; the output directory is the repo root.

## Editing content

Everything is plain HTML, so edits are straightforward:

- **Phone / email** — search for `(832) 555-0199` and `hello@margaritaxpress.com` and replace everywhere.
- **Machines &amp; prices** — edit the `<article class="machine">` cards in `machines.html` / `index.html` and the `.plan` cards in `pricing.html`.
- **Service-area cities** — edit the cards under "Proudly serving Greater Houston" in `about.html`.
- **Testimonials / stats** — edit `.quote-card` and `.stat` blocks in `index.html` / `about.html`.
- **Logo / colors** — `assets/logo.svg` and the CSS variables at the top of `css/styles.css`.
- **Real machine photos** — swap the inline `<svg>` illustrations inside `.machine-figure` for `<img>` tags.

## Phase 2 — wiring up the interactive features

The UI is already built; these are the integration points:

### Chatbot ("Frosty")
`js/main.js` contains a front-end-only FAQ assistant. The function
`botReply(q)` returns canned answers by keyword. To make it a real AI bot,
replace `botReply` with a `fetch()` call to a backend endpoint that proxies the
**Claude API** (keep the API key server-side — never in the browser). The chat
UI, message rendering, and quick-replies stay as-is.

### Booking &amp; purchasing
The "Reserve" buttons and the contact form currently capture leads. To accept
real bookings/payments:

1. **Form delivery** — the contact form posts to a `https://formspree.io/f/your-form-id`
   placeholder. Create a free Formspree (or similar) form and drop in your real
   endpoint, or point it at your own serverless function. (The form also shows
   an on-page success message via `js/main.js`.)
2. **Payments / checkout** — add **Stripe** or **Square** checkout for deposits
   and purchases, plus a calendar/availability check for booking dates.

## License / notice

© Margarita Xpress. Must be 21+ to purchase or serve alcoholic beverages.
Drink responsibly.
