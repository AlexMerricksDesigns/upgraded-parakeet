import { WORK_CATEGORIES } from "../app/work/categories-data.js";
import { journalPath, productPath, projectPath } from "./work-paths.js";

/** Permanent redirects from flat URLs to category-nested routes. */
export function buildWorkLegacyRedirects() {
  const redirects = [];

  for (const cat of WORK_CATEGORIES) {
    for (const slug of cat.slugs) {
      redirects.push({
        source: `/work/${slug}`,
        destination: projectPath(cat.id, slug),
        permanent: true,
      });
    }
    for (const slug of cat.journalSlugs ?? []) {
      redirects.push({
        source: `/journal/${slug}`,
        destination: journalPath(cat.id, slug),
        permanent: true,
      });
    }
    for (const slug of cat.productSlugs ?? []) {
      redirects.push({
        source: `/shop/${slug}`,
        destination: productPath(cat.id, slug),
        permanent: true,
      });
    }
  }

  return redirects;
}
