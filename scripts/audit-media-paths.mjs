#!/usr/bin/env node
/**
 * Lists /work/ asset paths that are not category-nested (projects|products|journal)
 * or category hub files. Run: node scripts/audit-media-paths.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");

const NESTED =
  /^\/work\/[a-z0-9-]+\/(projects|products|journal)\/[a-z0-9-]+\/.+/;
const HUB_FILE = /^\/work\/[a-z0-9-]+\/[^/]+\.(jpg|jpeg|png|gif|webp|webm|mp4)$/i;
const CATEGORY_HUB = /^\/work\/[a-z0-9-]+\/(hero|banner|timeline|media|shop-)/;

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (/\.(js|jsx|json)$/.test(name)) acc.push(p);
  }
  return acc;
}

const paths = new Set();
const re = /["'](\/work\/[^"']+\.(?:jpg|jpeg|png|gif|webp|webm|mp4|pdf))["']/gi;

for (const file of walk(join(ROOT, "app")).concat(walk(join(ROOT, "content"))).concat(walk(join(ROOT, "components")))) {
  const text = readFileSync(file, "utf8");
  let m;
  while ((m = re.exec(text)) !== null) paths.add(m[1]);
}

const legacy = [...paths].filter(
  (p) => !NESTED.test(p) && !HUB_FILE.test(p) && !CATEGORY_HUB.test(p) && !p.endsWith(".pdf")
);

console.log(`Found ${paths.size} work asset paths, ${legacy.length} non-canonical:\n`);
for (const p of legacy.sort()) console.log(p);
