# Merit Living Companies — Website Hand-off Notes

Everything needed to rebuild this homepage in Wix (or hand to a designer).

- **Live preview:** the design mockup (open in a browser): `meritlc/index.html`
- **Mockup source:** `meritlc/index.html` — a self-contained, single HTML file (all CSS, JS, images inlined). Nothing external to load.
- **Brand assets:** `meritlc/assets/` (see below).

---

## Page flow (one-page site)

Build this as a **one-page website**. The main menu links are **Anchors** that
**smooth-scroll to sections on the same page**, not separate pages. Keep the
**header frozen (sticky)** so the menu is always visible.

Menu item → where it jumps:

| Menu item | Anchor / section |
| --- | --- |
| Home / logo | top (hero) |
| Strategy | Investment Strategy section |
| Approach | Data-Driven Approach section |
| Track Record | the $9B+ band |
| Our Story | Our Story section |
| Leadership | Leadership section |
| Contact | Contact section |

The CTA buttons (**"Partner with Merit"**, **"Investor inquiries"**) also anchor to **Contact**.

**Full section order (top to bottom):**
Header → Hero → Track Record ($9B+) → Investment Strategy (dual-bucket) →
Disciplined Risk → Data-Driven Approach → Why the Sunbelt → Why Merit →
Our Story → Leadership + Advisory Board → Core Values → Contact → Footer.

(Risk, Why the Sunbelt, Why Merit, and Core Values are not in the menu — they
just scroll through in order.)

### Doing it in the Wix Editor
1. Build the homepage as one long page, each block a **Section**.
2. **Add → Anchor**, drag to the top of each section, name it ("Strategy," "Contact," …).
3. **Manage Menu** → each item → **Link → Anchor** → pick it under *"Where on the page?"*.
4. Header → **Header Scroll Settings → "Freezes"** (sticky). Wix smooth-scrolls automatically.

Wix help: [Menu with Anchors for One-Page Sites](https://support.wix.com/en/article/wix-editor-creating-a-site-menu-with-anchors-and-sections-for-one-page-sites) ·
[One-Page Site](https://support.wix.com/en/article/wix-editor-creating-a-one-page-site) ·
[Freeze the Header](https://support.wix.com/en/article/wix-editor-fixing-your-menu-to-the-top-of-your-site)

---

## Brand

**Colors**

| Role | Hex |
| --- | --- |
| Navy (primary) | `#16295C` |
| Deep navy (dark sections) | `#0E1A3A` |
| Gold (accent / logo) | `#C7A24A` |
| Deep gold (small text on light) | `#9C7628` |
| Ivory (page background) | `#FAF8F2` |
| Sand (panels) | `#F0ECE0` |
| Ink (body text) | `#16203C` |

**Type**
- Headlines: a classical **serif** (Palatino / Georgia style — the mockup uses
  Iowan Old Style / Palatino Linotype / Palatino / Book Antiqua / Georgia).
- Body & labels: a clean humanist **sans-serif**; small labels are UPPERCASE with wide letter-spacing.

**Logo files** (`meritlc/assets/`)
- `logo-merit-navy.png` — navy wordmark + gold mountain. Use on **light** backgrounds (header, footer).
- `logo-merit-white.png` — white wordmark + gold mountain. Use on **dark/navy** backgrounds.
- `mountain-gold.png` — the gold three-peak mark alone (good for a **favicon** or compact spaces).

**Images** (`meritlc/assets/`)
- `hero-building.jpg` — navy-toned apartment building for the hero (from the company deck).

---

## Content notes

- Copy is drawn from the company overview deck and the current meritlc.com wording,
  edited for an **investor-first, evergreen** tone.
- **Track-record figures** ($9B+ combined, $3B+ / $4B+ / $1B / $1B) represent the
  **principals' combined prior-firm experience** (Camden, PNC, Wells Fargo, J.P. Morgan) —
  keep the footnote clarifying they are not Merit's own results.
- Footer disclaimer (keep): *"This website is for informational purposes only and
  does not constitute an offer to sell or a solicitation of an offer to buy any securities."*
- Contact: 4601 Washington Ave, Suite 220, Houston, TX 77007 · investorrelations@meritlc.com

## Wix apps to re-add after import
Bookings ("Book a call"), Forms & Payments (contact form), and Invoices are separate
Wix apps — re-add them in the Wix Editor after the design is in place.
