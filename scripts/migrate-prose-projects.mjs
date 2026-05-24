#!/usr/bin/env node
/**
 * One-time: create content/work/projects/*.js for prose-layout projects.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { WORK_CATEGORIES } from "../app/work/categories-data.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "content/work/projects");

const portfolio = await import(
  pathToFileURL(path.join(ROOT, "app/work/bodies/portfolio.js")).href
);

const extraBodies = {
  "drawing-studio": (
    await import(
      pathToFileURL(path.join(ROOT, "app/work/bodies/drawing-studio.js")).href
    )
  ).proseBlocks,
  "painting-studio": (
    await import(
      pathToFileURL(path.join(ROOT, "app/work/bodies/painting-studio.js")).href
    )
  ).proseBlocks,
  "ai-image-upscaling": (
    await import(
      pathToFileURL(path.join(ROOT, "app/work/bodies/ai-image-upscaling.js"))
        .href
    )
  ).proseBlocks,
  "theories-thinking-design": (
    await import(
      pathToFileURL(
        path.join(ROOT, "app/work/bodies/theories-thinking-design.js")
      ).href
    )
  ).proseBlocks,
};

const slugBlocks = {
  "meat-hammer": portfolio.meatHammerBlocks,
  "needle-file-handle": portfolio.needleFileBlocks,
  "shelving-a-level": portfolio.shelvingBlocks,
  "design-philosophy": portfolio.designPhilosophyBlocks,
  "designing-dope": portfolio.designingDopeBlocks,
  "liminal-design": portfolio.liminalDesignBlocks,
  ...extraBodies,
  "frame-animation-series": [
    {
      type: "p",
      text: "A numbered series of frame-animation chapters. Video files are being moved to external hosting for the live site; chapter titles are preserved from the original working archive.",
    },
    {
      type: "p",
      text: "1. Widows and Orphans · 2. Internal chaos of a calm exterior · 3. The firmament of perseverance · 5. What's in a letter · 6. And there I left him tranced · 8. Exposed to a Damoclean extant",
    },
    {
      type: "p",
      text: "(Chapters 4 and 7 were not present in the cold-storage archive.)",
    },
  ],
  "knife-poster": [
    {
      type: "blockquote",
      text: "Design proposition poster for final year studio project.",
    },
    {
      type: "p",
      text: "How do people keep the tools they own? This poster was part of a final-year studio exploration of tool ownership, storage, and everyday repair.",
    },
  ],
};

const galleries = {
  "shelving-a-level": [
    {
      src: "/work/shelving-a-level/DSCF3002.jpg",
      alt: "A-Level shelving project.",
      caption: "The unit built from a reclaimed wardrobe.",
    },
    {
      src: "/work/shelving-a-level/Shelves2.jpg",
      alt: "Shelving in use.",
      caption: "Still in use as storage.",
    },
  ],
  "drawing-studio": [
    {
      src: "/work/drawing-studio/_MG_5154.jpg",
      alt: "Drawing studio photograph.",
      caption: "Studio drawing work.",
    },
    {
      src: "/work/drawing-studio/_MG_3928.jpg",
      alt: "Drawing experiment.",
      caption: "Projection and line studies.",
    },
  ],
  "painting-studio": [
    {
      src: "/work/painting-studio/_MG_4784.jpg",
      alt: "Painting studio.",
      caption: "Painting and macro studies.",
    },
    {
      src: "/work/painting-studio/_MG_4956.jpg",
      alt: "Macro study.",
      caption: "Reverse-lens macro work.",
    },
  ],
};

const downloads = {
  "designing-dope": {
    href: "/work/designing-dope/designing-dope.pdf",
    label: "Download Designing Dope (PDF)",
  },
  "liminal-design": {
    href: "/work/liminal-design/liminal-design.pdf",
    label: "Download Liminal Design (PDF)",
  },
};

const related = {
  "designing-dope": [
    {
      href: "/work/philosophy/projects/liminal-design",
      label: "Liminal Design",
      eyebrow: "Work",
    },
    {
      href: "/work/philosophy/projects/design-philosophy",
      label: "Design philosophy",
      eyebrow: "Work",
    },
  ],
  "liminal-design": [
    {
      href: "/work/philosophy/projects/designing-dope",
      label: "Designing Dope",
      eyebrow: "Work",
    },
  ],
  "drawing-studio": [
    {
      href: "/work/photography/projects/painting-studio",
      label: "Painting studio",
      eyebrow: "Work",
    },
  ],
  "painting-studio": [
    {
      href: "/work/photography/projects/drawing-studio",
      label: "Drawing studio",
      eyebrow: "Work",
    },
  ],
  "design-philosophy": [
    {
      href: "/work/philosophy/projects/theories-thinking-design",
      label: "Theories on design",
      eyebrow: "Work",
    },
  ],
  "theories-thinking-design": [
    {
      href: "/work/philosophy/projects/design-philosophy",
      label: "Design philosophy",
      eyebrow: "Work",
    },
  ],
};

const RICH = new Set([
  "plotted-heads",
  "brighton-by-bench",
  "lightworms",
  "india-2016",
]);

function categoryForSlug(slug) {
  for (const cat of WORK_CATEGORIES) {
    if (cat.slugs.includes(slug)) return cat.id;
  }
  return null;
}

await fs.promises.mkdir(OUT, { recursive: true });

for (const [slug, blocks] of Object.entries(slugBlocks)) {
  if (RICH.has(slug)) continue;
  const category = categoryForSlug(slug);
  if (!category) {
    console.warn(`skip ${slug}`);
    continue;
  }
  const sections = [{ type: "proseBlocks", blocks }];
  if (galleries[slug]) {
    sections.push({ type: "gallery", title: "Gallery", items: galleries[slug] });
  }
  if (downloads[slug]) {
    sections.push({ type: "download", ...downloads[slug] });
  }
  const page = {
    layout: "prose",
    breadcrumb: { category, label: null },
    sections,
  };
  if (related[slug]) page.related = related[slug];

  const file = `/** /work/${category}/projects/${slug} */\nexport const page = ${JSON.stringify(page, null, 2).replace(/"([^"]+)":/g, "$1:")};\n`;
  // JSON.stringify loses functions - use util inspect instead
  const { inspect } = await import("node:util");
  const out = `/** /work/${category}/projects/${slug} */
export const page = ${inspect(page, { depth: null, compact: false })
    .replace(/\n/g, "\n")
    .replace(/'/g, '"')};
`;
  // inspect uses single quotes - use a simpler approach: write with template
  const body = `/** /work/${category}/projects/${slug} */
import { blocks } from "./${slug}.blocks.js";
export const page = {
  layout: "prose",
  breadcrumb: { category: "${category}", label: null },
  sections: [
    { type: "proseBlocks", blocks },
${galleries[slug] ? `    { type: "gallery", title: "Gallery", items: GALLERY },\n` : ""}${downloads[slug] ? `    { type: "download", href: ${JSON.stringify(downloads[slug].href)}, label: ${JSON.stringify(downloads[slug].label)} },\n` : ""}  ],
${related[slug] ? `  related: ${JSON.stringify(related[slug], null, 2).replace(/\n/g, "\n  ")},\n` : ""}};
`;
  // Too messy - write blocks inline using fs read from source files

  let blocksLiteral = JSON.stringify(blocks, null, 2);
  let sectionsCode = `[
    { type: "proseBlocks", blocks: ${blocksLiteral} }`;
  if (galleries[slug]) {
    sectionsCode += `,\n    { type: "gallery", title: "Gallery", items: ${JSON.stringify(galleries[slug], null, 2)} }`;
  }
  if (downloads[slug]) {
    sectionsCode += `,\n    { type: "download", href: ${JSON.stringify(downloads[slug].href)}, label: ${JSON.stringify(downloads[slug].label)} }`;
  }
  sectionsCode += "\n  ]";

  let relatedCode = "";
  if (related[slug]) {
    relatedCode = `,\n  related: ${JSON.stringify(related[slug], null, 2)}`;
  }

  const final = `/** /work/${category}/projects/${slug} */
export const page = {
  layout: "prose",
  breadcrumb: { category: "${category}", label: null },
  sections: ${sectionsCode}${relatedCode}
};
`;
  await fs.promises.writeFile(path.join(OUT, `${slug}.js`), final, "utf8");
  console.log(`prose ${slug}`);
}
