# Crypto portfolio data (manual curation)

On-chain work on the site is **portfolio content**, not live indexers. You add tiles by hand; probe scripts only help research contracts and print paste-ready JSON.

## Two tracks

| Track | Where | How data gets in |
|-------|--------|------------------|
| **Portfolio (Work)** | `/work/crypto`, project pages | [`lib/crypto-portfolio.js`](../../lib/crypto-portfolio.js) + JSON under `content/crypto/` |
| **Shop (later)** | `/work/crypto/products/digital-editions`, `/shop` | Wallet, listings, APIs — see [`content/shop/FUTURE.md`](../shop/FUTURE.md) |

Do not bulk-import ~2.2k collected tokens. Use series hubs, profile links, and featured tiles.

## ThreadTile item schema

Used by `ThreadTile` in [`app/work/category-page.jsx`](../../app/work/category-page.jsx) via `projectSections` in [`app/work/crypto/page.jsx`](../../app/work/crypto/page.jsx) (search `COPY: CREATING`).

| Field | Required | Type | Notes |
|-------|----------|------|-------|
| `slug` | yes | string | Unique within the group |
| `title` | yes | string | Card heading |
| `summary` | yes | string | Short blurb |
| `year` | no | string | Eyebrow (e.g. `"2022"`, `"2022–"`) |
| `href` | no | string \| null | `null` → muted “Coming soon” tile (no link) |
| `external` | if linked | boolean | `true` for objkt, teia, fxhash, etc. |
| `image` | no | string \| null | Path under `/public` (e.g. `/work/crypto/banner.jpg`) |
| `platform` | no | string | Badge on tile media (e.g. `Tezos · objkt`) |

### Example (linked tile)

```json
{
  "slug": "brighton-by-bench",
  "title": "Brighton by Bench",
  "year": "2022",
  "summary": "100 Tezos editions — benches as pause and permission.",
  "href": "/work/photography/projects/brighton-by-bench",
  "external": false,
  "image": "/work/photography/series-brighton-by-bench.jpg",
  "platform": "Project"
}
```

### Example (external objkt token)

```json
{
  "slug": "bench-001",
  "title": "Bench study #1",
  "year": "2022",
  "summary": "Edition 1/100 on Tezos.",
  "href": "https://objkt.com/tokens/KT1…/0",
  "external": true,
  "image": "/work/photography/brighton-by-bench-01.jpg",
  "platform": "Tezos · objkt"
}
```

## File layout

```
content/crypto/
  README.md                 ← this file
  identities.json           ← wallet addresses (reference for probes + profile URLs)
  minted/                   ← series you authored (optional JSON per series)
    brighton-by-bench.json
  collected/                ← Under Orchard highlights (optional)
    under-orchard-featured.json
  .probe-output/            ← gitignored; probe script dumps
```

Series JSON shape:

```json
{
  "id": "brighton-by-bench",
  "title": "Brighton by Bench",
  "notes": "Optional curator note.",
  "items": [ /* ThreadTile objects */ ]
}
```

Import series in [`lib/crypto-portfolio.js`](../../lib/crypto-portfolio.js) (used by `app/work/(categories)/crypto/page.jsx`).

## Identities

See [`identities.json`](identities.json). Profile URL helpers:

- Objkt: `https://objkt.com/profile/{tezos}`
- Teia: `https://teia.art/{tezos}`
- fxhash (Tezos user): `https://www.fxhash.xyz/u/{tezos}`
- Under Orchard collector: `tz1NfdmYN9vqG7WmBr2bbfPhTc4BA8SjqgRE`
- Base EVM: `0xa2BA962FAB5f1E1ad25C71Fc81Afe903E825fad8`

Set `mint.tezos` after running `npm run probe:objkt -- --resolve-mint`.

## Workflow

1. Run a probe for one contract or wallet (dev machine only):

   ```bash
   npm run probe:objkt -- --wallet tz1NfdmYN9vqG7WmBr2bbfPhTc4BA8SjqgRE --limit 3
   npm run probe:objkt -- --contract KT1… --limit 5
   npm run probe:fxhash -- --user tz1… --limit 3
   npm run probe:base -- --limit 5
   ```

2. Copy printed JSON into `content/crypto/minted/*.json` or extend `lib/crypto-portfolio.js`.

3. Rebuild / refresh dev server — no runtime API calls in production.

## Probe output

Optional write to `content/crypto/.probe-output/` with `--out`. Folder is gitignored.
