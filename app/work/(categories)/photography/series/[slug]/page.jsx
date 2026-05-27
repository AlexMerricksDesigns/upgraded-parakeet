import { notFound } from "next/navigation";

import { WORK_CATEGORIES, flattenCategorySlugs } from "@/app/work/categories";
import { loadWorkSeries } from "@/lib/content/loaders";
import { LAYOUT_COMPONENTS } from "@/lib/content/layouts";
import { getPhotographySeries } from "@/lib/photography-registry";

export function generateStaticParams() {
  const cat = WORK_CATEGORIES.find((c) => c.id === "photography");
  const { seriesSlugs } = flattenCategorySlugs(cat ?? { subsections: [] });
  return seriesSlugs
    .filter((slug) => getPhotographySeries(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await loadWorkSeries(slug);
  const entry = getPhotographySeries(slug);
  const image = page?.hero?.image ?? entry?.image;

  if (page?.meta?.title) {
    return {
      title: page.meta.title,
      description: page.meta.description ?? page.meta.intro ?? entry?.summary,
      openGraph: image ? { images: [{ url: image }] } : undefined,
    };
  }
  if (!entry) return { title: "Series" };
  return {
    title: entry.title,
    description: entry.summary,
    openGraph: image ? { images: [{ url: image }] } : undefined,
  };
}

export default async function PhotographySeriesPage({ params }) {
  const { slug } = await params;
  const cat = WORK_CATEGORIES.find((c) => c.id === "photography");
  const { seriesSlugs } = flattenCategorySlugs(cat ?? { subsections: [] });
  const entry = getPhotographySeries(slug);
  const page = await loadWorkSeries(slug);

  if (!seriesSlugs.includes(slug) || !entry || !page) {
    notFound();
  }

  const Layout = LAYOUT_COMPONENTS[page.layout];
  if (!Layout) notFound();

  return <Layout page={page} manifestEntry={entry} />;
}
