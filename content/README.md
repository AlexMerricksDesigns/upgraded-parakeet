# Page content modules

One file per published page body. **No shared copy** between pages — duplicate intentionally if needed.

## Directory layout

```
content/
  work/
    projects/<slug>.js      → /work/<cat>/projects/<slug>
    series/<slug>.js        → /work/photography/series/<slug>
    captured/<slug>.js      → /work/photography/captured/<slug>
    products/<slug>.js      → /work/<cat>/products/<slug>
    categories/<id>.js      → /work/<id> hub
    categories/plotter/timeline.js
  journal/
    posts/<slug>.js         → /work/<cat>/journal/<slug>
```

**Bulk photography & products:** edit `data/*.csv`, run `npm run content:sync`. Generated card metadata: `app/work/photography-manifest.json`, `app/shop/manifest.json`. Generated bodies: `content/catalog/*.json`.

**Projects / journal bodies** still use `content/work/projects/`, `content/journal/posts/` (journal cards also in `data/journal.csv`).

Legacy `app/work/manifest.json` remains hand-maintained for craft projects until migrated.

### Optional print fields (work manifest)

```json
{
  "printAvailable": true,
  "print": {
    "sizes": ["A4", "A3"],
    "priceRange": "from £45",
    "productSlug": "limited-prints"
  }
}
```

Helpers: `lib/print-metadata.js` — hub badges, featured prints rail.

## Page document shape

```js
export const page = {
  layout: "prose" | "projectRich" | "series" | "photograph" | "productShelf" | "categoryConfig" | "custom",
  customId: "plotter-hub", // only when layout === "custom"
  meta: {
    title: "Page title",
    intro: "Subtitle under H1",
    tags: ["Tag"],
  },
  breadcrumb: {
    category: "photography",
    label: "Lightworms",
  },
  sections: [
    { type: "contextCard", eyebrow: "…", summary: "…", links: [{ href, label }] },
    { type: "hero", year: "2022", image: "/work/…", alt: "…", description: "…" },
    { type: "tagRow", year: "2022", tags: ["Tezos"] },
    { type: "details", title: "Collection notes", rows: [{ dt, dd }] },
    { type: "prose", title: "…", paragraphs: ["…"] },
    { type: "proseBlocks", blocks: [{ type: "p", text: "…" }] },
    { type: "gallery", title: "Gallery", items: [{ src, alt, caption }] },
    { type: "connected", title: "…", cards: [{ href, title, summary, eyebrow }] },
    { type: "download", href: "…", label: "…" },
    { type: "related", title: "…", links: [{ href, label, eyebrow }] },
  ],
  // categoryConfig only:
  config: { /* CategoryPage config object */ },
};
```

## Layout ids

| layout | Component |
|--------|-----------|
| `prose` | `ProseProjectLayout` |
| `projectRich` | `ProjectRichLayout` |
| `series` | `SeriesLayout` |
| `photograph` | `PhotographLayout` |
| `productShelf` | `ProductShelfLayout` |
| `categoryConfig` | `CategoryConfigLayout` |
| `custom` | `components/work/pages/<customId>.jsx` |
| `journalArticle` | `JournalArticleLayout` |

Loaders: `lib/content/loaders.js`
