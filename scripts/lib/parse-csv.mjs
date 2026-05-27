import fs from "node:fs";

/**
 * Minimal RFC-style CSV parser (quoted fields, commas).
 * @param {string} text
 * @returns {{ headers: string[], rows: Record<string, string>[] }}
 */
export function parseCsv(text) {
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const nonEmpty = lines.filter((line, i) => line.trim() !== "" || i === 0);
  if (nonEmpty.length === 0) return { headers: [], rows: [] };

  const headers = parseRow(nonEmpty[0]);
  const rows = [];
  for (let i = 1; i < nonEmpty.length; i++) {
    const values = parseRow(nonEmpty[i]);
    if (values.every((v) => v.trim() === "")) continue;
    const row = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j].trim()] = (values[j] ?? "").trim();
    }
    rows.push(row);
  }
  return { headers, rows };
}

function parseRow(line) {
  const out = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cur += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}

/**
 * @param {string} filePath
 */
export function readCsv(filePath) {
  if (!fs.existsSync(filePath)) {
    return { headers: [], rows: [] };
  }
  return parseCsv(fs.readFileSync(filePath, "utf8"));
}

export function parsePipeList(value) {
  if (!value || !value.trim()) return [];
  return value
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function parseBool(value) {
  if (!value) return false;
  const v = value.toLowerCase();
  return v === "true" || v === "1" || v === "yes";
}

export function parseIntOr(value, fallback) {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}
