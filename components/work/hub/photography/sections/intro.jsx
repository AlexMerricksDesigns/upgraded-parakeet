export function PhotographyIntro({ intro }) {
  return (
    <section
      className="card work-hub-essay-block photography-intro"
      aria-labelledby="photography-intro-heading"
    >
      {intro.eyebrow ? <p className="eyebrow">{intro.eyebrow}</p> : null}
      <h2 id="photography-intro-heading" className="work-hub-section__title">
        {intro.title}
      </h2>
      <div className="prose work-hub-article__prose">
        <p>{intro.lede}</p>
      </div>
      {intro.moreHref ? (
        <p className="photography-intro__more">
          <a href={intro.moreHref} className="plotter-series__link">
            {intro.moreLabel}
          </a>
        </p>
      ) : null}
    </section>
  );
}
