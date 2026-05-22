/**
 * Static asset URLs (files live under public/, mirrored by route).
 *
 *   workAsset("plotted-heads", "hero.jpg")  → /work/plotted-heads/hero.jpg
 *   shopAsset("postcards", "IMG_5206.jpg")  → /shop/postcards/IMG_5206.jpg
 *   sharedAsset("hero/_MG_0444.jpg")        → /assets/hero/_MG_0444.jpg
 *
 * Source-of-truth layout is documented in app/assets/README.md.
 */

export function workAsset(slug, filename = "") {
  const base = `/work/${slug}`;
  return filename ? `${base}/${filename.replace(/^\//, "")}` : base;
}

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
