import Image from "next/image";
import Link from "next/link";

import { CardLinkKind } from "@/components/card-link-kind";
import { ProseBlocks } from "@/components/prose-blocks";
import { RelatedLinks } from "@/components/related-links";

export function RenderSections({ sections, imageBase = "" }) {
  return sections.map((section, i) => (
    <Section key={`${section.type}-${i}`} section={section} imageBase={imageBase} />
  ));
}

function Section({ section, imageBase }) {
  switch (section.type) {
    case "contextCard":
      return (
        <section className="card" style={{ marginBottom: "1.5rem" }}>
          {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
          {section.summary ? (
            <p className="card-link__summary" style={{ marginTop: "0.5rem" }}>
              {section.summary}
            </p>
          ) : null}
          {section.links?.length ? (
            <div className="btn-row" style={{ marginTop: "1rem" }}>
              {section.links.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className="btn btn-ghost"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.href} href={link.href} className="btn btn-ghost">
                    {link.label}
                  </Link>
                )
              )}
            </div>
          ) : null}
        </section>
      );

    case "hero":
      return (
        <section className="hero">
          <div className="hero__bg">
            <Image
              src={section.image}
              alt={section.alt || ""}
              fill
              priority
              sizes="100vw"
              className="hero__bg-img"
            />
          </div>
          <div className="hero__inner">
            {section.year ? (
              <p className="eyebrow hero__eyebrow">{section.year}</p>
            ) : null}
            {section.title ? (
              <h1 className="hero__title">{section.title}</h1>
            ) : null}
            {section.description ? (
              <p className="hero__desc">{section.description}</p>
            ) : null}
          </div>
        </section>
      );

    case "heroMedia":
      return (
        <div className="hero-media">
          <Image
            src={section.image}
            alt={section.alt || ""}
            fill
            priority
            sizes="(min-width: 1024px) 72rem, 100vw"
          />
        </div>
      );

    case "tagRow":
      return (
        <div className="tag-row">
          {section.year ? <span className="eyebrow">{section.year}</span> : null}
          {section.eyebrow ? <span className="eyebrow">{section.eyebrow}</span> : null}
          {section.tags?.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      );

    case "details":
      return (
        <section className="card">
          {section.title ? (
            <h2 className="card-link__title">{section.title}</h2>
          ) : null}
          <dl className="details-grid" style={{ marginTop: "1.5rem" }}>
            {section.rows?.map((row) => (
              <div key={row.dt}>
                <dt>{row.dt}</dt>
                <dd>{row.dd}</dd>
              </div>
            ))}
          </dl>
        </section>
      );

    case "prose":
      return (
        <section className="card">
          {section.title ? (
            <h2 className="card-link__title">{section.title}</h2>
          ) : null}
          <div className="prose" style={{ marginTop: "1.5rem" }}>
            {section.paragraphs?.map((text, idx) => (
              <p key={idx}>{text}</p>
            ))}
          </div>
        </section>
      );

    case "proseBlocks":
      return (
        <section className="card">
          {section.title ? (
            <h2 className="card-link__title">{section.title}</h2>
          ) : null}
          <div
            className="prose"
            style={{ marginTop: section.title ? "1.5rem" : 0 }}
          >
            <ProseBlocks
              blocks={section.blocks}
              imageBase={section.imageBase || imageBase}
              linkContext="content"
            />
          </div>
          {section.download ? (
            <p style={{ marginTop: "1.5rem" }}>
              <a href={section.download.href} className="btn" download>
                {section.download.label}
              </a>
            </p>
          ) : null}
        </section>
      );

    case "proseHtml":
      return (
        <section className="card">
          {section.title ? (
            <h2 className="card-link__title">{section.title}</h2>
          ) : null}
          <div
            className="prose"
            style={{ marginTop: "1.5rem" }}
            dangerouslySetInnerHTML={{ __html: section.html }}
          />
        </section>
      );

    case "gallery":
      return (
        <section className="card">
          {section.title ? (
            <h2 className="card-link__title">{section.title}</h2>
          ) : null}
          <div className="gallery" style={{ marginTop: "1.5rem" }}>
            {section.items?.map((item) => (
              <figure key={item.src} className="figure">
                <div className="figure__media">
                  <Image
                    src={item.src}
                    alt={item.alt || ""}
                    fill
                    sizes="(min-width: 700px) 50vw, 100vw"
                  />
                </div>
                {item.caption ? (
                  <figcaption className="figure__caption">
                    {item.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </section>
      );

    case "connected":
      return (
        <section className="card">
          {section.title ? (
            <h2 className="card-link__title">{section.title}</h2>
          ) : null}
          {section.summary ? (
            <p className="card-link__summary" style={{ marginTop: "0.75rem" }}>
              {section.summary}
            </p>
          ) : null}
          <div
            className={
              section.columns === 1 ? "" : `grid-${section.columns || 2}`
            }
            style={{ marginTop: "1.5rem" }}
          >
            {section.cards?.map((card) => (
              <CardLinkKind
                key={card.href}
                href={card.href}
                context="content"
                title={card.title}
                summary={card.summary}
                eyebrow={card.eyebrow}
                mediaEmpty={card.mediaEmpty !== false}
              />
            ))}
          </div>
        </section>
      );

    case "checkout":
      return (
        <section className="card">
          {section.title ? (
            <h2 className="card-link__title">{section.title}</h2>
          ) : null}
          {section.summary ? (
            <p className="card-link__summary" style={{ marginTop: "0.75rem" }}>
              {section.summary}
            </p>
          ) : null}
        </section>
      );

    case "download":
      return (
        <section className="card">
          <p style={{ marginTop: 0 }}>
            <a href={section.href} className="btn" download>
              {section.label}
            </a>
          </p>
        </section>
      );

    case "relatedLinks":
      return (
        <RelatedLinks
          title={section.title ?? "Related"}
          links={section.links}
          context="content"
        />
      );

    default:
      return null;
  }
}
