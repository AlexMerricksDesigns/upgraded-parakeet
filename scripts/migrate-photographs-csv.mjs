#!/usr/bin/env node
/**
 * One-off: migrate photographs.csv to nft_contract / nft_platform columns
 * and subsection=captured. Idempotent if run on already-migrated file.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { readCsv } from "./lib/parse-csv.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CSV_PATH = path.join(ROOT, "data", "photographs.csv");

const CONTRACT_RE = /^(KT1|0x)[1-9A-HJ-NP-Za-km-z]+$/i;
const LEGACY_SUBSECTION = new Set(["tezos token", "ethereum token"]);

function inferNftPlatform(legacySubsection, seriesSlug) {
  const sub = legacySubsection?.toLowerCase() ?? "";
  if (sub.includes("ethereum")) return "BAE";
  if (sub.includes("tezos")) {
    const s = (seriesSlug ?? "").toLowerCase();
    if (s === "versum") return "versum";
    if (s === "kalamint") return "kalamint";
    if (s === "hicetnunc") return "hicetnunc";
    if (s.startsWith("photez")) return "objkt";
    return "objkt";
  }
  const s = (seriesSlug ?? "").toLowerCase();
  if (s === "bae") return "BAE";
  if (s === "versum") return "versum";
  if (s === "kalamint") return "kalamint";
  if (s === "hicetnunc") return "hicetnunc";
  return "";
}

function escapeCsv(value) {
  const s = value ?? "";
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function rowToLine(row, headers) {
  return headers.map((h) => escapeCsv(row[h] ?? "")).join(",");
}

function normalizeNftFields(row) {
  let platform = row.nft_platform?.trim() ?? row.platform?.trim() ?? "";
  let contract = row.nft_contract?.trim() ?? "";
  let tokenId = row.nft_token_id?.trim() ?? row.token_id?.trim() ?? "";

  const legacySub = row.subsection?.trim() ?? "";

  if (!contract && !row.nft_contract && CONTRACT_RE.test(platform)) {
    contract = platform;
    platform = inferNftPlatform(legacySub, row.series_slug) || platform;
  }
  if (!contract && CONTRACT_RE.test(tokenId)) {
    contract = tokenId;
    tokenId = platform && !CONTRACT_RE.test(platform) ? platform : "";
    platform = inferNftPlatform(legacySub, row.series_slug) || platform;
  }
  if (!contract && platform && !CONTRACT_RE.test(platform)) {
    if (/^KT1/i.test(tokenId)) {
      contract = tokenId;
      tokenId = "";
    }
  }
  if (platform && CONTRACT_RE.test(platform)) {
    const t = tokenId;
    contract = platform;
    tokenId = t && !CONTRACT_RE.test(t) ? t : "";
    platform = inferNftPlatform(legacySub, row.series_slug) || "objkt";
  }
  if (!row.nft_platform && !CONTRACT_RE.test(platform) && platform) {
    // platform was a label like BAE
    if (!contract) {
      return {
        nft_platform: platform,
        nft_contract: "",
        nft_token_id: tokenId && tokenId !== "####" ? tokenId : "",
      };
    }
  }
  if (platform && !CONTRACT_RE.test(platform) && !row.nft_platform) {
    return {
      nft_platform: platform,
      nft_contract: contract,
      nft_token_id: tokenId === "####" ? "" : tokenId,
    };
  }

  return {
    nft_platform:
      row.nft_platform?.trim() ||
      inferNftPlatform(legacySub, row.series_slug) ||
      (platform && !CONTRACT_RE.test(platform) ? platform : ""),
    nft_contract: contract,
    nft_token_id: tokenId === "####" ? "" : tokenId,
  };
}

function resolveSubsection(row) {
  const sub = row.subsection?.trim() ?? "";
  if (LEGACY_SUBSECTION.has(sub)) return "captured";
  if (!sub || sub === "captured") return "captured";
  return sub;
}

function fixImagePath(slug, image) {
  if (!image?.includes("token_mints_0(0 ETH)")) return image;
  return "/work/photography/token_mints/0(0 ETH) - He Fired into the Same Spot Again.jpg";
}

const headers = [
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

const { rows } = readCsv(CSV_PATH);
const out = rows.filter((row) => row.slug?.trim()).map((row) => {
  const nft = normalizeNftFields(row);
  return {
    asset_id: row.asset_id?.trim() ?? "",
    slug: row.slug?.trim() ?? "",
    title: row.title?.trim() ?? "",
    series_slug: row.series_slug?.trim() ?? "",
    year: row.year?.trim() ?? "",
    summary: row.summary?.trim() ?? "",
    image: fixImagePath(row.slug, row.image?.trim() ?? ""),
    subsection: resolveSubsection(row),
    sort_order: row.sort_order?.trim() ?? "",
    status: row.status?.trim() || "published",
    featured: row.featured?.trim() ?? "",
    print_available: row.print_available?.trim() ?? "",
    nft_platform: nft.nft_platform,
    nft_contract: nft.nft_contract,
    nft_token_id: nft.nft_token_id,
    tags: row.tags?.trim() ?? "",
    print_sizes: row.print_sizes?.trim() ?? "",
    print_price_range: row.print_price_range?.trim() ?? "",
    product_slug: row.product_slug?.trim() ?? "",
  };
});

const body = [headers.join(","), ...out.map((r) => rowToLine(r, headers))].join("\n") + "\n";
fs.writeFileSync(CSV_PATH, body, "utf8");
console.log(`migrate-photographs-csv ok — ${out.length} rows`);
