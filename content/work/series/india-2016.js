import {
  categoryPath,
  projectPath,
  seriesPath,
} from "@/lib/work-paths";

/** /work/photography/series/india-2016 */
// Promo / working assets: public/work/photography/projects/ — e.g. india-2016-feature-01.jpg at public root when published as a capture row.
export const page = {
  layout: "series",
  meta: {
    title: "India 2016 archive",
    intro:
      "First Canon 400D journey — Agra, Taj Mahal region, architecture, travel, and cultural scenes.",
    description:
      "The DSLR turning point — borrowed mother's Canon 400D for India, then continued on the first body through Brighton and beyond.",
    date: "2016",
    series: "india-2016",
    tags: ["India", "Travel", "Canon 400D", "Archive"],
  },
  breadcrumb: {
    category: "photography",
    series: "india-2016",
    label: "India 2016 archive",
  },
  hero: {
    year: "2016",
    image: "/work/photography/series-india-2016.jpg",
    alt: "India 2016 — travel and architecture from first Canon 400D journey",
    description:
      "Early–mid: borrowed Canon 400D for Agra and the Taj Mahal region. Late: post-India learning curve — intentional, technical photography begins.",
  },
  intro: {
    paragraphs: [
      "Before 2016 the habit was point-and-shoot — family heritage, everyday and travel subjects. India with the 400D changed the technical and intentional frame: architecture at scale, cultural distance, and the discipline of carrying a DSLR body. That archive still feeds mints and edits in 2023–2025 reflection passes.",
      "Now on the third Canon body and nearly 100,000 images total, 2016 remains the hinge year named on the category homepage timeline.",
    ],
  },
  statement: {
    title: "What this archive holds",
    paragraphs: [
      "Large India archive — architecture, travel, cultural scenes. Camera: Canon 400D (first body, borrowed). Significance: shift from casual to intentional practice.",
    ],
  },
  crossLinks: [
    {
      href: seriesPath("photography", "brighton-by-bench"),
      label: "Brighton by Bench",
      summary: "Later flagship minted collection on Tezos",
    },
    {
      href: projectPath("photography", "painting-studio"),
      label: "Painting studio",
      summary: "Later studio macro work — lens in the making space",
    },
    {
      href: categoryPath("photography"),
      label: "Photography hub",
      summary: "On-chain minting from 2021 — archive instances tokenised",
    },
  ],
};
