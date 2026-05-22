/**
 * Media optimization helpers — sharp for raster, ffmpeg for GIF/MP4.
 */

import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

export const PRESETS = {
  hero: {
    maxWidth: 1920,
    webpQuality: 82,
    jpegQuality: 85,
  },
  card: {
    maxWidth: 1200,
    webpQuality: 80,
    jpegQuality: 82,
  },
  full: {
    maxWidth: 2400,
    webpQuality: 85,
    jpegQuality: 88,
  },
};

const RASTER_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"]);
const GIF_EXT = new Set([".gif"]);
const VIDEO_EXT = new Set([".mp4", ".mov", ".webm"]);

export async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

export function isRaster(filePath) {
  return RASTER_EXT.has(path.extname(filePath).toLowerCase());
}

export function isGif(filePath) {
  return GIF_EXT.has(path.extname(filePath).toLowerCase());
}

export function isVideo(filePath) {
  return VIDEO_EXT.has(path.extname(filePath).toLowerCase());
}

export async function hasFfmpeg() {
  return new Promise((resolve) => {
    const proc = spawn("ffmpeg", ["-version"], { stdio: "ignore" });
    proc.on("error", () => resolve(false));
    proc.on("close", (code) => resolve(code === 0));
  });
}

function runCommand(cmd, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { stdio: "inherit" });
    proc.on("error", reject);
    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited with code ${code}`));
    });
  });
}

/**
 * Resize raster to WebP + JPEG (same basename, new extensions).
 */
export async function optimizeRaster(inputPath, outputDir, presetName = "hero") {
  const preset = PRESETS[presetName] ?? PRESETS.hero;
  const base = path.basename(inputPath, path.extname(inputPath));
  await ensureDir(outputDir);

  const pipeline = sharp(inputPath, { failOn: "none" }).rotate().resize({
    width: preset.maxWidth,
    withoutEnlargement: true,
    fit: "inside",
  });

  const webpPath = path.join(outputDir, `${base}.webp`);
  const jpegPath = path.join(outputDir, `${base}.jpg`);

  await pipeline
    .clone()
    .webp({ quality: preset.webpQuality })
    .toFile(webpPath);

  await sharp(inputPath, { failOn: "none" })
    .rotate()
    .resize({
      width: preset.maxWidth,
      withoutEnlargement: true,
      fit: "inside",
    })
    .jpeg({ quality: preset.jpegQuality, mozjpeg: true })
    .toFile(jpegPath);

  return { webp: webpPath, jpeg: jpegPath, base };
}

/**
 * Static poster from GIF first frame (when ffmpeg unavailable).
 */
export async function optimizeGifPoster(inputPath, outputDir, presetName = "hero") {
  const preset = PRESETS[presetName] ?? PRESETS.hero;
  const base = path.basename(inputPath, path.extname(inputPath));
  await ensureDir(outputDir);

  const webpPath = path.join(outputDir, `${base}.webp`);
  const jpegPath = path.join(outputDir, `${base}.jpg`);

  const pipeline = sharp(inputPath, { animated: false, page: 0, failOn: "none" })
    .rotate()
    .resize({
      width: preset.maxWidth,
      withoutEnlargement: true,
      fit: "inside",
    });

  await pipeline.clone().webp({ quality: preset.webpQuality }).toFile(webpPath);
  await sharp(inputPath, { animated: false, page: 0, failOn: "none" })
    .rotate()
    .resize({
      width: preset.maxWidth,
      withoutEnlargement: true,
      fit: "inside",
    })
    .jpeg({ quality: preset.jpegQuality, mozjpeg: true })
    .toFile(jpegPath);

  return { webp: webpPath, jpeg: jpegPath, base, static: true };
}

/**
 * Convert animated GIF or MP4 to hero WebM (muted loop).
 */
export async function optimizeToHeroWebm(inputPath, outputDir) {
  await ensureDir(outputDir);
  const base = path.basename(inputPath, path.extname(inputPath));
  const outPath = path.join(outputDir, `${base}.webm`);

  await runCommand("ffmpeg", [
    "-y",
    "-i",
    inputPath,
    "-an",
    "-c:v",
    "libvpx-vp9",
    "-crf",
    "32",
    "-b:v",
    "0",
    "-vf",
    "scale='min(1920,iw)':-2",
    "-movflags",
    "+faststart",
    outPath,
  ]);

  return { webm: outPath, base };
}

/**
 * Copy non-media files verbatim (pdf, json, etc.).
 */
export async function copyFile(inputPath, outputPath) {
  await ensureDir(path.dirname(outputPath));
  await fs.copyFile(inputPath, outputPath);
}

export async function walkFiles(rootDir) {
  const results = [];
  async function walk(current) {
    const entries = await fs.readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else {
        results.push(full);
      }
    }
  }
  await walk(rootDir);
  return results;
}
