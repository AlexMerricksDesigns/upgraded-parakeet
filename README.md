# Alex Merricks Designs website

Portfolio, online store, and business home for bringing together design work,
products, writing, and experiments into one public website.

## How this project is put together

Next.js + React in plain JavaScript (`.js` / `.jsx`) and plain CSS.

- `app/` — routes; work uses **route groups** `(explorer)`, `(categories)`, `(thread)` — see [`app/work/README.md`](app/work/README.md)
- `data/` — CSV catalog source for photography & products — see [`data/README.md`](data/README.md)
- `components/` — shared UI and bespoke work/product layouts
- `app/site.js` — site name, navigation, hero images
- `public_originals/` — source media (local)
- `public/` — optimized output (`npm run assets:optimize`)
- `app/globals.css` — all styling

See **`PROJECT_LAYOUT.md`** for a root map. **Adding work content:** [`app/work/ADDING.md`](app/work/ADDING.md).

## URLs come from folders

| URL | File |
|-----|------|
| `/` | `app/page.jsx` |
| `/about` | `app/about/page.jsx` |
| `/work` | `app/work/(explorer)/page.jsx` |
| `/work/plotter` | `app/work/(categories)/plotter/page.jsx` |
| `/work/plotter/projects/plotted-heads` | dynamic `(thread)/[category]/projects/[slug]/` + content module |
| `/shop` | `app/shop/page.jsx` |
| `/journal` | `app/journal/page.jsx` |
| `/contact` | `app/contact/page.jsx` |

## Adding a new project

See [`app/work/ADDING.md`](app/work/ADDING.md) and [`EDITOR.md`](EDITOR.md). Short version:

- **Photography (bulk):** `data/photographs.csv` + `data/assets.csv` → `npm run content:sync`
- **Projects / journal:** content module under `content/` + manifest (or `data/journal.csv`)
- Images in `public_originals/` → `npm run assets:optimize`

## Editing the look

All styling in **`app/globals.css`** (ten sections, signposted at the top).

## Editing content

- **Site-wide** — `app/site.js`
- **A specific page** — its `page.jsx` under `app/`
- **Chrome** — `components/site-header.jsx`, `components/site-footer.jsx`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — ESLint
- `npm run assets:optimize` — heroes from `public_originals/`
- `npm run assets:optimize:all` — full `public/` rebuild
