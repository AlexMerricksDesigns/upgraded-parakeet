# Content audit — manifest slug → content file

**Catalog source:** `data/*.csv` → `npm run content:sync` → `content/catalog/*.json` + `app/work/photography-manifest.json`. See [`data/README.md`](../data/README.md).

Legacy category hubs under `content/work/categories/` were removed (routes use component hubs).

## Work projects (`app/work/manifest.json`)

| Slug | Category | Content file | Layout |
|------|----------|--------------|--------|
| plotted-heads | plotter | [content/work/projects/plotted-heads.js](work/projects/plotted-heads.js) | projectRich |
| meat-hammer | physical-objects | [content/work/projects/meat-hammer.js](work/projects/meat-hammer.js) | prose |
| needle-file-handle | physical-objects | [content/work/projects/needle-file-handle.js](work/projects/needle-file-handle.js) | prose |
| shelving-a-level | physical-objects | [content/work/projects/shelving-a-level.js](work/projects/shelving-a-level.js) | prose |
| design-philosophy | reflections | [content/work/projects/design-philosophy.js](work/projects/design-philosophy.js) | prose |
| knife-poster | physical-objects | [content/work/projects/knife-poster.js](work/projects/knife-poster.js) | prose |
| designing-dope | reflections | [content/work/projects/designing-dope.js](work/projects/designing-dope.js) | prose |
| liminal-design | reflections | [content/work/projects/liminal-design.js](work/projects/liminal-design.js) | prose |
| brighton-by-bench | photography | [content/work/series/brighton-by-bench.js](work/series/brighton-by-bench.js) | series |
| lightworms | photography | [content/work/series/lightworms.js](work/series/lightworms.js) | series |
| india-2016 | photography | [content/work/series/india-2016.js](work/series/india-2016.js) | series |
| lightworms-01 | photography | [content/catalog/photographs.json](catalog/photographs.json) + optional override/legacy JS | photograph |
| lightworms-02 | photography | [content/catalog/photographs.json](catalog/photographs.json) + optional override/legacy JS | photograph |
| drawing-studio | photography | [content/work/projects/drawing-studio.js](work/projects/drawing-studio.js) | prose |
| painting-studio | photography | [content/work/projects/painting-studio.js](work/projects/painting-studio.js) | prose |
| ai-image-upscaling | plotter | [content/work/projects/ai-image-upscaling.js](work/projects/ai-image-upscaling.js) | prose |
| theories-thinking-design | reflections | [content/work/projects/theories-thinking-design.js](work/projects/theories-thinking-design.js) | prose |
| frame-animation-series | physical-objects | [content/work/projects/frame-animation-series.js](work/projects/frame-animation-series.js) | prose |

## Shop products (`app/shop/manifest.json`)

| Slug | Category | Content file |
|------|----------|--------------|
| postcards | plotter | [content/work/products/postcards.js](work/products/postcards.js) |
| limited-prints | photography | [content/work/products/limited-prints.js](work/products/limited-prints.js) |
| digital-editions | crypto | [content/work/products/digital-editions.js](work/products/digital-editions.js) |

## Journal posts (`app/journal/manifest.json`)

All published slugs have `content/journal/posts/<slug>.js` (17 files). Related links remain in journal manifest entries.

## Category hubs

| Route | Copy location | Layout component |
|-------|---------------|------------------|
| /work/woodworking | [content/work/categories/woodworking.js](work/categories/woodworking.js) | categoryConfig |
| /work/metalworking | [content/work/categories/metalworking.js](work/categories/metalworking.js) | categoryConfig |
| /work/film | [content/work/categories/film.js](work/categories/film.js) | categoryConfig |
| /work/philosophy | [content/work/categories/philosophy.js](work/categories/philosophy.js) | categoryConfig |
| /work/nursery | [content/work/categories/nursery.js](work/categories/nursery.js) | categoryConfig |
| /work/pc-networks | [content/work/categories/pc-networks.js](work/categories/pc-networks.js) | categoryConfig |
| /work/plotter | [components/work/pages/plotter-hub.jsx](../components/work/pages/plotter-hub.jsx) | custom (COPY still in component; migrate to content later) |
| /work/plotter/timeline | [components/work/pages/plotter-timeline.jsx](../components/work/pages/plotter-timeline.jsx) | custom |
| /work/photography | [components/work/hub/photography/](../components/work/hub/photography/) | custom |

## Not on site (safe to ignore unless you add pages)

| Item | Notes |
|------|--------|
| `crypto-art-2021` | Removed from registry; was never in manifest |
| Ingest folder | Cold storage only — not published until republish pipeline runs |
| `scripts/build-catalog.mjs` | Writes `content/catalog.json`; not used at runtime |

## Legacy files safe to delete after build passes

- `app/work/bodies/` (all slugs migrated)
- `app/journal/bodies/` (migrated to `content/journal/posts/`)
- `components/work/projects/*.jsx` (4 files)
- `components/work/products/*.jsx` (3 files)
