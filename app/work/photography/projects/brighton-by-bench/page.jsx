import Image from "next/image";

import { CardLinkKind } from "@/components/card-link-kind";
import { PageSection } from "@/components/page-section";
import { CategoryBreadcrumb } from "@/app/work/category-page";
import { getWorkCategory } from "@/app/work/categories";
import { categoryPath, productPath, projectPath } from "@/lib/work-paths";
import { profileUrl, getMintTezos } from "@/lib/crypto-portfolio";

export const metadata = {
  title: "Brighton by Bench",
  description:
    "100 Tezos tokens — benches as pause and permission, from the university project An Assemblage; for sitting.",
};

const tags = ["Tezos", "Brighton", "Benches", "objkt"];

const gallery = [
  {
    src: "/work/photography/brighton-by-bench-01.jpg",
    alt: "Brighton bench street photograph from the collection.",
    caption: "Urban bench study — pause point and street furniture.",
  },
  {
    src: "/work/photography/brighton-by-bench-02.jpg",
    alt: "Second Brighton by Bench archive photograph.",
    caption: "Part of the 100-token Brighton by Bench series on Tezos.",
  },
  {
    src: "/work/photography/series-brighton-by-bench.jpg",
    alt: "Brighton by Bench collection overview image.",
    caption: "Collection grown from An Assemblage; for sitting (university project).",
  },
];

const photographyCategory = getWorkCategory("photography");
const mintObjkt = profileUrl("objkt", getMintTezos());

export default function BrightonByBenchPage() {
  return (
    <PageSection
      eyebrow={
        <CategoryBreadcrumb
          categoryTitle={photographyCategory.title}
          categoryRoute={categoryPath("photography")}
          projectLabel="Brighton by Bench"
        />
      }
      title="Brighton by Bench"
      intro="100 Tezos tokens — benches as pause and permission, from the university project An Assemblage; for sitting."
    >
      <section className="card" style={{ marginBottom: "1.5rem" }}>
        <p className="eyebrow">Photography thread · Project</p>
        <p className="card-link__summary" style={{ marginTop: "0.5rem" }}>
          Flagship on-chain collection under xanderhizome — see the{" "}
          <a href={categoryPath("photography")}>category homepage</a> for the
          full 2014–2026 timeline, Photez context, and shop links.
        </p>
        <div className="btn-row" style={{ marginTop: "1rem" }}>
          <a href={categoryPath("photography")} className="btn btn-ghost">
            Photography overview
          </a>
          <a href={projectPath("photography", "lightworms")} className="btn btn-ghost">
            Lightworms
          </a>
          <a href={categoryPath("crypto")} className="btn btn-ghost">
            Crypto thread
          </a>
          {mintObjkt ? (
            <a href={mintObjkt} className="btn btn-ghost" target="_blank" rel="noreferrer">
              Objkt collection
            </a>
          ) : null}
        </div>
      </section>

      <section className="hero">
        <div className="hero__bg">
          <Image
            src="/work/photography/series-brighton-by-bench.jpg"
            alt="Brighton by Bench — urban bench street photography collection"
            fill
            priority
            sizes="100vw"
            className="hero__bg-img"
          />
        </div>
        <div className="hero__inner">
          <p className="eyebrow hero__eyebrow">2022 · 100 tokens</p>
          <h1 className="hero__title">Brighton by Bench</h1>
          <p className="hero__desc">
            Benches as philosophical motif — sitting, permission, and mundane
            street furniture elevated through the archive and minted on Tezos.
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
            <dd>2022 (peak on-chain year)</dd>
          </div>
          <div>
            <dt>Edition</dt>
            <dd>100 tokens on Tezos / objkt</dd>
          </div>
          <div>
            <dt>Origin</dt>
            <dd>University project — An Assemblage; for sitting</dd>
          </div>
          <div>
            <dt>Handle</dt>
            <dd>xanderhizome</dd>
          </div>
        </dl>
      </section>

      <section className="card">
        <h2 className="card-link__title">What the collection is doing</h2>
        <div className="prose" style={{ marginTop: "1.5rem" }}>
          <p>
            The bench is a pause point — street furniture that holds bodies,
            conversations, and weather. Brighton by Bench tokenises that habit:
            one hundred instances along a through-line that begins with 2017
            urban starters (including the Designated smoking area shot) and
            culminates in the 2022 minting period alongside Photez community work.
          </p>
          <p>
            Physical prints and postcards from select tokens will list in the shop
            as editions are prepared — the collection remains the canonical
            on-chain home; the site connects portfolio narrative to tactile output.
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
            href={productPath("photography", "limited-prints")}
            context="content"
            title="Limited edition prints"
            summary="Physical prints from key works — prototype pricing."
            eyebrow="Product"
            mediaEmpty
          />
          <CardLinkKind
            href={projectPath("photography", "lightworms")}
            context="content"
            title="Lightworms"
            summary="50-token companion collection — pond light and surface."
            eyebrow="Project"
            mediaEmpty
          />
        </div>
      </section>
    </PageSection>
  );
}
