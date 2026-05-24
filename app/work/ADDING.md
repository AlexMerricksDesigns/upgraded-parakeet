# Adding and editing work content

Use this checklist when creating or changing pages. **Folder path matches the live URL** (route groups like `(categories)` do not appear in URLs).

## Where things live on disk

| Live URL | Edit here |
|----------|-----------|
| `/work` | [`(explorer)/page.jsx`]((explorer)/page.jsx) |
| `/work/archive` | [`(explorer)/archive/page.jsx`]((explorer)/archive/page.jsx) |
| `/work/<category>` | [`(categories)/<id>/page.jsx`]((categories)/) + hub in [`components/work/pages/`](../../components/work/pages/) |
| `/work/<category>/projects/<slug>` | [`content/work/projects/<slug>.js`](../content/work/projects/) |
| `/work/<category>/journal/<slug>` | [`content/journal/posts/<slug>.js`](../content/journal/posts/) |
| `/work/<category>/products/<slug>` | [`content/work/products/<slug>.js`](../content/work/products/) |

Categories: `photography`, `plotter`, `physical-objects`, `reflections` — see [`categories-data.js`](categories-data.js) for subsections.

See [content/README.md](../content/README.md) for the `page` document schema and layout ids.

## Add a new project

1. [`categories-data.js`](categories-data.js) — add `slug` to the correct category **subsection** `slugs` array.
2. [`manifest.json`](manifest.json) — card metadata; `href`: `/work/<category>/projects/<slug>`.
3. [`content/work/projects/<slug>.js`](../content/work/projects/) — `export const page = { layout, meta, breadcrumb, sections }`.
4. `public_originals/work/<category>/projects/<slug>/` — images; `npm run assets:optimize`.

## Add a new journal post

1. [`categories-data.js`](categories-data.js) — add to subsection `journalSlugs`.
2. [`app/journal/manifest.json`](../journal/manifest.json) — `href`: `/work/<cat>/journal/<slug>`.
3. [`content/journal/posts/<slug>.js`](../content/journal/posts/) — `layout: "journalArticle"`.

## Add a new product

1. [`categories-data.js`](categories-data.js) — add to subsection `productSlugs`.
2. [`app/shop/manifest.json`](../shop/manifest.json) — `href`: `/work/<cat>/products/<slug>`.
3. [`content/work/products/<slug>.js`](../content/work/products/) — `layout: "productShelf"`.

## Edit a category hub

- **Plotter, photography:** [`components/work/pages/`](../../components/work/pages/) — subsection nav + COPY.
- **Physical objects, reflections:** same folder (`physical-objects-hub.jsx`, `reflections-hub.jsx`).

Hub thread grids use `categorySubsectionSections()` from [`categories.js`](categories.js).

## Asset path helpers

```js
import { categoryAsset, threadAsset } from "@/lib/assets";
threadAsset("plotter", "projects", "plotted-heads", "plotter-drawings001.jpg");
```

Audit map: [content/AUDIT.md](../content/AUDIT.md).
