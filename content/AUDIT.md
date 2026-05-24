# Content audit — manifest slug → content file

Generated after content/layout separation. **Gaps** need a new `content/...` module before deleting legacy files.

## Work projects (`app/work/manifest.json`)

| Slug | Category | Content file | Layout |
|------|----------|--------------|--------|
| plotted-heads | plotter | [content/work/projects/plotted-heads.js](work/projects/plotted-heads.js) | projectRich |
| meat-hammer | metalworking | [content/work/projects/meat-hammer.js](work/projects/meat-hammer.js) | prose |
| needle-file-handle | woodworking | [content/work/projects/needle-file-handle.js](work/projects/needle-file-handle.js) | prose |
| shelving-a-level | woodworking | [content/work/projects/shelving-a-level.js](work/projects/shelving-a-level.js) | prose |
| design-philosophy | philosophy | [content/work/projects/design-philosophy.js](work/projects/design-philosophy.js) | prose |
| knife-poster | woodworking | [content/work/projects/knife-poster.js](work/projects/knife-poster.js) | prose |
| designing-dope | philosophy | [content/work/projects/designing-dope.js](work/projects/designing-dope.js) | prose |
| liminal-design | philosophy | [content/work/projects/liminal-design.js](work/projects/liminal-design.js) | prose |
| brighton-by-bench | photography | [content/work/projects/brighton-by-bench.js](work/projects/brighton-by-bench.js) | projectRich |
| lightworms | photography | [content/work/projects/lightworms.js](work/projects/lightworms.js) | projectRich |
| india-2016 | photography | [content/work/projects/india-2016.js](work/projects/india-2016.js) | projectRich |
| drawing-studio | photography | [content/work/projects/drawing-studio.js](work/projects/drawing-studio.js) | prose |
| painting-studio | photography | [content/work/projects/painting-studio.js](work/projects/painting-studio.js) | prose |
| ai-image-upscaling | pc-networks | [content/work/projects/ai-image-upscaling.js](work/projects/ai-image-upscaling.js) | prose |
| theories-thinking-design | philosophy | [content/work/projects/theories-thinking-design.js](work/projects/theories-thinking-design.js) | prose |
| frame-animation-series | film | [content/work/projects/frame-animation-series.js](work/projects/frame-animation-series.js) | prose |

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
| /work/photography | [components/work/pages/photography-hub.jsx](../components/work/pages/photography-hub.jsx) | custom |
| /work/crypto | [components/work/pages/crypto-hub.jsx](../components/work/pages/crypto-hub.jsx) | custom |

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
