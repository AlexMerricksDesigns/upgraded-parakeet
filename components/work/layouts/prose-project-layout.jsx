import Image from "next/image";

import { PageSection } from "@/components/page-section";
import { RelatedLinks } from "@/components/related-links";
import { CategoryBreadcrumb } from "@/app/work/category-page";
import { categoryPath } from "@/lib/work-paths";
import { threadAsset } from "@/lib/assets";
import { RenderSections } from "@/components/work/layouts/render-sections";

/**
 * Prose-first project page. Manifest entry supplies year/tags/hero when omitted in content.
 */
export function ProseProjectLayout({ page, category, manifestEntry }) {
  const categoryId = page.breadcrumb?.category ?? category?.id;
  const title = page.meta?.title ?? manifestEntry?.title;
  const intro = page.meta?.intro ?? manifestEntry?.summary;
  const slug = manifestEntry?.slug;
  const imageBase = threadAsset(categoryId, "projects", slug);

  const heroImage = page.heroImage ?? manifestEntry?.image;
  const isGif = heroImage?.endsWith(".gif");
  const tags = page.meta?.tags ?? manifestEntry?.tags ?? [];
  const year = page.meta?.year ?? manifestEntry?.year;

  const sections = page.sections ?? [];
  const hasInlineHero = sections.some((s) => s.type === "hero");

  return (
    <PageSection
      eyebrow={
        <CategoryBreadcrumb
          categoryTitle={category.title}
          categoryRoute={categoryPath(categoryId)}
          projectLabel={title}
        />
      }
      title={title}
      intro={intro}
    >
      {heroImage && !hasInlineHero ? (
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
            {year ? <p className="eyebrow hero__eyebrow">{year}</p> : null}
            <h1 className="hero__title">{title}</h1>
            <p className="hero__desc">{intro}</p>
          </div>
        </section>
      ) : year && !hasInlineHero ? (
        <p className="eyebrow">{year}</p>
      ) : null}

      {tags.length > 0 && !sections.some((s) => s.type === "tagRow") ? (
        <div className="tag-row">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <RenderSections sections={sections} imageBase={imageBase} />

      {page.related?.length > 0 ? (
        <RelatedLinks
          title={page.relatedTitle ?? "Connected work"}
          links={page.related}
          context="content"
        />
      ) : null}
    </PageSection>
  );
}
