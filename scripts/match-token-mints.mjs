#!/usr/bin/env node
/**
 * One-off: fill empty photograph columns from public/work/photography/token_mints.
 * Does not overwrite summary, title, year, product_slug, or existing image/asset_id.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { readCsv } from "./lib/parse-csv.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const TOKEN_DIR = path.join(ROOT, "public/work/photography/token_mints");
const PHOTOS_CSV = path.join(ROOT, "data/photographs.csv");
const ASSETS_CSV = path.join(ROOT, "data/assets.csv");

const SERIES_MAP = {
  hicetnunc: "hicetnunc",
  "birds in brighton": "birds-in-brighton",
  "bristol rainshine": "bristol-rainshine",
  "brighton triptychs": "brighton-triptychs",
  "brighton sunshine": "brighton-sunshine",
  "brighton sunshibe": "brighton-sunshine",
  "A Murder of Crows": "murder-of-crows",
  Animation: "animation",
  "Black and Whites": "black-and-whites",
  UCM: "ucm",
  Macro: "macro",
  lightworms: "lightworms",
};

/** slug → exact filename (verified on disk) */
const FILE_OVERRIDES = {
  dictionary_animation_rising_01: "0 - He's Rising.gif",
  brighton_fox: "1 - A Foxy Afternoon.jpg",
  screw_tightens: "3 - The Screw Tightens.png",
  birds_in_brighton_01: "5 - Herring Gull.jpg",
  birds_in_brighton_02: "6 - Starling.jpg",
  birds_in_brighton_03: "7 - Jay.jpg",
  birds_in_brighton_04: "8 - House Sparrow.jpg",
  hicetnunc_minting_events_01: "9 - oneHENdreddays.jpg",
  bristol_rainshine_01:
    "10 - Bristol_s Rainshine, Millenium Part 1 Seagull at Pero_s Bridge.JPG",
  bristol_rainshine_02:
    "11 - Bristol_s Rainshine, Millenium Part 2 Planetarium @Bristol.jpg",
  bristol_rainshine_03: "12.JPG",
  rip_400d_mosaic: "13 - RIP 400D.jpg",
  photography_changes_everything: "14 - Photography Changes Everything.jpg",
  owl_above: "15 - Owl Above.tiff",
  sun_bloodened_sky: "16 - Sun Bloodened Skyjpg.jpg",
  objkt_key: "17 - X. S . M. Objkt Key.htm",
  country_playing_field: "18 - Country Playing Field.jpg",
  swirled_sunset: "19 - Swirled Sunset.jpg",
  decayed_visage: "20 - Decayed Visage.jpg",
  brighton_triptychs_portraits_pigeon: "21 - P-Pigeon Bath.jpg",
  brighton_triptychs_portraits_detectorist: "22 - P-Detectorist.jpg",
  brighton_triptychs_portraits_seagulls: "23 - P-Seagulls.jpg",
  brighton_triptychs_portraits_triptych:
    "24 - P-Brighton Sunrise Beach 1 Portraits.png",
  brighton_triptychs_landscapes_seagull_flying: "25 - Sea L-Gull.jpg",
  brighton_triptychs_landscapes_detectorist: "26 - L-Detectorist.jpg",
  brighton_triptychs_landscapes_seagulls: "27 - L-Seagulls.jpg",
  brighton_triptychs_landscapes_triptych:
    "28 - Brighton Sunrise Beach 1 Landscapes-M.png",
  brighton_sunshine_01: "29 - Sheridan House.jpg",
  brighton_sunshine_02: "30 - 130 Western Road.jpg",
  brighton_sunshine_03: "31 - Jubilee Clock Tower.jpg",
  brighton_sunshine_04: "32 - No. 4 and 2 Richmond Terrace.jpg",
  murder_of_crows_01: "33 - A Murder of Crows - 1.jpg",
  murder_of_crows_02: "34 - A Murder of Crows - 2.jpg",
  murder_of_crows_03: "35 - A Murder of Crows - 3.jpg",
  murder_of_crows_04: "36 - A Murder of Crows - 4.jpg",
  murder_of_crows_05: "37 - A Murder of Crows - 5.jpg",
  murder_of_crows_06: "38 - A Murder of Crows - 6.jpg",
  murder_of_crows_07: "39 - A Murder of Crows - 7.jpg",
  murder_of_crows_08: "40 - A Murder of Crows - 8.jpg",
  frame_animation_animated_pngs_01: "41 - Camera's Watching.png",
  sad_state: "42 - WHAT A SAD STATE OF AFFAIRS.jpg",
  self_portrait: "43 - Self Portrait.jpg",
  swirling_bokeh: "44 - Swirling Bokeh.jpg",
  urtica_dioica: "45 - Urtica dioica.jpg",
  black_white_01: "46 - The Richmond Building.jpg",
  black_white_02: "47 - Lawrence Hill Train Station.jpg",
  black_white_03: "48 - Cotham Gardens.jpg",
  black_white_04: "49 - Near Kames, Tighnabruaich.jpg",
  unintentional_camera_movements_01: "50 - -.jpg",
  unintentional_camera_movements_02: "51 - -.jpg",
  unintentional_camera_movements_03: "52 - 18-09-21.jpg",
  bokeh_experiments: "53 - Twisted Focus.jpg",
  frame_animation_flowers_01: "54 - Sunset Flower.mp4",
  macro_experiments: "55 - At the Point.jpg",
  untitled_01: "56 - untitled.jpg",
  reflections_01: "57 - a view from a bridge.jpg",
  arise_01: "58 - arise.jpg",
  sea_cadets_01: "59 - sea cadets.jpg",
  an_abstraction_of_meaning: "60 - an abstraction of meaning.jpg",
  the_skies_seem_burning: "61 - The skies seem to be burning.jpg",
  "lightworms-07": "68 - 7 - IMG_4983 - signs of strips.jpg",
  sometimes: "112 - Sometimes.jpg",
  a_view_above: "113 - A View Above.jpg",
  upon_reflection: "114 - upon reflection.jpg",
  bristol_7: "115 - Bristol.7..jpg",
  drifting_blurred_perspectives: "116 - Drifting in Blurred Perspectives.jpg",
  murmuration: "117 - Murmuration.jpg",
  awakenings: "118 - Awakenings.jpg",
  always: "119 - always,.jpg",
  originated_misunderstandings: "120 - originated misunderstandings.jpg",
  a_goldrush: "121 - as if, a goldrush.jpg",
  on_photography: "122 - on Photography.jpg",
  iselworth_ait: "123 - Towards Iselworth Ait, River Thames.jpg",
  cycling_in_london: "124 - Cycling in London, Clowes House.jpg",
  Swimming_with_Cygnets: "125 - Swimming with Cygnets.jpg",
  Out_with_the_cygnets: "126 - Out with the cygnets.jpg",
  cygnets_playing: "127 - cygnets playing.jpg",
  among_golden_hills: "128 - among golden hillsides.jpg",
  "sillhouettes_from_ a_dappled_sky": "129 - Sillhouettes from a dappled sky.jpg",
  urban_mountains: "130 - urban mountains.jpg",
  the_weight_of_it_all: "131 - The weight of it all.jpg",
  Under_the_underground_01: "132 - Under the underground.jpg",
  Under_the_underground_02: "133 - Under the underground.jpg",
  galleries_car_park:
    "134 - 934_8279 - The Galleries car park, Bristol. with Ryan.jpg",
  trapped_within_descending_haze: "135 - Trapped within a Descending Haze.jpg",
};

function norm(s) {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function escapeCsv(value) {
  const s = value ?? "";
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function writeCsv(filePath, headers, rows) {
  const lines = [
    headers.join(","),
    ...rows.map((row) => headers.map((h) => escapeCsv(row[h] ?? "")).join(",")),
  ];
  fs.writeFileSync(filePath, lines.join("\n") + "\n", "utf8");
}

function matchFile(row, files) {
  const slug = row.slug?.trim();
  if (FILE_OVERRIDES[slug]) {
    const name = FILE_OVERRIDES[slug];
    if (files.includes(name)) return name;
  }

  const lw = slug?.match(/^lightworms-(\d+)$/);
  if (lw) {
    const n = lw[1];
    const hit = files.find((f) => new RegExp(` - ${n} - `, "i").test(f));
    if (hit) return hit;
  }

  const title = norm(row.title);
  if (!title || title === "-") return null;

  for (const f of files) {
    const fn = norm(path.parse(f).name);
    if (fn.includes(title)) return f;
  }

  const words = title.split(" ").filter((w) => w.length > 3);
  if (words.length) {
    let best = null;
    let score = 0;
    for (const f of files) {
      const fn = norm(path.parse(f).name);
      const wscore = words.filter((w) => fn.includes(w)).length;
      if (wscore > score) {
        score = wscore;
        best = f;
      }
    }
    if (score >= 2) return best;
  }
  return null;
}

function leadingMintNumber(filename) {
  const m = filename.match(/^(\d+)/);
  return m ? m[1] : "";
}

function main() {
  const files = fs.readdirSync(TOKEN_DIR);
  const { headers, rows } = readCsv(PHOTOS_CSV);

  // Fix duplicate birds slugs
  let birdsIdx = 0;
  for (const row of rows) {
    if (
      row.series_slug?.trim() === "birds in brighton" ||
      row.slug?.startsWith("birds_in_brighton_")
    ) {
      birdsIdx++;
      row.slug = `birds_in_brighton_0${birdsIdx}`;
    }
  }

  const usedFiles = new Set();
  const assetRows = new Map();
  const existingAssets = readCsv(ASSETS_CSV);
  for (const a of existingAssets.rows) {
    if (a.asset_id) assetRows.set(a.asset_id.trim(), a);
  }

  for (const row of rows) {
    const rawSeries = row.series_slug?.trim();
    if (rawSeries && SERIES_MAP[rawSeries]) {
      row.series_slug = SERIES_MAP[rawSeries];
    }

    if (!row.status?.trim()) row.status = "published";
    if (!row.subsection?.trim()) row.subsection = "captured";

    // Clear featured on rows that had TRUE except dictionary (has summary - keep featured? plan says clear batch rows 2-3)
    if (row.featured?.toUpperCase() === "TRUE" && row.slug !== "dictionary_animation_rising_01") {
      row.featured = "";
    }

    // Correct known wrong extension on pre-filled row
    if (row.slug?.trim() === "dictionary_animation_rising_01") {
      const gif = "0 - He's Rising.gif";
      if (files.includes(gif)) {
        row.image = `/work/photography/token_mints/${gif}`;
        row.asset_id = row.slug.trim();
      }
    }

    const filename = matchFile(row, files);
    if (filename && !usedFiles.has(filename)) {
      usedFiles.add(filename);
      const publicPath = `/work/photography/token_mints/${filename}`;
      if (!row.image?.trim()) row.image = publicPath;
      if (!row.asset_id?.trim()) row.asset_id = row.slug.trim();
      if (!row.sort_order?.trim()) {
        const n = leadingMintNumber(filename);
        if (n) row.sort_order = n;
      }
      const aid = row.asset_id.trim();
      if (!assetRows.has(aid)) {
        assetRows.set(aid, {
          asset_id: aid,
          role: "hero",
          source_path: "",
          public_path: publicPath,
          width: "",
          height: "",
          sha256: "",
          ingest_status: "done",
        });
      }
    }
  }

  writeCsv(PHOTOS_CSV, headers, rows);

  const assetHeaders = existingAssets.headers.length
    ? existingAssets.headers
    : [
        "asset_id",
        "role",
        "source_path",
        "public_path",
        "width",
        "height",
        "sha256",
        "ingest_status",
      ];
  writeCsv(ASSETS_CSV, assetHeaders, [...assetRows.values()]);

  const matched = rows.filter((r) => r.image?.trim()).length;
  console.log(`Updated ${rows.length} photograph rows; ${matched} with image paths.`);
  console.log(`Assets: ${assetRows.size} total entries.`);
}

main();
