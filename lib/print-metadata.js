import photographyManifest from "@/app/work/photography-manifest.json";
import workManifest from "@/app/work/manifest.json";
import { getWorkBySlug } from "@/lib/manifests";
import {
  getPhotographyCaptured,
  getPhotographySeries,
} from "@/lib/photography-registry";
import { capturedPath, productPath, projectPath, seriesPath } from "@/lib/work-paths";

/**
 * @typedef {Object} PrintMeta
 * @property {boolean} printAvailable
 * @property {string[]} [sizes]
 * @property {string} [priceRange]
 * @property {string} [productSlug]
 */

/**
 * @param {import("@/app/work/manifest.json")[number] | undefined} entry
 * @returns {PrintMeta | null}
 */
export function printMetaFromManifest(entry) {
  if (!entry) return null;
  const available = Boolean(entry.printAvailable);
  if (!available && !entry.print) return null;
  return {
    printAvailable: available,
    sizes: entry.print?.sizes,
    priceRange: entry.print?.priceRange,
    productSlug: entry.print?.productSlug,
  };
}

/**
 * @param {string} slug
 * @returns {PrintMeta | null}
 */
export function getProjectPrintMeta(slug) {
  const photo =
    getPhotographyCaptured(slug) ?? getPhotographySeries(slug) ?? getWorkBySlug(slug);
  return printMetaFromManifest(photo);
}

/**
 * @param {string} categoryId
 * @param {PrintMeta | null} meta
 * @returns {string}
 */
export function resolvePrintProductHref(categoryId, meta) {
  if (meta?.productSlug) {
    return productPath(categoryId, meta.productSlug);
  }
  return `${productPath(categoryId, "limited-prints")}`;
}

/**
 * Featured print-eligible works for a category hub.
 * @param {{ categoryId: string; limit?: number; extra?: object[] }} opts
 */
export function getPrintFeaturedForHub({ categoryId, limit = 6, extra = [] }) {
  const workEntries =
    categoryId === "photography"
      ? [
          ...photographyManifest.filter((p) => p.status === "published"),
          ...workManifest.filter((p) => p.href?.includes(`/work/${categoryId}/`)),
        ]
      : workManifest.filter((p) => p.href?.includes(`/work/${categoryId}/`));

  const fromManifest = workEntries
    .filter((p) => p.status === "published" && p.printAvailable)
    .map((p) => {
      const meta = printMetaFromManifest(p);
      const detailHref =
        p.kind === "captured"
          ? capturedPath(categoryId, p.slug)
          : p.kind === "series"
            ? seriesPath(categoryId, p.slug)
            : projectPath(categoryId, p.slug);
      return {
        slug: p.slug,
        title: p.title,
        image: p.image ?? p.heroImage,
        summary: p.summary,
        href: resolvePrintProductHref(categoryId, meta),
        projectHref: detailHref,
        sizes: meta?.sizes?.join(", ") ?? null,
        priceRange: meta?.priceRange ?? null,
      };
    });

  const merged = [...fromManifest, ...extra];
  const seen = new Set();
  const unique = [];
  for (const item of merged) {
    const key = item.slug ?? item.title;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
  }
  return unique.slice(0, limit);
}

/**
 * Attach print fields to a project tile object.
 * @param {object} tile
 * @param {import("@/app/work/manifest.json")[number] | undefined} manifestEntry
 */
export function attachPrintToTile(tile, manifestEntry) {
  const meta = printMetaFromManifest(manifestEntry);
  if (!meta?.printAvailable) return tile;
  return {
    ...tile,
    printAvailable: true,
    print: meta,
  };
}
