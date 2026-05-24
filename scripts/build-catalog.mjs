import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const INGEST = path.join(
  ROOT,
  ". consolidating previous attempts content ingest folder"
);
const OUT = path.join(ROOT, "content", "catalog.json");

const SKIP_DIRS = new Set([
  "_book",
  "node_modules",
  ".git",
  "assets/build",
  "assets/Colours",
]);

const DELETE_ARTIFACTS = [
  "_book",
  path.join("assets", "build"),
  path.join("assets", "Colours"),
];

const CATALOG_ENTRIES = [
  {
    slug: "plotted-heads",
    type: "work",
    route: "/work/plotter/projects/plotted-heads",
    title: "Plotted heads series",
    status: "published",
    canonical: null,
    related: [{ href: "/work/plotter/products/postcards", label: "Postcard Series" }],
  },
  {
    slug: "meat-hammer",
    type: "work",
    route: "/work/metalworking/projects/meat-hammer",
    title: "Meat hammer (recycled aluminium)",
    status: "published",
    canonical: "projects.md",
    sources: ["projects.md"],
    assets: ["Meat Hammer.jpg"],
    related: [],
  },
  {
    slug: "needle-file-handle",
    type: "work",
    route: "/work/needle-file-handle",
    title: "Needle file handle",
    status: "published",
    canonical: "projects.md",
    sources: ["projects.md"],
    assets: ["Needle File Handle.gif"],
    related: [],
  },
  {
    slug: "shelving-a-level",
    type: "work",
    route: "/work/shelving-a-level",
    title: "A-Level shelving",
    status: "published",
    canonical: "projects.md",
    sources: ["projects.md"],
    assets: ["DSCF3002.JPG", "Shelves2.jpg"],
    related: [],
  },
  {
    slug: "designing-dope",
    type: "work",
    route: "/work/designing-dope",
    title: "Designing Dope",
    status: "published",
    canonical: "design.md",
    sources: ["design.md"],
    assets: ["DD cover.jpg", "Designing Dope.pdf"],
    related: [{ href: "/work/liminal-design", label: "Liminal Design" }],
  },
  {
    slug: "liminal-design",
    type: "work",
    route: "/work/liminal-design",
    title: "Liminal Design",
    status: "published",
    canonical: "design.md",
    sources: ["design.md"],
    assets: ["LD cover.png", "A Moment for Liminal Design.pdf"],
    related: [{ href: "/work/designing-dope", label: "Designing Dope" }],
  },
  {
    slug: "knife-poster",
    type: "work",
    route: "/work/knife-poster",
    title: "Knife prop poster",
    status: "published",
    canonical: "design.md",
    sources: ["design.md"],
    assets: ["Kife Prop Poster.png"],
    related: [],
  },
  {
    slug: "design-philosophy",
    type: "work",
    route: "/work/design-philosophy",
    title: "Towards a Philosophy of Design",
    status: "published",
    canonical: "design.md",
    sources: ["design.md"],
    assets: [],
    related: [{ href: "/work/designing-dope", label: "Designing Dope" }],
  },
  {
    slug: "crypto-art-2021",
    type: "work",
    route: "/work/crypto-art-2021",
    title: "Photography and on-chain work",
    status: "published",
    canonical: "photography.md",
    sources: ["photography.md"],
    assets: ["1500x500.jpg", "HicetNunc.png"],
    related: [
      { href: "/journal/crypto-art-value-paradigm", label: "Cryptoart essay" },
      { href: "/journal/the-problem-of-value", label: "The Problem of Value" },
    ],
  },
  {
    slug: "drawing-studio",
    type: "work",
    route: "/work/drawing-studio",
    title: "Drawing studio",
    status: "published",
    canonical:
      "assets/gitbook content/gitbook - projects/Arty Porjects/Drawing/Blog.md",
    sources: [
      "assets/gitbook content/gitbook - projects/Arty Porjects/Drawing/Blog.md",
      "assets/gitbook content/gitbook - projects/Arty Porjects/Drawing/Projections.md",
      "assets/gitbook content/gitbook - projects/Arty Porjects/Drawing/A Start.md",
    ],
    related: [{ href: "/work/painting-studio", label: "Painting studio" }],
  },
  {
    slug: "painting-studio",
    type: "work",
    route: "/work/painting-studio",
    title: "Painting studio",
    status: "published",
    canonical:
      "assets/gitbook content/gitbook - projects/Arty Porjects/Painting/Blog.md",
    sources: [
      "assets/gitbook content/gitbook - projects/Arty Porjects/Painting/Blog.md",
      "assets/gitbook content/gitbook - projects/Arty Porjects/Painting/Constancy of memory.md",
      "assets/gitbook content/gitbook - projects/Arty Porjects/Painting/The Macro World.md",
    ],
    related: [{ href: "/work/drawing-studio", label: "Drawing studio" }],
  },
  {
    slug: "ai-image-upscaling",
    type: "work",
    route: "/work/ai-image-upscaling",
    title: "AI image generation and upscaling",
    status: "published",
    canonical:
      "assets/gitbook content/gitbook - projects/Arty Porjects/AI Image Generation and Upscaling.md",
    sources: [
      "assets/gitbook content/gitbook - projects/Arty Porjects/AI Image Generation and Upscaling.md",
    ],
    related: [],
  },
  {
    slug: "frame-animation-series",
    type: "work",
    route: "/work/frame-animation-series",
    title: "Frame animation series",
    status: "published",
    canonical: null,
    sources: [],
    assets: [
      "1. Widows and Orphans.mp4",
      "2. internal chaos of a calm exterior.mp4",
      "3. the firmament of perseverance.mp4",
      "5. What's in a letter.mp4",
      "6. and there i left him tranced.mp4",
      "8. Exposed to a Damoclean extant.mp4",
    ],
    related: [],
  },
  {
    slug: "the-problem-of-value",
    type: "journal",
    route: "/journal/the-problem-of-value",
    title: "The Problem of Value",
    status: "published",
    canonical:
      "assets/gitbook content/gitbook - writing/Articles/The Problem of Value.md",
    sources: [
      "assets/gitbook content/gitbook - writing/Articles/The Problem of Value.md",
    ],
    related: [
      { href: "/journal/crypto-art-value-paradigm", label: "Cryptoart essay" },
      { href: "/work/crypto-art-2021", label: "On-chain photography" },
    ],
  },
  {
    slug: "crypto-art-value-paradigm",
    type: "journal",
    route: "/journal/crypto-art-value-paradigm",
    title: "Cryptoart, Value, and a Cultural Paradigm Shift",
    status: "published",
    canonical:
      "assets/gitbook content/gitbook - writing/Articles/Crypto Art.md",
    sources: [
      "assets/gitbook content/gitbook - writing/Articles/Crypto Art.md",
    ],
    related: [
      { href: "/journal/the-problem-of-value", label: "The Problem of Value" },
      { href: "/work/crypto-art-2021", label: "On-chain photography" },
    ],
  },
  {
    slug: "nationalism",
    type: "journal",
    route: "/journal/nationalism",
    title: "Nationalism, or how to love your nation",
    status: "published",
    canonical:
      "assets/gitbook content/gitbook - writing/Articles/Nationalism.md",
    sources: [
      "assets/gitbook content/gitbook - writing/Articles/Nationalism.md",
    ],
    related: [],
  },
  {
    slug: "god-metaphysical-reality",
    type: "journal",
    route: "/journal/god-metaphysical-reality",
    title: "God is a metaphysical reality, not a superhero",
    status: "published",
    canonical:
      "assets/gitbook content/gitbook - writing/Articles/God is a metaphysical reality.md",
    sources: [
      "assets/gitbook content/gitbook - writing/Articles/God is a metaphysical reality.md",
    ],
    related: [],
  },
  {
    slug: "poverty-of-the-input",
    type: "journal",
    route: "/journal/poverty-of-the-input",
    title: "On the poverty of the input",
    status: "published",
    canonical:
      "assets/gitbook content/gitbook - writing/Articles/On the poverty of the input.md",
    sources: [
      "assets/gitbook content/gitbook - writing/Articles/On the poverty of the input.md",
    ],
    related: [],
  },
  {
    slug: "strata-judgements-of-god",
    type: "journal",
    route: "/journal/strata-judgements-of-god",
    title: "The Strata are Judgements of God",
    status: "published",
    canonical:
      "assets/gitbook content/gitbook - writing/Articles/The Strata are Judgements of God.md",
    sources: [
      "assets/gitbook content/gitbook - writing/Articles/The Strata are Judgements of God.md",
      "assets/gitbook content/gitbook - writing/Notes/SNotes.md",
    ],
    related: [{ href: "/journal/strata-notes", label: "Strata notes" }],
  },
  {
    slug: "strata-notes",
    type: "journal",
    route: "/journal/strata-notes",
    title: "Notes on The Strata are Judgements of God",
    status: "published",
    canonical: "assets/gitbook content/gitbook - writing/Notes/SNotes.md",
    sources: ["assets/gitbook content/gitbook - writing/Notes/SNotes.md"],
    related: [
      { href: "/journal/strata-judgements-of-god", label: "The Strata essay" },
    ],
  },
  {
    slug: "nature-stars-sky",
    type: "journal",
    route: "/journal/nature-stars-sky",
    title: "Nature, Stars, and the Sky",
    status: "published",
    canonical:
      "assets/gitbook content/gitbook - writing/Photography/thestars.md",
    sources: [
      "assets/gitbook content/gitbook - writing/Photography/thestars.md",
    ],
    related: [{ href: "/work/crypto-art-2021", label: "Photography work" }],
  },
  {
    slug: "ur-antifascism",
    type: "journal",
    route: "/journal/ur-antifascism",
    title: "Ur-AntiFascism",
    status: "published",
    canonical:
      "assets/gitbook content/gitbook - writing/Research/Ur-AntiFascism.md",
    sources: [
      "assets/gitbook content/gitbook - writing/Research/Ur-AntiFascism.md",
    ],
    related: [],
  },
  {
    slug: "crypto-art-research",
    type: "journal",
    route: "/journal/crypto-art-research",
    title: "Crypto (research)",
    status: "published",
    canonical:
      "assets/gitbook content/gitbook - writing/Research/CryptoArt.md",
    sources: [
      "assets/gitbook content/gitbook - writing/Research/CryptoArt.md",
    ],
    related: [{ href: "/journal/crypto-art-value-paradigm", label: "Cryptoart essay" }],
  },
  {
    slug: "firmament-godhead",
    type: "journal",
    route: "/journal/firmament-godhead",
    title: "Firmament and the Godhead",
    status: "published",
    canonical:
      "assets/gitbook content/gitbook - projects/Extended Thoughts/Firmament and the Godhead.md",
    sources: [
      "assets/gitbook content/gitbook - projects/Extended Thoughts/Firmament and the Godhead.md",
    ],
    related: [],
  },
  {
    slug: "theories-thinking-design",
    type: "work",
    route: "/work/theories-thinking-design",
    title: "Theories on Thinking about Design",
    status: "published",
    canonical:
      "assets/gitbook content/gitbook - projects/Extended Thoughts/Theories on Thinking about Design.md",
    sources: [
      "assets/gitbook content/gitbook - projects/Extended Thoughts/Theories on Thinking about Design.md",
    ],
    related: [{ href: "/work/design-philosophy", label: "Design philosophy" }],
  },
  {
    slug: "universities",
    type: "journal",
    route: "/journal/universities",
    title: "We Need to Talk about the Universities",
    status: "published",
    canonical:
      "assets/gitbook content/gitbook - projects/Extended Thoughts/We Need to Talk About Universities.md",
    sources: [
      "assets/gitbook content/gitbook - projects/Extended Thoughts/We Need to Talk About Universities.md",
    ],
    related: [],
  },
  {
    slug: "rhizome-dota-ti9",
    type: "journal",
    route: "/journal/rhizome-dota-ti9",
    title: "Researching via Rhizomatisation (Dota 2)",
    status: "published",
    canonical:
      "assets/gitbook content/gitbook - projects/Extended Thoughts/Researching via Rhizomatisation - Dota 2 - TI9.md",
    sources: [
      "assets/gitbook content/gitbook - projects/Extended Thoughts/Researching via Rhizomatisation - Dota 2 - TI9.md",
    ],
    related: [],
  },
  {
    slug: "poems-blink",
    type: "journal",
    route: "/journal/poems-blink",
    title: "Poems — Blink",
    status: "published",
    canonical:
      "assets/gitbook content/gitbook - projects/Poetry/Poems - Blink.md",
    sources: [
      "assets/gitbook content/gitbook - projects/Poetry/Poems - Blink.md",
    ],
    related: [{ href: "/journal/poems-fractionation", label: "Fractionation" }],
  },
  {
    slug: "poems-fractionation",
    type: "journal",
    route: "/journal/poems-fractionation",
    title: "Poems — Fractionation",
    status: "published",
    canonical:
      "assets/gitbook content/gitbook - projects/Poetry/Poems - Fractionation.md",
    sources: [
      "assets/gitbook content/gitbook - projects/Poetry/Poems - Fractionation.md",
    ],
    related: [{ href: "/journal/poems-blink", label: "Blink" }],
  },
  {
    slug: "postcards",
    type: "shop",
    route: "/shop/postcards",
    title: "Postcard Series (6-card set)",
    status: "published",
    canonical: null,
    related: [{ href: "/work/plotted-heads", label: "Plotted heads series" }],
  },
  {
    slug: "digital-editions",
    type: "shop",
    route: "/shop/digital-editions",
    title: "Digital editions",
    status: "published",
    canonical: "photography.md",
    related: [
      { href: "/work/crypto-art-2021", label: "On-chain photography" },
      { href: "/journal/crypto-art-value-paradigm", label: "Cryptoart essay" },
    ],
  },
];

function hashFile(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(buf).digest("hex");
}

function walk(dir, base = INGEST) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = path.relative(base, full);
    const top = rel.split(path.sep)[0];
    if (SKIP_DIRS.has(top) || SKIP_DIRS.has(name)) continue;
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      if (name === ".git") continue;
      results.push(...walk(full, base));
    } else {
      results.push({ rel: rel.replace(/\\/g, "/"), full, mtime: st.mtime.toISOString(), size: st.size });
    }
  }
  return results;
}

function enrichEntry(entry) {
  const duplicates = [];
  let mtime = null;
  for (const src of entry.sources || []) {
    const full = path.join(INGEST, src);
    if (fs.existsSync(full)) {
      mtime = fs.statSync(full).mtime.toISOString();
    }
  }
  if (entry.canonical) {
    const full = path.join(INGEST, entry.canonical);
    if (fs.existsSync(full) && !mtime) {
      mtime = fs.statSync(full).mtime.toISOString();
    }
  }
  const year = mtime ? new Date(mtime).getFullYear().toString() : "—";
  const date = mtime
    ? new Date(mtime).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;
  return {
    ...entry,
    mtime,
    year,
    date,
    duplicates,
    deleteAfterPublish: [
      ...(entry.sources || []),
      ...(entry.assets || []).map((a) => (entry.canonical ? path.dirname(entry.canonical) : ".") + "/" + a),
    ].filter(Boolean),
  };
}

function findDuplicates(files) {
  const byHash = new Map();
  for (const f of files) {
    if (f.size > 5_000_000) continue;
    try {
      const h = hashFile(f.full);
      if (!byHash.has(h)) byHash.set(h, []);
      byHash.get(h).push(f.rel);
    } catch {
      /* skip */
    }
  }
  const dups = [];
  for (const [, paths] of byHash) {
    if (paths.length > 1) dups.push(paths);
  }
  return dups;
}

const allFiles = walk(INGEST);
const duplicateGroups = findDuplicates(allFiles);

const items = CATALOG_ENTRIES.map(enrichEntry);

const catalog = {
  generatedAt: new Date().toISOString(),
  ingestRoot: ". consolidating previous attempts content ingest folder",
  deleteArtifacts: DELETE_ARTIFACTS,
  skipEntangledAndIgnore: true,
  duplicateGroups,
  items,
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(catalog, null, 2));
console.log(`Wrote ${items.length} catalog entries to ${OUT}`);
console.log(`Found ${duplicateGroups.length} duplicate file groups`);
