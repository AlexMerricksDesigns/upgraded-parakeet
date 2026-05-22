import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const INGEST = path.join(
  ROOT,
  ". consolidating previous attempts content ingest folder"
);

const ASSET_COPIES = [
  ["Meat Hammer.jpg", "public/work/meat-hammer/hero.jpg"],
  ["Needle File Handle.gif", "public/work/needle-file-handle/hero.gif"],
  ["DSCF3002.JPG", "public/work/shelving-a-level/DSCF3002.jpg"],
  ["Shelves2.jpg", "public/work/shelving-a-level/Shelves2.jpg"],
  ["DD cover.jpg", "public/work/designing-dope/cover.jpg"],
  ["Designing Dope.pdf", "public/work/designing-dope/designing-dope.pdf"],
  ["LD cover.png", "public/work/liminal-design/cover.png"],
  ["A Moment for Liminal Design.pdf", "public/work/liminal-design/liminal-design.pdf"],
  ["Kife Prop Poster.png", "public/work/knife-poster/poster.png"],
  ["1500x500.jpg", "public/work/crypto/banner.jpg"],
  ["HicetNunc.png", "public/work/crypto/hicetnunc.png"],
  ["_MG_4187.jpg", "public/assets/contact/_MG_4187.jpg"],
];

const PROSE_SOURCES = [
  [
    "assets/gitbook content/gitbook - writing/Articles/The Problem of Value.md",
    "app/journal/bodies/the-problem-of-value.js",
  ],
  [
    "assets/gitbook content/gitbook - writing/Articles/Crypto Art.md",
    "app/journal/bodies/crypto-art-value-paradigm.js",
  ],
  [
    "assets/gitbook content/gitbook - writing/Articles/Nationalism.md",
    "app/journal/bodies/nationalism.js",
  ],
  [
    "assets/gitbook content/gitbook - writing/Articles/God is a metaphysical reality.md",
    "app/journal/bodies/god-metaphysical-reality.js",
  ],
  [
    "assets/gitbook content/gitbook - writing/Articles/On the poverty of the input.md",
    "app/journal/bodies/poverty-of-the-input.js",
  ],
  [
    "assets/gitbook content/gitbook - writing/Articles/The Strata are Judgements of God.md",
    "app/journal/bodies/strata-judgements-of-god.js",
  ],
  [
    "assets/gitbook content/gitbook - writing/Notes/SNotes.md",
    "app/journal/bodies/strata-notes.js",
  ],
  [
    "assets/gitbook content/gitbook - writing/Photography/thestars.md",
    "app/journal/bodies/nature-stars-sky.js",
  ],
  [
    "assets/gitbook content/gitbook - writing/Research/Ur-AntiFascism.md",
    "app/journal/bodies/ur-antifascism.js",
  ],
  [
    "assets/gitbook content/gitbook - writing/Research/CryptoArt.md",
    "app/journal/bodies/crypto-art-research.js",
  ],
  [
    "assets/gitbook content/gitbook - projects/Extended Thoughts/Firmament and the Godhead.md",
    "app/journal/bodies/firmament-godhead.js",
  ],
  [
    "assets/gitbook content/gitbook - projects/Extended Thoughts/We Need to Talk About Universities.md",
    "app/journal/bodies/universities.js",
  ],
  [
    "assets/gitbook content/gitbook - projects/Extended Thoughts/Researching via Rhizomatisation - Dota 2 - TI9.md",
    "app/journal/bodies/rhizome-dota-ti9.js",
  ],
  [
    "assets/gitbook content/gitbook - projects/Poetry/Poems - Blink.md",
    "app/journal/bodies/poems-blink.js",
  ],
  [
    "assets/gitbook content/gitbook - projects/Poetry/Poems - Fractionation.md",
    "app/journal/bodies/poems-fractionation.js",
  ],
  [
    "assets/gitbook content/gitbook - projects/Extended Thoughts/Theories on Thinking about Design.md",
    "app/work/bodies/theories-thinking-design.js",
  ],
  [
    "assets/gitbook content/gitbook - projects/Arty Porjects/AI Image Generation and Upscaling.md",
    "app/work/bodies/ai-image-upscaling.js",
  ],
];

for (const [src, dest] of ASSET_COPIES) {
  const from = path.join(INGEST, src);
  const to = path.join(ROOT, dest);
  if (!fs.existsSync(from)) {
    console.warn("Missing asset:", src);
    continue;
  }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  console.log("Copied", dest);
}

const artyDir = path.join(
  INGEST,
  "assets/gitbook content/gitbook - projects/Arty Porjects"
);
for (const sub of ["Drawing", "Painting"]) {
  const dir = path.join(artyDir, sub);
  if (!fs.existsSync(dir)) continue;
  const slug = sub === "Drawing" ? "drawing-studio" : "painting-studio";
  const destDir = path.join(ROOT, "public/work", slug);
  fs.mkdirSync(destDir, { recursive: true });
  for (const f of fs.readdirSync(dir)) {
    if (/\.(jpg|jpeg|png|gif)$/i.test(f)) {
      fs.copyFileSync(path.join(dir, f), path.join(destDir, f));
      console.log("Copied", `public/work/${slug}/${f}`);
    }
  }
}

for (const [src, dest] of PROSE_SOURCES) {
  const input = path.join(INGEST, src);
  const output = path.join(ROOT, dest);
  if (!fs.existsSync(input)) {
    console.warn("Missing prose source:", src);
    continue;
  }
  execSync(`node "${path.join(__dirname, "md-to-prose.mjs")}" "${input}" "${output}"`, {
    stdio: "inherit",
  });
}

console.log("Setup complete.");
