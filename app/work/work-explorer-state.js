"use client";

/**
 * INTERACTIVE — Work Explorer behaviour only (no copy, no layout).
 * Edit carousel timing, scroll threshold, and filter logic here.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  WORK_CATEGORIES,
  flattenCategorySlugs,
} from "./categories-data.js";
import { EXPLORER_HUB_SPOTLIGHTS, getHubCategoryIds } from "./work-hubs.js";

/** INTERACTIVE: store carousel interval (ms) */
export const STORE_CAROUSEL_MS = 6000;

/** Shell breakpoint — matches explorer-shell 3-column grid */
export const EXPLORER_SHELL_WIDE_PX = 960;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

/** INTERACTIVE: skip auto-scroll if user has already scrolled the page */
const FILTER_SCROLL_SKIP_AFTER_PX = 75;
/** INTERACTIVE: gallery scroll target — leaves filter bar visible above tiles */
const FILTER_SCROLL_GALLERY_OFFSET_PX = 200;

/** Scroll to chronicle gallery (same offset as filter selection). */
export function scrollToGalleryIfNeeded(galleryRef) {
  if (typeof window === "undefined") return;
  if (window.scrollY > FILTER_SCROLL_SKIP_AFTER_PX) return;

  const gallery = galleryRef?.current;
  if (!gallery) return;

  const target =
    gallery.getBoundingClientRect().top +
    window.scrollY -
    FILTER_SCROLL_GALLERY_OFFSET_PX;

  window.scrollTo({
    top: Math.max(0, target),
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}

function filterStoreByCategoryIds(storeProducts, categoryIds) {
  const slugSet = new Set();
  for (const id of categoryIds) {
    const cat = WORK_CATEGORIES.find((c) => c.id === id);
    const { productSlugs } = flattenCategorySlugs(cat ?? { subsections: [] });
    for (const slug of productSlugs) {
      slugSet.add(slug);
    }
  }
  if (!slugSet.size) return [];
  return storeProducts.filter((p) => slugSet.has(p.slug));
}

export function useExplorerWideShell() {
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${EXPLORER_SHELL_WIDE_PX}px)`);
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return wide;
}

export function useExplorerPageState({ chronicle, storeProducts, heroRef, galleryRef }) {
  const [activeHubId, setActiveHubId] = useState(null);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [storeIndex, setStoreIndex] = useState(0);
  const scrollToGalleryOnFilter = useRef(false);
  const wideShell = useExplorerWideShell();

  const filteredChronicle = useMemo(() => {
    if (activeCategoryId) {
      return chronicle.filter((p) => p.categoryId === activeCategoryId);
    }
    if (activeHubId) {
      const ids = new Set(getHubCategoryIds(activeHubId));
      return chronicle.filter((p) => ids.has(p.categoryId));
    }
    return chronicle;
  }, [chronicle, activeCategoryId, activeHubId]);

  const filteredStoreProducts = useMemo(() => {
    if (activeCategoryId) {
      const cat = WORK_CATEGORIES.find((c) => c.id === activeCategoryId);
      const { productSlugs: slugs } = flattenCategorySlugs(
        cat ?? { subsections: [] }
      );
      if (!slugs.length) return [];
      const slugSet = new Set(slugs);
      return storeProducts.filter((p) => slugSet.has(p.slug));
    }
    if (activeHubId) {
      return filterStoreByCategoryIds(
        storeProducts,
        getHubCategoryIds(activeHubId)
      );
    }
    return storeProducts;
  }, [storeProducts, activeCategoryId, activeHubId]);

  const selectHub = useCallback((hubId) => {
    setActiveHubId((prev) => {
      if (prev === hubId) {
        scrollToGalleryOnFilter.current = false;
        return null;
      }
      scrollToGalleryOnFilter.current = true;
      return hubId;
    });
    setActiveCategoryId((prev) => {
      if (!prev) return prev;
      const hubIds = new Set(getHubCategoryIds(hubId));
      return hubIds.has(prev) ? prev : null;
    });
  }, []);

  const selectCategory = useCallback((categoryId) => {
    setActiveCategoryId((prev) => {
      const next = prev === categoryId ? null : categoryId;
      scrollToGalleryOnFilter.current = next !== null;
      return next;
    });
    setActiveHubId((prevHub) => {
      if (!prevHub) return prevHub;
      const hubIds = new Set(getHubCategoryIds(prevHub));
      if (hubIds.has(categoryId)) return prevHub;
      return null;
    });
  }, []);

  const showAll = useCallback(() => {
    scrollToGalleryOnFilter.current = false;
    setActiveHubId(null);
    setActiveCategoryId(null);
  }, []);

  useEffect(() => {
    setStoreIndex(0);
  }, [activeCategoryId, activeHubId]);

  useEffect(() => {
    const shouldScroll =
      scrollToGalleryOnFilter.current &&
      (activeCategoryId != null || activeHubId != null);
    if (!shouldScroll) return;
    scrollToGalleryOnFilter.current = false;
    requestAnimationFrame(() => scrollToGalleryIfNeeded(galleryRef));
  }, [activeCategoryId, activeHubId, galleryRef]);

  const storeDualLayout =
    wideShell &&
    filteredStoreProducts.length >= 1 &&
    filteredStoreProducts.length <= 2;

  const storeCarouselEnabled =
    !storeDualLayout && filteredStoreProducts.length > 1;

  useEffect(() => {
    if (!storeCarouselEnabled || prefersReducedMotion()) return undefined;
    const count = filteredStoreProducts.length;
    const interval = window.setInterval(() => {
      setStoreIndex((current) => (current + 1) % count);
    }, STORE_CAROUSEL_MS);
    return () => window.clearInterval(interval);
  }, [filteredStoreProducts, storeCarouselEnabled]);

  useEffect(() => {
    document.body.classList.add("page-work-explorer");
    return () => {
      document.body.classList.remove(
        "page-work-explorer",
        "work-explorer-scrolled"
      );
    };
  }, []);

  useEffect(() => {
    const latchHeader = () => {
      if (document.body.classList.contains("work-explorer-scrolled")) return;

      const hero = heroRef?.current;
      const heroBottom = hero?.getBoundingClientRect().bottom ?? 0;
      const pastHero = window.scrollY > 24 || heroBottom <= 72;

      if (pastHero) {
        document.body.classList.add("work-explorer-scrolled");
      }
    };

    latchHeader();
    window.addEventListener("scroll", latchHeader, { passive: true });
    window.addEventListener("resize", latchHeader, { passive: true });
    return () => {
      window.removeEventListener("scroll", latchHeader);
      window.removeEventListener("resize", latchHeader);
    };
  }, [heroRef]);

  const activeCategory = useMemo(
    () =>
      activeCategoryId
        ? WORK_CATEGORIES.find((c) => c.id === activeCategoryId)
        : null,
    [activeCategoryId]
  );

  const activeHub = useMemo(
    () =>
      activeHubId
        ? EXPLORER_HUB_SPOTLIGHTS.find((h) => h.hubId === activeHubId) ?? null
        : null,
    [activeHubId]
  );

  return {
    activeHubId,
    activeHub,
    activeCategoryId,
    activeCategory,
    selectHub,
    selectCategory,
    showAll,
    filteredChronicle,
    filteredStoreProducts,
    storeIndex,
    setStoreIndex,
    storeDualLayout,
    storeCarouselEnabled,
    wideShell,
  };
}
