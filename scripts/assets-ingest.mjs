#!/usr/bin/env node
/**
 * Copy assets from source_path into public/ and update catalog.db / assets-index.json.
 * Run after adding rows to data/assets.csv.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { readCsv } from "./lib/parse-csv.mjs";
import {
  openAssetsDb,
  readAssetsIndex,
  writeAssetsIndex,
} from "./lib/assets-db.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DB_PATH = path.join(ROOT, "data/catalog.db");
const INDEX_PATH = path.join(ROOT, "data/assets-index.json");
const CSV_PATH = path.join(ROOT, "data/assets.csv");
const PUBLIC = path.join(ROOT, "public");

function copyToPublic(sourcePath, publicPath) {
  if (!sourcePath?.trim() || !publicPath?.trim()) return false;
  const src = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.join(ROOT, sourcePath);
  if (!fs.existsSync(src)) return false;
  const dest = path.join(PUBLIC, publicPath.replace(/^\//, ""));
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  return true;
}

function main() {
  const { rows } = readCsv(CSV_PATH);
  const db = openAssetsDb(DB_PATH);
  let updated = 0;
  let missing = 0;

  if (db) {
    const update = db.prepare(
      `UPDATE assets SET public_path = ?, ingest_status = ? WHERE asset_id = ?`
    );
    for (const row of rows) {
      const id = row.asset_id?.trim();
      if (!id) continue;
      const publicPath = row.public_path?.trim();
      const sourcePath = row.source_path?.trim();
      if (sourcePath && publicPath && copyToPublic(sourcePath, publicPath)) {
        update.run(publicPath, "done", id);
        updated++;
      } else if (publicPath && fs.existsSync(path.join(PUBLIC, publicPath.replace(/^\//, "")))) {
        update.run(publicPath, "done", id);
        updated++;
      } else if (!publicPath && !sourcePath) {
        missing++;
      }
    }
    db.close();
  } else {
    const index = readAssetsIndex(INDEX_PATH);
    for (const row of rows) {
      const id = row.asset_id?.trim();
      if (!id) continue;
      const entry = index.get(id) ?? { ...row };
      const publicPath = row.public_path?.trim();
      const sourcePath = row.source_path?.trim();
      if (sourcePath && publicPath && copyToPublic(sourcePath, publicPath)) {
        entry.public_path = publicPath;
        entry.ingest_status = "done";
        updated++;
      } else if (publicPath) {
        entry.ingest_status = fs.existsSync(
          path.join(PUBLIC, publicPath.replace(/^\//, ""))
        )
          ? "done"
          : "missing";
      }
      index.set(id, entry);
    }
    writeAssetsIndex(INDEX_PATH, index);
  }

  console.log(
    `assets:ingest ok — ${updated} ready, ${missing} without paths (add source_path or run assets:optimize)`
  );
}

main();
