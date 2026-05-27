# Editor map — what to edit vs what sync generates

**Rule:** Edit source files in `data/` and `content/` (bodies). Do **not** hand-edit files marked **GENERATED** (overwritten by `npm run content:sync`).

See [`OPERATIONS_CHECKLIST.md`](OPERATIONS_CHECKLIST.md) for acceptance tests after each change.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run content:sync` | CSV → manifests, catalog JSON, photography slug lists |
| `npm run content:validate` | CSV FK / slug / image path checks (warnings only for missing public files) |
| `npm run assets:ingest` | Resolve `source_path` → `public_path` in asset DB |
| `npm run catalog:import-csv` | Import `data/assets.csv` into SQLite |
| `npm run assets:optimize` | `public_originals/` → `public/` |
| `npm run dev` | Local preview |
| `npm run build` | Production build (runs `content:sync` first) |

## URL → source file

| Live URL | You edit | Sync generates |
|----------|----------|------------------|
| `/work` | [`app/work/work-hubs.js`](app/work/work-hubs.js) (spotlights only) | Chronicle from manifests |
| `/work/photography` | [`components/work/hub/photography/`](components/work/hub/photography/) | — |
| `/work/photography/highlights` | Highlights index (`app/work/(categories)/photography/highlights/page.jsx`) | Featured rows in [`data/photographs.csv`](data/photographs.csv) (`featured=true`) |
| `/work/photography/captured` | Full catalogue (`app/work/(categories)/photography/captured/page.jsx`) | `photography-manifest.json` |
| `/work/photography/archive` | Archive browse (`app/work/(categories)/photography/archive/page.jsx`) | Manifest + platform filter |
| `/work/photography/prints` | Prints info (`app/work/(categories)/photography/prints/page.jsx`) | Linked products in [`data/products.csv`](data/products.csv) |
| `/work/photography/writing` | Thread index (`app/work/(categories)/photography/writing/page.jsx`) | [`app/work/categories-data.base.js`](app/work/categories-data.base.js) journal slugs under photography |
| `/work/photography/series/<slug>` | [`data/series.csv`](data/series.csv), optional [`content/work/series/<slug>.js`](content/work/series/) | `photography-manifest.json`, `content/catalog/series.json` |
| `/work/photography/captured/<slug>` | [`data/photographs.csv`](data/photographs.csv), [`data/assets.csv`](data/assets.csv), optional [`content/overrides/photographs/<slug>.md`](content/overrides/photographs/) | `photography-manifest.json`, `content/catalog/photographs.json` |
| `/work/<cat>/projects/<slug>` | [`content/work/projects/<slug>.js`](content/work/projects/), [`app/work/manifest.json`](app/work/manifest.json) (until project CSV exists) | — |
| `/work/<cat>/journal/<slug>` | [`data/journal.csv`](data/journal.csv) or [`content/journal/posts/<slug>.js`](content/journal/posts/) | `app/journal/manifest.json` |
| `/work/<cat>/products/<slug>` | [`data/products.csv`](data/products.csv), [`data/product_items.csv`](data/product_items.csv) | `app/shop/manifest.json`, `content/catalog/products.json` |
| Visual layout (all captured pages) | [`components/work/layouts/photograph-layout.jsx`](components/work/layouts/photograph-layout.jsx) | — |

## CSS class namespaces (`work`)

- **`work-hub-*`** — Category hub pages (`work-hub-page`, hero, sections, grids, tiles) and generic category hubs via [`app/work/category-page.jsx`](app/work/category-page.jsx) (Plotter, Physical Objects & Systems, Reflections & Writing) and [`components/work/pages/plotter-hub.jsx`](components/work/pages/plotter-hub.jsx).
- **`work-detail-*`** — Series pages and individual photograph layouts in [`components/work/layouts/series-layout.jsx`](components/work/layouts/series-layout.jsx) and [`components/work/layouts/photograph-layout.jsx`](components/work/layouts/photograph-layout.jsx): `work-detail-section*`, `work-detail-grid`, `work-detail-essay-block`, `work-detail-related-strip`, wrapper `work-detail-page`.
- **Legacy:** The old `crypto-*` CSS prefixes are removed from stylesheets and JSX (journal slugs and URLs may still contain `crypto-art-*` — that’s the post slug, not a CSS prefix).

`/work/photography/gallery` redirects permanently to **`/work/photography/captured`**.

## Generated artifacts (read-only)

- [`app/work/photography-manifest.json`](app/work/photography-manifest.json)
- [`app/work/categories-data.generated.js`](app/work/categories-data.generated.js)
- [`content/catalog/photographs.json`](content/catalog/photographs.json)
- [`content/catalog/series.json`](content/catalog/series.json)
- [`content/catalog/products.json`](content/catalog/products.json)
- [`app/shop/manifest.json`](app/shop/manifest.json) — product rows from CSV; other fields preserved on first sync

## Bulk photography (136+ rows)

1. Add rows to [`data/photographs.csv`](data/photographs.csv) and [`data/assets.csv`](data/assets.csv).
2. `npm run content:sync`
3. `npm run assets:ingest` → `npm run assets:optimize`
4. Verify with [`OPERATIONS_CHECKLIST.md`](OPERATIONS_CHECKLIST.md).

Column reference: [`data/README.md`](data/README.md).
