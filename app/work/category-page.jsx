import Image from "next/image";
import Link from "next/link";

import { CardLinkKind } from "@/components/card-link-kind";
import { LinkAffordance } from "@/components/link-affordance";
import { PageSection } from "@/components/page-section";
import { SiteLink, siteLinkCardClass } from "@/components/site-link";
import { getLinkAriaLabel, resolveLinkKind } from "@/lib/link-kind";

const LINK_CONTEXT = "content";

export function CategoryBreadcrumb({
  categoryTitle,
  categoryRoute = null,
  projectLabel = null,
}) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <Link href="/work">Work</Link>
      {categoryTitle ? (
        <>
          <span className="breadcrumb__sep">/</span>
          {projectLabel && categoryRoute ? (
            <Link href={categoryRoute}>{categoryTitle}</Link>
          ) : (
            <span>{categoryTitle}</span>
          )}
        </>
      ) : null}
      {projectLabel ? (
        <>
          <span className="breadcrumb__sep">/</span>
          <span>{projectLabel}</span>
        </>
      ) : null}
    </nav>
  );
}

export function ThreadTile({ item }) {
  const resolved = item.href
    ? resolveLinkKind(item.href, {
        context: LINK_CONTEXT,
        kind: item.external ? "external" : undefined,
      })
    : null;

  const body = (
    <>
      <div
        className={
          item.image
            ? "crypto-work-tile__media"
            : "crypto-work-tile__media crypto-work-tile__media--empty"
        }
      >
        {item.image ? (
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 900px) 33vw, 280px"
          />
        ) : (
          <span className="crypto-work-tile__placeholder-label">Image TBC</span>
        )}
        {item.platform ? (
          <span className="crypto-work-tile__platform">{item.platform}</span>
        ) : null}
      </div>
      <div className="crypto-work-tile__body">
        {resolved?.label ? (
          <LinkAffordance
            kind={resolved.kind}
            label={resolved.label}
            showBadge
            showExternalIcon={
              resolved.openInNewTab &&
              (resolved.kind === "external" || resolved.kind === "shop")
            }
            badgePosition="card"
          />
        ) : null}
        {item.year ? <p className="eyebrow">{item.year}</p> : null}
        <h3 className="crypto-work-tile__title">{item.title}</h3>
        <p className="card-link__summary">{item.summary}</p>
      </div>
    </>
  );

  if (!item.href) {
    return (
      <article className="crypto-work-tile crypto-work-tile--muted">
        <div className="crypto-work-tile__media crypto-work-tile__media--empty">
          <span className="crypto-work-tile__placeholder-label">Placeholder</span>
        </div>
        <div className="crypto-work-tile__body">
          <p className="eyebrow">{item.platform || item.year}</p>
          <h3 className="crypto-work-tile__title">{item.title}</h3>
          <p className="card-link__summary">{item.summary}</p>
          <p className="crypto-work-tile__soon">Coming soon</p>
        </div>
      </article>
    );
  }

  const isAnchor = resolved.external || resolved.openInNewTab;
  const className = `${siteLinkCardClass(item.href, LINK_CONTEXT)} crypto-work-tile`;
  const a11y = getLinkAriaLabel(item.title, resolved);

  if (isAnchor) {
    return (
      <a
        href={item.href}
        className={className}
        target="_blank"
        rel="noreferrer"
        aria-label={a11y}
      >
        {body}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className} aria-label={a11y}>
      {body}
    </Link>
  );
}

export function ThreadSection({ section }) {
  return (
    <section
      id={section.id}
      className="crypto-section"
      aria-labelledby={`${section.id}-heading`}
    >
      <header className="crypto-section__header">
        <h2 id={`${section.id}-heading`} className="crypto-section__title">
          {section.title}
        </h2>
        <p className="crypto-section__intro">{section.intro}</p>
      </header>
      {section.groups.map((group) => (
        <div className="crypto-section__group" key={group.id}>
          <h3 className="crypto-section__group-title">{group.title}</h3>
          <div className="crypto-work-grid">
            {group.items.map((item) => (
              <ThreadTile key={item.slug} item={item} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

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
    ctas = [
      { href: "/work", label: "Back to Explorer", variant: "ghost" },
    ],
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
      <article className="crypto-page">
        <header className="crypto-hero">
          <div className="crypto-hero__media">
            {page.heroImage ? (
              <Image
                src={page.heroImage}
                alt=""
                fill
                priority
                sizes="100vw"
                className="crypto-hero__img"
              />
            ) : null}
          </div>
          <div className="crypto-hero__content">
            <p className="eyebrow">Work · {categoryTitle}</p>
            <h1 className="crypto-hero__title">{page.title}</h1>
            <p className="crypto-hero__subtitle">{page.subtitle}</p>
            {page.meta ? <p className="crypto-hero__meta">{page.meta}</p> : null}
          </div>
        </header>

        {conceptCards.length > 0 ? (
          <section className="crypto-concepts" aria-label="Core concepts">
            <div className="crypto-concepts__scroll">
              {conceptCards.map((card) => (
                <div key={card.id} className="card crypto-concept-card">
                  <h2 className="crypto-concept-card__title">{card.title}</h2>
                  <p className="card-link__summary">{card.summary}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {relatedOnSite.length > 0 ? (
          <section className="card crypto-related-strip" aria-label="Related on this site">
            <h2 className="card-link__title">Elsewhere on the site</h2>
            <p className="card-link__summary">
              Related threads, shop, and journal — shop links open in a new tab.
            </p>
            <div className="crypto-related-strip__grid">
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
          <section className="card crypto-essay-block" aria-label="Introduction">
            {intro.title ? <p className="eyebrow">{intro.title}</p> : null}
            {intro.lead ? (
              <p className="crypto-essay-block__lead">{intro.lead}</p>
            ) : null}
            <div className="prose crypto-article__prose">
              {intro.paragraphs.map((para) => (
                <p key={para.slice(0, 48)}>{para}</p>
              ))}
            </div>
          </section>
        ) : null}

        {essay ? (
          <section className="crypto-essay-stack" aria-label="Essay and framing">
            <article className="card crypto-essay-block">
              <p className="eyebrow">{essay.preface.title}</p>
              <p className="crypto-essay-block__lead">{essay.preface.lead}</p>
              <div className="prose crypto-article__prose">
                {essay.preface.paragraphs.map((para) => (
                  <p key={para.slice(0, 48)}>{para}</p>
                ))}
              </div>
            </article>
            <article className="card crypto-essay-block">
              <h2 className="crypto-article__essay-title">{essay.essayTitle}</h2>
              <p className="crypto-article__essay-date">{essay.essayDate}</p>
              {essay.sections.map((section) => (
                <section
                  key={section.id}
                  className="crypto-essay-part"
                  aria-labelledby={`essay-${section.id}`}
                >
                  <h3
                    id={`essay-${section.id}`}
                    className="crypto-essay-part__title"
                  >
                    {section.title}
                  </h3>
                  <div className="prose crypto-article__prose">
                    {section.paragraphs.map((para) => (
                      <p key={para.slice(0, 48)}>{para}</p>
                    ))}
                  </div>
                  {section.pullQuote ? (
                    <blockquote className="crypto-pullquote">
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

        <section className="card crypto-cta-strip">
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
