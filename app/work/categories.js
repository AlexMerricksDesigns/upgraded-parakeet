/**
 * Work category threads — registry, paths, Explorer nav, breadcrumbs.
 *
 * URLs: /work/<category>/{projects|journal|products}/<slug>
 * Assets: public/work/<category>/projects|products|journal/<slug>/ (see app/assets/README.md)
 */

import journalManifest from "@/app/journal/manifest.json";
import shopManifest from "@/app/shop/manifest.json";
import workManifest from "@/app/work/manifest.json";
import { attachPrintToTile } from "@/lib/print-metadata";
import {
  getPhotographyManifestForExplorer,
  manifestToCapturedTiles,
  manifestToSeriesTiles,
} from "@/lib/photography-registry";
import {
  categoryPath,
  journalPath,
  productPath,
  projectPath,
} from "@/lib/work-paths";

export { WORK_CATEGORIES, flattenCategorySlugs } from "./categories-data.js";
import { WORK_CATEGORIES, flattenCategorySlugs } from "./categories-data.js";

/** @param {string|null|undefined} value */
function manifestImage(value) {
  return value && value !== "[Placeholder image]" ? value : null;
}

/** Category with flattened slug arrays (backward-compatible shape). */
export function getWorkCategory(id) {
  const cat = WORK_CATEGORIES.find((c) => c.id === id);
  if (!cat) return undefined;
  const flat = flattenCategorySlugs(cat);
  return { ...cat, ...flat, route: categoryPath(cat.id) };
}

export const WORK_COLLECTION_IDS = WORK_CATEGORIES.map((c) => c.id);

function findCategoryIdForSlug(slug, field) {
  for (const cat of WORK_CATEGORIES) {
    for (const sub of cat.subsections ?? []) {
      if (sub[field]?.includes(slug)) return cat.id;
    }
    if (field === "slugs" && cat.id === slug) return cat.id;
  }
  return undefined;
}

export function getCategoryForSeriesSlug(slug) {
  return getWorkCategory(findCategoryIdForSlug(slug, "seriesSlugs"));
}

export function getCategoryForCapturedSlug(slug) {
  return getWorkCategory(findCategoryIdForSlug(slug, "photoSlugs"));
}

export function getCategoryForWorkSlug(slug) {
  return getWorkCategory(findCategoryIdForSlug(slug, "slugs"));
}

export function getCategoryForJournalSlug(slug) {
  return getWorkCategory(findCategoryIdForSlug(slug, "journalSlugs"));
}

export function getCategoryForProductSlug(slug) {
  return getWorkCategory(findCategoryIdForSlug(slug, "productSlugs"));
}

function resolveWork(slug) {
  return workManifest.find((p) => p.slug === slug && p.status === "published");
}

function resolveJournal(slug) {
  return journalManifest.find((p) => p.slug === slug && p.status === "published");
}

function resolveProduct(slug) {
  return shopManifest.find((p) => p.slug === slug && p.published !== false);
}

export function manifestToProjectTiles(categoryId, slugs) {
  return slugs
    .map((slug) => resolveWork(slug))
    .filter(Boolean)
    .map((p) =>
      attachPrintToTile(
        {
          slug: p.slug,
          title: p.title,
          year: p.year,
          summary: p.summary,
          href: projectPath(categoryId, p.slug),
          external: false,
          image: manifestImage(p.image),
          platform: "Project",
        },
        p
      )
    );
}

function platformFromTags(tags) {
  if (!tags?.length) return "Journal";
  const joined = tags.join(" · ");
  const onChain = ["Tezos", "objkt", "hic et nunc", "NFT", "crypto"];
  if (tags.some((t) => onChain.some((o) => t.toLowerCase().includes(o.toLowerCase())))) {
    return joined;
  }
  return "Journal";
}

export function journalToTiles(categoryId, slugs) {
  return slugs
    .map((slug) => resolveJournal(slug))
    .filter(Boolean)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      year: p.year || p.date,
      summary: p.summary,
      href: journalPath(categoryId, p.slug),
      external: false,
      image: manifestImage(p.image),
      platform: platformFromTags(p.tags),
    }));
}

export function productToTiles(categoryId, slugs) {
  return slugs
    .map((slug) => resolveProduct(slug))
    .filter(Boolean)
    .map((p) => ({
      slug: p.slug,
      title: p.name,
      year: p.status,
      summary: p.summary,
      href: productPath(categoryId, p.slug),
      external: false,
      image: manifestImage(p.image),
      platform: p.format ? `${p.format}${p.price ? ` · ${p.price}` : ""}` : "Product",
    }));
}

function subsectionToSection(categoryId, sub) {
  const groups = [];
  const series = manifestToSeriesTiles(categoryId, sub.seriesSlugs ?? []);
  const captured = manifestToCapturedTiles(categoryId, sub.photoSlugs ?? []);
  const projects = manifestToProjectTiles(categoryId, sub.slugs ?? []);
  const journals = journalToTiles(categoryId, sub.journalSlugs ?? []);
  const products = productToTiles(categoryId, sub.productSlugs ?? []);

  if (series.length) {
    groups.push({ id: "series", title: "Series", items: series });
  }
  if (captured.length) {
    groups.push({ id: "captured-photos", title: "Highlights", items: captured });
  }
  if (projects.length) {
    groups.push({ id: "projects", title: "Studio projects", items: projects });
  }
  if (journals.length) {
    groups.push({ id: "journal", title: "Journal", items: journals });
  }
  if (products.length) {
    groups.push({ id: "products", title: "Products", items: products });
  }

  if (!groups.length) return null;

  return {
    id: sub.id,
    title: sub.title,
    intro: null,
    groups,
  };
}

/** Thread sections grouped by hub subsection (for category homepages). */
export function categorySubsectionSections(category) {
  return (category.subsections ?? [])
    .map((sub) => subsectionToSection(category.id, sub))
    .filter(Boolean);
}

/** Single subsection thread section by id (e.g. captured, published). */
export function getCategorySubsection(category, subsectionId) {
  return (
    categorySubsectionSections(category).find((s) => s.id === subsectionId) ??
    null
  );
}

/** Thread sections for a category homepage (flat Projects / Journal / Products). */
export function categoryThreadSections(category) {
  const flat = flattenCategorySlugs(category);
  const sections = [];
  const projects = manifestToProjectTiles(category.id, flat.slugs);
  const journals = journalToTiles(category.id, flat.journalSlugs);
  const products = productToTiles(category.id, flat.productSlugs);

  if (projects.length) {
    sections.push({
      id: "projects",
      title: "Projects",
      intro: "Work pages in this thread.",
      groups: [{ id: "main", title: "On this site", items: projects }],
    });
  }
  if (journals.length) {
    sections.push({
      id: "journal",
      title: "Journal",
      intro: "Essays and notes filed under this thread (also listed on the Journal index).",
      groups: [{ id: "main", title: "Posts", items: journals }],
    });
  }
  if (products.length) {
    sections.push({
      id: "products",
      title: "Products",
      intro: "Shop editions connected to this thread.",
      groups: [{ id: "main", title: "Store", items: products }],
    });
  }
  return sections;
}

/** @deprecated */
export function defaultProjectsSection(category, opts) {
  const sections = categoryThreadSections(category);
  return sections[0] ?? null;
}

function parseYear(year) {
  if (!year) return 0;
  const match = String(year).match(/(\d{4})/);
  if (match) return parseInt(match[1], 10);
  const n = parseInt(String(year).slice(0, 4), 10);
  return Number.isFinite(n) ? n : 0;
}

/** Prefer explicit year label; for ranges in date, use the latest year (e.g. 2024–2025 → 2025). */
function parseJournalSortKey(entry) {
  const fromYear = parseYear(entry.year);
  if (fromYear > 0) return fromYear;

  const raw = entry.date || "";
  const matches = String(raw).match(/\d{4}/g);
  if (matches?.length) {
    return parseInt(matches[matches.length - 1], 10);
  }
  return 0;
}

const TIMELINE_YEAR_MIN = 1900;
const TIMELINE_YEAR_MAX = 2100;

/** Year for spine markers; null when undated (products, TBC, etc.). */
export function getChronicleTimelineYear(item) {
  const fromLabel = parseYear(item.year);
  if (fromLabel >= TIMELINE_YEAR_MIN && fromLabel <= TIMELINE_YEAR_MAX) {
    return fromLabel;
  }
  const sort = item.sortYear ?? 0;
  if (sort >= TIMELINE_YEAR_MIN && sort <= TIMELINE_YEAR_MAX) {
    return sort;
  }
  return null;
}

const CATEGORY_HUB_IDS = new Set(WORK_COLLECTION_IDS);

function isCategoryHubHref(href) {
  if (!href) return false;
  const path = href.split("?")[0].split("#")[0];
  const match = path.match(/^\/work\/([^/]+)$/);
  return Boolean(match && CATEGORY_HUB_IDS.has(match[1]));
}

/**
 * Explorer chronicle: all threaded projects, journal posts, and shop products
 * from the category registry (sorted for /work spine timeline). Category hub
 * routes (/work/<id>) are excluded.
 */
export function getExplorerChronicleItems() {
  const items = [];

  for (const cat of WORK_CATEGORIES) {
    const { slugs, journalSlugs, productSlugs, seriesSlugs, photoSlugs } =
      flattenCategorySlugs(cat);

    if (cat.id === "photography") {
      for (const entry of getPhotographyManifestForExplorer()) {
        items.push(entry);
      }
    }

    for (const slug of slugs) {
      const work = resolveWork(slug);
      if (!work) continue;
      items.push({
        slug: work.slug,
        href: work.href,
        title: work.title,
        year: work.year,
        summary: work.summary,
        image: manifestImage(work.image),
        categoryId: cat.id,
        sortYear: parseYear(work.year),
      });
    }

    for (const slug of journalSlugs) {
      const journal = resolveJournal(slug);
      if (!journal) continue;
      items.push({
        slug: journal.slug,
        href: journal.href,
        title: journal.title,
        year: journal.year || journal.date,
        summary: journal.summary,
        image: manifestImage(journal.image),
        categoryId: cat.id,
        sortYear: parseJournalSortKey(journal),
      });
    }

    for (const slug of productSlugs) {
      const product = resolveProduct(slug);
      if (!product) continue;
      items.push({
        slug: product.slug,
        href: product.href,
        title: product.name,
        year: product.status,
        summary: product.summary,
        image: manifestImage(product.image),
        categoryId: cat.id,
        sortYear: 0,
      });
    }
  }

  const seen = new Set();
  return items
    .filter((item) => {
      if (isCategoryHubHref(item.href)) return false;
      if (seen.has(item.href)) return false;
      seen.add(item.href);
      return true;
    })
    .sort(
      (a, b) =>
        b.sortYear - a.sortYear || a.title.localeCompare(b.title)
    );
}

/**
 * Group chronicle items by sortYear for spine year markers (newest year first).
 * Input must already be sorted as from getExplorerChronicleItems / filteredChronicle.
 *
 * @returns {{ year: number, yearLabel: string, items: object[] }[]}
 */
export function groupChronicleByYear(items) {
  if (!items?.length) return [];

  const groups = [];
  for (const item of items) {
    const year = getChronicleTimelineYear(item);
    if (year == null) continue;
    const last = groups[groups.length - 1];
    if (last && last.year === year) {
      last.items.push(item);
    } else {
      groups.push({
        year,
        yearLabel: String(year),
        items: [item],
      });
    }
  }
  return groups;
}

/** Up to `limit` nav cards for Explorer category accordions (text-only, sorted by recency). */
export function getCategoryNavCards(category, limit = 3) {
  const flat = flattenCategorySlugs(category);
  const candidates = [];

  for (const slug of flat.slugs) {
    const work = resolveWork(slug);
    if (!work) continue;
    candidates.push({
      href: projectPath(category.id, work.slug),
      title: work.title,
      summary: work.summary,
      eyebrow: work.year,
      kind: "workProject",
      sortKey: parseYear(work.year),
    });
  }

  for (const slug of flat.journalSlugs) {
    const journal = resolveJournal(slug);
    if (!journal) continue;
    candidates.push({
      href: journalPath(category.id, journal.slug),
      title: journal.title,
      summary: journal.summary,
      eyebrow: journal.year || journal.date,
      kind: "journal",
      sortKey: parseJournalSortKey(journal),
    });
  }

  for (const slug of flat.productSlugs) {
    const product = resolveProduct(slug);
    if (!product) continue;
    candidates.push({
      href: productPath(category.id, product.slug),
      title: product.name,
      summary: product.summary,
      eyebrow: product.status,
      kind: "shop",
      sortKey: 0,
    });
  }

  return candidates
    .sort((a, b) => b.sortKey - a.sortKey || a.title.localeCompare(b.title))
    .slice(0, limit)
    .map(({ sortKey: _sortKey, ...card }) => card);
}

export function getCategoryNavItems() {
  return WORK_CATEGORIES.map((cat) => {
    const route = categoryPath(cat.id);
    const cards = getCategoryNavCards(cat);

    return {
      id: cat.id,
      title: cat.title,
      href: route,
      cards,
    };
  });
}
