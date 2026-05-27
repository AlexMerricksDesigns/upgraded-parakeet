/**
 * Category structure and non-photography slug lists (hand-maintained).
 * Photography seriesSlugs / photoSlugs come from categories-data.generated.js (content:sync).
 */

/** Flatten subsection slug lists onto a category. */
export function flattenCategorySlugs(cat) {
  const slugs = [];
  const journalSlugs = [];
  const productSlugs = [];
  const seriesSlugs = [];
  const photoSlugs = [];

  for (const sub of cat.subsections ?? []) {
    if (sub.slugs?.length) slugs.push(...sub.slugs);
    if (sub.journalSlugs?.length) journalSlugs.push(...sub.journalSlugs);
    if (sub.productSlugs?.length) productSlugs.push(...sub.productSlugs);
    if (sub.seriesSlugs?.length) seriesSlugs.push(...sub.seriesSlugs);
    if (sub.photoSlugs?.length) photoSlugs.push(...sub.photoSlugs);
  }

  return { slugs, journalSlugs, productSlugs, seriesSlugs, photoSlugs };
}

/** @type {import("./categories-data.js").WorkCategory[]} */
export const WORK_CATEGORIES_BASE = [
  {
    id: "photography",
    title: "Photography",
    subsections: [
      {
        id: "captured",
        title: "Captured Works",
        seriesSlugs: [],
        photoSlugs: [],
        slugs: ["painting-studio", "drawing-studio"],
      },
      {
        id: "published",
        title: "Published (NFTs)",
        journalSlugs: [
          "crypto-art-value-paradigm",
          "the-problem-of-value",
          "crypto-art-research",
        ],
        productSlugs: ["digital-editions", "limited-prints"],
      },
      {
        id: "field-notes",
        title: "Field Notes",
        journalSlugs: ["archive-editing-2025"],
      },
    ],
  },
  {
    id: "plotter",
    title: "Plotter Works",
    subsections: [
      {
        id: "experiments",
        title: "Experiments",
        slugs: ["ai-image-upscaling"],
      },
      {
        id: "finished",
        title: "Finished Pieces",
        slugs: ["plotted-heads"],
        productSlugs: ["postcards"],
      },
      {
        id: "process",
        title: "Process / Studio",
        journalSlugs: ["polargraph-process-notes"],
      },
    ],
  },
  {
    id: "physical-objects",
    title: "Physical Objects & Systems",
    subsections: [
      {
        id: "living-systems",
        title: "Living Systems",
        slugs: [],
      },
      {
        id: "prototypes",
        title: "Prototypes",
        slugs: [
          "meat-hammer",
          "needle-file-handle",
          "shelving-a-level",
          "knife-poster",
        ],
      },
      {
        id: "installations",
        title: "Installations",
        slugs: ["frame-animation-series"],
      },
    ],
  },
  {
    id: "reflections",
    title: "Reflections & Writing",
    subsections: [
      {
        id: "essays",
        title: "Essays",
        journalSlugs: [
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
        ],
      },
      {
        id: "dissertations",
        title: "Dissertations & Studio",
        slugs: [
          "design-philosophy",
          "designing-dope",
          "liminal-design",
          "theories-thinking-design",
        ],
      },
      {
        id: "notes",
        title: "Notes",
        journalSlugs: [],
      },
    ],
  },
];
