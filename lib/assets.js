/**
 * Static asset URLs (files live under public/, mirrored by route).
 *
 *   categoryAsset("plotter", "hero.jpg")
 *     → /work/plotter/hero.jpg
 *   threadAsset("plotter", "projects", "plotted-heads", "hero.jpg")
 *     → /work/plotter/projects/plotted-heads/hero.jpg
 *   sharedAsset("hero/_MG_0444.jpg") → /assets/hero/_MG_0444.jpg
 *
 * Layout mirrors URLs under public/ — see app/assets/README.md
 */

export function categoryAsset(category, filename = "") {
  const base = `/work/${category}`;
  return filename ? `${base}/${filename.replace(/^\//, "")}` : base;
}

/** @param {"projects"|"products"|"journal"} kind */
export function threadAsset(category, kind, slug, filename = "") {
  const base = `/work/${category}/${kind}/${slug}`;
  return filename ? `${base}/${filename.replace(/^\//, "")}` : base;
}

/** @deprecated Prefer threadAsset(category, "projects", slug, file) */
export function workAsset(slug, filename = "") {
  const base = `/work/${slug}`;
  return filename ? `${base}/${filename.replace(/^\//, "")}` : base;
}

/** @deprecated Prefer threadAsset(category, "products", slug, file) */
export function shopAsset(slug, filename = "") {
  const base = `/shop/${slug}`;
  return filename ? `${base}/${filename.replace(/^\//, "")}` : base;
}

export function sharedAsset(path = "") {
  const base = "/assets";
  return path ? `${base}/${path.replace(/^\//, "")}` : base;
}

/** @deprecated use workAsset */
export { workAsset as workPageAsset } from "./assets.js";
