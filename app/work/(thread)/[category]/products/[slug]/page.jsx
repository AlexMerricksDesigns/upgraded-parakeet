import { notFound } from "next/navigation";

import shopManifest from "@/app/shop/manifest.json";
import {
  WORK_CATEGORIES,
  flattenCategorySlugs,
  getWorkCategory,
} from "@/app/work/categories";
import { loadWorkProduct } from "@/lib/content/loaders";
import { LAYOUT_COMPONENTS } from "@/lib/content/layouts";

export function generateStaticParams() {
  const params = [];
  for (const cat of WORK_CATEGORIES) {
    const { productSlugs } = flattenCategorySlugs(cat);
    for (const slug of productSlugs) {
      const entry = shopManifest.find(
        (p) => p.slug === slug && p.published
      );
      if (entry) params.push({ category: cat.id, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await loadWorkProduct(slug);
  const entry = shopManifest.find((item) => item.slug === slug);
  if (page?.meta?.title) {
    return {
      title: page.meta.title,
      description: page.meta.intro ?? entry?.summary,
    };
  }
  if (!entry) return { title: "Shop" };
  return {
    title: entry.name,
    description: entry.summary,
  };
}

export default async function CategoryProductPage({ params }) {
  const { category: categoryId, slug } = await params;
  const category = getWorkCategory(categoryId);
  const entry = shopManifest.find((item) => item.slug === slug);
  const page = await loadWorkProduct(slug);

  const { productSlugs } = flattenCategorySlugs(category ?? { subsections: [] });
  if (!category || !productSlugs.includes(slug) || !entry || !page) {
    notFound();
  }

  const Layout = LAYOUT_COMPONENTS[page.layout];
  if (!Layout) notFound();

  return <Layout page={page} />;
}
