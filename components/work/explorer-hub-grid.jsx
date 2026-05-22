import Image from "next/image";
import Link from "next/link";

/**
 * 2×2 feature category grid for /work (between hero and filter pills).
 *
 * @param {{ hubs: { id: string; title: string; href: string; image: string }[] }} props
 */
export function ExplorerHubGrid({ hubs }) {
  return (
    <section
      id="explorer-hub-grid"
      className="explorer-hub-grid"
      aria-label="Browse work by area"
    >
      <div className="explorer-hub-grid__inner">
        {hubs.map((hub) => (
          <Link
            key={hub.id}
            href={hub.href}
            className="explorer-hub-grid__cell"
            aria-label={`${hub.title} — open category`}
          >
            <div className="explorer-hub-grid__media">
              <Image
                src={hub.image}
                alt=""
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="explorer-hub-grid__img"
              />
            </div>
            <h2 className="explorer-hub-grid__title">{hub.title}</h2>
          </Link>
        ))}
      </div>
    </section>
  );
}
