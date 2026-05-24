import Image from "next/image";
import Link from "next/link";

import { LinkAffordance } from "@/components/link-affordance";
import { getLinkAriaLabel, resolveLinkKind } from "@/lib/link-kind";

const LINK_CONTEXT = "content";

/**
 * @param {{
 *   hub: {
 *     id: string;
 *     href: string;
 *     title: string;
 *     summary?: string;
 *     eyebrow?: string;
 *     image?: string;
 *     badgeLabel?: string;
 *   };
 *   priority?: boolean;
 * }} props
 */
function HubGridCard({ hub, priority = false }) {
  const resolved = resolveLinkKind(hub.href, { context: LINK_CONTEXT });
  const a11y = getLinkAriaLabel(hub.title, resolved);
  const hasImage = Boolean(hub.image);

  return (
    <Link
      href={hub.href}
      className={`hub-grid__card site-link site-link--${resolved.kind} site-link--card`}
      aria-label={a11y}
    >
      <div
        className={`hub-grid__visual${hasImage ? "" : " hub-grid__visual--empty"}`}
        aria-hidden="true"
      >
        {hasImage ? (
          <Image
            src={hub.image}
            alt=""
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes="(min-width: 640px) 50vw, 100vw"
            className="hub-grid__visual-media"
          />
        ) : null}
      </div>
      <div className="hub-grid__body">
        <LinkAffordance
          kind={resolved.kind}
          label={hub.badgeLabel ?? resolved.label}
          showBadge
          showExternalIcon={false}
          badgePosition="card"
        />
        {hub.eyebrow ? <p className="hub-grid__eyebrow">{hub.eyebrow}</p> : null}
        <h2 className="hub-grid__title">{hub.title}</h2>
        {hub.summary ? (
          <p className="hub-grid__summary">{hub.summary}</p>
        ) : null}
        <p className="hub-grid__cta">
          <span>View area</span>
          <span className="hub-grid__cta-arrow" aria-hidden="true">
            →
          </span>
        </p>
      </div>
    </Link>
  );
}

/**
 * 2×2 work-area navigation on /work (below hero).
 *
 * @param {{ hubs: Parameters<typeof HubGridCard>[0]["hub"][] }} props
 */
export function ExplorerHubGrid({ hubs }) {
  return (
    <section
      id="explorer-hub-grid"
      className="hub-grid"
      aria-label="Browse work by area"
    >
      <ul className="hub-grid__list">
        {hubs.map((hub, index) => (
          <li key={hub.id} className="hub-grid__item">
            <HubGridCard hub={hub} priority={index < 2} />
          </li>
        ))}
      </ul>
    </section>
  );
}
