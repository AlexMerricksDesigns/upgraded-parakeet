import photographyManifest from "@/app/work/photography-manifest.json";
import { attachPrintToTile } from "@/lib/print-metadata";
import { capturedPath, seriesPath } from "@/lib/work-paths";

const CATEGORY_ID = "photography";

/** Photograph/series row is live on the site (excludes import WIP drafts). */
function published(entry) {
  return entry?.status === "published";
}

function getSeriesEntry(seriesSlug) {
  return photographyManifest.find(
    (e) => e.kind === "series" && e.slug === seriesSlug
  );
}

function capturedTilePlatform(entry) {
  if (entry?.nftLink) {
    return entry.nftPlatform || "On-chain";
  }
  if (entry?.printAvailable) return "Print";
  return "Photograph";
}

export function resolvePhotographyEntry(slug) {
  return photographyManifest.find((e) => e.slug === slug && published(e));
}

export function getPhotographySeries(slug) {
  const entry = resolvePhotographyEntry(slug);
  return entry?.kind === "series" ? entry : null;
}

export function getPhotographyCaptured(slug) {
  const entry = resolvePhotographyEntry(slug);
  return entry?.kind === "captured" ? entry : null;
}

export function getAllPhotographySeries() {
  return photographyManifest.filter((e) => e.kind === "series" && published(e));
}

export function getAllPhotographyCaptured() {
  return photographyManifest.filter((e) => e.kind === "captured" && published(e));
}

/** Published captures whose series is also published (flagship hub grid). */
export function getHubVisibleCaptured() {
  return getAllPhotographyCaptured().filter((e) => getPhotographySeries(e.series));
}

/** Alias for portfolio grid on the hub. */
export function getCuratedCaptured() {
  return getHubVisibleCaptured();
}

/** Published captures in draft platform/thematic series (on-chain archive browse). */
export function getArchiveCaptured() {
  return getAllPhotographyCaptured().filter((e) => {
    const series = getSeriesEntry(e.series);
    return series && series.status !== "published";
  });
}

/** Hub highlight tiles — featured across the full catalogue, not only published series. */
export function getHubHighlights(limit = 12) {
  return getAllPhotographyCaptured()
    .filter((e) => e.featured)
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .slice(0, limit);
}

export function getPhotographsForSeries(seriesSlug, { excludeSlug } = {}) {
  return getAllPhotographyCaptured()
    .filter((e) => e.series === seriesSlug && e.slug !== excludeSlug)
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

/** @deprecated Prefer getHubHighlights for hub editorial picks. */
export function getFeaturedCaptured(limit = 4) {
  return getHubHighlights(limit);
}

function manifestImage(value) {
  return value && value !== "[Placeholder image]" ? value : null;
}

export function manifestToSeriesTiles(categoryId, slugs) {
  return slugs
    .map((slug) => getPhotographySeries(slug))
    .filter(Boolean)
    .map((entry) =>
      attachPrintToTile(
        {
          slug: entry.slug,
          title: entry.title,
          year: entry.year,
          summary: entry.teaser ?? entry.summary,
          href: seriesPath(categoryId, entry.slug),
          external: false,
          image: manifestImage(entry.image),
          platform: "Series",
        },
        entry
      )
    );
}

export function manifestToCapturedTiles(categoryId, slugs) {
  return slugs
    .map((slug) => getPhotographyCaptured(slug))
    .filter(Boolean)
    .map((entry) => {
      const platform = capturedTilePlatform(entry);
      return attachPrintToTile(
        {
          slug: entry.slug,
          title: entry.title,
          year: entry.year,
          summary: entry.summary,
          href: capturedPath(categoryId, entry.slug),
          external: false,
          image: manifestImage(entry.image ?? entry.heroImage),
          platform,
          nftLink: entry.nftLink ?? null,
          nftPlatform: entry.nftPlatform ?? null,
        },
        entry
      );
    });
}

export function getPhotographyManifestForExplorer() {
  return photographyManifest
    .filter(published)
    .map((entry) => ({
      slug: entry.slug,
      href: entry.href,
      title: entry.title,
      year: entry.year,
      summary: entry.summary,
      image: manifestImage(entry.image ?? entry.heroImage),
      categoryId: CATEGORY_ID,
      sortYear: parseInt(String(entry.year).match(/\d{4}/)?.[0] ?? "0", 10),
    }));
}
