import { ThreadSection } from "@/app/work/hub-primitives";
import {
  getCategorySubsection,
  getWorkCategory,
} from "@/app/work/categories";
import { PageSection } from "@/components/page-section";
import { SiteLink } from "@/components/site-link";

import {
  crossLinks,
  footerCtas,
  hero,
  intro,
} from "./copy";
import { CapturedWorksSection } from "./sections/captured-works";
import { PhotographyCrossLinks } from "./sections/cross-links";
import { FeaturedGalleryStrip } from "./sections/featured-gallery-strip";
import { PhotographyHero } from "./sections/hero";
import { PhotographyIntro } from "./sections/intro";
import { OnChainArchiveSection } from "./sections/on-chain-archive";
import { PhotographyPracticeHistory } from "./sections/practice-history";
import { PrintsTeaserSection } from "./sections/prints-teaser";
import { RotatingThreeColumnRow } from "./sections/rotating-three-column-row";
import { getHubHighlights, manifestToCapturedTiles } from "@/lib/photography-registry";
import { manifestToProjectTiles } from "@/app/work/categories";

const LINK_CONTEXT = "content";
const category = getWorkCategory("photography");

export function PhotographyHubPage() {
  const published = getCategorySubsection(category, "published");
  const fieldNotes = getCategorySubsection(category, "field-notes");
  const featuredStrip = manifestToCapturedTiles(
    "photography",
    getHubHighlights(8).map((entry) => entry.slug)
  );
  const capturedSubsection = category?.subsections?.find((s) => s.id === "captured");
  const studioProjects = manifestToProjectTiles("photography", capturedSubsection?.slugs ?? []);

  const writingSection = published
    ? {
        ...published,
        title: "Writing & editions",
        intro:
          published.intro ??
          "Essays on value and crypto art, plus product shelves for digital editions and limited prints.",
      }
    : null;

  return (
    <PageSection
      eyebrow={null}
      title=""
      intro={null}
    >
      <article className="work-hub-page work-hub-page--category-home plotter-page photography-page">
        <PhotographyHero hero={hero} />

        <PhotographyIntro intro={intro} />

        <FeaturedGalleryStrip items={featuredStrip} />

        <CapturedWorksSection />

        <OnChainArchiveSection />

        <PrintsTeaserSection />

        <RotatingThreeColumnRow
          columns={[
            {
              id: "published",
              title: writingSection?.title ?? "Writing & editions",
              items: writingSection?.groups?.flatMap((g) => g.items) ?? [],
            },
            {
              id: "field-notes",
              title: fieldNotes?.title ?? "Field notes",
              items: fieldNotes?.groups?.flatMap((g) => g.items) ?? [],
            },
            {
              id: "studio",
              title: "Studio projects",
              items: studioProjects,
            },
          ]}
        />

        <PhotographyCrossLinks links={crossLinks} />

        <PhotographyPracticeHistory />

        <section className="card work-hub-cta-strip">
          <h2 className="card-link__title">{footerCtas.title}</h2>
          <p className="card-link__summary">{footerCtas.summary}</p>
          <div className="btn-row">
            {footerCtas.buttons.map((btn) =>
              btn.href.startsWith("#") ? (
                <a
                  key={btn.href}
                  href={btn.href}
                  className={`btn${btn.variant === "ghost" ? " btn-ghost" : ""}`}
                >
                  {btn.label}
                </a>
              ) : (
                <SiteLink
                  key={btn.href}
                  href={btn.href}
                  context={LINK_CONTEXT}
                  className={`btn${btn.variant === "ghost" ? " btn-ghost" : ""}`}
                  showBadge={btn.variant !== "ghost"}
                >
                  {btn.label}
                </SiteLink>
              )
            )}
          </div>
        </section>
      </article>
    </PageSection>
  );
}
