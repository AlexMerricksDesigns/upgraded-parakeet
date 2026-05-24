# Site assets

Next.js serves static files from **`public/`** only. Paths in code match folders on disk.

## Workflow

1. Set the URL in a manifest or content module (e.g. `app/work/manifest.json` → `"image": "/work/plotter/projects/plotted-heads/hero.jpg"`).
2. Create the same path under `public/` (e.g. `public/work/plotter/projects/plotted-heads/hero.jpg`).
3. For missing files, use `"[Placeholder image]"` in the manifest and grep the repo for that string when you add the asset.

## Layout (mirrors routes)

```text
public/
  assets/hero/                         # site-wide heroes (app/site.js)
  assets/contact/
  work/
    <category>/                        # photography | plotter | physical-objects | reflections
      hero.jpg
      series-*.jpg                     # optional hub-level (photography)
      media/                           # optional hub-level (plotter)
      crypto/                          # on-chain thread assets (under photography)
      projects/<slug>/
      products/<slug>/
      journal/<slug>/
```

## URL helpers

```js
import { categoryAsset, threadAsset, sharedAsset } from "@/lib/assets";

categoryAsset("plotter", "hero.jpg");
threadAsset("plotter", "projects", "plotted-heads", "plotter-drawings001.jpg");
threadAsset("plotter", "products", "postcards", "IMG_5206.jpg");
sharedAsset("hero/portfolio-hero.jpg");
```

## One-time migration

If files are still in flat folders (`public/work/<slug>/`), run:

```bash
node scripts/migrate-public-nested.mjs
```

## Manifests and copy

- `app/work/manifest.json`, `app/shop/manifest.json`, `app/site.js`
- `content/work/` — project and product page bodies
- See [`app/work/ADDING.md`](../work/ADDING.md)
