import Image from "next/image";
import Link from "next/link";

import { EXPLORER_HUB_SPOTLIGHTS } from "@/app/work/work-hubs";

/**
 * Left sticky rail on /work (desktop): hub filter buttons + featured project cards.
 *
 * @param {{
 *   activeHubId: string | null;
 *   onSelectHub: (hubId: string) => void;
 *   title?: string;
 * }} props
 */
export function ExplorerSpotlightRail({
  activeHubId,
  onSelectHub,
  title = "Browse by area",
}) {
  return (
    <aside className="explorer-spotlight-rail" aria-label={title}>
      <div className="explorer-spotlight-rail__sticky">
        <h2 className="explorer-spotlight-rail__title">{title}</h2>
        <div className="explorer-spotlight-rail__list">
          {EXPLORER_HUB_SPOTLIGHTS.map((hub) => {
            const isHubActive = activeHubId === hub.hubId;
            return (
              <div key={hub.hubId} className="explorer-spotlight-rail__group">
                <button
                  type="button"
                  className={`explorer-spotlight-rail__hub${isHubActive ? " is-active" : ""}`}
                  aria-pressed={isHubActive}
                  onClick={() => onSelectHub(hub.hubId)}
                >
                  {hub.title}
                </button>
                <Link
                  href={hub.featured.href}
                  className="explorer-spotlight-rail__card"
                  aria-label={`${hub.featured.title} — open project`}
                >
                  {hub.featured.image ? (
                    <div className="explorer-spotlight-rail__media">
                      <Image
                        src={hub.featured.image}
                        alt=""
                        fill
                        sizes="(min-width: 960px) 25vw, 100vw"
                        className="explorer-spotlight-rail__img"
                      />
                    </div>
                  ) : null}
                  <div className="explorer-spotlight-rail__card-body">
                    <p className="explorer-spotlight-rail__card-title">
                      {hub.featured.title}
                    </p>
                    {hub.featured.summary ? (
                      <p className="explorer-spotlight-rail__card-summary">
                        {hub.featured.summary}
                      </p>
                    ) : null}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
