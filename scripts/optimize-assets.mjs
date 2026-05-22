#!/usr/bin/env node
/**
 * Build optimized public/ from public_originals/.
 *
 * Usage:
 *   npm run assets:optimize
 *   node scripts/optimize-assets.mjs [--scope=hero|all]
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  copyFile,
  ensureDir,
  fileExists,
  hasFfmpeg,
  isGif,
  isRaster,
  isVideo,
  optimizeGifPoster,
  optimizeRaster,
  optimizeToHeroWebm,
  walkFiles,
} from "./lib/optimize-media.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ORIGINALS = path.join(ROOT, "public_originals");
const OUTPUT = path.join(ROOT, "public");

const scopeArg = process.argv.find((a) => a.startsWith("--scope="));
const scope = scopeArg?.split("=")[1] ?? "hero";

const HERO_NAMES = new Set([
  "about-hero",
  "journal-hero",
  "contact-hero",
  "shop-hero",
  "portfolio-hero",
  "_MG_0444",
  "_MG_2096",
  "_MG_3265",
  "_MG_3586",
]);

function isHeroAsset(relPath) {
  const normalized = relPath.replace(/\\/g, "/");
  if (!normalized.startsWith("assets/hero/")) return false;
  const base = path.basename(normalized, path.extname(normalized));
  return HERO_NAMES.has(base) || scope === "all";
}

function shouldProcess(relPath) {
  if (scope === "all") return true;
  return isHeroAsset(relPath);
}

async function mirrorPassthrough(relPath) {
  const src = path.join(ORIGINALS, relPath);
  const dest = path.join(OUTPUT, relPath);
  await copyFile(src, dest);
}

async function processHeroRaster(relPath, preset = "hero") {
  const src = path.join(ORIGINALS, relPath);
  const outDir = path.join(OUTPUT, path.dirname(relPath));
  const { webp, jpeg } = await optimizeRaster(src, outDir, preset);
  console.log(`  raster: ${relPath} → ${path.basename(webp)}, ${path.basename(jpeg)}`);
}

async function processHeroMotion(relPath) {
  const src = path.join(ORIGINALS, relPath);
  const outDir = path.join(OUTPUT, path.dirname(relPath));
  const { webm } = await optimizeToHeroWebm(src, outDir);
  console.log(`  motion: ${relPath} → ${path.basename(webm)}`);
}

async function processHeroGifPoster(relPath) {
  const src = path.join(ORIGINALS, relPath);
  const outDir = path.join(OUTPUT, path.dirname(relPath));
  const { webp, jpeg } = await optimizeGifPoster(src, outDir, "hero");
  console.log(
    `  gif poster (no ffmpeg): ${relPath} → ${path.basename(webp)}, ${path.basename(jpeg)}`,
  );
}

async function main() {
  if (!(await fileExists(ORIGINALS))) {
    console.error(
      "public_originals/ not found. Copy or rename public/ to public_originals/ first.",
    );
    process.exit(1);
  }

  const ffmpegOk = await hasFfmpeg();
  if (!ffmpegOk) {
    console.warn(
      "Warning: ffmpeg not found — GIF/MP4 heroes will be skipped. Install ffmpeg for shop-hero.",
    );
  }

  console.log(`Optimizing scope="${scope}" from public_originals/ → public/`);

  await fs.rm(OUTPUT, { recursive: true, force: true });
  await ensureDir(OUTPUT);

  const allFiles = await walkFiles(ORIGINALS);
  const relFiles = allFiles.map((f) => path.relative(ORIGINALS, f));

  let processed = 0;
  let mirrored = 0;

  for (const rel of relFiles) {
    const src = path.join(ORIGINALS, rel);
    const ext = path.extname(rel).toLowerCase();

    if (!shouldProcess(rel)) {
      await mirrorPassthrough(rel);
      mirrored += 1;
      continue;
    }

    if (isRaster(rel)) {
      await processHeroRaster(rel, "hero");
      processed += 1;
      continue;
    }

    if (isGif(rel)) {
      if (ffmpegOk) {
        await processHeroMotion(rel);
      } else {
        await processHeroGifPoster(rel);
      }
      processed += 1;
      continue;
    }

    if (isVideo(rel)) {
      if (!ffmpegOk) {
        console.warn(`  skip (no ffmpeg): ${rel}`);
        await mirrorPassthrough(rel);
        mirrored += 1;
        continue;
      }
      await processHeroMotion(rel);
      processed += 1;
      continue;
    }

    await mirrorPassthrough(rel);
    mirrored += 1;
  }

  console.log(`Done. Optimized: ${processed}, mirrored: ${mirrored}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
