# Operations checklist

Run after each catalog change. **LLM agents:** use stable `TEST-*` ids; run tests for the highest completed phase in order; do not skip `TEST-SYNC-VALIDATE` before URL checks.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run content:sync` | CSV → manifests + `content/catalog/` |
| `npm run content:validate` | FK / slug / image path checks on CSVs |
| `npm run catalog:import-csv` | `assets.csv` → SQLite / index |
| `npm run assets:ingest` | Copy sources into `public/` |
| `npm run assets:optimize` | Optimize from `public_originals/` |
| `npm run dev` | Local preview |
| `npm run build` | Production build (runs sync via `prebuild`) |

Workflow reference: [`EDITOR.md`](EDITOR.md) · Column reference: [`data/README.md`](data/README.md)

## Global prerequisites

- [ ] `npm run content:sync` exits `0`
- [ ] `npm run content:validate` exits `0`
- [ ] `content/catalog/photographs.json` and `app/work/photography-manifest.json` exist
- [ ] `npm run dev` starts without import errors
- [ ] No hand-edits to generated files between sync and verify

## Phase 1a — Sync parity

| Done | ID | Steps | Pass if |
|------|-----|-------|---------|
| [ ] | `TEST-SYNC-PARITY` | Run `npm run content:sync`. Check manifest counts. | 3 published series (`brighton-by-bench`, `lightworms`, `india-2016`); ~137 published captures; 9 draft imports withheld |
| [ ] | `TEST-SYNC-VALIDATE` | Duplicate a `slug` in `data/photographs.csv`, run sync. | Non-zero exit; error cites row |
| [ ] | `TEST-SYNC-ORPHAN` | Set invalid `series_slug`, run sync. | Non-zero exit; foreign-key message |
| [ ] | `TEST-CONTENT-VALIDATE` | Run `npm run content:validate`. | Exits `0`; reports photograph/series counts |

## Phase 1b — Catalog loader

| Done | ID | Steps | Pass if |
|------|-----|-------|---------|
| [ ] | `TEST-PAGE-CAPTURED` | Sync; open `/work/photography/captured/lightworms-01` and `dictionary_animation_rising_01`. | Title, hero, on-chain block on genesis mint |
| [ ] | `TEST-PAGE-SERIES` | Open `/work/photography/series/lightworms`. | Series page renders |
| [ ] | `TEST-LOADER-NO-JS` | Rename `content/work/captured/lightworms-02.js`; sync; reload captured page. | Page still renders from catalog |

## Phase 1c — Hub

| Done | ID | Steps | Pass if |
|------|-----|-------|---------|
| [ ] | `TEST-HUB-HIGHLIGHTS` | Open `/work/photography#highlights`. | Multiple featured tiles (not only lightworms-01) |
| [ ] | `TEST-HUB-ARCHIVE` | Open `/work/photography#archive`; use platform filter. | ~85 archive mints browsable |
| [ ] | `TEST-HUB-CURATED` | Open `#curated`. | Grid of photographs from published series only |
| [ ] | `TEST-HUB-GRID` | Use search/pager in curated or archive grids. | Pager works |
| [ ] | `TEST-EXPLORER-CHRONICLE` | Open `/work`; photography items in timeline. | Cards present after sync |

## Phase 2 — Assets

| Done | ID | Steps | Pass if |
|------|-----|-------|---------|
| [ ] | `TEST-ASSET-INGEST` | Add `source_path` + `public_path` in `assets.csv`; `catalog:import-csv`; `assets:ingest`; sync. | Image URL resolves |
| [ ] | `TEST-ASSET-MISSING` | Invalid `asset_id` on photo row; sync. | Non-zero exit or clear warning |

## Phase 2b — Products

| Done | ID | Steps | Pass if |
|------|-----|-------|---------|
| [ ] | `TEST-PRODUCT-SHELF` | Open `/work/photography/products/limited-prints`. | Bundle list shows CSV items |
| [ ] | `TEST-SHOP-MANIFEST` | Open `/shop`. | Three products listed |

## Phase 3 — Journal

| Done | ID | Steps | Pass if |
|------|-----|-------|---------|
| [ ] | `TEST-JOURNAL` | Edit `data/journal.csv` title; sync; open journal URL. | Card/title updates |

## Phase 4 — Build scale

| Done | ID | Steps | Pass if |
|------|-----|-------|---------|
| [ ] | `TEST-BUILD-FULL` | `npm run build`. | Build succeeds |
| [ ] | `TEST-BUILD-INCREMENTAL` | Add 10 photo rows; sync; build. | Build succeeds; routes generated |

## Layout-only

| Done | ID | Steps | Pass if |
|------|-----|-------|---------|
| [ ] | `TEST-LAYOUT-PHOTO` | Edit `photograph-layout.jsx`; `npm run dev` only. | All captured pages reflect layout change |

## Regression guard

- [ ] `npm run build` passes
- [ ] `EDITOR.md` script names match `package.json`
- [ ] Photography slugs only in `categories-data.generated.js`, not hand-edited in base
