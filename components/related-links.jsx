import { CardLinkKind } from "@/components/card-link-kind";

export function RelatedLinks({ title = "Related", links = [], context = "content" }) {
  if (!links?.length) return null;

  return (
    <section className="card">
      <h2 className="card-link__title">{title}</h2>
      <div className="grid-2" style={{ marginTop: "1.5rem" }}>
        {links.map((link) => (
          <CardLinkKind
            key={link.href}
            href={link.href}
            context={context}
            title={link.label}
            summary={link.summary}
            eyebrow={link.eyebrow}
            mediaEmpty
          />
        ))}
      </div>
    </section>
  );
}
