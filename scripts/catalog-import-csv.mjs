#!/usr/bin/env node
/** Import data/assets.csv into data/catalog.db (SQLite) or data/assets-index.json fallback. */

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

function main() {
  const { rows } = readCsv(CSV_PATH);
  const db = openAssetsDb(DB_PATH);

  if (db) {
    const upsert = db.prepare(`
      INSERT INTO assets (asset_id, role, source_path, public_path, width, height, sha256, ingest_status)
      VALUES (@asset_id, @role, @source_path, @public_path, @width, @height, @sha256, @ingest_status)
      ON CONFLICT(asset_id) DO UPDATE SET
        role = excluded.role,
        source_path = excluded.source_path,
        public_path = excluded.public_path,
        width = excluded.width,
        height = excluded.height,
        sha256 = excluded.sha256,
        ingest_status = excluded.ingest_status
    `);
    for (const row of rows) {
      if (!row.asset_id?.trim()) continue;
      upsert.run({
        asset_id: row.asset_id.trim(),
        role: row.role?.trim() || "hero",
        source_path: row.source_path?.trim() || null,
        public_path: row.public_path?.trim() || null,
        width: row.width ? Number(row.width) : null,
        height: row.height ? Number(row.height) : null,
        sha256: row.sha256?.trim() || null,
        ingest_status: row.ingest_status?.trim() || "pending",
      });
    }
    db.close();
    console.log(`catalog:import-csv ok — ${rows.length} rows → ${DB_PATH}`);
    return;
  }

  const index = readAssetsIndex(INDEX_PATH);
  for (const row of rows) {
    if (!row.asset_id?.trim()) continue;
    index.set(row.asset_id.trim(), {
      role: row.role?.trim() || "hero",
      source_path: row.source_path?.trim() || "",
      public_path: row.public_path?.trim() || "",
      ingest_status: row.ingest_status?.trim() || "pending",
    });
  }
  writeAssetsIndex(INDEX_PATH, index);
  console.log(
    `catalog:import-csv ok — ${rows.length} rows → ${INDEX_PATH} (SQLite unavailable)`
  );
}

main();
