import { PageSection } from "@/components/page-section";
import { RelatedLinks } from "@/components/related-links";
import { CategoryBreadcrumb } from "@/app/work/category-page";
import { getWorkCategory } from "@/app/work/categories";
import { categoryPath } from "@/lib/work-paths";
import { RenderSections } from "@/components/work/layouts/render-sections";

export function JournalArticleLayout({ page, manifestEntry: entry }) {
  const category = getWorkCategory(page.breadcrumb.category);
  const title = page.meta?.title ?? manifestEntry?.title;
  const intro = page.meta?.intro ?? manifestEntry?.summary;

  return (
    <PageSection
      eyebrow={
        <CategoryBreadcrumb
          categoryTitle={category?.title}
          categoryRoute={categoryPath(page.breadcrumb.category)}
          projectLabel={title}
        />
      }
      title={title}
      intro={intro}
    >
      {entry.date ? <p className="eyebrow">{entry.date}</p> : null}

      <article className="card prose">
        <RenderSections sections={page.sections} />
      </article>

      {entry.related?.length ? (
        <RelatedLinks title="Related reading" links={entry.related} />
      ) : null}
    </PageSection>
  );
}
