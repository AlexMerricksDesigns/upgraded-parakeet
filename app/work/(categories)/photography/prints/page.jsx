import { PageSection } from "@/components/page-section";
import Link from "next/link";

import { SiteLink } from "@/components/site-link";
import { productPath } from "@/lib/work-paths";

export default function PhotographyPrintsPage() {
  return (
    <PageSection eyebrow={null} title="" intro={null}>
      <article className="work-hub-page plotter-page photography-page">
        <section className="work-hub-section" aria-labelledby="photography-prints-heading">
          <header className="work-hub-section__header">
            <h1 id="photography-prints-heading" className="work-hub-section__title">
              Prints
            </h1>
            <p className="work-hub-section__intro">
              Signed physical prints from selected works, plus options for requesting
              images from the wider archive.
            </p>
          </header>

          <div className="prose work-hub-article__prose">
            <p>
              Prints are produced in small runs with careful attention to paper,
              tonal range, and finish. Some works are offered as limited signed
              editions; others are available as open prints on request.
            </p>
            <p>
              If you have a specific photograph in mind, send a request with the
              slug or a link to the work and your preferred size. I’ll confirm
              availability and turnaround.
            </p>
          </div>

          <div className="btn-row photography-prints__actions">
            <SiteLink
              href={productPath("photography", "limited-prints")}
              context="content"
              className="btn"
              showBadge
            >
              Browse print products
            </SiteLink>
            <Link href="/contact" className="btn btn-ghost">
              Request a print
            </Link>
          </div>
        </section>
      </article>
    </PageSection>
  );
}

