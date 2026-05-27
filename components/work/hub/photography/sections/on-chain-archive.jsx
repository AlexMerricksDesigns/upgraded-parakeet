import {
  getArchiveCaptured,
  manifestToCapturedTiles,
} from "@/lib/photography-registry";

import { ARCHIVE_ANCHOR, archiveSection } from "../copy";
import { SiteLink } from "@/components/site-link";
import { ThreadTile } from "@/app/work/hub-primitives";

const LINK_CONTEXT = "content";

export function OnChainArchiveSection() {
  const archive = getArchiveCaptured();
  const tiles = manifestToCapturedTiles(
    "photography",
    archive.map((e) => e.slug)
  );

  if (!tiles.length) return null;

  const preview = tiles.slice(0, 6);

  return (
    <section
      id={ARCHIVE_ANCHOR.replace("#", "")}
      className="work-hub-section photography-archive"
      aria-labelledby="on-chain-archive-heading"
    >
      <header className="work-hub-section__header">
        <h2 id="on-chain-archive-heading" className="work-hub-section__title">
          {archiveSection.title}
        </h2>
        <p className="work-hub-section__intro">{archiveSection.intro}</p>
      </header>

      <div className="work-hub-grid">
        {preview.map((item) => (
          <ThreadTile key={item.slug} item={item} />
        ))}
      </div>

      <div className="photography-archive__actions btn-row">
        <SiteLink
          href="/work/photography/archive"
          context={LINK_CONTEXT}
          className="btn"
          showBadge
        >
          Browse the on-chain archive
        </SiteLink>
      </div>
    </section>
  );
}
