#!/usr/bin/env node
/**
 * One-time helper: move public_originals/ to nested work/<category>/ layout.
 * Safe to re-run (skips if destination exists). Run assets:optimize:all after.
 *
 *   node scripts/migrate-public-layout.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { WORK_CATEGORIES } from "../app/work/categories-data.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ORIG = path.join(ROOT, "public_originals");

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function moveDir(src, dest) {
  if (!(await exists(src))) return false;
  if (await exists(dest)) {
    console.log(`  skip (exists): ${path.relative(ROOT, dest)}`);
    return false;
  }
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.rename(src, dest);
  console.log(`  moved: ${path.relative(ROOT, src)} → ${path.relative(ROOT, dest)}`);
  return true;
}

async function main() {
  if (!(await exists(ORIG))) {
    console.error("public_originals/ not found.");
    process.exit(1);
  }

  for (const cat of WORK_CATEGORIES) {
    for (const slug of cat.slugs) {
      await moveDir(
        path.join(ORIG, "work", slug),
        path.join(ORIG, "work", cat.id, "projects", slug)
      );
    }
    for (const slug of cat.productSlugs ?? []) {
      await moveDir(
        path.join(ORIG, "shop", slug),
        path.join(ORIG, "work", cat.id, "products", slug)
      );
    }
  }

  console.log("\nDone. Run: npm run assets:optimize:all");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
