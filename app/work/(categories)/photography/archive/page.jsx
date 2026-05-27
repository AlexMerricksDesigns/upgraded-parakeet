import { PageSection } from "@/components/page-section";
import {
  getArchiveCaptured,
  manifestToCapturedTiles,
} from "@/lib/photography-registry";

import { PaginatedCapturedGrid } from "@/components/work/hub/photography/paginated-captured-grid";

export default function PhotographyArchivePage() {
  const archive = getArchiveCaptured();
  const tiles = manifestToCapturedTiles(
    "photography",
    archive.map((entry) => entry.slug)
  );

  return (
    <PageSection eyebrow={null} title="" intro={null}>
      <article className="work-hub-page plotter-page photography-page">
        <section className="work-hub-section" aria-labelledby="photography-archive-heading">
          <header className="work-hub-section__header">
            <h1 id="photography-archive-heading" className="work-hub-section__title">
              On-chain archive
            </h1>
            <p className="work-hub-section__intro">
              Individual mints grouped by platform and thematic series.
            </p>
          </header>
          <PaginatedCapturedGrid items={tiles} showPlatformFilter />
        </section>
      </article>
    </PageSection>
  );
}

