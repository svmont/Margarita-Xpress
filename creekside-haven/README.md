# Creekside Haven — apartment marketing site

Marketing website for **Creekside Haven**, a new-construction apartment community in
**Montgomery, Texas**. The site's job is leasing: get a visitor to a tour request or an
application in as few clicks as possible, while presenting the property professionally.

Positioning it leads with: **brand-new construction**, a **Montgomery ISD** address,
**value** for the money, and **convenience** — the new H-E-B and Kroger Marketplace,
historic downtown Montgomery, and easy ingress/egress toward Conroe, The Woodlands and I-45.

It is a fast, dependency-free static site (plain HTML/CSS/JS, no build step, no frameworks),
living in this folder so it deploys independently of the Margarita Xpress site at the repo root.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero, why-here pillars, floor plan preview, amenities, neighborhood, gallery, leasing steps, FAQ |
| `floor-plans.html` | All six plans with schematics, specs, pricing, filter by bedroom count |
| `gallery.html` | Filterable gallery (interiors / amenities / community / neighborhood) with lightbox |
| `neighborhood.html` | Montgomery: shopping, schools, downtown, Lake Conroe, drive-time table |
| `contact.html` | Primary conversion page — tour request form, office info, hours, directions |
| `apply.html` | Application steps, what to bring, fees & deposits, resident selection, FAQ |

Shared assets: `css/site.css`, `js/site.js`, `assets/favicon.svg`, plus `robots.txt` and `sitemap.xml`.

## Run locally

```bash
cd creekside-haven
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Before this goes live — placeholder content to replace

Everything below is **placeholder** and must be confirmed with the owner/management company.
Each value appears in several files, so search-and-replace across the folder.

| What | Placeholder currently in the site | Where |
| --- | --- | --- |
| Street address | `500 Creekside Haven Way`, `Montgomery, TX 77356` | every page footer, `contact.html`, JSON-LD in `index.html`, `MAPS` link |
| Phone | `(936) 555-0148` / `tel:+19365550148` | header, footer, `contact.html`, `apply.html`, JSON-LD |
| Email | `leasing@creeksidehaven.com` | footer, `contact.html` |
| Domain | `https://www.creeksidehaven.com` | `<link rel="canonical">`, `og:url`, `robots.txt`, `sitemap.xml` |
| First move-ins | "spring 2026" | `index.html` hero, facts strip, FAQ |
| Starting rents | $1,145 / $1,275 / $1,395 / $1,575 / $1,695 / $1,995 | `floor-plans.html`, `index.html` plan cards |
| Plan names, sizes, room layouts | The Willow … The Bluffview, 562–1,428 sq ft | `floor-plans.html`, `index.html` |
| Fees & deposits | $50 application, $150 admin, $300 deposit, $300 pet fee + $25/mo | `apply.html` |
| Office hours | Mon–Fri 9–6, Sat 10–5, Sun by appointment | footer, `contact.html` |
| Drive times | 5 min H-E-B, 25 min The Woodlands, etc. | `index.html`, `neighborhood.html` |
| Amenity list | pool, fitness, dog park, garages, EV charging, etc. | `index.html`, `floor-plans.html` |
| Photography | illustrated placeholders (inline SVG) | `gallery.html`, `index.html` hero |

Two things worth double-checking with the source of truth rather than assuming:

- **School zoning.** The site says the community is in Montgomery ISD and that campus
  assignments are set by the district. Do not name specific campuses without confirming
  current zoning with Montgomery ISD.
- **Drive times and retail.** Verify the H-E-B and Kroger Marketplace locations and the
  posted drive times before launch; they are labeled "approximate" on the page.

## Replacing the illustrations with photography

Every image is an inline `<svg>` — there are no binary assets to manage. To drop in real photos:

1. Add the files to `assets/` (WebP or optimized JPEG, roughly 1600×1120 for gallery tiles).
2. In `gallery.html`, replace the `<svg>…</svg>` inside each `<button class="shot">` with
   `<img src="assets/your-photo.webp" alt="descriptive alt text" width="1600" height="1120" />`.
3. Do the same for the hero in `index.html` (`.hero-art`) and the three tiles in the home
   page gallery strip.
4. Remove the "Illustrations shown" note that follows those galleries.

The lightbox in `js/site.js` clones whatever element it finds inside the tile — swap the
`querySelector("svg")` call for `querySelector("img, svg")` when photos go in.

## Wiring up the forms

The tour request form in `contact.html` carries a `data-demo` attribute. While that attribute
is present, `js/site.js` intercepts the submit and shows an on-page confirmation instead of
sending anything. To go live:

1. Create a form endpoint (Formspree, Netlify Forms, or your own serverless function) — or
   better, an endpoint that pushes the lead straight into the property management system
   (Entrata, RealPage, Yardi, AppFolio) so leads land where leasing agents already work.
2. Set `action="https://your-endpoint"` and `method="post"` on the form.
3. Delete the `data-demo` attribute so the browser submits normally.
4. Point the "Apply" / "Start My Application" buttons in `apply.html` and the plan cards at
   the real resident-portal application URL (they currently link to `contact.html`).

Add the leasing team to the endpoint's notification list, and confirm the consent checkbox
language with whoever handles your TCPA/marketing compliance before turning on SMS follow-up.

## Fair housing

This is housing advertising, so the copy is written to describe **the property**, not the
people expected to live there. Keep it that way when editing: no language that signals a
preference for or against families, ages, nationalities, religions, or any other protected
class. The Equal Housing Opportunity statement in the footer and the resident-selection
section on `apply.html` should stay on every page they appear on.

## Deploy

The repository already publishes to GitHub Pages from the repo root
(`.github/workflows/deploy-pages.yml`). Once this folder is merged into the deployed branch,
the site is served at `/creekside-haven/`. For its own domain, point DNS at any static host
(Netlify, Vercel, Cloudflare Pages, S3 + CloudFront) with this folder as the publish
directory — there is no build command.

Before launch: update `robots.txt` and `sitemap.xml` with the real domain, add the property to
Google Business Profile and the ILS listings (Apartments.com, Zillow, etc.), and add analytics
plus call tracking if leasing wants attribution per source.

## Regenerating the pages

The HTML in this folder is ordinary, hand-editable HTML — edit it directly. It was first
generated by a small script that shared one header/footer across the pages; that script is
not required to maintain the site and is not checked in. If you make a change that touches
the header, footer or nav, remember it appears in all six files.
