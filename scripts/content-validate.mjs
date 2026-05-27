#!/usr/bin/env node
/**
 * Validate catalog CSVs before or after content:sync.
 * Exit 0 if ok; exit 1 with messages on failure.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { readCsv } from "./lib/parse-csv.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DATA = path.join(ROOT, "data");
const PUBLIC = path.join(ROOT, "public");

const LEGACY_SUBSECTION = new Set(["tezos token", "ethereum token"]);
const errors = [];
const warnings = [];

function die(msg) {
  errors.push(msg);
}

function warn(msg) {
  warnings.push(msg);
}

function validateUniqueSlugs(rows, label) {
  const seen = new Set();
  rows.forEach((row, i) => {
    const slug = row.slug?.trim();
    if (!slug) die(`${label} row ${i + 2}: missing slug`);
    if (seen.has(slug)) die(`${label} row ${i + 2}: duplicate slug "${slug}"`);
    seen.add(slug);
  });
}

function main() {
  const seriesCsv = readCsv(path.join(DATA, "series.csv"));
  const photosCsv = readCsv(path.join(DATA, "photographs.csv"));
  const productsCsv = readCsv(path.join(DATA, "products.csv"));

  validateUniqueSlugs(seriesCsv.rows, "series.csv");
  validateUniqueSlugs(photosCsv.rows, "photographs.csv");
  validateUniqueSlugs(productsCsv.rows, "products.csv");

  const seriesSlugs = new Set(seriesCsv.rows.map((r) => r.slug?.trim()).filter(Boolean));

  for (const row of photosCsv.rows) {
    const slug = row.slug?.trim();
    const seriesSlug = row.series_slug?.trim();
    const rowLabel = `photographs.csv "${slug}"`;

    if (!seriesSlug) die(`${rowLabel}: missing series_slug`);
    if (!seriesSlugs.has(seriesSlug)) {
      die(`${rowLabel}: unknown series_slug "${seriesSlug}"`);
    }

    const sub = row.subsection?.trim() || "";
    if (LEGACY_SUBSECTION.has(sub)) {
      warn(`${rowLabel}: legacy subsection "${sub}" (sync maps to captured)`);
    }

    const image = row.image?.trim();
    if (image && image.startsWith("/")) {
      const filePath = path.join(PUBLIC, image.replace(/^\//, ""));
      if (!fs.existsSync(filePath)) {
        warn(`${rowLabel}: image not found at public${image}`);
      }
    }

    if (row.platform?.trim() && !row.nft_contract?.trim()) {
      warn(`${rowLabel}: legacy "platform" column set — prefer nft_contract / nft_platform`);
    }
  }

  const featured = photosCsv.rows.filter((r) => {
    const f = (r.featured ?? "").trim().toLowerCase();
    return f === "true" || f === "1";
  });
  const publishedSeries = seriesCsv.rows.filter(
    (r) => (r.status?.trim() || "published") === "published"
  );

  console.log(
    `content:validate — ${photosCsv.rows.length} photographs, ${seriesCsv.rows.length} series (${publishedSeries.length} published), ${featured.length} featured`
  );

  for (const w of warnings) console.warn(`warn: ${w}`);
  for (const e of errors) console.error(`error: ${e}`);

  if (errors.length) {
    console.error(`content:validate failed (${errors.length} error(s))`);
    process.exit(1);
  }

  console.log("content:validate ok");
}

main();
