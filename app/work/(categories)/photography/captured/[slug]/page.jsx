import { notFound } from "next/navigation";

import { WORK_CATEGORIES, flattenCategorySlugs } from "@/app/work/categories";
import { loadCapturedWork } from "@/lib/content/loaders";
import { LAYOUT_COMPONENTS } from "@/lib/content/layouts";
import { getPhotographyCaptured } from "@/lib/photography-registry";

/** Regenerate catalog pages on a schedule when row count is large (ISR). */
export const revalidate = 3600;

export const dynamicParams = true;

export function generateStaticParams() {
  const cat = WORK_CATEGORIES.find((c) => c.id === "photography");
  const { photoSlugs } = flattenCategorySlugs(cat ?? { subsections: [] });
  return photoSlugs
    .filter((slug) => getPhotographyCaptured(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await loadCapturedWork(slug);
  const entry = getPhotographyCaptured(slug);
  const image = page?.hero?.image ?? entry?.heroImage ?? entry?.image;

  if (page?.meta?.title) {
    return {
      title: page.meta.title,
      description: page.meta.description ?? page.meta.intro ?? entry?.summary,
      openGraph: image ? { images: [{ url: image }] } : undefined,
    };
  }
  if (!entry) return { title: "Photograph" };
  return {
    title: entry.title,
    description: entry.summary,
    openGraph: image ? { images: [{ url: image }] } : undefined,
  };
}

export default async function CapturedPhotographPage({ params }) {
  const { slug } = await params;
  const cat = WORK_CATEGORIES.find((c) => c.id === "photography");
  const { photoSlugs } = flattenCategorySlugs(cat ?? { subsections: [] });
  const entry = getPhotographyCaptured(slug);
  const page = await loadCapturedWork(slug);

  if (!photoSlugs.includes(slug) || !entry || !page) {
    notFound();
  }

  const Layout = LAYOUT_COMPONENTS[page.layout];
  if (!Layout) notFound();

  return <Layout page={page} manifestEntry={entry} />;
}
