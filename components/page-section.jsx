export function PageSection({ eyebrow, title, intro, children }) {
  return (
    <section className="section">
      <div className="container">
        {/* If eyebrow is a plain string, style it as a label.
            If it's a React element (e.g. a breadcrumb nav), render as-is. */}
        {typeof eyebrow === "string" ? (
          <p className="eyebrow">{eyebrow}</p>
        ) : (
          eyebrow ?? null
        )}

        {title ? <h1 className="page-title">{title}</h1> : null}
        {intro ? <p className="intro">{intro}</p> : null}

        {children ? <div className="section__body">{children}</div> : null}
      </div>
    </section>
  );
}
