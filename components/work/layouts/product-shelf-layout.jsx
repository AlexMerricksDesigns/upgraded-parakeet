import { PageSection } from "@/components/page-section";
import { CategoryBreadcrumb } from "@/app/work/category-page";
import { getWorkCategory } from "@/app/work/categories";
import { SiteLink } from "@/components/site-link";
import { categoryPath, capturedPath, seriesPath } from "@/lib/work-paths";
import { RenderSections } from "@/components/work/layouts/render-sections";

function bundleItemHref(category, item) {
  if (item.kind === "series") return seriesPath(category, item.slug);
  if (item.kind === "photograph") return capturedPath(category, item.slug);
  return `/work/${category}/products/${item.slug}`;
}

export function ProductShelfLayout({ page }) {
  const category = getWorkCategory(page.breadcrumb.category);
  const title = page.meta?.title ?? page.breadcrumb.label;
  const intro = page.meta?.intro ?? "";
  const bundleItems = page.bundleItems ?? [];
  const catId = page.breadcrumb.category ?? page.category;

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
      {bundleItems.length > 0 ? (
        <section className="product-bundle" aria-labelledby="bundle-heading">
          <h2 id="bundle-heading" className="product-bundle__title">
            In this offering
          </h2>
          <ul className="product-bundle__list">
            {bundleItems.map((item) => (
              <li key={`${item.kind}-${item.slug}`}>
                <SiteLink
                  href={bundleItemHref(catId, item)}
                  context="content"
                  showBadge={false}
                >
                  {item.label ?? item.slug}
                </SiteLink>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <RenderSections sections={page.sections} />
    </PageSection>
  );
}
