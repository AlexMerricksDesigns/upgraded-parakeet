#!/usr/bin/env node
/**
 * GENERATED outputs — do not hand-edit:
 * - app/work/photography-manifest.json
 * - app/work/categories-data.generated.js
 * - app/shop/manifest.json (from products.csv)
 * - app/journal/manifest.json (from journal.csv when rows exist)
 * - content/catalog/photographs.json
 * - content/catalog/series.json
 * - content/catalog/products.json
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  parseBool,
  parseIntOr,
  parsePipeList,
  readCsv,
} from "./lib/parse-csv.mjs";
import { loadAssetPaths } from "./lib/assets-db.mjs";
import {
  capturedPath,
  journalPath,
  productPath,
  seriesPath,
} from "./lib/work-paths-sync.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DATA = path.join(ROOT, "data");
const CATEGORY = "photography";

function die(message) {
  console.error(`content:sync error: ${message}`);
  process.exit(1);
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const body = JSON.stringify(data, null, 2) + "\n";
  fs.writeFileSync(filePath, body, "utf8");
}

function writeGeneratedJs(filePath, code) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, code, "utf8");
}

function resolveAssetPath(assetId, assetsById, rowImage) {
  if (rowImage?.trim()) return rowImage.trim();
  const asset = assetsById.get(assetId);
  if (!asset) return null;
  return asset.public_path?.trim() || null;
}

function buildPrintBlock(row) {
  if (!parseBool(row.print_available)) return undefined;
  const sizes = parsePipeList(row.print_sizes);
  const rawSlug = row.product_slug?.trim() || "";
  const productSlug =
    rawSlug.toLowerCase().replace(/\s+/g, "-") === "limited-prints" ||
    rawSlug.toLowerCase() === "limited prints"
      ? "limited-prints"
      : rawSlug || "limited-prints";
  const block = {
    sizes: sizes.length ? sizes : ["A4", "A3"],
    priceRange: row.print_price_range?.trim() || "from £35",
    productSlug,
  };
  return block;
}

const CONTRACT_RE = /^(KT1|0x)[1-9A-HJ-NP-Za-km-z]+$/i;
const LEGACY_SUBSECTION = new Set(["tezos token", "ethereum token"]);
let legacySubsectionWarned = false;

function resolveSubsection(row) {
  const sub = row.subsection?.trim() || "";
  if (LEGACY_SUBSECTION.has(sub)) {
    if (!legacySubsectionWarned) {
      console.warn(
        "content:sync: legacy subsection values (tezos token / ethereum token) mapped to captured"
      );
      legacySubsectionWarned = true;
    }
    return "captured";
  }
  return sub || "captured";
}

function resolveNftFields(row, seriesTitle) {
  let contract =
    row.nft_contract?.trim() ||
    (CONTRACT_RE.test(row.platform?.trim() ?? "") ? row.platform.trim() : "");
  let tokenId =
    row.nft_token_id?.trim() || row.token_id?.trim() || "";
  let platform = row.nft_platform?.trim() || "";

  if (!contract && CONTRACT_RE.test(tokenId)) {
    contract = tokenId;
    tokenId = "";
  }
  if (!platform && row.platform?.trim() && !CONTRACT_RE.test(row.platform)) {
    platform = row.platform.trim();
  }
  if (!platform && contract) {
    const series = (row.series_slug ?? "").toLowerCase();
    if (series === "versum") platform = "versum";
    else if (series === "kalamint") platform = "kalamint";
    else if (series === "bae") platform = "BAE";
    else if (series === "hicetnunc") platform = "hicetnunc";
    else platform = "objkt";
  }
  if (tokenId === "####") tokenId = "";

  const published = Boolean(contract && tokenId);
  let summary = null;
  if (published) {
    const label = platform || seriesTitle || "chain";
    summary = `Minted on ${label}.`;
  } else if (platform) {
    summary = `Released on ${platform}.`;
  }

  let link = null;
  if (contract && tokenId && /^KT1/i.test(contract)) {
    link = `https://objkt.com/tokens/${contract}/${tokenId}`;
  }

  return { contract, tokenId, platform, published, summary, link };
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
  const assetsCsv = readCsv(path.join(DATA, "assets.csv"));
  const productsCsv = readCsv(path.join(DATA, "products.csv"));
  const productItemsCsv = readCsv(path.join(DATA, "product_items.csv"));
  const journalCsv = readCsv(path.join(DATA, "journal.csv"));

  validateUniqueSlugs(seriesCsv.rows, "series.csv");
  validateUniqueSlugs(photosCsv.rows, "photographs.csv");
  validateUniqueSlugs(productsCsv.rows, "products.csv");

  const assetsById = new Map();
  for (const row of assetsCsv.rows) {
    if (!row.asset_id?.trim()) continue;
    assetsById.set(row.asset_id.trim(), row);
  }
  const dbPaths = loadAssetPaths(
    path.join(ROOT, "data/catalog.db"),
    path.join(ROOT, "data/assets-index.json")
  );
  for (const [assetId, publicPath] of dbPaths) {
    const row = assetsById.get(assetId) ?? { asset_id: assetId };
    row.public_path = publicPath;
    assetsById.set(assetId, row);
  }

  const seriesBySlug = new Map();
  const seriesSlugsBySubsection = {};
  const photographyManifest = [];

  for (const row of seriesCsv.rows) {
    const slug = row.slug.trim();
    const status = row.status?.trim() || "published";
    const subsection = row.subsection?.trim() || "captured";
    const image =
      resolveAssetPath(row.hero_asset_id, assetsById, row.image) ||
      `/work/photography/series-${slug}.jpg`;

    if (status === "published") {
      if (!seriesSlugsBySubsection[subsection]) {
        seriesSlugsBySubsection[subsection] = { seriesSlugs: [], photoSlugs: [] };
      }
      seriesSlugsBySubsection[subsection].seriesSlugs.push({
        slug,
        order: parseIntOr(row.sort_order, 999),
      });
    }

    const entry = {
      kind: "series",
      slug,
      series: slug,
      title: row.title?.trim() || slug,
      year: row.year?.trim() || "",
      date: row.year?.trim() || "",
      summary: row.summary?.trim() || "",
      teaser: row.teaser?.trim() || row.summary?.trim() || "",
      image,
      href: seriesPath(CATEGORY, slug),
      tags: parsePipeList(row.tags),
      status,
    };
    const print = buildPrintBlock(row);
    if (print) {
      entry.printAvailable = true;
      entry.print = print;
    }
    seriesBySlug.set(slug, { row, entry, image });
    photographyManifest.push(entry);
  }

  const catalogSeries = {};
  for (const [slug, { row, entry, image }] of seriesBySlug) {
    catalogSeries[slug] = {
      layout: "series",
      meta: {
        title: entry.title,
        intro: entry.summary,
        description: entry.summary,
        date: entry.year,
        series: slug,
        tags: entry.tags,
      },
      breadcrumb: { category: CATEGORY, series: slug, label: entry.title },
      hero: {
        year: entry.year,
        image,
        alt: `${entry.title} — photography series`,
        description: entry.teaser || entry.summary,
      },
    };
  }

  const catalogPhotographs = {};
  const photoSlugsBySubsection = {};

  for (const row of photosCsv.rows) {
    const slug = row.slug.trim();
    const seriesSlug = row.series_slug?.trim();
    if (!seriesSlug) die(`photographs.csv "${slug}": missing series_slug`);
    if (!seriesBySlug.has(seriesSlug)) {
      die(`photographs.csv "${slug}": unknown series_slug "${seriesSlug}"`);
    }
    const assetId = row.asset_id?.trim();
    const rowImage = row.image?.trim();
    if (assetId && !assetsById.has(assetId) && !rowImage) {
      die(`photographs.csv "${slug}": unknown asset_id "${assetId}" and no image path`);
    }

    const status = row.status?.trim() || "published";
    const subsection = resolveSubsection(row);
    const image =
      resolveAssetPath(assetId, assetsById, row.image) ||
      `/work/photography/${slug}.jpg`;
    const seriesEntry = seriesBySlug.get(seriesSlug).entry;

    if (status === "published") {
      if (!photoSlugsBySubsection[subsection]) {
        photoSlugsBySubsection[subsection] = [];
      }
      photoSlugsBySubsection[subsection].push({
        slug,
        order: parseIntOr(row.sort_order, 999),
      });
    }

    const title = row.title?.trim() || slug;
    const summary = row.summary?.trim() || "";
    const nft = resolveNftFields(row, seriesEntry.title);
    const manifestEntry = {
      kind: "captured",
      slug,
      series: seriesSlug,
      title,
      year: row.year?.trim() || seriesEntry.year,
      date: row.year?.trim() || seriesEntry.year,
      summary,
      image,
      href: capturedPath(CATEGORY, slug),
      heroImage: image,
      nftLink: nft.link,
      nftPlatform: nft.platform || null,
      status,
      featured: parseBool(row.featured),
    };
    const print = buildPrintBlock(row);
    if (print) {
      manifestEntry.printAvailable = true;
      manifestEntry.print = print;
    }
    photographyManifest.push(manifestEntry);

    const printBlock = buildPrintBlock(row);
    const productSlug = printBlock?.productSlug || "limited-prints";
    catalogPhotographs[slug] = {
      layout: "photograph",
      meta: {
        title,
        intro: summary || `From the ${seriesEntry.title} series.`,
        description: summary,
        date: manifestEntry.year,
        series: seriesSlug,
        tags: parsePipeList(row.tags),
      },
      breadcrumb: {
        category: CATEGORY,
        series: seriesSlug,
        label: title,
      },
      hero: {
        image,
        alt: `${title} — ${seriesEntry.title}`,
      },
      story: {
        eyebrow: `From the ${seriesEntry.title} series, ${manifestEntry.year || ""}`.trim(),
        paragraphs: summary
          ? [summary]
          : [`Part of the ${seriesEntry.title} collection.`],
      },
      printTiers: parseBool(row.print_available)
        ? [
            {
              id: "open",
              label: "Open print",
              summary: "Archival open edition — standard sizes on request.",
              href: productPath(CATEGORY, productSlug),
              cta: "Request open print",
              kind: "shop",
            },
            {
              id: "limited",
              label: "Limited signed",
              summary: "Signed limited edition — numbered when the run is fixed.",
              href: productPath(CATEGORY, productSlug),
              cta: "Limited edition",
              kind: "shop",
            },
          ]
        : [],
      nft: {
        published: nft.published,
        summary: nft.summary,
        link: nft.link,
        platform: nft.platform || null,
        contract: nft.contract || null,
        tokenId: nft.tokenId || null,
      },
    };
  }

  // Sort slugs for categories-data.generated.js
  const mergedSubsections = { ...seriesSlugsBySubsection };
  for (const [sub, items] of Object.entries(photoSlugsBySubsection)) {
    if (!mergedSubsections[sub]) {
      mergedSubsections[sub] = { seriesSlugs: [], photoSlugs: [] };
    }
    mergedSubsections[sub].photoSlugs = items
      .sort((a, b) => a.order - b.order)
      .map((x) => x.slug);
  }
  for (const sub of Object.keys(mergedSubsections)) {
    mergedSubsections[sub].seriesSlugs = (mergedSubsections[sub].seriesSlugs || [])
      .sort((a, b) => a.order - b.order)
      .map((x) => (typeof x === "string" ? x : x.slug));
  }

  const generatedJs = `/** GENERATED BY content:sync — do not edit by hand. */
export const PHOTOGRAPHY_SLUGS_BY_SUBSECTION = ${JSON.stringify(
    Object.fromEntries(
      Object.entries(mergedSubsections).map(([id, v]) => [
        id,
        {
          seriesSlugs: v.seriesSlugs ?? [],
          photoSlugs: v.photoSlugs ?? [],
        },
      ])
    ),
    null,
    2
  )};
`;
  writeGeneratedJs(
    path.join(ROOT, "app/work/categories-data.generated.js"),
    generatedJs
  );
  writeJson(
    path.join(ROOT, "app/work/photography-manifest.json"),
    photographyManifest
  );
  writeJson(path.join(ROOT, "content/catalog/series.json"), catalogSeries);
  writeJson(
    path.join(ROOT, "content/catalog/photographs.json"),
    catalogPhotographs
  );

  // Products
  const productItemsBySlug = new Map();
  for (const row of productItemsCsv.rows) {
    const ps = row.product_slug?.trim();
    if (!ps) continue;
    if (!productItemsBySlug.has(ps)) productItemsBySlug.set(ps, []);
    productItemsBySlug.get(ps).push({
      itemSlug: row.item_slug?.trim(),
      itemKind: row.item_kind?.trim() || "photograph",
      label: row.label?.trim() || row.item_slug?.trim(),
      sortOrder: parseIntOr(row.sort_order, 999),
    });
  }

  const catalogProducts = {};
  const shopManifest = [];

  for (const row of productsCsv.rows) {
    const slug = row.slug.trim();
    const category = row.category?.trim() || "photography";
    const image =
      resolveAssetPath(row.hero_asset_id, assetsById, row.image) ||
      row.image?.trim() ||
      "";
    const items = (productItemsBySlug.get(slug) || []).sort(
      (a, b) => a.sortOrder - b.sortOrder
    );

    shopManifest.push({
      slug,
      href: productPath(category, slug),
      name: row.title?.trim() || slug,
      status: row.status?.trim() || "Coming soon",
      summary: row.summary?.trim() || "",
      image,
      price: row.price?.trim() || "TBC",
      format: row.format?.trim() || "Physical",
      published: parseBool(row.published ?? "true"),
    });

    catalogProducts[slug] = {
      layout: "productShelf",
      meta: {
        title: row.title?.trim() || slug,
        intro: row.summary?.trim() || "",
      },
      breadcrumb: { category, label: row.title?.trim() || slug },
      category,
      stock: row.stock?.trim() || null,
      variantSku: row.variant_sku?.trim() || null,
      bundleItems: items.map((item) => ({
        slug: item.itemSlug,
        kind: item.itemKind,
        label: item.label,
      })),
      sections: [],
    };
  }

  writeJson(path.join(ROOT, "app/shop/manifest.json"), shopManifest);
  writeJson(path.join(ROOT, "content/catalog/products.json"), catalogProducts);

  // Journal — regenerate manifest from journal.csv (preserves related links when present)
  if (journalCsv.rows.length > 0) {
    validateUniqueSlugs(journalCsv.rows, "journal.csv");
    const journalPathExisting = path.join(ROOT, "app/journal/manifest.json");
    const existingJournal = fs.existsSync(journalPathExisting)
      ? JSON.parse(fs.readFileSync(journalPathExisting, "utf8"))
      : [];
    const relatedBySlug = new Map(
      existingJournal.map((e) => [e.slug, e.related ?? []])
    );
    const journalManifest = journalCsv.rows.map((row) => {
      const slug = row.slug.trim();
      const category = row.category?.trim() || "reflections";
      return {
        slug,
        href: journalPath(category, slug),
        title: row.title?.trim() || slug,
        date: row.date?.trim() || "",
        year: row.year?.trim() || "",
        summary: row.summary?.trim() || "",
        status: row.status?.trim() || "published",
        related: relatedBySlug.get(slug) ?? [],
      };
    });
    writeJson(journalPathExisting, journalManifest);
  }

  console.log(
    `content:sync ok — ${seriesCsv.rows.length} series, ${photosCsv.rows.length} photographs, ${productsCsv.rows.length} products`
  );
}

main();
