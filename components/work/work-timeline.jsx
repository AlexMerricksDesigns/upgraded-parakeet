"use client";

import Image from "next/image";
import Link from "next/link";

import { LinkAffordance } from "@/components/link-affordance";
import { siteLinkCardClass } from "@/components/site-link";
import { getChronicleTimelineYear } from "@/app/work/categories";
import { getLinkAriaLabel, resolveLinkKind } from "@/lib/link-kind";

const LINK_CONTEXT = "content";

function WorkTimelineCard({ project }) {
  const resolved = resolveLinkKind(project.href, { context: LINK_CONTEXT });
  const className = siteLinkCardClass(
    project.href,
    LINK_CONTEXT,
    "explorer-chronicle__entry work-timeline__card"
  );
  const a11y = getLinkAriaLabel(project.title, resolved);
  const hasImage = Boolean(project.image);
  const visualClass = `work-timeline__card-visual${
    hasImage ? "" : " work-timeline__card-visual--placeholder"
  }`;

  const body = (
    <>
      <div className={visualClass} aria-hidden="true">
        {hasImage ? (
          <Image
            src={project.image}
            alt=""
            fill
            loading="lazy"
            sizes="(min-width: 960px) 280px, 85vw"
            className="work-timeline__card-visual-media"
          />
        ) : null}
      </div>
      <div className="work-timeline__card-body">
        <LinkAffordance
          kind={resolved.kind}
          label={resolved.label}
          showBadge
          showExternalIcon={false}
          badgePosition="card"
        />
        {project.year ? <p className="eyebrow">{project.year}</p> : null}
        <h3 className="explorer-chronicle__title">{project.title}</h3>
        <p className="explorer-chronicle__summary">{project.summary}</p>
      </div>
    </>
  );

  if (resolved.external || resolved.openInNewTab) {
    return (
      <a
        href={project.href}
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
    <Link href={project.href} className={className} aria-label={a11y}>
      {body}
    </Link>
  );
}

/**
 * Spine timeline: one slot per item (left | spine | right), gentle overlap down the track.
 * @param {{ items: object[] }} props — filtered chronicle rows (newest first)
 */
export function WorkTimeline({ items }) {
  if (!items?.length) {
    return (
      <p className="work-timeline__empty card-link__summary">
        No entries match this filter yet.
      </p>
    );
  }

  let lastYear = null;

  return (
    <div className="work-timeline">
      <div className="work-timeline__spine" aria-hidden="true" />
      <ol className="work-timeline__track">
        {items.map((project, index) => {
          const timelineYear = getChronicleTimelineYear(project);
          const showYear =
            timelineYear != null && timelineYear !== lastYear;
          if (showYear) lastYear = timelineYear;
          const side = index % 2 === 0 ? "left" : "right";
          const isLeft = side === "left";
          const columnRepeat = index >= 2;

          return (
            <li
              key={`${project.slug}-${project.href}`}
              className={`work-timeline__slot work-timeline__slot--${side}${
                showYear ? " work-timeline__slot--has-year" : ""
              }${columnRepeat ? " work-timeline__slot--column-repeat" : ""}`}
            >
              <div className="work-timeline__slot-grid">
                <div className="work-timeline__col work-timeline__col--card">
                  {isLeft ? <WorkTimelineCard project={project} /> : null}
                </div>
                <div className="work-timeline__col work-timeline__col--spine">
                  {showYear ? (
                    <span className="work-timeline__year-on-spine">
                      {timelineYear}
                    </span>
                  ) : null}
                  <span className="work-timeline__branch" aria-hidden="true" />
                </div>
                <div className="work-timeline__col work-timeline__col--card">
                  {!isLeft ? <WorkTimelineCard project={project} /> : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
