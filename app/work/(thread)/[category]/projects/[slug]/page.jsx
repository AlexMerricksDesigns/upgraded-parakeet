import { notFound } from "next/navigation";

import {
  WORK_CATEGORIES,
  flattenCategorySlugs,
  getWorkCategory,
} from "@/app/work/categories";
import workManifest from "@/app/work/manifest.json";
import { loadWorkProject } from "@/lib/content/loaders";
import { LAYOUT_COMPONENTS, resolveCustomLayout } from "@/lib/content/layouts";

export function generateStaticParams() {
  const params = [];
  for (const cat of WORK_CATEGORIES) {
    const { slugs } = flattenCategorySlugs(cat);
    for (const slug of slugs) {
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
  const page = await loadWorkProject(slug);
  const entry = workManifest.find((item) => item.slug === slug);
  if (page?.meta?.title) {
    return {
      title: page.meta.title,
      description: page.meta.intro ?? entry?.summary,
    };
  }
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
  const page = await loadWorkProject(slug);

  const { slugs } = flattenCategorySlugs(category ?? { subsections: [] });
  if (!category || !slugs.includes(slug) || !entry || !page) {
    notFound();
  }

  if (page.layout === "custom" && page.customId) {
    const CustomPage = await resolveCustomLayout(page.customId);
    if (CustomPage) return <CustomPage page={page} />;
    notFound();
  }

  const Layout = LAYOUT_COMPONENTS[page.layout];
  if (!Layout) notFound();

  if (page.layout === "prose") {
    return (
      <Layout page={page} category={category} manifestEntry={entry} />
    );
  }

  return <Layout page={page} />;
}
