import Image from "next/image";

import { CardLinkKind } from "@/components/card-link-kind";
import { PageSection } from "@/components/page-section";
import { CategoryBreadcrumb } from "@/app/work/category-page";
import { getWorkCategory } from "@/app/work/categories";
import { categoryPath, projectPath } from "@/lib/work-paths";

export const metadata = {
  title: "India 2016 archive",
  description:
    "First Canon 400D journey — Agra, Taj Mahal region, architecture, travel, and cultural scenes at the DSLR turning point.",
};

const tags = ["India", "Travel", "Canon 400D", "Archive"];

const gallery = [
  {
    src: "/work/photography/india-2016-01.jpg",
    alt: "India 2016 — architecture and travel from first Canon 400D trip.",
    caption: "Agra region — first serious DSLR experience (mother's Canon 400D).",
  },
  {
    src: "/work/photography/india-2016-02.jpg",
    alt: "India 2016 archive — travel and cultural scene.",
    caption: "Large India archive — shift from casual to intentional photography.",
  },
  {
    src: "/work/photography/series-india-2016.jpg",
    alt: "India 2016 collection overview — travel photography.",
    caption: "Foundation of the nearly 100,000-image archive that follows.",
  },
];

const photographyCategory = getWorkCategory("photography");

export default function India2016Page() {
  return (
    <PageSection
      eyebrow={
        <CategoryBreadcrumb
          categoryTitle={photographyCategory.title}
          categoryRoute={categoryPath("photography")}
          projectLabel="India 2016 archive"
        />
      }
      title="India 2016 archive"
      intro="First Canon 400D journey — Agra, Taj Mahal region, architecture, travel, and cultural scenes."
    >
      <section className="card" style={{ marginBottom: "1.5rem" }}>
        <p className="eyebrow">Photography thread · Project</p>
        <p className="card-link__summary" style={{ marginTop: "0.5rem" }}>
          The DSLR turning point — borrowed mother's Canon 400D for India, then
          continued on the first body through Brighton and beyond. See the{" "}
          <a href={categoryPath("photography")}>practice timeline</a>.
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
            src="/work/photography/series-india-2016.jpg"
            alt="India 2016 — travel and architecture from first Canon 400D journey"
            fill
            priority
            sizes="100vw"
            className="hero__bg-img"
          />
        </div>
        <div className="hero__inner">
          <p className="eyebrow hero__eyebrow">2016</p>
          <h1 className="hero__title">India 2016 archive</h1>
          <p className="hero__desc">
            Early–mid: borrowed Canon 400D for Agra and the Taj Mahal region.
            Late: post-India learning curve — intentional, technical photography
            begins.
          </p>
        </div>
      </section>

      <div className="tag-row">
        <span className="eyebrow">2016</span>
        {tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <section className="card">
        <h2 className="card-link__title">Archive notes</h2>
        <dl className="details-grid" style={{ marginTop: "1.5rem" }}>
          <div>
            <dt>Year</dt>
            <dd>2016</dd>
          </div>
          <div>
            <dt>Camera</dt>
            <dd>Canon 400D (first body, borrowed)</dd>
          </div>
          <div>
            <dt>Significance</dt>
            <dd>Shift from casual to intentional practice</dd>
          </div>
          <div>
            <dt>Volume</dt>
            <dd>Large India archive — architecture, travel, cultural scenes</dd>
          </div>
        </dl>
      </section>

      <section className="card">
        <h2 className="card-link__title">What this archive holds</h2>
        <div className="prose" style={{ marginTop: "1.5rem" }}>
          <p>
            Before 2016 the habit was point-and-shoot — family heritage, everyday
            and travel subjects. India with the 400D changed the technical and
            intentional frame: architecture at scale, cultural distance, and the
            discipline of carrying a DSLR body. That archive still feeds mints and
            edits in 2023–2025 reflection passes.
          </p>
          <p>
            Now on the third Canon body and nearly 100,000 images total, 2016
            remains the hinge year named on the category homepage timeline.
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
            href={categoryPath("crypto")}
            context="content"
            title="Crypto / NFT"
            summary="On-chain minting from 2021 — archive instances tokenised."
            eyebrow="Work"
            mediaEmpty
          />
          <CardLinkKind
            href={projectPath("photography", "painting-studio")}
            context="content"
            title="Painting studio"
            summary="Later studio macro work — lens in the making space."
            eyebrow="Project"
            mediaEmpty
          />
        </div>
      </section>
    </PageSection>
  );
}
