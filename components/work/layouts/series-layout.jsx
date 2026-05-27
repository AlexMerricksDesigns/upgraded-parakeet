import Image from "next/image";

import { CategoryBreadcrumb, ThreadTile } from "@/app/work/hub-primitives";
import { getWorkCategory } from "@/app/work/categories";
import { CardLinkKind } from "@/components/card-link-kind";
import { PageSection } from "@/components/page-section";
import { SiteLink } from "@/components/site-link";
import { getPhotographsForSeries } from "@/lib/photography-registry";
import {
  getProjectPrintMeta,
  resolvePrintProductHref,
} from "@/lib/print-metadata";
import { capturedPath, categoryPath } from "@/lib/work-paths";
import { RenderSections } from "@/components/work/layouts/render-sections";

const LINK_CONTEXT = "content";

export function SeriesLayout({ page, manifestEntry }) {
  const category = getWorkCategory(page.breadcrumb.category);
  const seriesSlug = page.breadcrumb.series ?? manifestEntry?.slug;
  const title = page.meta?.title ?? page.breadcrumb.label;
  const intro = page.meta?.intro ?? manifestEntry?.summary ?? "";
  const photos = getPhotographsForSeries(seriesSlug);
  const printMeta = getProjectPrintMeta(manifestEntry?.slug);
  const heroImage = page.hero?.image ?? manifestEntry?.image;

  return (
    <PageSection
      eyebrow={
        <CategoryBreadcrumb
          categoryTitle={category?.title}
          categoryRoute={categoryPath(page.breadcrumb.category)}
          projectLabel={page.breadcrumb.label}
        />
      }
      title={title}
      intro={intro}
    >
      <article className="series-page photography-page work-detail-page">
        {heroImage ? (
          <section className="hero series-page__hero" aria-label="Series">
            <div className="hero__bg">
              <Image
                src={heroImage}
                alt={page.hero?.alt ?? title}
                fill
                priority
                sizes="100vw"
                className="hero__bg-img"
              />
            </div>
            <div className="hero__inner">
              {page.hero?.year ? (
                <p className="eyebrow hero__eyebrow">{page.hero.year}</p>
              ) : null}
              <h2 className="hero__title">{title}</h2>
              {page.hero?.description ? (
                <p className="hero__desc">{page.hero.description}</p>
              ) : null}
            </div>
          </section>
        ) : null}

        {page.intro?.paragraphs?.length ? (
          <section className="card work-detail-essay-block" aria-labelledby="series-intro">
            {page.intro.eyebrow ? <p className="eyebrow">{page.intro.eyebrow}</p> : null}
            {page.intro.title ? (
              <h2 id="series-intro" className="work-detail-section__title">
                {page.intro.title}
              </h2>
            ) : null}
            <div className="prose work-detail-article__prose">
              {page.intro.paragraphs.map((para) => (
                <p key={para.slice(0, 48)}>{para}</p>
              ))}
            </div>
          </section>
        ) : null}

        {photos.length > 0 ? (
          <section
            className="work-detail-section"
            aria-labelledby="series-grid-heading"
            id="collection"
          >
            <header className="work-detail-section__header">
              <h2 id="series-grid-heading" className="work-detail-section__title">
                {page.gridTitle ?? "The collection"}
              </h2>
              {page.gridIntro ? (
                <p className="work-detail-section__intro">{page.gridIntro}</p>
              ) : null}
            </header>
            <div className="work-detail-grid">
              {photos.map((entry) => (
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
          </section>
        ) : null}

        {page.sections?.length ? <RenderSections sections={page.sections} /> : null}

        {page.statement?.paragraphs?.length ? (
          <section className="card work-detail-essay-block">
            <h2 className="work-detail-section__title">
              {page.statement.title ?? "Series statement"}
            </h2>
            <div className="prose work-detail-article__prose">
              {page.statement.paragraphs.map((para) => (
                <p key={para.slice(0, 48)}>{para}</p>
              ))}
            </div>
          </section>
        ) : null}

        {page.process?.paragraphs?.length ? (
          <section className="card work-detail-essay-block">
            <h2 className="work-detail-section__title">
              {page.process.title ?? "Context & process"}
            </h2>
            <div className="prose work-detail-article__prose">
              {page.process.paragraphs.map((para) => (
                <p key={para.slice(0, 48)}>{para}</p>
              ))}
            </div>
          </section>
        ) : null}

        {(page.printTiers?.length || printMeta?.printAvailable) && (
          <section className="card photograph-page__prints" id="prints">
            <h2 className="work-detail-section__title">Availability</h2>
            <p className="card-link__summary">
              Selected works from this series are available as physical prints.
            </p>
            {page.printTiers?.length ? (
              <div className="btn-row photograph-page__print-tiers">
                {page.printTiers.map((tier) => (
                  <SiteLink
                    key={tier.id}
                    href={tier.href}
                    context={LINK_CONTEXT}
                    className="btn"
                    showBadge={tier.kind === "shop"}
                  >
                    {tier.label}
                  </SiteLink>
                ))}
              </div>
            ) : null}
            {printMeta?.printAvailable ? (
              <div className="photography-prints__actions btn-row">
                <SiteLink
                  href={resolvePrintProductHref(page.breadcrumb.category, printMeta)}
                  context={LINK_CONTEXT}
                  className="btn"
                  showBadge
                >
                  Browse prints
                </SiteLink>
              </div>
            ) : null}
          </section>
        )}

        {page.crossLinks?.length ? (
          <section className="card work-detail-related-strip" aria-label="Related">
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
