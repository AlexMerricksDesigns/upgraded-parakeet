import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const SCHEMA = `
CREATE TABLE IF NOT EXISTS assets (
  asset_id TEXT PRIMARY KEY,
  role TEXT,
  source_path TEXT,
  public_path TEXT,
  width INTEGER,
  height INTEGER,
  sha256 TEXT,
  ingest_status TEXT DEFAULT 'pending'
);
`;

/**
 * @param {string} dbPath
 */
export function openAssetsDb(dbPath) {
  try {
    const { DatabaseSync } = require("node:sqlite");
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    const db = new DatabaseSync(dbPath);
    db.exec(SCHEMA);
    return db;
  } catch {
    return null;
  }
}

/**
 * @param {string} jsonPath
 */
export function readAssetsIndex(jsonPath) {
  if (!fs.existsSync(jsonPath)) return new Map();
  const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  return new Map(Object.entries(data));
}

export function writeAssetsIndex(jsonPath, map) {
  fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
  const obj = Object.fromEntries(map);
  fs.writeFileSync(jsonPath, JSON.stringify(obj, null, 2) + "\n", "utf8");
}

/**
 * @param {string} dbPath
 * @param {string} jsonPath
 */
export function loadAssetPaths(dbPath, jsonPath) {
  const map = new Map();
  const db = openAssetsDb(dbPath);
  if (db) {
    const rows = db.prepare("SELECT asset_id, public_path FROM assets").all();
    for (const row of rows) {
      if (row.asset_id && row.public_path) {
        map.set(row.asset_id, row.public_path);
      }
    }
    db.close();
    return map;
  }
  const index = readAssetsIndex(jsonPath);
  for (const [id, entry] of index) {
    if (entry.public_path) map.set(id, entry.public_path);
  }
  return map;
}
