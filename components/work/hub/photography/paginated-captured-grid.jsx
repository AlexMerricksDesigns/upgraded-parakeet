"use client";

import { useMemo, useState } from "react";

import { ThreadTile } from "@/app/work/hub-primitives";

const PAGE_SIZE = 12;

/**
 * Client-paginated captured work tiles (scales to 1000+ manifest entries).
 * @param {{
 *   items: import("@/app/work/hub-primitives").ThreadTileItem[];
 *   pageSize?: number;
 *   showPlatformFilter?: boolean;
 * }} props
 */
export function PaginatedCapturedGrid({
  items,
  pageSize = PAGE_SIZE,
  showPlatformFilter = false,
}) {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("all");

  const platforms = useMemo(() => {
    if (!showPlatformFilter) return [];
    const labels = new Set(
      items
        .map((item) => item.platform)
        .filter((p) => p && p !== "Photograph" && p !== "Print")
    );
    return [...labels].sort((a, b) => a.localeCompare(b));
  }, [items, showPlatformFilter]);

  const filtered = useMemo(() => {
    let list = items;
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (item) =>
          item.title?.toLowerCase().includes(q) ||
          item.summary?.toLowerCase().includes(q) ||
          item.slug?.toLowerCase().includes(q)
      );
    }
    if (platform !== "all") {
      list = list.filter((item) => item.platform === platform);
    }
    return list;
  }, [items, query, platform]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages - 1);
  const slice = filtered.slice(
    safePage * pageSize,
    safePage * pageSize + pageSize
  );

  if (!items.length) return null;

  return (
    <div className="catalog-grid-controls">
      <div className="catalog-grid-controls__row">
        <label className="catalog-grid-controls__search">
          <span className="visually-hidden">Filter photographs</span>
          <input
            type="search"
            placeholder="Filter by title…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
          />
        </label>
        <p className="catalog-grid-controls__count" aria-live="polite">
          {filtered.length} photograph{filtered.length === 1 ? "" : "s"}
        </p>
      </div>

      {showPlatformFilter && platforms.length > 0 ? (
        <div
          className="catalog-grid-controls__filters"
          role="group"
          aria-label="Filter by platform"
        >
          <button
            type="button"
            className={`catalog-grid-controls__chip${platform === "all" ? " catalog-grid-controls__chip--active" : ""}`}
            onClick={() => {
              setPlatform("all");
              setPage(0);
            }}
          >
            All platforms
          </button>
          {platforms.map((label) => (
            <button
              key={label}
              type="button"
              className={`catalog-grid-controls__chip${platform === label ? " catalog-grid-controls__chip--active" : ""}`}
              onClick={() => {
                setPlatform(label);
                setPage(0);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="work-hub-grid">
        {slice.map((item) => (
          <ThreadTile key={item.slug} item={item} />
        ))}
      </div>

      {totalPages > 1 ? (
        <nav
          className="catalog-grid-controls__pager"
          aria-label="Photograph pages"
        >
          <button
            type="button"
            className="catalog-grid-controls__btn"
            disabled={safePage <= 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            Previous
          </button>
          <span className="catalog-grid-controls__page">
            Page {safePage + 1} of {totalPages}
          </span>
          <button
            type="button"
            className="catalog-grid-controls__btn"
            disabled={safePage >= totalPages - 1}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          >
            Next
          </button>
        </nav>
      ) : null}
    </div>
  );
}
