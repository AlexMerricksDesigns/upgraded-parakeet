"use client";



/**

 * /work — Work Explorer (category hub) in this file.

 *

 * HOW TO EDIT — visible page: COPY + LAYOUT below.

 * ─────────────────────────────────────────────────

 * COPY:     Search "COPY:" in this file

 * LAYOUT:   Search "LAYOUT:" in this file

 * Structure order: Search "LAYOUT: PAGE"

 * Behaviour: app/work/work-explorer-state.js (INTERACTIVE)

 * Styles:    app/globals.css — section "Work Explorer"

 *

 * Chronicle: category registry + manifests (categories.js)

 * Category list: app/work/categories-data.js

 */



import { useRef } from "react";

import Link from "next/link";



import { PageHero } from "@/components/page-hero";

import { ExplorerHubGrid } from "@/components/work/explorer-hub-grid";

import { ExplorerSpotlightRail } from "@/components/work/explorer-spotlight-rail";

import { ExplorerStoreRail } from "@/components/work/explorer-store-rail";

import { WorkTimeline } from "@/components/work/work-timeline";

import { pageHero } from "@/app/site";

import shopManifest from "@/app/shop/manifest.json";

import { categoryPath } from "@/lib/work-paths";



import { getExplorerChronicleItems } from "./categories";

import { WORK_CATEGORIES } from "./categories-data.js";

import { EXPLORER_HUB_GRID, getHubCategoryIds } from "./work-hubs";

import {

  scrollToGalleryIfNeeded,

  useExplorerPageState,

} from "./work-explorer-state";



// ─────────────────────────────────────────────────────────────────────────────

// COPY: PAGE HEADER (hero — eyebrow top-left, title in highlight box)

// ─────────────────────────────────────────────────────────────────────────────



const workHero = pageHero.work;



// ─────────────────────────────────────────────────────────────────────────────

// COPY: FILTER BAR (horizontal pills below hero)

// ─────────────────────────────────────────────────────────────────────────────



const filterBar = {

  ariaLabel: "Filter work by category",

  showAllLabel: "Show all",

};



// ─────────────────────────────────────────────────────────────────────────────

// COPY: CHRONICLE (all published projects, newest first)

// ─────────────────────────────────────────────────────────────────────────────



const chronicleSection = {

  titleAll: "All — sorted by year",

  titleSuffix: " — sorted by year",

  hint: "Newest first along the timeline — use the category filters above to narrow the list.",

  emptyMedia: "No preview yet",

};



// ─────────────────────────────────────────────────────────────────────────────

// COPY: STORE RAIL (sticky column — all published shop items)

// ─────────────────────────────────────────────────────────────────────────────



const storeRail = {

  title: "From the Store",

};



const spotlightRail = {

  title: "Browse by area",

};



// ─────────────────────────────────────────────────────────────────────────────

// DATA: chronicle + store (registry: categories-data.js + manifests)

// ─────────────────────────────────────────────────────────────────────────────



function getAllStoreProducts() {

  return shopManifest.filter((p) => p.published !== false);

}



function getExplorerCategories() {

  return WORK_CATEGORIES.map((cat) => ({

    id: cat.id,

    title: cat.title,

    href: categoryPath(cat.id),

  }));

}



// ─────────────────────────────────────────────────────────────────────────────

// LAYOUT: Category filter bar

// ─────────────────────────────────────────────────────────────────────────────



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



// ─────────────────────────────────────────────────────────────────────────────

// LAYOUT: Chronicle list (spine timeline — cards in components/work/work-timeline)

// ─────────────────────────────────────────────────────────────────────────────



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



// ─────────────────────────────────────────────────────────────────────────────

// LAYOUT: PAGE

// ─────────────────────────────────────────────────────────────────────────────



export default function WorkPage() {

  const heroRef = useRef(null);

  const galleryRef = useRef(null);

  const categories = getExplorerCategories();

  const chronicle = getExplorerChronicleItems();

  const storeProducts = getAllStoreProducts();



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

    chronicle,

    storeProducts,

    heroRef,

    galleryRef,

  });



  const handleBrowseWork = () => scrollToGalleryIfNeeded(galleryRef);



  return (

    <section className="section section--explorer">

      <PageHero

        heroRef={heroRef}

        titleId="explorer-hero-title"

        eyebrow={workHero.eyebrow}

        title={workHero.title}

        description={workHero.description}

        images={workHero.image}

        actions={[

          { label: "Visit the shop", href: "/shop", variant: "primary" },

          { label: "Browse the work", onClick: handleBrowseWork, variant: "ghost" },

        ]}

      />



      <ExplorerHubGrid hubs={EXPLORER_HUB_GRID} />



      <CategoryFilterBar

        categories={categories}

        activeHubId={activeHubId}

        activeCategoryId={activeCategoryId}

        onSelectCategory={selectCategory}

        onShowAll={showAll}

      />



      <div className="explorer-shell">

        {wideShell ? (

          <ExplorerSpotlightRail

            activeHubId={activeHubId}

            onSelectHub={selectHub}

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

