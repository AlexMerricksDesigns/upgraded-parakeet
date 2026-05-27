import Image from "next/image";

import { CardLinkKind } from "@/components/card-link-kind";
import { PageSection } from "@/components/page-section";
import { SiteLink } from "@/components/site-link";
import {
  CategoryBreadcrumb,
  ThreadSection,
} from "@/app/work/hub-primitives";

export { CategoryBreadcrumb, ThreadSection, ThreadTile } from "@/app/work/hub-primitives";

const LINK_CONTEXT = "content";

/**
 * @param {{
 *   categoryTitle: string;
 *   categoryRoute: string;
 *   page: { title: string; subtitle: string; heroImage?: string | null; meta?: string };
 *   conceptCards?: { id: string; title: string; summary: string }[];
 *   intro?: { title?: string; lead?: string; paragraphs: string[] };
 *   relatedOnSite?: { href: string; label: string; summary: string }[];
 *   essay?: {
 *     preface: { title: string; lead: string; paragraphs: string[] };
 *     essayTitle: string;
 *     essayDate: string;
 *     sections: { id: string; title: string; paragraphs: string[]; pullQuote?: string }[];
 *   };
 *   projectSections?: { id: string; title: string; intro: string; groups: { id: string; title: string; items: object[] }[] }[];
 *   ctas?: { href: string; label: string; variant?: string }[];
 *   ctaTitle?: string;
 *   ctaSummary?: string;
 * }} config
 */
export function CategoryPage({ config }) {
  const {
    categoryTitle,
    categoryRoute,
    page,
    conceptCards = [],
    intro,
    relatedOnSite = [],
    essay,
    projectSections = [],
    ctas = [{ href: "/work", label: "Back to Explorer", variant: "ghost" }],
    ctaTitle = "Continue",
    ctaSummary = "Return to the Work Explorer or follow a link above.",
  } = config;

  return (
    <PageSection
      eyebrow={
        <CategoryBreadcrumb
          categoryTitle={categoryTitle}
          categoryRoute={categoryRoute}
        />
      }
      title=""
      intro={null}
    >
      <article className="work-hub-page work-hub-page--category-home">
        <header className="work-hub-hero work-hub-hero--fullbleed">
          <div className="work-hub-hero__media">
            {page.heroImage ? (
              <Image
                src={page.heroImage}
                alt=""
                fill
                priority
                sizes="100vw"
                className="work-hub-hero__img"
              />
            ) : null}
          </div>
          <div className="work-hub-hero__content">
            <p className="eyebrow">Work · {categoryTitle}</p>
            <h1 className="work-hub-hero__title">{page.title}</h1>
            <p className="work-hub-hero__subtitle">{page.subtitle}</p>
            {page.meta ? <p className="work-hub-hero__meta">{page.meta}</p> : null}
          </div>
        </header>

        {conceptCards.length > 0 ? (
          <section className="work-hub-concepts" aria-label="Core concepts">
            <div className="work-hub-concepts__scroll">
              {conceptCards.map((card) => (
                <div key={card.id} className="card work-hub-concept-card">
                  <h2 className="work-hub-concept-card__title">{card.title}</h2>
                  <p className="card-link__summary">{card.summary}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {relatedOnSite.length > 0 ? (
          <section className="card work-hub-related-strip" aria-label="Related on this site">
            <h2 className="card-link__title">Elsewhere on the site</h2>
            <p className="card-link__summary">
              Related threads, shop, and journal — shop links open in a new tab.
            </p>
            <div className="work-hub-related-strip__grid">
              {relatedOnSite.map((link) => (
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

        {intro ? (
          <section className="card work-hub-essay-block" aria-label="Introduction">
            {intro.title ? <p className="eyebrow">{intro.title}</p> : null}
            {intro.lead ? (
              <p className="work-hub-essay-block__lead">{intro.lead}</p>
            ) : null}
            <div className="prose work-hub-article__prose">
              {intro.paragraphs.map((para) => (
                <p key={para.slice(0, 48)}>{para}</p>
              ))}
            </div>
          </section>
        ) : null}

        {essay ? (
          <section className="work-hub-essay-stack" aria-label="Essay and framing">
            <article className="card work-hub-essay-block">
              <p className="eyebrow">{essay.preface.title}</p>
              <p className="work-hub-essay-block__lead">{essay.preface.lead}</p>
              <div className="prose work-hub-article__prose">
                {essay.preface.paragraphs.map((para) => (
                  <p key={para.slice(0, 48)}>{para}</p>
                ))}
              </div>
            </article>
            <article className="card work-hub-essay-block">
              <h2 className="work-hub-article__essay-title">{essay.essayTitle}</h2>
              <p className="work-hub-article__essay-date">{essay.essayDate}</p>
              {essay.sections.map((section) => (
                <section
                  key={section.id}
                  className="work-hub-essay-part"
                  aria-labelledby={`essay-${section.id}`}
                >
                  <h3
                    id={`essay-${section.id}`}
                    className="work-hub-essay-part__title"
                  >
                    {section.title}
                  </h3>
                  <div className="prose work-hub-article__prose">
                    {section.paragraphs.map((para) => (
                      <p key={para.slice(0, 48)}>{para}</p>
                    ))}
                  </div>
                  {section.pullQuote ? (
                    <blockquote className="work-hub-pullquote">
                      <p>{section.pullQuote}</p>
                    </blockquote>
                  ) : null}
                </section>
              ))}
            </article>
          </section>
        ) : null}

        {projectSections.map((section) => (
          <ThreadSection key={section.id} section={section} />
        ))}

        <section className="card work-hub-cta-strip">
          <h2 className="card-link__title">{ctaTitle}</h2>
          <p className="card-link__summary">{ctaSummary}</p>
          <div className="btn-row" style={{ marginTop: "1rem" }}>
            {ctas.map((cta) => (
              <SiteLink
                key={cta.href}
                href={cta.href}
                context={LINK_CONTEXT}
                className={cta.variant === "primary" ? "btn" : "btn btn-ghost"}
                showBadge={false}
              >
                {cta.label}
              </SiteLink>
            ))}
          </div>
        </section>
      </article>
    </PageSection>
  );
}
