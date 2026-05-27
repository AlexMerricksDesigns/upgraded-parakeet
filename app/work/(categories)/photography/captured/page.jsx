import { PageSection } from "@/components/page-section";
import {
  getAllPhotographyCaptured,
  manifestToCapturedTiles,
} from "@/lib/photography-registry";

import { PaginatedCapturedGrid } from "@/components/work/hub/photography/paginated-captured-grid";

export default function PhotographyCapturedIndexPage() {
  const captured = getAllPhotographyCaptured();
  const tiles = manifestToCapturedTiles(
    "photography",
    captured.map((entry) => entry.slug)
  );

  return (
    <PageSection eyebrow={null} title="" intro={null}>
      <article className="work-hub-page plotter-page photography-page">
        <section className="work-hub-section" aria-labelledby="photography-captured-index-heading">
          <header className="work-hub-section__header">
            <h1 id="photography-captured-index-heading" className="work-hub-section__title">
              Captured
            </h1>
            <p className="work-hub-section__intro">
              Browse the full published photography catalogue.
            </p>
          </header>
          <PaginatedCapturedGrid items={tiles} />
        </section>
      </article>
    </PageSection>
  );
}
