import Link from "next/link";

import { SiteLink } from "@/components/site-link";
import { productPath } from "@/lib/work-paths";

import { PRINTS_ANCHOR, printsSection } from "../copy";

const LINK_CONTEXT = "content";

export function PrintsTeaserSection() {
  return (
    <section
      id={PRINTS_ANCHOR.replace("#", "")}
      className="work-hub-section"
      aria-labelledby="photography-prints-heading"
    >
      <header className="work-hub-section__header">
        <h2 id="photography-prints-heading" className="work-hub-section__title">
          {printsSection.title}
        </h2>
        <p className="work-hub-section__intro">{printsSection.intro}</p>
      </header>

      <div className="prose work-hub-article__prose">
        <p>
          Prints are produced in small runs, with careful attention to paper and
          tonal range. Some works are offered as limited signed editions; others
          are available as open prints on request.
        </p>
        <p>
          If you have a specific photograph in mind that is not listed in the
          shop yet, you can request it and I’ll confirm availability, sizing,
          and turnaround.
        </p>
      </div>

      <div className="photography-prints__actions btn-row">
        <SiteLink
          href={productPath("photography", "limited-prints")}
          context={LINK_CONTEXT}
          className="btn"
          showBadge
        >
          {printsSection.shopCta}
        </SiteLink>
        <Link href="/contact" className="btn btn-ghost">
          {printsSection.requestLabel}
        </Link>
      </div>
    </section>
  );
}
