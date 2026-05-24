import { CategoryConfigLayout } from "@/components/work/layouts/category-config-layout";
import { JournalArticleLayout } from "@/components/work/layouts/journal-article-layout";
import { ProductShelfLayout } from "@/components/work/layouts/product-shelf-layout";
import { ProjectRichLayout } from "@/components/work/layouts/project-rich-layout";
import { ProseProjectLayout } from "@/components/work/layouts/prose-project-layout";

const CUSTOM_LAYOUTS = {
  "plotter-hub": () =>
    import("@/components/work/pages/plotter-hub").then((m) => m.PlotterHubPage),
  "plotter-timeline": () =>
    import("@/components/work/pages/plotter-timeline").then(
      (m) => m.PlotterTimelinePage
    ),
  "photography-hub": () =>
    import("@/components/work/pages/photography-hub").then(
      (m) => m.PhotographyHubPage
    ),
};

export const LAYOUT_COMPONENTS = {
  prose: ProseProjectLayout,
  projectRich: ProjectRichLayout,
  productShelf: ProductShelfLayout,
  categoryConfig: CategoryConfigLayout,
  journalArticle: JournalArticleLayout,
};

export async function resolveCustomLayout(customId) {
  const loader = CUSTOM_LAYOUTS[customId];
  if (!loader) return null;
  return loader();
}
