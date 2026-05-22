import Image from "next/image";
import Link from "next/link";

import { LinkAffordance } from "@/components/link-affordance";
import { getLinkAriaLabel, resolveLinkKind } from "@/lib/link-kind";
import { siteLinkCardClass } from "@/components/site-link";

/**
 * Card grid link with destination badge and kind styling.
 */
export function CardLinkKind({
  href,
  context = "content",
  kind: kindOverride,
  title,
  summary,
  eyebrow,
  image,
  alt = "",
  compact = false,
  showMedia = true,
  footer = null,
  mediaEmpty = false,
}) {
  const resolved = resolveLinkKind(href, { context, kind: kindOverride });
  const extraClass = [
    compact ? "card-link--compact" : "",
    !showMedia ? "card-link--text-only" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const className = siteLinkCardClass(href, context, extraClass);
  const isNativeAnchor = resolved.external || resolved.openInNewTab;

  const body = (
    <>
      {showMedia && image !== undefined ? (
        <div
          className={
            image
              ? "card-link__media"
              : "card-link__media card-link__media--empty"
          }
        >
          {image ? (
            <Image
              alt={alt || title}
              src={image}
              fill
              sizes={compact ? "240px" : "(min-width: 900px) 33vw, 80vw"}
            />
          ) : null}
        </div>
      ) : showMedia && mediaEmpty ? (
        <div className="card-link__media card-link__media--empty" />
      ) : null}
      <div className="card-link__body">
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
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h3 className="card-link__title">{title}</h3>
        {summary ? <p className="card-link__summary">{summary}</p> : null}
        {footer}
      </div>
    </>
  );

  const a11y = getLinkAriaLabel(title, resolved);

  if (isNativeAnchor) {
    return (
      <a
        href={href}
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
    <Link href={href} className={className} aria-label={a11y}>
      {body}
    </Link>
  );
}
