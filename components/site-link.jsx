import Link from "next/link";

import { LinkAffordance } from "@/components/link-affordance";
import { getLinkAriaLabel, resolveLinkKind } from "@/lib/link-kind";

/**
 * @param {object} props
 * @param {string} props.href
 * @param {React.ReactNode} props.children
 * @param {'inline' | 'card' | 'text'} [props.variant]
 * @param {import('@/lib/link-kind').LinkKind} [props.kind]
 * @param {'content' | 'shop' | 'nav' | 'default'} [props.context]
 * @param {string} [props.className]
 * @param {boolean} [props.showBadge]
 * @param {string} [props.ariaLabel]
 * @param {boolean} [props.unstyled] — skip site-link kind classes (card wrapper supplies them)
 */
export function SiteLink({
  href,
  children,
  variant = "inline",
  kind: kindOverride,
  context = "default",
  className = "",
  showBadge,
  ariaLabel,
  unstyled = false,
  ...rest
}) {
  const resolved = resolveLinkKind(href, { kind: kindOverride, context });
  const isExternal = resolved.external;
  const openInNewTab = resolved.openInNewTab;

  const defaultShowBadge =
    variant === "card" ? true : variant === "inline" ? false : true;
  const badgeVisible = showBadge ?? defaultShowBadge;

  const showExternalIcon =
    openInNewTab && (resolved.kind === "external" || resolved.kind === "shop");

  const classes = [
    unstyled ? "" : "site-link",
    unstyled ? "" : `site-link--${resolved.kind}`,
    unstyled ? "" : `site-link--${variant}`,
    openInNewTab ? "site-link--new-tab" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const labelText =
    typeof children === "string" ? children : ariaLabel ?? undefined;
  const a11yLabel = ariaLabel ?? (labelText ? getLinkAriaLabel(labelText, resolved) : undefined);

  const affordance =
    badgeVisible || showExternalIcon ? (
      <LinkAffordance
        kind={resolved.kind}
        label={resolved.label}
        showBadge={badgeVisible && variant !== "inline"}
        showExternalIcon={showExternalIcon}
        badgePosition={variant === "card" ? "card" : "inline"}
      />
    ) : null;

  const content =
    variant === "inline" ? (
      <>
        <span className="site-link__text">{children}</span>
        {showExternalIcon ? (
          <LinkAffordance
            kind={resolved.kind}
            label=""
            showBadge={false}
            showExternalIcon
            badgePosition="inline"
          />
        ) : null}
      </>
    ) : (
      <>
        {children}
        {affordance}
      </>
    );

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noreferrer"
        aria-label={a11yLabel}
        {...rest}
      >
        {content}
      </a>
    );
  }

  if (openInNewTab) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noreferrer"
        aria-label={a11yLabel}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={a11yLabel} {...rest}>
      {content}
    </Link>
  );
}

/** Class names for wrapping existing card markup */
export function siteLinkCardClass(href, context = "default", extra = "") {
  const { kind, openInNewTab } = resolveLinkKind(href, { context });
  return [
    "card-link",
    "site-link",
    `site-link--${kind}`,
    "site-link--card",
    openInNewTab ? "site-link--new-tab" : "",
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}

export { resolveLinkKind };
