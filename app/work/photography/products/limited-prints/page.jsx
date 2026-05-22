import Image from "next/image";

import { CardLinkKind } from "@/components/card-link-kind";
import { PageSection } from "@/components/page-section";
import { CategoryBreadcrumb } from "@/app/work/category-page";
import { getWorkCategory } from "@/app/work/categories";
import { categoryPath, productPath, projectPath } from "@/lib/work-paths";

export const metadata = {
  title: "Limited edition prints",
  description:
    "Signed physical prints from key works — Brighton by Bench, archive selects, and atmospheric editions.",
};

const gallery = [
  {
    src: "/work/photography/shop-limited-prints.jpg",
    alt: "Limited edition photographic print — sample from the archive.",
    caption: "Print tests from archive selects — edition sizing TBC.",
  },
  {
    src: "/work/photography/brighton-by-bench-01.jpg",
    alt: "Brighton bench photograph — candidate for limited print edition.",
    caption: "Brighton by Bench lineage — bench as pause point.",
  },
  {
    src: "/work/photography/series-recent.jpg",
    alt: "Recent atmospheric photograph — contemporary edit.",
    caption: "Recent works — atmospheric and contemplative frames.",
  },
];

const photographyCategory = getWorkCategory("photography");

export default function LimitedPrintsPage() {
  return (
    <PageSection
      eyebrow={
        <CategoryBreadcrumb
          categoryTitle={photographyCategory.title}
          categoryRoute={categoryPath("photography")}
          projectLabel="Limited edition prints"
        />
      }
      title="Limited edition prints"
      intro="Signed physical prints from key works — Brighton by Bench, archive selects, and atmospheric editions."
    >
      <section className="card" style={{ marginBottom: "1.5rem" }}>
        <p className="eyebrow">Photography thread · Product</p>
        <p className="card-link__summary" style={{ marginTop: "0.5rem" }}>
          Gentle sales funnel from the long-form archive — prototype pricing while
          checkout wires up. Browse the{" "}
          <a href={categoryPath("photography")}>category homepage</a> for the
          timeline and collections.
        </p>
        <div className="btn-row" style={{ marginTop: "1rem" }}>
          <a href={categoryPath("photography")} className="btn btn-ghost">
            Photography overview
          </a>
          <a
            href={projectPath("photography", "brighton-by-bench")}
            className="btn btn-ghost"
          >
            Brighton by Bench
          </a>
        </div>
      </section>

      <div className="tag-row">
        <span className="eyebrow">Coming soon</span>
        <span className="tag">TBC</span>
        <span className="tag">Physical</span>
        <span className="tag">Signed</span>
      </div>

      <div className="hero-media">
        <Image
          src="/work/photography/shop-limited-prints.jpg"
          alt="Limited edition photographic prints from the archive practice"
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
            <dd>Coming soon</dd>
          </div>
          <div>
            <dt>Format</dt>
            <dd>Signed limited prints</dd>
          </div>
          <div>
            <dt>Sources</dt>
            <dd>Brighton by Bench, India archive, recent atmospheric work</dd>
          </div>
        </dl>
      </section>

      <section className="card">
        <h2 className="card-link__title">Why prints from this thread</h2>
        <div className="prose" style={{ marginTop: "1.5rem" }}>
          <p>
            The photographic spectrum runs from RAW through export to print and
            on-chain instance — this product holds the signed physical register.
            Selects from Brighton by Bench, the India 2016 turning point, and
            recent edits such as Trapped within a descending haze are candidates
            for small numbered runs.
          </p>
          <p>
            Postcards and zines will list alongside prints as formats are tested.
            On-chain editions remain on objkt under xanderhizome; see digital
            editions under the Crypto thread for tokenised work.
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
        <h2 className="card-link__title">Source collections</h2>
        <div className="grid-2" style={{ marginTop: "1.5rem" }}>
          <CardLinkKind
            href={projectPath("photography", "brighton-by-bench")}
            context="content"
            title="Brighton by Bench"
            summary="100-token collection — primary print source."
            eyebrow="Project"
            mediaEmpty
          />
          <CardLinkKind
            href={productPath("crypto", "digital-editions")}
            context="content"
            title="Digital editions"
            summary="On-chain instances — objkt / Tezos."
            eyebrow="Product"
            mediaEmpty
          />
        </div>
      </section>
    </PageSection>
  );
}
