import fs from "fs";

const crypto = new Set([
  "crypto-art-value-paradigm",
  "the-problem-of-value",
  "crypto-art-research",
]);
const philosophy = new Set([
  "nationalism",
  "god-metaphysical-reality",
  "poverty-of-the-input",
  "strata-judgements-of-god",
  "strata-notes",
  "nature-stars-sky",
  "ur-antifascism",
  "firmament-godhead",
  "universities",
  "rhizome-dota-ti9",
  "poems-blink",
  "poems-fractionation",
]);

function catFor(slug) {
  if (crypto.has(slug)) return "crypto";
  if (philosophy.has(slug)) return "philosophy";
  return null;
}

const path = "app/journal/manifest.json";
const data = JSON.parse(fs.readFileSync(path, "utf8"));

for (const e of data) {
  const c = catFor(e.slug);
  if (c) e.href = `/work/${c}/journal/${e.slug}`;
  if (e.related) {
    e.related = e.related.map((r) => {
      const m = r.href?.match(/^\/journal\/([^/]+)$/);
      if (!m) return r;
      const c2 = catFor(m[1]);
      return c2 ? { ...r, href: `/work/${c2}/journal/${m[1]}` } : r;
    });
  }
}

fs.writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
console.log(`updated ${data.length} journal entries`);
