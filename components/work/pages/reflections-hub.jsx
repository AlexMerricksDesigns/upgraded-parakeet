import { CategoryPage } from "@/app/work/category-page";
import {
  categorySubsectionSections,
  getWorkCategory,
} from "@/app/work/categories";
import { WORK_TAGLINE } from "@/app/work/work-tagline";
import { HubSubnav } from "@/components/work/hub-subnav";
import { categoryPath } from "@/lib/work-paths";

const category = getWorkCategory("reflections");
const categoryRoute = categoryPath("reflections");

const PAGE_TITLE = "Reflections & Writing";
const PAGE_DESCRIPTION =
  "Essays, dissertations, and notes on observation, value, process, and philosophy — cross-linked to photography, plotter, and physical work.";

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [{ url: "/work/reflections/projects/designing-dope/cover.jpg" }],
  },
};

const subnavItems = (category?.subsections ?? []).map((sub) => ({
  id: sub.id,
  title: sub.title,
}));

export function ReflectionsHubPage() {
  const sections = category ? categorySubsectionSections(category) : [];

  return (
    <>
      <p className="work-tagline">{WORK_TAGLINE}</p>
      <HubSubnav items={subnavItems} />
      <CategoryPage
        config={{
          categoryTitle: category?.title ?? PAGE_TITLE,
          categoryRoute,
          page: {
            title: PAGE_TITLE,
            subtitle: PAGE_DESCRIPTION,
            heroImage: "/work/reflections/projects/designing-dope/cover.jpg",
          },
          conceptCards: [
            {
              id: "essays",
              title: "Essays",
              summary:
                "Journal pieces on value, nationhood, metaphysics, and observation.",
            },
            {
              id: "dissertations",
              title: "Dissertations & studio",
              summary:
                "University design theory — materials, paradigm shifts, and practice.",
            },
          ],
          intro: {
            paragraphs: [
              "Reflections & Writing is the hub for text-first work. Dissertations live as project pages; essays live in the journal thread. Both are grouped below so you can move between formats without losing the thread.",
            ],
          },
          relatedOnSite: [
            { href: "/journal", label: "Journal index", summary: "All published essays" },
            {
              href: categoryPath("photography"),
              label: "Photography",
              summary: "Lens work and on-chain editions",
            },
            {
              href: categoryPath("plotter"),
              label: "Plotter Works",
              summary: "Code, cord, and ink",
            },
            {
              href: categoryPath("physical-objects"),
              label: "Physical Objects & Systems",
              summary: "Tactile making and living systems",
            },
          ],
          projectSections: sections,
          ctas: [
            { href: "/work", label: "Back to Explorer", variant: "ghost" },
            { href: "/journal", label: "Journal index", variant: "primary" },
            {
              href: "/work/reflections/projects/designing-dope",
              label: "Designing Dope",
              variant: "ghost",
            },
          ],
        }}
      />
    </>
  );
}
