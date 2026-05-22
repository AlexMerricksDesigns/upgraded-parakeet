import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const INGEST = path.join(
  ROOT,
  ". consolidating previous attempts content ingest folder"
);

function rm(target) {
  if (!fs.existsSync(target)) return;
  fs.rmSync(target, { recursive: true, force: true });
  console.log("Removed", path.relative(ROOT, target));
}

function unlink(rel) {
  const full = path.join(INGEST, rel);
  if (!fs.existsSync(full)) return;
  fs.unlinkSync(full);
  console.log("Deleted file", rel);
}

// Phase 0: build artifacts
rm(path.join(INGEST, "_book"));
rm(path.join(INGEST, "assets", "build"));
rm(path.join(INGEST, "assets", "Colours"));
rm(path.join(INGEST, "Newfolder"));
rm(path.join(INGEST, "gitbook"));

const rootDeletes = [
  "README.md",
  "SUMMARY.md",
  "design.md",
  "photography.md",
  "projects.md",
  "about.md",
  "contact.md",
  "video.md",
  "Website documentation.md",
  "General Notepad.md",
  "Meat Hammer.jpg",
  "Meat Tenderising Hammer.jpg",
  "Needle File Handle.gif",
  "DSCF3002.JPG",
  "Shelves2.jpg",
  "DD cover.jpg",
  "Designing Dope.pdf",
  "LD cover.png",
  "A Moment for Liminal Design.pdf",
  "Kife Prop Poster.png",
  "1500x500.jpg",
  "HicetNunc.png",
  "Leather Pouch.jpg",
  "_DSC0175.jpg",
  "_MG_4187.jpg",
];

for (const f of rootDeletes) unlink(f);

// W3 templates
for (const name of fs.readdirSync(INGEST)) {
  if (name.startsWith("tryw3css_templates_")) {
    unlink(name);
  }
}

// Writing gitbook (republished)
rm(path.join(INGEST, "assets", "gitbook content", "gitbook - writing"));

// Projects gitbook subsets republished
const projectsRoot = path.join(
  INGEST,
  "assets",
  "gitbook content",
  "gitbook - projects"
);
const projectKeep = ["Entangled Thoughts", "Glossary_Resources", "Ignore"];
if (fs.existsSync(projectsRoot)) {
  for (const name of fs.readdirSync(projectsRoot)) {
    if (projectKeep.includes(name)) continue;
    rm(path.join(projectsRoot, name));
  }
}

console.log("Cleanup done. Entangled Thoughts, Glossary, and Ignore/ left for optional phase 4.");
