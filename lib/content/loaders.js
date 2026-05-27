/**
 * Dynamic imports for per-page content modules.
 * Photography captured/series also load from content/catalog/*.json (content:sync).
 */

import {
  getCatalogPhotograph,
  getCatalogProduct,
  getCatalogSeries,
} from "@/lib/content/catalog";
import { mergePhotographOverride } from "@/lib/content/parse-override";

export async function loadWorkProject(slug) {
  try {
    const mod = await import(`@/content/work/projects/${slug}.js`);
    return mod.page ?? null;
  } catch {
    return null;
  }
}

export async function loadWorkProduct(slug) {
  const catalog = getCatalogProduct(slug);
  if (catalog) {
    try {
      const mod = await import(`@/content/work/products/${slug}.js`);
      if (mod.page) {
        return { ...catalog, ...mod.page, sections: mod.page.sections ?? catalog.sections };
      }
    } catch {
      /* catalog-only product */
    }
    return catalog;
  }
  try {
    const mod = await import(`@/content/work/products/${slug}.js`);
    return mod.page ?? null;
  } catch {
    return null;
  }
}

export async function loadJournalPost(slug) {
  try {
    const mod = await import(`@/content/journal/posts/${slug}.js`);
    return mod.page ?? null;
  } catch {
    return null;
  }
}

export async function loadWorkSeries(slug) {
  try {
    const mod = await import(`@/content/work/series/${slug}.js`);
    if (mod.page) return mod.page;
  } catch {
    /* fall through */
  }
  return getCatalogSeries(slug);
}

function mergeLegacyCapturedPage(catalogPage, legacyPage) {
  if (!catalogPage) return legacyPage ?? null;
  if (!legacyPage) return catalogPage;
  return {
    ...catalogPage,
    ...legacyPage,
    meta: { ...catalogPage.meta, ...legacyPage.meta },
    breadcrumb: { ...catalogPage.breadcrumb, ...legacyPage.breadcrumb },
    hero: { ...catalogPage.hero, ...legacyPage.hero },
    story: legacyPage.story ?? catalogPage.story,
    printTiers: legacyPage.printTiers?.length
      ? legacyPage.printTiers
      : catalogPage.printTiers,
    nft: legacyPage.nft ?? catalogPage.nft,
    crossLinks: legacyPage.crossLinks ?? catalogPage.crossLinks,
  };
}

export async function loadCapturedWork(slug) {
  let page = getCatalogPhotograph(slug);
  if (page) {
    page = mergePhotographOverride(page, slug);
  }

  try {
    const mod = await import(`@/content/work/captured/${slug}.js`);
    page = mergeLegacyCapturedPage(page, mod.page ?? null);
  } catch {
    /* no legacy module */
  }

  return page ?? null;
}
