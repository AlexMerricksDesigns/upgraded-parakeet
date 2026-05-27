/**
 * Category slug registry (no manifest imports — safe for next.config).
 * Photography captured slugs are merged from categories-data.generated.js (content:sync).
 */

import {
  WORK_CATEGORIES_BASE,
  flattenCategorySlugs,
} from "./categories-data.base.js";
import { PHOTOGRAPHY_SLUGS_BY_SUBSECTION } from "./categories-data.generated.js";

export { flattenCategorySlugs };

function mergePhotographySlugs(categories) {
  return categories.map((cat) => {
    if (cat.id !== "photography") return cat;
    return {
      ...cat,
      subsections: (cat.subsections ?? []).map((sub) => {
        const generated = PHOTOGRAPHY_SLUGS_BY_SUBSECTION[sub.id];
        if (!generated) return sub;
        return {
          ...sub,
          seriesSlugs: generated.seriesSlugs ?? sub.seriesSlugs ?? [],
          photoSlugs: generated.photoSlugs ?? sub.photoSlugs ?? [],
        };
      }),
    };
  });
}

export const WORK_CATEGORIES = mergePhotographySlugs(WORK_CATEGORIES_BASE);
