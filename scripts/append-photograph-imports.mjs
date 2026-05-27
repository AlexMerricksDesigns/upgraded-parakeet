#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { readCsv } from "./lib/parse-csv.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSV_PATH = path.join(__dirname, "..", "data", "photographs.csv");

const HEADERS = [
  "asset_id",
  "slug",
  "title",
  "series_slug",
  "year",
  "summary",
  "image",
  "subsection",
  "sort_order",
  "status",
  "featured",
  "print_available",
  "nft_platform",
  "nft_contract",
  "nft_token_id",
  "tags",
  "print_sizes",
  "print_price_range",
  "product_slug",
];

const IMPORTS = [
  {
    asset_id: "137",
    slug: "brighton-by-bench-01",
    title: "Brighton by Bench I",
    series_slug: "brighton-by-bench",
    image: "/work/photography/brighton-by-bench-01.jpg",
    sort_order: "137",
    status: "draft",
  },
  {
    asset_id: "138",
    slug: "brugge-windows",
    title: "Brugge Windows",
    series_slug: "archive",
    image: "/work/photography/brugge-windows.jpg",
    sort_order: "138",
    status: "draft",
  },
  {
    asset_id: "139",
    slug: "croatia-2017",
    title: "Croatia 2017",
    series_slug: "archive",
    year: "2017",
    image: "/work/photography/croatia-2017.jpg",
    sort_order: "139",
    status: "draft",
  },
  {
    asset_id: "140",
    slug: "flowers-bristol",
    title: "Flowers Bristol",
    series_slug: "archive",
    image: "/work/photography/flowers-bristol.jpg",
    sort_order: "140",
    status: "draft",
  },
  {
    asset_id: "141",
    slug: "hanging-figures",
    title: "Hanging Figures",
    series_slug: "archive",
    image: "/work/photography/hanging-figures.jpg",
    sort_order: "141",
    status: "draft",
  },
  {
    asset_id: "142",
    slug: "india-2016-feature-01",
    title: "India 2016 Feature",
    series_slug: "india-2016",
    year: "2016",
    image: "/work/photography/india-2016-feature-01.jpg",
    sort_order: "142",
    status: "draft",
  },
  {
    asset_id: "143",
    slug: "scotland-2016",
    title: "Scotland 2016",
    series_slug: "archive",
    year: "2016",
    image: "/work/photography/scotland-2016.jpg",
    sort_order: "143",
    status: "draft",
  },
  {
    asset_id: "144",
    slug: "street-art-01",
    title: "Street Art",
    series_slug: "archive",
    image: "/work/photography/street-art-01.jpg",
    sort_order: "144",
    status: "draft",
  },
  {
    asset_id: "145",
    slug: "refclected-drips-reverse",
    title: "Reflected Drips Reverse",
    series_slug: "archive",
    image: "/work/photography/refclected-drips-reverse.jpg",
    sort_order: "145",
    status: "draft",
  },
];

const ARCHIVE_SLUGS = new Set(
  IMPORTS.filter((i) => i.series_slug === "archive").map((i) => i.slug)
);

function escapeCsv(value) {
  const s = value ?? "";
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function blankRow() {
  return Object.fromEntries(HEADERS.map((h) => [h, ""]));
}

const { rows } = readCsv(CSV_PATH);
const bySlug = new Map(rows.map((r) => [r.slug?.trim(), r]));

const thirty = bySlug.get("30-mile-sign");
if (thirty) {
  thirty.series_slug = "street-photography";
  thirty.product_slug = "limited-prints";
  thirty.print_price_range = "from £30";
  thirty.subsection = "captured";
}

for (const imp of IMPORTS) {
  if (bySlug.has(imp.slug)) continue;
  const row = { ...blankRow(), subsection: "captured", ...imp };
  rows.push(row);
  bySlug.set(imp.slug, row);
}

for (const row of rows) {
  if (!row.series_slug?.trim()) {
    row.series_slug = "archive";
  }
}

const body = [
  HEADERS.join(","),
  ...rows.filter((r) => r.slug?.trim()).map((r) => HEADERS.map((h) => escapeCsv(r[h])).join(",")),
].join("\n") + "\n";

fs.writeFileSync(CSV_PATH, body, "utf8");
console.log(`append-photograph-imports ok — ${rows.filter((r) => r.slug?.trim()).length} rows`);
