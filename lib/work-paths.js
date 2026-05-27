/**
 * Work portfolio URL builders (no imports from categories — avoids cycles).
 * Pattern: /work/<category>/{projects|journal|products}/<slug>
 */

export function categoryPath(categoryId) {
  return `/work/${categoryId}`;
}

export function projectPath(categoryId, slug) {
  return `/work/${categoryId}/projects/${slug}`;
}

export function journalPath(categoryId, slug) {
  return `/work/${categoryId}/journal/${slug}`;
}

export function productPath(categoryId, slug) {
  return `/work/${categoryId}/products/${slug}`;
}

export function seriesPath(categoryId, slug) {
  return `/work/${categoryId}/series/${slug}`;
}

export function capturedPath(categoryId, slug) {
  return `/work/${categoryId}/captured/${slug}`;
}
