import Image from "next/image";

import { SiteLink } from "@/components/site-link";

const LINK_CONTEXT = "content";

export function PhotographyHero({ hero }) {
  return (
    <header className="work-hub-hero work-hub-hero--fullbleed plotter-hero">
      <div className="work-hub-hero__media plotter-hero__media">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="work-hub-hero__img"
        />
      </div>
      <div className="work-hub-hero__content plotter-hero__content">
        <div className="work-hub-hero__content-inner">
          <div className="work-hub-hero__copy">
            <h1 className="work-hub-hero__title">{hero.headline}</h1>
            <p className="work-hub-hero__subtitle">{hero.tagline}</p>
            <p className="plotter-hero__lede">{hero.lede}</p>
          </div>
          <div className="work-hub-hero__actions plotter-hero__actions btn-row">
            <a href={hero.primaryHref} className="btn">
              {hero.primaryCta}
            </a>
            <SiteLink
              href={hero.secondaryHref}
              context={LINK_CONTEXT}
              className="btn btn-ghost"
              showBadge={false}
            >
              {hero.secondaryCta}
            </SiteLink>
          </div>
        </div>
      </div>
    </header>
  );
}
