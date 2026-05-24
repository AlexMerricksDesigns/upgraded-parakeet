import { PageSection } from "@/components/page-section";
import { CategoryBreadcrumb } from "@/app/work/category-page";
import { getWorkCategory } from "@/app/work/categories";
import { categoryPath } from "@/lib/work-paths";
import { RenderSections } from "@/components/work/layouts/render-sections";

export function ProductShelfLayout({ page }) {
  const category = getWorkCategory(page.breadcrumb.category);
  const title = page.meta?.title ?? page.breadcrumb.label;
  const intro = page.meta?.intro ?? "";

  return (
    <PageSection
      eyebrow={
        <CategoryBreadcrumb
          categoryTitle={category?.title}
          categoryRoute={categoryPath(page.breadcrumb.category)}
          projectLabel={page.breadcrumb.label}
        />
      }
      title={title}
      intro={intro}
    >
      <RenderSections sections={page.sections} />
    </PageSection>
  );
}
