# Site assets

Next.js serves static files from **`public/`** only. Add or replace binaries in **`public_originals/`**, then run **`npm run assets:optimize`** to regenerate `public/`.

## Layout

| Path | Used by |
|------|---------|
| `public_originals/assets/hero/` | Source heroes (about, shop, journal, contact, home rotation) |
| `public/assets/hero/` | Optimized heroes (WebP + JPEG; shop GIF → poster or WebM if ffmpeg installed) |
| `public/assets/contact/` | Contact page portrait |
| `public/work/<slug>/` | Work project pages (`/work/<slug>`) |
| `public/work/<category>/` | Category homepages (`/work/crypto`, etc.) |
| `public/shop/<slug>/` | Shop product pages |

Build URLs in code with `@/lib/assets`:

```js
import { workAsset, shopAsset, sharedAsset } from "@/lib/assets";

workAsset("plotted-heads", "plotter-drawings001.jpg");
shopAsset("postcards", "IMG_5206.jpg");
sharedAsset("hero/_MG_0444.jpg");
```

## Prose & manifests

Live next to routes under `app/` (not in `content/`):

- `app/work/manifest.json`, `registry.js`, `bodies/`
- `app/journal/manifest.json`, `registry.js`, `bodies/`
- `app/shop/manifest.json`
- `app/site.js` — site-wide copy and hero image list
