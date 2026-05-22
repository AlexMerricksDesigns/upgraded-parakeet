import Image from "next/image";

import { CardLinkKind } from "@/components/card-link-kind";
import { PageSection } from "@/components/page-section";
import { CategoryBreadcrumb } from "@/app/work/category-page";
import { getWorkCategory } from "@/app/work/categories";
import { categoryPath, projectPath } from "@/lib/work-paths";

export const metadata = {
  title: "Lightworms",
  description:
    "50 Tezos tokens — pond light, larvae glow, and water-surface abstraction as companion to Brighton by Bench.",
};

const tags = ["Tezos", "Light", "Pond", "objkt"];

const gallery = [
  {
    src: "/work/photography/lightworms-01.jpg",
    alt: "Pond light and water-surface abstraction — Lightworms collection.",
    caption: "Pond light study — larvae glow and reflective surface.",
  },
  {
    src: "/work/photography/lightworms-02.jpg",
    alt: "Lightworms collection photograph — water and light texture.",
    caption: "Part of the 50-token Lightworms series on Tezos.",
  },
];

const photographyCategory = getWorkCategory("photography");

export default function LightwormsPage() {
  return (
    <PageSection
      eyebrow={
        <CategoryBreadcrumb
          categoryTitle={photographyCategory.title}
          categoryRoute={categoryPath("photography")}
          projectLabel="Lightworms"
        />
      }
      title="Lightworms"
      intro="50 Tezos tokens — pond light, larvae glow, and water-surface abstraction."
    >
      <section className="card" style={{ marginBottom: "1.5rem" }}>
        <p className="eyebrow">Photography thread · Project</p>
        <p className="card-link__summary" style={{ marginTop: "0.5rem" }}>
          Companion collection to Brighton by Bench — launched in the 2022 peak
          on-chain year. Full practice timeline on the{" "}
          <a href={categoryPath("photography")}>photography homepage</a>.
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

      <section className="hero">
        <div className="hero__bg">
          <Image
            src="/work/photography/series-lightworms.jpg"
            alt="Lightworms — pond light and reflective water-surface photography"
            fill
            priority
            sizes="100vw"
            className="hero__bg-img"
          />
        </div>
        <div className="hero__inner">
          <p className="eyebrow hero__eyebrow">2022 · 50 tokens</p>
          <h1 className="hero__title">Lightworms</h1>
          <p className="hero__desc">
            Pond light, larvae glow, and water-surface abstraction — the wet
            counterpart to dry bench pause points.
          </p>
        </div>
      </section>

      <div className="tag-row">
        <span className="eyebrow">2022</span>
        {tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <section className="card">
        <h2 className="card-link__title">Collection notes</h2>
        <dl className="details-grid" style={{ marginTop: "1.5rem" }}>
          <div>
            <dt>Year</dt>
            <dd>2022</dd>
          </div>
          <div>
            <dt>Edition</dt>
            <dd>50 tokens on Tezos / objkt</dd>
          </div>
          <div>
            <dt>Relation</dt>
            <dd>Companion to Brighton by Bench</dd>
          </div>
        </dl>
      </section>

      <section className="card">
        <h2 className="card-link__title">What the collection is doing</h2>
        <div className="prose" style={{ marginTop: "1.5rem" }}>
          <p>
            Where benches fix a horizontal pause in the city, Lightworms fix
            vertical light in water — larvae, reflection, and surface tension as
            a second vocabulary within the same minting period. Environmental
            submissions such as #photez4earth in 2023 extend the pond thread
            into community seasons.
          </p>
          <p>
            Gallery and shop editions for this series are placeholders on the
            live site — objkt remains the primary distribution; physical zines
            and prints are planned.
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
        <div className="grid-2" style={{ marginTop: "1.5rem" }}>
          <CardLinkKind
            href={projectPath("photography", "brighton-by-bench")}
            context="content"
            title="Brighton by Bench"
            summary="100-token bench collection — flagship sibling series."
            eyebrow="Project"
            mediaEmpty
          />
          <CardLinkKind
            href={categoryPath("crypto")}
            context="content"
            title="Crypto / NFT"
            summary="On-chain essays and digital editions thread."
            eyebrow="Work"
            mediaEmpty
          />
        </div>
      </section>
    </PageSection>
  );
}
