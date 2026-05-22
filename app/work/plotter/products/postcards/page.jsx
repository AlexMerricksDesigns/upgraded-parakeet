import Image from "next/image";

import { CardLinkKind } from "@/components/card-link-kind";
import { PageSection } from "@/components/page-section";
import { CategoryBreadcrumb } from "@/app/work/category-page";
import { getWorkCategory } from "@/app/work/categories";
import { categoryPath, projectPath } from "@/lib/work-paths";

export const metadata = {
  title: "Postcard Series",
  description:
    "A small edition set pulled from derivations and detours in image-making.",
};

const gallery = [
  {
    src: "/shop/postcards/_MG_3396.jpg",
    alt: "Close-up of postcard prints laid out together.",
    caption:
      "The set begins as a compact way to test imagery in a tactile format.",
  },
  {
    src: "/shop/postcards/_MG_4293.jpg",
    alt: "Another view of the postcard set on display.",
    caption:
      "Variations across the cards make the edition feel like a small sequence rather than one repeated image.",
  },
  {
    src: "/shop/postcards/IMG_3790.jpg",
    alt: "Detail photograph of an individual postcard from the set.",
    caption:
      "Each card can stand alone while still belonging to the wider series.",
  },
];

const plotterCategory = getWorkCategory("plotter");

export default function PostcardsPage() {
  return (
    <PageSection
      eyebrow={
        <CategoryBreadcrumb
          categoryTitle={plotterCategory.title}
          categoryRoute={categoryPath("plotter")}
          projectLabel="Postcard Series (6-card set)"
        />
      }
      title="Postcard Series (6-card set)"
      intro="A small edition set pulled from derivations and detours in image-making."
    >
      <section className="card" style={{ marginBottom: "1.5rem" }}>
        <p className="eyebrow">Plotter thread · Product</p>
        <p className="card-link__summary" style={{ marginTop: "0.5rem" }}>
          First shelf-ready edition from the polargraph practice — prototype pricing.
          Browse the{" "}
          <a href={categoryPath("plotter")}>category homepage</a> for the machine
          story and timeline.
        </p>
        <div className="btn-row" style={{ marginTop: "1rem" }}>
          <a href={categoryPath("plotter")} className="btn btn-ghost">
            Plotter overview
          </a>
          <a href={projectPath("plotter", "plotted-heads")} className="btn btn-ghost">
            Source project
          </a>
        </div>
      </section>

      <div className="tag-row">
        <span className="eyebrow">Prototype</span>
        <span className="tag">TBC</span>
        <span className="tag">Physical</span>
      </div>

      <div className="hero-media">
        <Image
          src="/shop/postcards/IMG_5206.jpg"
          alt="The six-card postcard series photographed as a physical set."
          fill
          priority
          sizes="(min-width: 1024px) 72rem, 100vw"
        />
      </div>

      <section className="card">
        <h2 className="card-link__title">Product notes</h2>
        <dl className="details-grid" style={{ marginTop: "1.5rem" }}>
          <div>
            <dt>Status</dt>
            <dd>Prototype</dd>
          </div>
          <div>
            <dt>Format</dt>
            <dd>Physical postcard set</dd>
          </div>
          <div>
            <dt>Set size</dt>
            <dd>Six cards</dd>
          </div>
        </dl>
      </section>

      <section className="card">
        <h2 className="card-link__title">Why start here</h2>
        <div className="prose" style={{ marginTop: "1.5rem" }}>
          <p>
            This is the first shelf-ready product because it lets the wider studio
            experiment become something concrete without waiting for the entire shop
            to be defined.
          </p>
          <p>
            The postcard set works as a small edition, a test of packaging and
            sequencing, and a way to carry the plotted-image language into something
            people can hold, send, or collect.
          </p>
        </div>
      </section>

      <section className="card">
        <h2 className="card-link__title">Gallery</h2>
        <div className="gallery" style={{ marginTop: "1.5rem" }}>
          {gallery.map((item) => (
            <figure key={item.src} className="figure">
              <div className="figure__media">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 700px) 50vw, 100vw"
                />
              </div>
              <figcaption className="figure__caption">{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="card">
        <h2 className="card-link__title">Checkout</h2>
        <p className="card-link__summary" style={{ marginTop: "0.75rem" }}>
          Purchase wiring is in progress — contact via the site for availability
          while the shop backend is connected.
        </p>
      </section>

      <section className="card">
        <h2 className="card-link__title">Source material</h2>
        <p className="card-link__summary" style={{ marginTop: "0.75rem" }}>
          The product grows out of the plotted portrait work.
        </p>
        <div className="grid-2" style={{ marginTop: "1.5rem" }}>
          <CardLinkKind
            href={projectPath("plotter", "plotted-heads")}
            context="content"
            title="Plotted heads series"
            summary="The portrait work this postcard edition is drawn from."
            eyebrow="Work · Project"
            mediaEmpty
          />
        </div>
      </section>
    </PageSection>
  );
}
