#!/usr/bin/env node
/**
 * One-time: move flat public/work/<slug> and shop/<slug> into nested layout.
 * Safe to re-run (merges into existing dirs). Run from repo root:
 *   node scripts/migrate-public-nested.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

/** @type {{ from: string; to: string }[]} */
const MOVES = [
  { from: "work/plotted-heads", to: "work/plotter/projects/plotted-heads" },
  { from: "work/meat-hammer", to: "work/physical-objects/projects/meat-hammer" },
  {
    from: "work/needle-file-handle",
    to: "work/physical-objects/projects/needle-file-handle",
  },
  {
    from: "work/shelving-a-level",
    to: "work/physical-objects/projects/shelving-a-level",
  },
  { from: "work/knife-poster", to: "work/physical-objects/projects/knife-poster" },
  { from: "work/designing-dope", to: "work/reflections/projects/designing-dope" },
  { from: "work/liminal-design", to: "work/reflections/projects/liminal-design" },
  { from: "work/drawing-studio", to: "work/photography/projects/drawing-studio" },
  { from: "work/painting-studio", to: "work/photography/projects/painting-studio" },
  { from: "shop/postcards", to: "work/plotter/products/postcards" },
  { from: "work/crypto", to: "work/photography/crypto" },
];

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function moveEntry(src, dest) {
  const stat = await fs.stat(src);
  if (stat.isDirectory()) {
    await fs.mkdir(dest, { recursive: true });
    for (const name of await fs.readdir(src)) {
      await moveEntry(path.join(src, name), path.join(dest, name));
    }
    await fs.rmdir(src);
  } else {
    await fs.mkdir(path.dirname(dest), { recursive: true });
    if (await exists(dest)) {
      console.log(`  skip file (exists): ${path.relative(PUBLIC, dest)}`);
      return;
    }
    await fs.rename(src, dest);
  }
}

async function moveTree(relFrom, relTo) {
  const src = path.join(PUBLIC, relFrom);
  const dest = path.join(PUBLIC, relTo);
  if (!(await exists(src))) return;
  console.log(`${relFrom} → ${relTo}`);
  await moveEntry(src, dest);
  // Remove empty source dir if rename left parent
  try {
    await fs.rmdir(src);
  } catch {
    /* merged or already gone */
  }
}

async function main() {
  if (!(await exists(PUBLIC))) {
    console.error("public/ not found.");
    process.exit(1);
  }

  for (const { from, to } of MOVES) {
    await moveTree(from, to);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
