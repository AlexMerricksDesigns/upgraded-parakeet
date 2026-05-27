import Image from "next/image";
import Link from "next/link";

import { CardLinkKind } from "@/components/card-link-kind";
import { SiteLink } from "@/components/site-link";

import {
  conceptCards,
  JOURNEY_ANCHOR,
  photez,
  practiceHistory,
  timeline,
  timelineSection,
} from "../copy";

const LINK_CONTEXT = "content";

export function PhotographyPracticeHistory() {
  return (
    <details id={JOURNEY_ANCHOR.replace("#", "")} className="practice-history card">
      <summary className="practice-history__summary">
        <span className="practice-history__title">Practice history</span>
        <span className="practice-history__hint">{practiceHistory.summary}</span>
      </summary>

      <section className="work-hub-concepts" aria-label="Core ideas">
        <div className="work-hub-concepts__scroll">
          {conceptCards.map((card) => (
            <div key={card.id} className="card work-hub-concept-card">
              <h2 className="work-hub-concept-card__title">{card.title}</h2>
              <p className="card-link__summary">{card.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="plotter-timeline"
        aria-labelledby="photography-timeline-heading"
      >
        <header className="plotter-timeline__header">
          <h2 id="photography-timeline-heading" className="work-hub-section__title">
            {timelineSection.title}
          </h2>
          <p className="work-hub-section__intro">{timelineSection.intro}</p>
        </header>
        <ol className="plotter-timeline__track">
          {timeline.map((item, index) => (
            <li
              key={item.id}
              id={`photography-year-${item.id}`}
              className="plotter-timeline__item"
            >
              <article className="plotter-timeline__card">
                <Link href={item.timelineHref} className="plotter-timeline__card-link">
                  <div className="plotter-timeline__media">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(min-width: 720px) 220px, 70vw"
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                    <span className="plotter-timeline__date">{item.date}</span>
                  </div>
                  <div className="plotter-timeline__body">
                    <h3 className="plotter-timeline__title">{item.title}</h3>
                    <p className="card-link__summary">{item.summary}</p>
                    <span className="plotter-timeline__more">View year →</span>
                  </div>
                </Link>
                {item.projectHref ? (
                  <SiteLink
                    href={item.projectHref}
                    context={LINK_CONTEXT}
                    className="plotter-timeline__external plotter-timeline__external--below"
                    showBadge={false}
                  >
                    Related work →
                  </SiteLink>
                ) : null}
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section className="practice-history__photez card work-hub-essay-block">
        <h2 className="work-hub-section__title">{photez.title}</h2>
        <p className="work-hub-essay-block__lead">{photez.lead}</p>
        <div className="prose work-hub-article__prose">
          {photez.paragraphs.map((para) => (
            <p key={para.slice(0, 48)}>{para}</p>
          ))}
        </div>
        <div className="practice-history__photez-links work-hub-related-strip__grid">
          {photez.links.map((link) => (
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
    </details>
  );
}
