/**
 * Work Explorer hub grid + hub landing pages (not chronicle categories).
 */

import { WORK_CATEGORIES } from "./categories-data.js";
import { categoryPath } from "@/lib/work-paths";

function categoryById(id) {
  const cat = WORK_CATEGORIES.find((c) => c.id === id);
  if (!cat) throw new Error(`Unknown work category: ${id}`);
  return cat;
}

function hubChildTile(categoryId, summary) {
  const cat = categoryById(categoryId);
  return {
    id: categoryId,
    label: cat.title,
    href: categoryPath(categoryId),
    summary,
  };
}

/** 2×2 feature nav on /work */
export const EXPLORER_HUB_GRID = [
  {
    id: "plotting",
    title: "Plotting",
    href: categoryPath("plotter"),
    image: "/work/plotter/hero.jpg",
  },
  {
    id: "photography",
    title: "Photography",
    href: categoryPath("photography"),
    image: "/work/photography/hero.jpg",
  },
  {
    id: "physical",
    title: "Physical objects",
    href: "/work/physical-objects",
    image: "/work/meat-hammer/hero.jpg",
  },
  {
    id: "other",
    title: "Other projects",
    href: "/work/other-projects",
    image: "/work/designing-dope/cover.jpg",
  },
];

/** /work/physical-objects — child category links */
export const PHYSICAL_OBJECT_CATEGORIES = [
  hubChildTile(
    "metalworking",
    "Cast and worked metal — recycled aluminium and functional tools."
  ),
  hubChildTile(
    "woodworking",
    "Furniture, handles, and studio objects in reclaimed wood."
  ),
];

/** Left spotlight rail on /work — hub buckets + featured project per area */
export const EXPLORER_HUB_SPOTLIGHTS = [
  {
    hubId: "plotting",
    title: "Plotting",
    filterCategoryIds: ["plotter"],
    hubHref: categoryPath("plotter"),
    featured: {
      href: "/work/plotter/projects/plotted-heads",
      title: "Plotted heads series",
      image: "/work/plotted-heads/plotter-drawings001.jpg",
      summary:
        "An evolving plotter-led portrait series where repeated marks let faces emerge through drift, density, and misalignment.",
    },
  },
  {
    hubId: "photography",
    title: "Photography",
    filterCategoryIds: ["photography"],
    hubHref: categoryPath("photography"),
    featured: {
      href: "/work/photography/projects/brighton-by-bench",
      title: "Brighton by Bench",
      image: "/work/photography/series-brighton-by-bench.jpg",
      summary:
        "100 Tezos tokens — benches as pause and permission, from the university project An Assemblage; for sitting.",
    },
  },
  {
    hubId: "physical",
    title: "Physical objects",
    filterCategoryIds: ["metalworking", "woodworking"],
    hubHref: "/work/physical-objects",
    featured: {
      href: "/work/metalworking/projects/meat-hammer",
      title: "Meat hammer (recycled aluminium)",
      image: "/work/meat-hammer/hero.jpg",
      summary:
        "A tenderising hammer cast from recycled drinks cans with a reclaimed wood handle.",
    },
  },
  {
    hubId: "other",
    title: "Other projects",
    filterCategoryIds: [
      "pc-networks",
      "film",
      "nursery",
      "philosophy",
      "crypto",
    ],
    hubHref: "/work/other-projects",
    featured: {
      href: "/work/philosophy/projects/designing-dope",
      title: "Designing Dope",
      image: "/work/designing-dope/cover.jpg",
      summary:
        "Dissertation on novel grown materials, cannabis, hemp, and producing from the natural and artificial.",
    },
  },
];

const hubSpotlightById = Object.fromEntries(
  EXPLORER_HUB_SPOTLIGHTS.map((hub) => [hub.hubId, hub])
);

/** @param {string} hubId */
export function getHubCategoryIds(hubId) {
  return hubSpotlightById[hubId]?.filterCategoryIds ?? [];
}

/** @param {string} categoryId */
export function getCategoryHubId(categoryId) {
  for (const hub of EXPLORER_HUB_SPOTLIGHTS) {
    if (hub.filterCategoryIds.includes(categoryId)) return hub.hubId;
  }
  return null;
}

/** @param {string} hubId */
export function getHubSpotlight(hubId) {
  return hubSpotlightById[hubId] ?? null;
}

/** /work/other-projects — catch-all category links */
export const OTHER_PROJECT_CATEGORIES = [
  hubChildTile(
    "pc-networks",
    "AI image generation, manipulation, and upscaling workflows."
  ),
  hubChildTile(
    "film",
    "Frame animation and numbered video chapters."
  ),
  hubChildTile(
    "nursery",
    "Plant and tree nursery experiments — placeholder until more is republished."
  ),
  hubChildTile(
    "philosophy",
    "Design dissertations, theory notes, and journal essays."
  ),
  hubChildTile(
    "crypto",
    "On-chain collecting and creating — essays and digital editions."
  ),
];
