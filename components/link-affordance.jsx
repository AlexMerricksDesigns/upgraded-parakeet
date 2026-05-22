/** Small icon + optional kind badge for SiteLink */

export function ExternalIcon({ className = "" }) {
  return (
    <span className={`link-icon link-icon--external ${className}`.trim()} aria-hidden>
      ↗
    </span>
  );
}

export function LinkBadge({ label, kind }) {
  if (!label) return null;
  return (
    <span className={`link-badge link-badge--${kind}`}>{label}</span>
  );
}

export function LinkAffordance({
  kind,
  label,
  showBadge = true,
  showExternalIcon = false,
  badgePosition = "inline",
}) {
  return (
    <span
      className={`link-affordance link-affordance--${badgePosition}`.trim()}
      data-link-kind={kind}
    >
      {showBadge && label ? <LinkBadge label={label} kind={kind} /> : null}
      {showExternalIcon ? <ExternalIcon /> : null}
    </span>
  );
}
