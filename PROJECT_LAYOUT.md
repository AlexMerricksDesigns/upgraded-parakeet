# Repository layout (quick reference)

What lives at the repo root and whether you still need it.

| Path | Purpose | Keep? |
|------|---------|--------|
| **`app/`** | Next.js routes, page code, site copy (`site.js`), manifests (`work/`, `journal/`, `shop/`), shared `category-page.jsx`. | Yes — main site |
| **`app/assets/`** | Docs only: where static files go in `public/assets/`. | Yes |
| **`public_originals/`** | Full-size source images, GIFs, PDFs. Edit or add files here. | Yes |
| **`public/`** | Optimized static files served at URLs. Regenerate with `npm run assets:optimize`. | Yes — required by Next.js |
| **`components/`** | Reusable UI: header, footer, cards, prose, links. | Yes |
| **`lib/`** | Helpers: `assets.js` (URL builders), `link-kind.js`, `manifests.js`. | Yes |
| **`scripts/`** | Republish from cold-storage ingest, catalog build, MD→prose, tag fix. | Yes if you still ingest |
| **`. consolidating previous attempts content ingest folder/`** | Cold-storage backup / source MD and images for republish. | Optional — archive; not used at runtime |
| **`node_modules/`** | npm dependencies. | Yes (gitignored) |
| **`.next/`** | Build output. | Generated |
| **`.venv/`** | Python venv (if any script uses it). | Optional |
| **`.git/`** | Version control. | Yes |
| **`content/`** | *(removed)* — was manifests/prose; now under `app/`. | Gone |
| **`package.json`** | npm scripts (`dev`, `build`). | Yes |
| **`next.config.mjs`** | Next.js config. | Yes |
| **`eslint.config.mjs`** | Linting. | Yes |
| **`jsconfig.json`** | `@/*` path alias → repo root. | Yes |
| **`README.md`** | Dev notes for the site. | Yes |

## Static assets

```
public_originals/       ← originals (add new binaries here)
public/                 ← built by npm run assets:optimize (hero WebP/JPEG, etc.)
  assets/hero/          ← parent-page heroes + home rotation
  assets/contact/       ← contact portrait
  work/<slug>/          ← project images & PDFs
  work/<category>/      ← category heroes (e.g. crypto/, plotter/)
  shop/postcards/       ← shop product images
```

## Work URL model (category-first)

```
/work                          Explorer
/work/<category>               Category hub (plotter, crypto, philosophy, …)
/work/<category>/projects/<slug>
/work/<category>/journal/<slug>
/work/<category>/products/<slug>
```

Develop category hubs and nested pages first; top-level `/journal` and `/shop` indexes wire in later. Redirects preserve old bookmarks.

## `app/` data (no separate `content/`)

```
app/site.js               ← site name, nav, hero image list
app/work/manifest.json
app/work/categories.js
app/work/registry.js
app/work/bodies/
app/work/<category>/        ← category home + nested projects/products
app/work/[category]/        ← dynamic projects + journal under category
app/journal/manifest.json
app/journal/registry.js
app/journal/bodies/
app/shop/manifest.json
```
