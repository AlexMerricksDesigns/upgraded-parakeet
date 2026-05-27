import photographsCatalog from "@/content/catalog/photographs.json";
import productsCatalog from "@/content/catalog/products.json";
import seriesCatalog from "@/content/catalog/series.json";

/** @param {string} slug */
export function getCatalogPhotograph(slug) {
  return photographsCatalog[slug] ?? null;
}

/** @param {string} slug */
export function getCatalogSeries(slug) {
  return seriesCatalog[slug] ?? null;
}

/** @param {string} slug */
export function getCatalogProduct(slug) {
  return productsCatalog[slug] ?? null;
}

export function getAllCatalogPhotographSlugs() {
  return Object.keys(photographsCatalog);
}
