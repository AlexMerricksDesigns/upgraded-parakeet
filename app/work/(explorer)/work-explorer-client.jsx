"use client";

/**
 * /work — Work Explorer (client shell).
 * Copy/layout: search "COPY:" / "LAYOUT:" below. Behaviour: work-explorer-state.js
 */

import { useMemo, useRef } from "react";
import Link from "next/link";

import { PageHero } from "@/components/page-hero";
import { ExplorerHubGrid } from "@/components/work/explorer-hub-grid";
import { ExplorerSpotlightRail } from "@/components/work/explorer-spotlight-rail";
import { ExplorerStoreRail } from "@/components/work/explorer-store-rail";
import { WorkTimeline } from "@/components/work/work-timeline";
import { pageHero } from "@/app/site";
import { categoryPath } from "@/lib/work-paths";
import { EXPLORER_HUB_GRID, getHubCategoryIds } from "@/app/work/work-hubs";
import { useExplorerPageState } from "@/app/work/work-explorer-state";
import { WORK_TAGLINE } from "@/app/work/work-tagline";

const workHero = pageHero.work;

const filterBar = {
  ariaLabel: "Filter work by category",
  showAllLabel: "Show all",
};

const chronicleSection = {
  titleAll: "All — sorted by year",
  titleSuffix: " — sorted by year",
  hint: "Newest first along the timeline — use the category filters above to narrow the list.",
  emptyMedia: "No preview yet",
};

const storeRail = {
  title: "From the Store",
};

const spotlightRail = {
  title: "Browse by area",
};

function CategoryFilterBar({
  categories,
  activeHubId,
  activeCategoryId,
  onSelectCategory,
  onShowAll,
}) {
  const hubCategoryIds = activeHubId
    ? new Set(getHubCategoryIds(activeHubId))
    : null;
  const showAllActive = !activeHubId && !activeCategoryId;

  return (
    <div className="explorer-filters" aria-label={filterBar.ariaLabel}>
      <div className="explorer-filters__inner">
        <div className="explorer-filters__stack">
          <div className="explorer-filters__pills" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={showAllActive}
              className={`explorer-filters__pill${showAllActive ? " is-active" : ""}`}
              onClick={onShowAll}
            >
              {filterBar.showAllLabel}
            </button>
            {categories.map((category) => {
              const isActive = activeCategoryId === category.id;
              const outOfHub =
                hubCategoryIds != null && !hubCategoryIds.has(category.id);
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`explorer-filters__pill${isActive ? " is-active" : ""}${outOfHub ? " explorer-filters__pill--out-of-hub" : ""}`}
                  onClick={() => onSelectCategory(category.id)}
                >
                  {category.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChronicleList({ projects, activeCategory, activeHub }) {
  return (
    <section className="explorer-chronicle" aria-label="All work, chronological">
      <header className="explorer-chronicle__header">
        <h2 className="explorer-chronicle__label">
          {activeCategory ? (
            <>
              <Link
                href={categoryPath(activeCategory.id)}
                className="explorer-chronicle__label-link"
              >
                {activeCategory.title}
              </Link>
              {chronicleSection.titleSuffix}
            </>
          ) : activeHub ? (
            <>
              <Link
                href={activeHub.hubHref}
                className="explorer-chronicle__label-link"
              >
                {activeHub.title}
              </Link>
              {chronicleSection.titleSuffix}
            </>
          ) : (
            chronicleSection.titleAll
          )}
        </h2>
        <p className="explorer-chronicle__hint">{chronicleSection.hint}</p>
      </header>
      <WorkTimeline items={projects} />
    </section>
  );
}

/**
 * @param {{
 *   chronicle: object[];
 *   storeProducts: object[];
 *   categories: { id: string; title: string; href: string }[];
 * }} props
 */
export function WorkExplorerClient({ chronicle, storeProducts, categories }) {
  const heroRef = useRef(null);
  const galleryRef = useRef(null);

  const chronicleMemo = useMemo(() => chronicle, [chronicle]);
  const storeProductsMemo = useMemo(() => storeProducts, [storeProducts]);
  const categoriesMemo = useMemo(() => categories, [categories]);

  const {
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
  } = useExplorerPageState({
    chronicle: chronicleMemo,
    storeProducts: storeProductsMemo,
    heroRef,
    galleryRef,
  });

  return (
    <section className="section section--explorer">
      <PageHero
        heroRef={heroRef}
        titleId="explorer-hero-title"
        eyebrow={workHero.eyebrow}
        title={workHero.title}
        description={workHero.description}
        images={workHero.image}
      />

      <p className="work-tagline explorer-tagline">{WORK_TAGLINE}</p>

      <ExplorerHubGrid hubs={EXPLORER_HUB_GRID} />

      {!wideShell ? (
        <CategoryFilterBar
          categories={categoriesMemo}
          activeHubId={activeHubId}
          activeCategoryId={activeCategoryId}
          onSelectCategory={selectCategory}
          onShowAll={showAll}
        />
      ) : null}

      <div className="explorer-shell">
        {wideShell ? (
          <ExplorerSpotlightRail
            categories={categoriesMemo}
            activeHubId={activeHubId}
            activeCategoryId={activeCategoryId}
            onSelectHub={selectHub}
            onSelectCategory={selectCategory}
            onShowAll={showAll}
            title={spotlightRail.title}
          />
        ) : null}

        <div
          ref={galleryRef}
          id="explorer-gallery"
          className="explorer-shell__main"
        >
          <ChronicleList
            projects={filteredChronicle}
            activeCategory={activeCategory}
            activeHub={activeHub}
          />
        </div>

        <ExplorerStoreRail
          products={filteredStoreProducts}
          title={storeRail.title}
          dualLayout={storeDualLayout}
          activeIndex={storeIndex}
          onSelectIndex={setStoreIndex}
          carouselEnabled={storeCarouselEnabled}
        />
      </div>
    </section>
  );
}
