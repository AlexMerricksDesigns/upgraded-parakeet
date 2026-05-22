import Image from "next/image";
import Link from "next/link";

import { CardLinkKind } from "@/components/card-link-kind";
import { PageSection } from "@/components/page-section";

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

export default function PostcardsPage() {
  return (
    <PageSection
      eyebrow={
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/shop">Shop</Link>
          <span className="breadcrumb__sep">/</span>
          <span>Postcard Series (6-card set)</span>
        </nav>
      }
      title="Postcard Series (6-card set)"
      intro="A small edition set pulled from derivations and detours in image-making."
    >
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
            This is the first shelf-ready product because it lets the wider
            studio experiment become something concrete without waiting for the
            entire shop to be defined.
          </p>
          <p>
            The postcard set works as a small edition, a test of packaging and
            sequencing, and a way to carry the plotted-image language into
            something people can hold, send, or collect.
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
        <h2 className="card-link__title">Source material</h2>
        <p className="card-link__summary" style={{ marginTop: "0.75rem" }}>
          The product grows out of the plotted portrait work and should stay
          connected back to that process.
        </p>
        <div className="grid-2" style={{ marginTop: "1.5rem" }}>
          <CardLinkKind
            href="/work/plotter/projects/plotted-heads"
            context="shop"
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
