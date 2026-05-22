import Image from "next/image";

import { CardLinkKind } from "@/components/card-link-kind";
import { PageSection } from "@/components/page-section";
import { CategoryBreadcrumb } from "@/app/work/category-page";
import { getWorkCategory } from "@/app/work/categories";
import { categoryPath, journalPath, productPath } from "@/lib/work-paths";

export const metadata = {
  title: "Plotted heads series",
  description:
    "An evolving plotter-led portrait series where repeated marks let faces emerge through drift, density, and misalignment.",
};

const tags = ["Emergent forms", "Concept", "Development", "Plotter"];

const gallery = [
  {
    src: "/work/plotted-heads/scans021.jpg",
    alt: "Scanned plotter portrait study.",
    caption: "One of the early plotted portrait tests from the series.",
  },
  {
    src: "/work/plotted-heads/scans037.jpg",
    alt: "Close view of a plotted portrait scan.",
    caption:
      "Variations in line density start to define the face without filling it in.",
  },
  {
    src: "/work/plotted-heads/Images/gallery8.jpg",
    alt: "Framed or documented plotted heads output.",
    caption: "The drawings begin to read as objects as well as images.",
  },
];

const plotterCategory = getWorkCategory("plotter");

export default function PlottedHeadsPage() {
  return (
    <PageSection
      eyebrow={
        <CategoryBreadcrumb
          categoryTitle={plotterCategory.title}
          categoryRoute={categoryPath("plotter")}
          projectLabel="Plotted heads series"
        />
      }
      title="Plotted heads series"
      intro="An evolving plotter-led portrait series where repeated marks let faces emerge through drift, density, and misalignment."
    >
      <section className="card" style={{ marginBottom: "1.5rem" }}>
        <p className="eyebrow">Plotter thread · Project</p>
        <p className="card-link__summary" style={{ marginTop: "0.5rem" }}>
          Part of the long-term{" "}
          <a href={categoryPath("plotter")}>polargraph drawing machine</a> work —
          see the category homepage for the full timeline, process notes, and shop
          links.
        </p>
        <div className="btn-row" style={{ marginTop: "1rem" }}>
          <a href={categoryPath("plotter")} className="btn btn-ghost">
            Plotter overview
          </a>
          <a href={journalPath("plotter", "polargraph-process-notes")} className="btn btn-ghost">
            Process notes
          </a>
        </div>
      </section>

      <section className="hero">
        <div className="hero__bg">
          <Image
            src="/work/plotted-heads/plotter-drawings001.jpg"
            alt="A plotted portrait made from dense overlapping pen lines."
            fill
            priority
            sizes="100vw"
            className="hero__bg-img"
          />
        </div>
        <div className="hero__inner">
          <p className="eyebrow hero__eyebrow">2021</p>
          <h1 className="hero__title">Plotted heads series</h1>
          <p className="hero__desc">
            An evolving plotter-led portrait series where repeated marks let faces
            emerge through drift, density, and misalignment.
          </p>
        </div>
      </section>

      <div className="tag-row">
        <span className="eyebrow">2021</span>
        {tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <section className="card">
        <h2 className="card-link__title">Series notes</h2>
        <dl className="details-grid" style={{ marginTop: "1.5rem" }}>
          <div>
            <dt>Year</dt>
            <dd>2021</dd>
          </div>
          <div>
            <dt>Medium</dt>
            <dd>Plotter drawings and scans</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>Portraiture through repetition and emergence</dd>
          </div>
        </dl>
      </section>

      <section className="card">
        <h2 className="card-link__title">What the series is doing</h2>
        <div className="prose" style={{ marginTop: "1.5rem" }}>
          <p>
            <em>Plotted heads</em> started as a way to test how little information a
            portrait needs before it still reads as a face.
          </p>
          <p>
            Instead of drawing a head directly, the process relies on repeated marks,
            line systems, and small shifts in alignment. The image appears gradually:
            sometimes clearly, sometimes as a near-collapse into abstraction.
          </p>
          <p>
            The project matters as a foundation for later products because it holds
            the source material, the visual rules, and the productive accidents that
            can be turned into editions, prints, or small objects.
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
        <h2 className="card-link__title">Connected outputs</h2>
        <p className="card-link__summary" style={{ marginTop: "0.75rem" }}>
          Follow the series into the first product experiment built from the same
          visual language.
        </p>
        <div className="grid-2" style={{ marginTop: "1.5rem" }}>
          <CardLinkKind
            href={productPath("plotter", "postcards")}
            context="content"
            title="Postcard Series (6-card set)"
            summary="The first shelf-ready product built from this work."
            eyebrow="Product"
            mediaEmpty
          />
        </div>
      </section>
    </PageSection>
  );
}
