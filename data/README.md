# Catalog data (source of truth for bulk content)

Edit these CSV files, then run `npm run content:sync`. **Do not** hand-edit generated manifests or `content/catalog/*.json`.

## Files and roles

| File | One row per | Purpose |
|------|-------------|---------|
| `photographs.csv` | Captured photograph page | Image catalogue: identity, series, hero path, NFT contract/token, print flags |
| `series.csv` | Photography series | Grouping for breadcrumbs, hub series cards, narrative series pages |
| `products.csv` | Product shelf | Shop offerings (limited prints, digital editions, plotter postcards) |
| `product_items.csv` | Shelf membership | Which catalogue slugs appear on which product shelf |
| `assets.csv` | Image file record | Ingest paths and `public_path` (optional when `image` is set on photograph row) |
| `journal.csv` | Journal card | Optional journal manifest |

```text
photographs.csv  ──series_slug──►  series.csv
product_items.csv  ──item_slug──►  photographs.csv
product_items.csv  ──product_slug──►  products.csv
```

NFT and print behaviour on a capture page comes from **photograph row fields** and **product_items** links—not from duplicating every mint as a product row.

## `public/work/photography/` layout

| Path | Use in CSV? |
|------|-------------|
| `token_mints/` | Yes — one `photographs.csv` row per mint image |
| Top-level `*.jpg` (e.g. `30-sign.jpg`, `scotland-2016.jpg`) | Yes — add catalogue rows when the work should have a `/captured/` page |
| `projects/` | **No** — working/promo materials (posters, alternates, scales) for series/project subpages; copied from your publishing workflow |
| `hero.jpg`, `series-*.jpg`, `shop-*.jpg`, `timeline-*.jpg` | **No** — hub, series hero, shop, and timeline UI assets |

## photographs.csv

| Column | Description |
|--------|-------------|
| `asset_id` | Your numeric register (unique in practice) |
| `slug` | URL slug under `/work/photography/captured/<slug>` |
| `title` | Page title |
| `series_slug` | Must exist in `series.csv` |
| `year` | Year string |
| `summary` | Intro / card summary |
| `image` | Hero path under `/work/photography/...` |
| `subsection` | Hub bucket — use `captured` for almost all rows |
| `sort_order` | Order within subsection |
| `status` | **Import visibility only:** `published` = live `/captured/` page; `draft` = WIP import (no route). Do not use for “mint vs print” — use `nft_*` and `print_available` instead. |
| `featured` | `true` for hub **Highlights** (any series; not tied to `series.status`) |
| `print_available` | `true` to show print tiers on the capture page |
| `nft_platform` | Human label: `objkt`, `hicetnunc`, `versum`, `BAE`, `kalamint`, etc. |
| `nft_contract` | Tezos `KT1…` or Ethereum `0x…` contract address |
| `nft_token_id` | On-chain token id (numeric) |
| `tags` | Comma-separated in sheet (sync also accepts pipe-separated) |
| `print_sizes` | e.g. `Small, Medium` or `A4\|A3` |
| `print_price_range` | e.g. `from £30` |
| `product_slug` | Shop shelf slug, e.g. `limited-prints` |

Sync builds an objkt link when `nft_contract` + `nft_token_id` are set (`https://objkt.com/tokens/<contract>/<id>`).

**Hub curation** uses [`series.csv`](series.csv) `status`: `published` series appear as flagship cards; mints in `draft` platform/thematic series appear under **On-chain archive** on the photography hub. Photograph `status` does not control archive vs curated — only whether the row is synced to the site.

**Legacy columns** (do not use on new rows): `platform`, `token_id` — sync still reads them as fallback if `nft_*` columns are empty.

### Example rows

Mint (catalogue + on-chain):

```csv
asset_id,slug,title,series_slug,year,image,subsection,sort_order,status,nft_platform,nft_contract,nft_token_id
62,lightworms-01,Lightworms,lightworms,2022,/work/photography/token_mints/62 - 1 - IMG_5137 - lightworms.jpg,captured,62,published,objkt,KT1V8HRCRQm8p1ww2b7PbVkNXQHrWK97wvEv,0
```

Print only (no NFT):

```csv
136,30-mile-sign,30 Miles,street-photography,2018,/work/photography/30-sign.jpg,captured,136,unpublished,TRUE,TRUE,,,,,"Small, Medium",from £30,limited-prints
```

Draft import from top-level public folder:

```csv
143,scotland-2016,Scotland 2016,archive,2016,,/work/photography/scotland-2016.jpg,captured,143,draft,,,,,,,,
```

## series.csv

| Column | Description |
|--------|-------------|
| `slug` | URL slug (unique) |
| `title` | Display title |
| `year` | Year string |
| `summary` | Card / meta summary |
| `teaser` | Short hub teaser (optional) |
| `image` | Hero image URL path |
| `subsection` | Hub subsection id (default: `captured`) |
| `sort_order` | Order within subsection |
| `status` | `published` or `draft` |
| `tags` | Pipe-separated |
| `print_available` | `true` / `false` |
| `print_sizes`, `print_price_range`, `product_slug` | Print CTA for series page |

Platform or thematic groupings (e.g. `hicetnunc`, `versum`, `Photez Thematic v7 - Shadows`) are valid `series_slug` values when a stub row exists here.

## products.csv

| Column | Description |
|--------|-------------|
| `slug` | Product slug |
| `title` | Display name |
| `category` | Work category id (`photography`, `plotter`, …) |
| `subsection` | Hub subsection for product tiles |
| `summary`, `image`, `price`, `format`, `status`, `published` | Shop card fields |

## product_items.csv

| Column | Description |
|--------|-------------|
| `product_slug` | Parent product |
| `item_slug` | Related photograph or series slug |
| `item_kind` | `photograph`, `series`, or `product` |
| `label` | Display label |
| `sort_order` | Order in bundle list |

## assets.csv

| Column | Description |
|--------|-------------|
| `asset_id` | Unique id (may match photograph `asset_id`) |
| `role` | `hero`, `web`, `thumb`, `master` |
| `source_path` | Local path to ingest from |
| `public_path` | URL under `/work/...` |
| `ingest_status` | `pending`, `done`, `missing` |

## Commands

| Command | Purpose |
|---------|---------|
| `npm run content:sync` | CSV → manifests + `content/catalog/` |
| `node scripts/migrate-photographs-csv.mjs` | One-off column migration (nft_contract / nft_platform) |
| `node scripts/append-photograph-imports.mjs` | Re-apply top-level draft import rows |

## Generated outputs (read-only)

- `app/work/photography-manifest.json`
- `app/work/categories-data.generated.js`
- `content/catalog/photographs.json`
- `content/catalog/series.json`
- `app/shop/manifest.json`

Optional per-page overrides: `content/overrides/photographs/<slug>.md`, `content/work/captured/<slug>.js`.
