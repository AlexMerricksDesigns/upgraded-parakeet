import { CardLinkKind } from "@/components/card-link-kind";

const LINK_CONTEXT = "content";

export function PhotographyCrossLinks({ links }) {
  if (!links?.length) return null;

  return (
    <section
      className="card work-hub-related-strip"
      aria-label="Related on this site"
    >
      <h2 className="card-link__title">Elsewhere on the site</h2>
      <p className="card-link__summary">
        Related threads, series, and writing filed under Photography.
      </p>
      <div className="work-hub-related-strip__grid">
        {links.map((link) => (
          <CardLinkKind
            key={link.href}
            href={link.href}
            context={LINK_CONTEXT}
            title={link.label}
            summary={link.summary}
            mediaEmpty
          />
        ))}
      </div>
    </section>
  );
}
