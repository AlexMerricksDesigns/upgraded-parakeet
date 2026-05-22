import { journalPath, projectPath } from "@/lib/work-paths";
import {
  meatHammerBlocks,
  needleFileBlocks,
  shelvingBlocks,
  designPhilosophyBlocks,
  designingDopeBlocks,
  liminalDesignBlocks,
  cryptoArtBlocks,
} from "./bodies/portfolio.js";
import { proseBlocks as drawingStudio } from "./bodies/drawing-studio.js";
import { proseBlocks as paintingStudio } from "./bodies/painting-studio.js";
import { proseBlocks as aiImageUpscaling } from "./bodies/ai-image-upscaling.js";
import { proseBlocks as theoriesThinkingDesign } from "./bodies/theories-thinking-design.js";

export const workBodies = {
  "meat-hammer": meatHammerBlocks,
  "needle-file-handle": needleFileBlocks,
  "shelving-a-level": shelvingBlocks,
  "design-philosophy": designPhilosophyBlocks,
  "designing-dope": designingDopeBlocks,
  "liminal-design": liminalDesignBlocks,
  "crypto-art-2021": cryptoArtBlocks,
  "drawing-studio": drawingStudio,
  "painting-studio": paintingStudio,
  "ai-image-upscaling": aiImageUpscaling,
  "theories-thinking-design": theoriesThinkingDesign,
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

export const workRelated = {
  "designing-dope": [
    { href: projectPath("philosophy", "liminal-design"), label: "Liminal Design", eyebrow: "Work" },
    { href: projectPath("philosophy", "design-philosophy"), label: "Design philosophy", eyebrow: "Work" },
  ],
  "liminal-design": [
    { href: projectPath("philosophy", "designing-dope"), label: "Designing Dope", eyebrow: "Work" },
  ],
  crypto: [
    { href: journalPath("crypto", "crypto-art-value-paradigm"), label: "Cryptoart essay", eyebrow: "Journal" },
    { href: "/work/crypto/products/digital-editions", label: "Digital editions", eyebrow: "Shop" },
  ],
  "drawing-studio": [
    { href: projectPath("photography", "painting-studio"), label: "Painting studio", eyebrow: "Work" },
  ],
  "painting-studio": [
    { href: projectPath("photography", "drawing-studio"), label: "Drawing studio", eyebrow: "Work" },
  ],
  "design-philosophy": [
    { href: projectPath("philosophy", "theories-thinking-design"), label: "Theories on design", eyebrow: "Work" },
  ],
  "theories-thinking-design": [
    { href: projectPath("philosophy", "design-philosophy"), label: "Design philosophy", eyebrow: "Work" },
  ],
};

export const workGalleries = {
  "shelving-a-level": [
    { src: "/work/shelving-a-level/DSCF3002.jpg", alt: "A-Level shelving project.", caption: "The unit built from a reclaimed wardrobe." },
    { src: "/work/shelving-a-level/Shelves2.jpg", alt: "Shelving in use.", caption: "Still in use as storage." },
  ],
  "drawing-studio": [
    { src: "/work/drawing-studio/_MG_5154.jpg", alt: "Drawing studio photograph.", caption: "Studio drawing work." },
    { src: "/work/drawing-studio/_MG_3928.jpg", alt: "Drawing experiment.", caption: "Projection and line studies." },
  ],
  "painting-studio": [
    { src: "/work/painting-studio/_MG_4784.jpg", alt: "Painting studio.", caption: "Painting and macro studies." },
    { src: "/work/painting-studio/_MG_4956.jpg", alt: "Macro study.", caption: "Reverse-lens macro work." },
  ],
};

export const workDownloads = {
  "designing-dope": { href: "/work/designing-dope/designing-dope.pdf", label: "Download Designing Dope (PDF)" },
  "liminal-design": { href: "/work/liminal-design/liminal-design.pdf", label: "Download Liminal Design (PDF)" },
};
