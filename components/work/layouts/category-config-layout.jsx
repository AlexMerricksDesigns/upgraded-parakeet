import { CategoryPage } from "@/app/work/category-page";
import {
  categorySubsectionSections,
  getWorkCategory,
} from "@/app/work/categories";

export function CategoryConfigLayout({ page }) {
  const category = getWorkCategory(page.categoryId);
  const config = {
    ...page.config,
    categoryTitle: category?.title ?? page.config.categoryTitle,
    projectSections:
      page.config.projectSections ??
      (category ? categorySubsectionSections(category) : []),
  };
  return <CategoryPage config={config} />;
}
