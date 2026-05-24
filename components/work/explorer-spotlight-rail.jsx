import Link from "next/link";

import {
  EXPLORER_HUB_SPOTLIGHTS,
  getHubCategoryIds,
} from "@/app/work/work-hubs";

const filterBar = { showAllLabel: "Show all" };

function CategoryPill({ category, isActive, outOfHub, onSelect }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      className={`explorer-filters__pill${isActive ? " is-active" : ""}${outOfHub ? " explorer-filters__pill--out-of-hub" : ""}`}
      onClick={() => onSelect(category.id)}
    >
      {category.title}
    </button>
  );
}

/**
 * Left filter rail on /work (desktop, scrolls with page): hub sections + category pills.
 *
 * @param {{
 *   categories: { id: string; title: string }[];
 *   activeHubId: string | null;
 *   activeCategoryId: string | null;
 *   onSelectHub: (hubId: string) => void;
 *   onSelectCategory: (categoryId: string) => void;
 *   onShowAll: () => void;
 *   title?: string;
 * }} props
 */
export function ExplorerSpotlightRail({
  categories,
  activeHubId,
  activeCategoryId,
  onSelectHub,
  onSelectCategory,
  onShowAll,
  title = "Browse by area",
}) {
  const hubCategoryIds = activeHubId
    ? new Set(getHubCategoryIds(activeHubId))
    : null;
  const showAllActive = !activeHubId && !activeCategoryId;

  const categoryById = Object.fromEntries(
    categories.map((c) => [c.id, c])
  );

  return (
    <aside className="explorer-spotlight-rail" aria-label={title}>
      <div className="explorer-spotlight-rail__panel">
        <h2 className="explorer-spotlight-rail__title">{title}</h2>

        <div className="explorer-spotlight-rail__show-all">
          <button
            type="button"
            role="tab"
            aria-selected={showAllActive}
            className={`explorer-filters__pill explorer-filters__pill--rail-show-all${showAllActive ? " is-active" : ""}`}
            onClick={onShowAll}
          >
            {filterBar.showAllLabel}
          </button>
        </div>

        <div className="explorer-spotlight-rail__list">
          {EXPLORER_HUB_SPOTLIGHTS.map((hub) => {
            const isHubActive = activeHubId === hub.hubId;
            const hubPills = hub.filterCategoryIds
              .map((id) => categoryById[id])
              .filter(Boolean);

            return (
              <section
                key={hub.hubId}
                className={`explorer-spotlight-rail__group${isHubActive ? " is-active-hub" : ""}`}
                aria-labelledby={`explorer-hub-${hub.hubId}`}
              >
                <button
                  id={`explorer-hub-${hub.hubId}`}
                  type="button"
                  className={`explorer-spotlight-rail__hub${isHubActive ? " is-active" : ""}`}
                  aria-pressed={isHubActive}
                  onClick={() => onSelectHub(hub.hubId)}
                >
                  {hub.title}
                </button>

                {hubPills.length > 0 ? (
                  <div
                    className="explorer-spotlight-rail__pills"
                    role="tablist"
                    aria-label={`${hub.title} categories`}
                  >
                    {hubPills.map((category) => {
                      const isActive = activeCategoryId === category.id;
                      const outOfHub =
                        hubCategoryIds != null &&
                        !hubCategoryIds.has(category.id);
                      return (
                        <CategoryPill
                          key={category.id}
                          category={category}
                          isActive={isActive}
                          outOfHub={outOfHub}
                          onSelect={onSelectCategory}
                        />
                      );
                    })}
                  </div>
                ) : null}

                <Link
                  href={hub.featured.href}
                  className="explorer-spotlight-rail__featured"
                >
                  <span className="explorer-spotlight-rail__featured-label">
                    Featured
                  </span>
                  <span className="explorer-spotlight-rail__featured-title">
                    {hub.featured.title}
                  </span>
                  {hub.featured.summary ? (
                    <span className="explorer-spotlight-rail__featured-summary">
                      {hub.featured.summary}
                    </span>
                  ) : null}
                </Link>
              </section>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
