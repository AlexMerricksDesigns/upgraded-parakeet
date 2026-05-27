/** URL builders for sync (mirrors lib/work-paths.js — no app imports). */

export function seriesPath(categoryId, slug) {
  return `/work/${categoryId}/series/${slug}`;
}

export function capturedPath(categoryId, slug) {
  return `/work/${categoryId}/captured/${slug}`;
}

export function productPath(categoryId, slug) {
  return `/work/${categoryId}/products/${slug}`;
}

export function journalPath(categoryId, slug) {
  return `/work/${categoryId}/journal/${slug}`;
}
