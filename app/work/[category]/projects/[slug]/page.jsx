import Image from "next/image";
import { notFound } from "next/navigation";

import { PageSection } from "@/components/page-section";
import { ProseBlocks } from "@/components/prose-blocks";
import { RelatedLinks } from "@/components/related-links";
import { CategoryBreadcrumb } from "@/app/work/category-page";
import {
  WORK_CATEGORIES,
  WORK_STATIC_PROJECT_SLUGS,
  getWorkCategory,
} from "@/app/work/categories";
import workManifest from "@/app/work/manifest.json";
import {
  workBodies,
  workDownloads,
  workGalleries,
  workRelated,
} from "@/app/work/registry";
import { categoryPath } from "@/lib/work-paths";

export function generateStaticParams() {
  const params = [];
  for (const cat of WORK_CATEGORIES) {
    for (const slug of cat.slugs) {
      if (WORK_STATIC_PROJECT_SLUGS.includes(slug)) continue;
      const entry = workManifest.find(
        (p) => p.slug === slug && p.status === "published"
      );
      if (entry) params.push({ category: cat.id, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entry = workManifest.find((item) => item.slug === slug);
  if (!entry) return { title: "Work" };
  return {
    title: entry.title,
    description: entry.summary,
  };
}

export default async function CategoryProjectPage({ params }) {
  const { category: categoryId, slug } = await params;
  const category = getWorkCategory(categoryId);
  const entry = workManifest.find((item) => item.slug === slug);
  const blocks = workBodies[slug];

  if (
    !category ||
    !category.slugs.includes(slug) ||
    !entry ||
    !blocks ||
    WORK_STATIC_PROJECT_SLUGS.includes(slug)
  ) {
    notFound();
  }

  const gallery = workGalleries[slug] || [];
  const download = workDownloads[slug];
  const related = workRelated[slug] || [];
  const heroImage = entry.image;
  const isGif = heroImage?.endsWith(".gif");

  return (
    <PageSection
      eyebrow={
        <CategoryBreadcrumb
          categoryTitle={category.title}
          categoryRoute={categoryPath(categoryId)}
          projectLabel={entry.title}
        />
      }
      title={entry.title}
      intro={entry.summary}
    >
      {heroImage ? (
        <section className="hero">
          <div className="hero__bg">
            {isGif ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={heroImage}
                alt=""
                className="hero__bg-img"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            ) : (
              <Image
                src={heroImage}
                alt=""
                fill
                priority
                sizes="100vw"
                className="hero__bg-img"
              />
            )}
          </div>
          <div className="hero__inner">
            <p className="eyebrow hero__eyebrow">{entry.year}</p>
            <h1 className="hero__title">{entry.title}</h1>
            <p className="hero__desc">{entry.summary}</p>
          </div>
        </section>
      ) : (
        <p className="eyebrow">{entry.year}</p>
      )}

      {entry.tags?.length ? (
        <div className="tag-row">
          {entry.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <section className="card">
        <div className="prose" style={{ marginTop: 0 }}>
          <ProseBlocks
            blocks={blocks}
            imageBase={`/work/${slug}`}
            linkContext="content"
          />
        </div>
        {download ? (
          <p style={{ marginTop: "1.5rem" }}>
            <a href={download.href} className="btn" download>
              {download.label}
            </a>
          </p>
        ) : null}
      </section>

      {gallery.length > 0 ? (
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
                {item.caption ? (
                  <figcaption className="figure__caption">
                    {item.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <RelatedLinks title="Connected work" links={related} context="content" />
      ) : null}
    </PageSection>
  );
}
