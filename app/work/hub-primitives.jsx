import Image from "next/image";
import Link from "next/link";

import { LinkAffordance } from "@/components/link-affordance";
import { siteLinkCardClass } from "@/components/site-link";
import { getLinkAriaLabel, resolveLinkKind } from "@/lib/link-kind";

const LINK_CONTEXT = "content";

export function CategoryBreadcrumb({
  categoryTitle,
  categoryRoute = null,
  seriesLabel = null,
  seriesRoute = null,
  projectLabel = null,
}) {
  const hasTail = seriesLabel || projectLabel;

  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <Link href="/work">Work</Link>
      {categoryTitle ? (
        <>
          <span className="breadcrumb__sep">/</span>
          {hasTail && categoryRoute ? (
            <Link href={categoryRoute}>{categoryTitle}</Link>
          ) : (
            <span>{categoryTitle}</span>
          )}
        </>
      ) : null}
      {seriesLabel ? (
        <>
          <span className="breadcrumb__sep">/</span>
          {projectLabel && seriesRoute ? (
            <Link href={seriesRoute}>{seriesLabel}</Link>
          ) : (
            <span>{seriesLabel}</span>
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
            ? "work-hub-tile__media"
            : "work-hub-tile__media work-hub-tile__media--empty"
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
          <span className="work-hub-tile__placeholder-label">Image TBC</span>
        )}
        {item.nftLink ? (
          <span className="work-hub-tile__badge work-hub-tile__badge--nft">
            {item.nftPlatform ? `Minted · ${item.nftPlatform}` : "On-chain"}
          </span>
        ) : null}
        {item.printAvailable ? (
          <span className="work-hub-tile__badge work-hub-tile__badge--print">
            Available as print
          </span>
        ) : null}
        {item.platform ? (
          <span className="work-hub-tile__platform">{item.platform}</span>
        ) : null}
      </div>
      <div className="work-hub-tile__body">
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
        <h3 className="work-hub-tile__title">{item.title}</h3>
        <p className="card-link__summary">{item.summary}</p>
      </div>
    </>
  );

  if (!item.href) {
    return (
      <article className="work-hub-tile work-hub-tile--muted">
        <div className="work-hub-tile__media work-hub-tile__media--empty">
          <span className="work-hub-tile__placeholder-label">Placeholder</span>
        </div>
        <div className="work-hub-tile__body">
          <p className="eyebrow">{item.platform || item.year}</p>
          <h3 className="work-hub-tile__title">{item.title}</h3>
          <p className="card-link__summary">{item.summary}</p>
          <p className="work-hub-tile__soon">Coming soon</p>
        </div>
      </article>
    );
  }

  const isAnchor = resolved.external || resolved.openInNewTab;
  const className = `${siteLinkCardClass(item.href, LINK_CONTEXT)} work-hub-tile`;
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
      className="work-hub-section"
      aria-labelledby={`${section.id}-heading`}
    >
      <header className="work-hub-section__header">
        <h2 id={`${section.id}-heading`} className="work-hub-section__title">
          {section.title}
        </h2>
        {section.intro ? (
          <p className="work-hub-section__intro">{section.intro}</p>
        ) : null}
      </header>
      {section.groups.map((group) => (
        <div className="work-hub-section__group" key={group.id}>
          <h3 className="work-hub-section__group-title">{group.title}</h3>
          <div className="work-hub-grid">
            {group.items.map((item) => (
              <ThreadTile key={item.slug} item={item} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
