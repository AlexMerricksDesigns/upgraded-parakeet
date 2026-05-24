/**
 * Work Explorer hub grid + spotlight rail (four top-level categories).
 */

import { WORK_CATEGORIES } from "./categories-data.js";
import { categoryPath } from "@/lib/work-paths";

/** 2×2 feature nav on /work */
export const EXPLORER_HUB_GRID = [
  {
    id: "photography",
    eyebrow: "Work area",
    title: "Photography",
    summary:
      "Lens-based observation — captured works, on-chain editions, and field notes from the archive.",
    href: categoryPath("photography"),
    image: "/work/photography/hero.jpg",
    badgeLabel: "Photography",
  },
  {
    id: "plotter",
    eyebrow: "Work area",
    title: "Plotter Works",
    summary:
      "Generative and plotter-led drawing — experiments, finished pieces, and studio process.",
    href: categoryPath("plotter"),
    image: "/work/plotter/hero.jpg",
    badgeLabel: "Plotter Works",
  },
  {
    id: "physical-objects",
    eyebrow: "Work area",
    title: "Physical Objects & Systems",
    summary:
      "Tactile making, living systems, and installations — metal, wood, and embodied prototypes.",
    href: categoryPath("physical-objects"),
    image: "/work/physical-objects/projects/meat-hammer/hero.jpg",
    badgeLabel: "Physical Objects",
  },
  {
    id: "reflections",
    eyebrow: "Work area",
    title: "Reflections & Writing",
    summary:
      "Essays, dissertations, and notes on observation, value, process, and philosophy.",
    href: categoryPath("reflections"),
    image: "/work/reflections/projects/designing-dope/cover.jpg",
    badgeLabel: "Reflections",
  },
];

/** Left spotlight rail on /work — one hub per category */
export const EXPLORER_HUB_SPOTLIGHTS = [
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
    hubId: "plotter",
    title: "Plotter Works",
    filterCategoryIds: ["plotter"],
    hubHref: categoryPath("plotter"),
    featured: {
      href: "/work/plotter/projects/plotted-heads",
      title: "Plotted heads series",
      image: "/work/plotter/projects/plotted-heads/plotter-drawings001.jpg",
      summary:
        "An evolving plotter-led portrait series where repeated marks let faces emerge through drift, density, and misalignment.",
    },
  },
  {
    hubId: "physical-objects",
    title: "Physical Objects & Systems",
    filterCategoryIds: ["physical-objects"],
    hubHref: categoryPath("physical-objects"),
    featured: {
      href: "/work/physical-objects/projects/meat-hammer",
      title: "Meat hammer (recycled aluminium)",
      image: "/work/physical-objects/projects/meat-hammer/hero.jpg",
      summary:
        "A tenderising hammer cast from recycled drinks cans with a reclaimed wood handle.",
    },
  },
  {
    hubId: "reflections",
    title: "Reflections & Writing",
    filterCategoryIds: ["reflections"],
    hubHref: categoryPath("reflections"),
    featured: {
      href: "/work/reflections/projects/designing-dope",
      title: "Designing Dope",
      image: "/work/reflections/projects/designing-dope/cover.jpg",
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

/** Category titles for explorer (derived from registry). */
export function getExplorerCategoryList() {
  return WORK_CATEGORIES.map((cat) => ({
    id: cat.id,
    title: cat.title,
  }));
}
