# Repository layout (quick reference)

| Path | Purpose | Keep? |
|------|---------|--------|
| **`app/`** | Next.js routes, manifests, prose, route groups under `work/` | Yes |
| **`components/work/`** | Bespoke project and product page layouts | Yes |
| **`public_originals/`** | Source images/PDFs (local; gitignored) | Yes |
| **`public/`** | Optimized static files (`npm run assets:optimize`) | Yes (gitignored) |
| **`lib/`** | `assets.js`, `work-paths.js`, redirects | Yes |
| **`content/crypto/`** | On-chain portfolio JSON | Yes |
| **`content/shop/FUTURE.md`** | Commerce roadmap notes | Yes |
| **`scripts/`** | Republish, asset optimize, chain probes | Yes if ingesting |

## Work URL model

Four categories: `photography`, `plotter`, `physical-objects`, `reflections` (see `app/work/categories-data.js` subsections).

```
/work                              → app/work/(explorer)/
/work/<category>                   → app/work/(categories)/<category>/
/work/<category>/projects/<slug>   → dynamic route + content/work/projects/
/work/<category>/journal/<slug>    → app/work/(thread)/[category]/journal/[slug]/
/work/<category>/products/<slug>   → dynamic route + content/work/products/
```

Static assets use nested `public/work/<category>/projects|products|journal/<slug>/` paths — see `app/assets/README.md`.

Top-level **`/journal`** and **`/shop`** are browse indexes; canonical article/shelf URLs live under `/work/...`.

## Static assets (nested)

```
public_originals/work/<category>/projects/<slug>/
public_originals/work/<category>/products/<slug>/
public_originals/work/<category>/
public_originals/assets/hero/
```

## Content modules (`content/`)

```
content/work/projects/<slug>.js     # project page copy + sections
content/work/products/<slug>.js     # product shelves
content/work/categories/<id>.js     # simple category hub config
content/journal/posts/<slug>.js     # journal essays in work threads
content/README.md                   # page schema
content/AUDIT.md                    # manifest → file map
```

## `app/work/` wiring

```
app/work/categories-data.js
app/work/categories.js
app/work/manifest.json
data/                         # CSV catalog source (photographs, series, products)
content/catalog/              # GENERATED page payloads (content:sync)
app/work/categories-data.base.js   # hand-maintained category structure
app/work/categories-data.generated.js  # GENERATED photography slugs
app/work/ADDING.md
components/work/layouts/       # ProseProjectLayout, ProjectRichLayout, …
components/work/pages/        # plotter, photography, physical-objects, reflections hubs
lib/content/loaders.js
```
