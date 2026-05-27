import Image from "next/image";

import { ThreadTile } from "@/app/work/hub-primitives";
import { SiteLink } from "@/components/site-link";
import {
  getAllPhotographySeries,
  getCuratedCaptured,
  manifestToCapturedTiles,
} from "@/lib/photography-registry";
import { seriesPath } from "@/lib/work-paths";

import { PaginatedCapturedGrid } from "../paginated-captured-grid";
import {
  CAPTURED_ANCHOR,
  capturedSection,
  CURATED_ANCHOR,
} from "../copy";

const LINK_CONTEXT = "content";

export function CapturedWorksSection() {
  const series = getAllPhotographySeries();
  const curated = getCuratedCaptured();
  const curatedTiles = manifestToCapturedTiles(
    "photography",
    curated.map((e) => e.slug)
  );

  return (
    <section
      id={CAPTURED_ANCHOR.replace("#", "")}
      className="work-hub-section photography-captured"
      aria-labelledby="captured-works-heading"
    >
      <header className="work-hub-section__header">
        <h2 id="captured-works-heading" className="work-hub-section__title">
          Published series & themes
        </h2>
        <p className="work-hub-section__intro">{capturedSection.intro}</p>
      </header>

      <div className="work-hub-section__group">
        <h3 className="work-hub-section__group-title">Series</h3>
        <div className="plotter-series__grid">
          {series.map((entry) => (
            <article key={entry.slug} className="plotter-series__card">
              <div className="plotter-series__media">
                <Image
                  src={entry.image}
                  alt=""
                  fill
                  sizes="(min-width: 900px) 33vw, 50vw"
                  loading="lazy"
                />
              </div>
              <div className="plotter-series__body">
                <p className="eyebrow">{entry.year}</p>
                <h4 className="plotter-series__title">{entry.title}</h4>
                <p className="card-link__summary">
                  {entry.teaser ?? entry.summary}
                </p>
                <div className="plotter-series__links">
                  <SiteLink
                    href={seriesPath("photography", entry.slug)}
                    context={LINK_CONTEXT}
                    className="plotter-series__link"
                    showBadge={false}
                  >
                    View series
                  </SiteLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {curatedTiles.length > 0 ? (
        <div
          id={CURATED_ANCHOR.replace("#", "")}
          className="work-hub-section__group photography-hub__curated"
        >
          <h3 className="work-hub-section__group-title">From published series</h3>
          <p className="work-hub-section__intro photography-hub__group-lede">
            All photographs in Brighton by Bench, Lightworms, and the India 2016
            archive.
          </p>
          <PaginatedCapturedGrid items={curatedTiles} />
        </div>
      ) : null}
    </section>
  );
}
