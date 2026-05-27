#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(
  fs.readFileSync(path.join(ROOT, "app/journal/manifest.json"), "utf8")
);

function esc(v) {
  const s = String(v ?? "");
  return `"${s.replace(/"/g, '""')}"`;
}

const rows = manifest.map((e) => {
  const cat = (e.href.match(/\/work\/([^/]+)\/journal/) || [])[1] || "reflections";
  return [e.slug, e.title, cat, e.date, e.year, e.summary, e.status].map(esc).join(",");
});

const csv = ["slug,title,category,date,year,summary,status", ...rows].join("\n") + "\n";
fs.writeFileSync(path.join(ROOT, "data/journal.csv"), csv, "utf8");
console.log(`export-journal-csv ok — ${rows.length} rows`);
