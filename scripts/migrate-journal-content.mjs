#!/usr/bin/env node
/**
 * One-time: copy app/journal/bodies/*.js → content/journal/posts/*.js
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { WORK_CATEGORIES } from "../app/work/categories-data.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BODIES = path.join(ROOT, "app/journal/bodies");
const OUT = path.join(ROOT, "content/journal/posts");

function categoryForJournalSlug(slug) {
  for (const cat of WORK_CATEGORIES) {
    if (cat.journalSlugs?.includes(slug)) return cat.id;
  }
  return null;
}

await fs.promises.mkdir(OUT, { recursive: true });

for (const file of fs.readdirSync(BODIES)) {
  if (!file.endsWith(".js")) continue;
  const slug = file.replace(/\.js$/, "");
  const category = categoryForJournalSlug(slug);
  if (!category) {
    console.warn(`skip ${slug}: no category`);
    continue;
  }
  const bodySrc = await fs.promises.readFile(
    path.join(BODIES, file),
    "utf8"
  );
  const blocksMatch = bodySrc.match(
    /export const proseBlocks = (\[[\s\S]*\]);/
  );
  if (!blocksMatch) {
    console.warn(`skip ${slug}: no proseBlocks`);
    continue;
  }
  const out = `/** /work/${category}/journal/${slug} */
export const page = {
  layout: "journalArticle",
  breadcrumb: { category: "${category}", label: null },
  sections: [
    { type: "proseBlocks", blocks: ${blocksMatch[1]} },
  ],
};
`;
  await fs.promises.writeFile(path.join(OUT, `${slug}.js`), out, "utf8");
  console.log(`wrote ${slug}.js`);
}
