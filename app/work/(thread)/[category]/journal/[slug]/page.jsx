import { notFound } from "next/navigation";

import {
  WORK_CATEGORIES,
  flattenCategorySlugs,
  getWorkCategory,
} from "@/app/work/categories";
import journalManifest from "@/app/journal/manifest.json";
import { loadJournalPost } from "@/lib/content/loaders";
import { LAYOUT_COMPONENTS } from "@/lib/content/layouts";

export function generateStaticParams() {
  const params = [];
  for (const cat of WORK_CATEGORIES) {
    const { journalSlugs } = flattenCategorySlugs(cat);
    for (const slug of journalSlugs) {
      const entry = journalManifest.find(
        (p) => p.slug === slug && p.status === "published"
      );
      if (entry) params.push({ category: cat.id, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await loadJournalPost(slug);
  const entry = journalManifest.find((item) => item.slug === slug);
  if (page?.meta?.title) {
    return {
      title: page.meta.title,
      description: page.meta.intro ?? entry?.summary,
    };
  }
  if (!entry) return { title: "Journal" };
  return {
    title: entry.title,
    description: entry.summary,
  };
}

export default async function CategoryJournalPage({ params }) {
  const { category: categoryId, slug } = await params;
  const category = getWorkCategory(categoryId);
  const entry = journalManifest.find((item) => item.slug === slug);
  const page = await loadJournalPost(slug);

  const { journalSlugs } = flattenCategorySlugs(category ?? { subsections: [] });
  if (!category || !journalSlugs.includes(slug) || !entry || !page) {
    notFound();
  }

  const Layout =
    LAYOUT_COMPONENTS[page.layout] ?? LAYOUT_COMPONENTS.journalArticle;
  const contentPage = {
    ...page,
    breadcrumb: {
      ...page.breadcrumb,
      label: page.breadcrumb?.label ?? entry.title,
    },
    meta: {
      title: entry.title,
      intro: entry.summary,
      ...page.meta,
    },
  };

  return <Layout page={contentPage} manifestEntry={entry} />;
}
