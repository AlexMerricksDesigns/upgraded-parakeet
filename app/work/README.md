# Work pages

Navigation: **Home → `/work` Explorer → `/work/<category>` → `projects` | `journal` | `products`**

## URL pattern

| Layer | Example |
|-------|---------|
| Explorer | `/work` |
| Category hub | `/work/plotter` |
| Project | `/work/plotter/projects/plotted-heads` |
| Journal (in thread) | `/work/crypto/journal/crypto-art-value-paradigm` |
| Product (in thread) | `/work/plotter/products/postcards` |

Legacy flat URLs (`/work/<slug>`, `/journal/<slug>`, `/shop/<slug>`) redirect via `next.config.mjs` when mapped in `lib/work-redirects.js`.

## Files here

| Path | Role |
|------|------|
| `page.jsx` | Work Explorer — all copy and layout (search `COPY:` / `LAYOUT:`) |
| `categories.js` | Category registry (slugs, thread sections, nav) |
| `category-page.jsx` | Shared category homepage layout |
| `manifest.json` | Project metadata (titles, images, summaries) |
| `categories-data.js` | Category registry — which slugs belong to each thread |
| `registry.js` | Prose bodies, galleries, downloads |
| `bodies/` | Prose block modules for dynamic project pages |
| `<category>/page.jsx` | Category homepages |
| `<category>/projects/<slug>/page.jsx` | Custom project pages (e.g. plotted-heads) |
| `<category>/products/<slug>/page.jsx` | Product pages filed under a category |
| `[category]/projects/[slug]/page.jsx` | Dynamic projects from registry |
| `[category]/journal/[slug]/page.jsx` | Journal posts filed under a category |

## Assets

Binary files: **`public/work/<slug>/`** or **`public/work/<category>/`**

```js
import { workAsset } from "@/lib/assets";
workAsset("plotted-heads", "plotter-drawings001.jpg");
```

Path helpers: **`lib/work-paths.js`** (`categoryPath`, `projectPath`, `journalPath`, `productPath`).

## Work Explorer chronicle (`/work`)

The chronicle is a **spine timeline** on desktop (25% | 50% | 25% shell; each item is a coordinated slot: card left or right, directional branch + year badge on the center spine). Cards use a fixed **3:2** landscape frame with the image or gradient as a **background behind** overlaid title/summary (`background-size: cover`; gradient placeholder when no image). Brickwork overlap is tuned with `--work-timeline-overlap`; when a column repeats (index ≥ 2), `--work-timeline-column-gap` adds separation so same-column entries do not look stacked. Mobile layout is provisional. It lists every **threaded** page — projects, journal posts, and shop products registered in `categories-data.js` — resolved from `manifest.json`, `journal/manifest.json`, and `shop/manifest.json` via `getExplorerChronicleItems()` in `categories.js`. **Category filter pills** still narrow `filteredChronicle` before it reaches `WorkTimeline` (`components/work/work-timeline.jsx`).

**Category hub pages** (`/work/plotter`, `/work/crypto`, etc.) are **not** in the chronicle; they appear only as filter pills and category homepages.

Shared site images: **`public/assets/`** — see `app/assets/README.md`.
