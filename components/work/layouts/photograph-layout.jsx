import Image from "next/image";

import { CategoryBreadcrumb, ThreadTile } from "@/app/work/hub-primitives";
import { getWorkCategory } from "@/app/work/categories";
import { CardLinkKind } from "@/components/card-link-kind";
import { PageSection } from "@/components/page-section";
import { SiteLink } from "@/components/site-link";
import {
  getPhotographsForSeries,
  getPhotographySeries,
} from "@/lib/photography-registry";
import {
  getProjectPrintMeta,
  resolvePrintProductHref,
} from "@/lib/print-metadata";
import {
  capturedPath,
  categoryPath,
  seriesPath,
} from "@/lib/work-paths";

const LINK_CONTEXT = "content";

export function PhotographLayout({ page, manifestEntry }) {
  const category = getWorkCategory(page.breadcrumb.category);
  const seriesSlug = page.breadcrumb.series;
  const seriesEntry = getPhotographySeries(seriesSlug);
  const seriesTitle = seriesEntry?.title ?? seriesSlug;
  const title = page.meta?.title ?? page.breadcrumb.label;
  const intro = page.meta?.intro ?? page.meta?.description ?? "";
  const heroSrc = page.hero?.image ?? manifestEntry?.heroImage ?? manifestEntry?.image;
  const related = getPhotographsForSeries(seriesSlug, {
    excludeSlug: manifestEntry?.slug,
  });
  const printMeta = getProjectPrintMeta(manifestEntry?.slug);

  return (
    <PageSection
      eyebrow={
        <CategoryBreadcrumb
          categoryTitle={category?.title}
          categoryRoute={categoryPath(page.breadcrumb.category)}
          seriesLabel={seriesTitle}
          seriesRoute={seriesPath(page.breadcrumb.category, seriesSlug)}
          projectLabel={page.breadcrumb.label}
        />
      }
      title={title}
      intro={intro}
    >
      <article className="photograph-page work-detail-page">
        {heroSrc ? (
          <section className="hero photograph-page__hero" aria-label="Photograph">
            <div className="hero__bg">
              <Image
                src={heroSrc}
                alt={page.hero?.alt ?? title}
                fill
                priority
                sizes="100vw"
                className="hero__bg-img"
              />
            </div>
          </section>
        ) : null}

        {page.story?.paragraphs?.length ? (
          <section className="card work-detail-essay-block" aria-labelledby="photograph-story">
            {page.story.eyebrow ? (
              <p className="eyebrow">{page.story.eyebrow}</p>
            ) : (
              <p className="eyebrow">From the {seriesTitle} series</p>
            )}
            {page.story.title ? (
              <h2 id="photograph-story" className="work-detail-section__title">
                {page.story.title}
              </h2>
            ) : null}
            <div className="prose work-detail-article__prose">
              {page.story.paragraphs.map((para) => (
                <p key={para.slice(0, 48)}>{para}</p>
              ))}
            </div>
          </section>
        ) : null}

        {page.fieldNotes?.paragraphs?.length ? (
          <section className="card work-detail-essay-block">
            <h2 className="work-detail-section__title">{page.fieldNotes.title ?? "Field notes"}</h2>
            <div className="prose work-detail-article__prose">
              {page.fieldNotes.paragraphs.map((para) => (
                <p key={para.slice(0, 48)}>{para}</p>
              ))}
            </div>
          </section>
        ) : null}

        {page.printTiers?.length || printMeta?.printAvailable ? (
          <section
            id="prints"
            className="card photograph-page__prints"
            aria-labelledby="photograph-prints-heading"
          >
            <h2 id="photograph-prints-heading" className="work-detail-section__title">
              Print &amp; edition options
            </h2>
            <p className="card-link__summary">
              Physical editions from this work — open archival prints, signed limited runs, and
              Observation Club when listed.
            </p>
            <div className="btn-row photograph-page__print-tiers">
              {(page.printTiers ?? []).map((tier) => (
                <div key={tier.id} className="photograph-page__print-tier card">
                  <h3 className="card-link__title">{tier.label}</h3>
                  <p className="card-link__summary">{tier.summary}</p>
                  {tier.href ? (
                    <SiteLink
                      href={tier.href}
                      context={LINK_CONTEXT}
                      className="btn"
                      showBadge={tier.kind === "shop"}
                    >
                      {tier.cta ?? "Enquire"}
                    </SiteLink>
                  ) : null}
                </div>
              ))}
            </div>
            {printMeta?.printAvailable ? (
              <div className="photography-prints__actions btn-row">
                <SiteLink
                  href={resolvePrintProductHref(page.breadcrumb.category, printMeta)}
                  context={LINK_CONTEXT}
                  className="btn"
                  showBadge
                >
                  Order print
                </SiteLink>
              </div>
            ) : null}
          </section>
        ) : null}

        {page.nft?.link || page.nft?.published ? (
          <section className="card photograph-page__nft">
            <h2 className="work-detail-section__title">On-chain</h2>
            <p className="card-link__summary">
              {page.nft.summary ??
                (page.nft.published
                  ? "Originally released on objkt as part of the series mint."
                  : "Not currently listed on-chain.")}
            </p>
            {page.nft.link ? (
              <a
                href={page.nft.link}
                className="btn"
                target="_blank"
                rel="noreferrer"
              >
                View on objkt
              </a>
            ) : null}
          </section>
        ) : null}

        {related.length > 0 ? (
          <section className="work-detail-section" aria-labelledby="photograph-related-heading">
            <header className="work-detail-section__header">
              <h2 id="photograph-related-heading" className="work-detail-section__title">
                More from {seriesTitle}
              </h2>
            </header>
            <div className="work-detail-grid">
              {related.map((entry) => (
                <ThreadTile
                  key={entry.slug}
                  item={{
                    slug: entry.slug,
                    title: entry.title,
                    year: entry.year,
                    summary: entry.summary,
                    href: capturedPath(page.breadcrumb.category, entry.slug),
                    image: entry.image ?? entry.heroImage,
                    platform: "Photograph",
                    printAvailable: entry.printAvailable,
                  }}
                />
              ))}
            </div>
            <div className="btn-row" style={{ marginTop: "1rem" }}>
              <SiteLink
                href={seriesPath(page.breadcrumb.category, seriesSlug)}
                context={LINK_CONTEXT}
                className="btn btn-ghost"
                showBadge={false}
              >
                View full series
              </SiteLink>
            </div>
          </section>
        ) : null}

        {page.crossLinks?.length ? (
          <section className="card work-detail-related-strip" aria-label="Related threads">
            <h2 className="card-link__title">Connected practice</h2>
            <div className="work-detail-related-strip__grid">
              {page.crossLinks.map((link) => (
                <CardLinkKind
                  key={link.href}
                  href={link.href}
                  context={LINK_CONTEXT}
                  title={link.label}
                  summary={link.summary}
                  mediaEmpty
                />
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </PageSection>
  );
}
