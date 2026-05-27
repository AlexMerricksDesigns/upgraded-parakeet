# Work pages

Navigation: **Home → `/work` Explorer → `/work/<category>` → `projects` | `journal` | `products`**

**Adding content:** see [`ADDING.md`](ADDING.md).

## Four categories

| ID | Hub | Subsections |
|----|-----|-------------|
| `photography` | `/work/photography` | Captured · Published (NFTs) · Field Notes · Available Prints (`#prints`) |
| `plotter` | `/work/plotter` | Experiments · Finished Pieces · Process / Studio |
| `physical-objects` | `/work/physical-objects` | Living Systems · Prototypes · Installations |
| `reflections` | `/work/reflections` | Essays · Dissertations & Studio · Notes |

Tagline (explorer + hubs): *Observations through lens, code, and living systems.*

## URL pattern

| Layer | Example |
|-------|---------|
| Explorer | `/work` |
| Category hub | `/work/plotter` |
| Project | `/work/plotter/projects/plotted-heads` |
| Journal (in thread) | `/work/photography/journal/crypto-art-value-paradigm` |
| Product (in thread) | `/work/plotter/products/postcards` |

Asset paths use the nested `public/work/<category>/projects|products|journal/<slug>/` layout — see [`app/assets/README.md`](../assets/README.md).

## Route groups (disk only — not in URLs)

```
app/work/
  (explorer)/          → /work, /work/archive
  (categories)/        → /work/<category> hub pages (four categories)
  (thread)/            → /work/<category>/{projects|journal|products}/<slug>
  hub-primitives.jsx    → ThreadTile, ThreadSection, CategoryBreadcrumb
  category-page.jsx     → optional CategoryPage builder for simple hubs
  categories.js
  categories-data.js   → subsection registry
  manifest.json
  work-hubs.js
  work-tagline.js
```

| Path | Role |
|------|------|
| `(explorer)/page.jsx` | Work Explorer (4-card grid + timeline) |
| `(categories)/<cat>/page.jsx` | Category homepage |
| `(thread)/[category]/projects/[slug]/page.jsx` | Dynamic projects |
| `(thread)/[category]/journal/[slug]/page.jsx` | Journal in thread |
| `(thread)/[category]/products/[slug]/page.jsx` | Product shelves |
| `content/work/projects/` | Per-project copy |
| `components/work/pages/` | Plotter, photography, physical-objects, reflections hubs |

## Assets

Nested layout under `public_originals/work/` (mirrors URLs). Image paths may still use legacy folders (e.g. `/work/metalworking/...`) while page URLs use the new category IDs.

```js
import { categoryAsset, threadAsset } from "@/lib/assets";
threadAsset("plotter", "projects", "plotted-heads", "plotter-drawings001.jpg");
```

Path helpers: [`lib/work-paths.js`](../../lib/work-paths.js).

## Work Explorer chronicle

Lists every threaded page from `categories-data.js` via manifests (`getExplorerChronicleItems()` in `categories.js`). Category hub pages are **not** in the chronicle.
