import { notFound } from "next/navigation";

import { PageSection } from "@/components/page-section";
import { ProseBlocks } from "@/components/prose-blocks";
import { RelatedLinks } from "@/components/related-links";
import { CategoryBreadcrumb } from "@/app/work/category-page";
import {
  WORK_CATEGORIES,
  getWorkCategory,
} from "@/app/work/categories";
import { journalBodies } from "@/app/journal/registry";
import journalManifest from "@/app/journal/manifest.json";
import { categoryPath } from "@/lib/work-paths";

export function generateStaticParams() {
  const params = [];
  for (const cat of WORK_CATEGORIES) {
    for (const slug of cat.journalSlugs ?? []) {
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
  const entry = journalManifest.find((item) => item.slug === slug);
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
  const blocks = journalBodies[slug];

  if (!category || !category.journalSlugs?.includes(slug) || !entry || !blocks) {
    notFound();
  }

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
      {entry.date ? <p className="eyebrow">{entry.date}</p> : null}

      <article className="card prose">
        <ProseBlocks blocks={blocks} linkContext="content" />
      </article>

      {entry.related?.length ? (
        <RelatedLinks title="Related reading" links={entry.related} />
      ) : null}
    </PageSection>
  );
}
