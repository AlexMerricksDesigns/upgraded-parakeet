import { ThreadTile } from "@/app/work/hub-primitives";
import { PageSection } from "@/components/page-section";
import {
  getHubHighlights,
  manifestToCapturedTiles,
} from "@/lib/photography-registry";

export default function PhotographyHighlightsPage() {
  const tiles = manifestToCapturedTiles(
    "photography",
    getHubHighlights(48).map((entry) => entry.slug)
  );

  return (
    <PageSection eyebrow={null} title="" intro={null}>
      <article className="work-hub-page plotter-page photography-page">
        <section className="work-hub-section" aria-labelledby="photography-highlights-heading">
          <header className="work-hub-section__header">
            <h1 id="photography-highlights-heading" className="work-hub-section__title">
              Highlights
            </h1>
            <p className="work-hub-section__intro">
              Editorial picks across the catalogue — featured photographs from the manifest.
            </p>
          </header>
          {tiles.length > 0 ? (
            <div className="work-hub-grid">
              {tiles.map((item) => (
                <ThreadTile key={item.slug} item={item} />
              ))}
            </div>
          ) : (
            <p className="work-hub-section__intro">No featured items are configured yet.</p>
          )}
        </section>
      </article>
    </PageSection>
  );
}
