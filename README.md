# Alex Merricks Designs website

Portfolio, online store, and business home for bringing together design work,
products, writing, and experiments into one public website.

## How this project is put together

This is a **Next.js + React** site, written in plain JavaScript (`.js` /
`.jsx`) and plain CSS. There are only four kinds of file to know about:

- `app/` — one folder per URL; page code, manifests, and prose live here.
- `components/` — small reusable pieces (header, footer, hero, etc.).
- `app/site.js` — site-wide settings (name, navigation, hero images, about).
- `public_originals/` — full-size images and PDFs (source of truth).
- `public/` — optimized assets for the site (`npm run assets:optimize`).
- `app/globals.css` — **all the visual styling for the entire site**.

See **`PROJECT_LAYOUT.md`** for a full root-directory map.

There is no Tailwind, no markdown, no content loader, no separate data schema.
The page you see on screen and the file you edit are the same thing.

## URLs come from folders

| URL                              | File                                          |
| -------------------------------- | --------------------------------------------- |
| `/`                              | `app/page.jsx`                                |
| `/about`                         | `app/about/page.jsx`                          |
| `/work`                          | `app/work/page.jsx`                           |
| `/work/plotted-heads`            | `app/work/plotted-heads/page.jsx`             |
| `/shop`                          | `app/shop/page.jsx`                           |
| `/shop/postcards`                | `app/shop/postcards/page.jsx`                 |
| `/journal`                       | `app/journal/page.jsx`                        |
| `/journal/the-problem-of-value`  | `app/journal/the-problem-of-value/page.jsx`   |
| `/contact`                       | `app/contact/page.jsx`                        |

## Adding a new project, product, or post

Same three steps every time. Example: adding `/work/my-thing`.

1. **Make the page.** Copy `app/work/plotted-heads/page.jsx` →
   `app/work/my-thing/page.jsx`. Edit the title, text, image paths, and tags.
2. **Add a card to the index.** Open `app/work/page.jsx`, find the `projects`
   array near the top, and add an entry with the title, summary, image, tags,
   and the new `href`.
3. **Put images in `public/work/my-thing/`.** Served as `/work/my-thing/hero.jpg`
   (or use `workAsset("my-thing", "hero.jpg")` from `@/lib/assets`).

Same flow for `app/shop/<slug>/` and `app/journal/<slug>/`.

## Editing the look

All styling lives in **`app/globals.css`**. It is organised into ten short
sections, signposted at the top of the file:

1. Design tokens (CSS variables for colours, sizes, etc.)
2. Base / reset
3. Layout primitives (`.container`, `.section`)
4. Site chrome (`.site-header`, `.site-footer`, `.nav`)
5. Typography helpers (`.eyebrow`, `.page-title`, `.intro`, `.prose`)
6. Buttons & tags (`.btn`, `.btn-ghost`, `.tag`)
7. Cards & grids (`.card`, `.card-link`, `.grid-2`, `.grid-3`)
8. Hero (home page)
9. Detail-page bits (`.breadcrumb`, `.hero-media`, `.figure`, `.gallery`,
   `.details-grid`)
10. Forms (contact page)

Common changes:

- **Change a colour everywhere** — edit the variables in section 1
  (`--accent`, `--bg`, `--fg`, etc.).
- **Make all cards rounder / less round** — edit `--radius` in section 1.
- **Change the size of every card** — edit `.card` in section 7.
- **One-off tweak on a single page** — use the `style={{ ... }}` prop on the
  element (already used in a few places for small adjustments).

## Editing content

- **Site name, navigation, hero images, about copy** — `content/site.js`.
- **Anything visible on a specific page** — that page's own `page.jsx` file.
- **Header / footer chrome** — `components/site-header.jsx`,
  `components/site-footer.jsx`.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Available scripts

- `npm run dev` — start the development server
- `npm run build` — production build
- `npm run start` — run the production build locally
- `npm run lint` — run ESLint
- `npm run assets:optimize` — rebuild `public/` from `public_originals/` (heroes WebP/JPEG; GIF→WebM if ffmpeg installed)

## Project workflow

See [`docs/workflow.md`](docs/workflow.md) for the plain-English Git/GitHub
routine for working across mobile, laptop, main PC, and cloud-agent sessions.


public/ directorary excluded from github for file size concerns and constraints - assume all content referenced exists on local.