import { CategoryPage } from "@/app/work/category-page";
import {
  categorySubsectionSections,
  getWorkCategory,
} from "@/app/work/categories";
import { WORK_TAGLINE } from "@/app/work/work-tagline";
import { HubSubnav } from "@/components/work/hub-subnav";
import { categoryPath } from "@/lib/work-paths";

const category = getWorkCategory("physical-objects");
const categoryRoute = categoryPath("physical-objects");

const PAGE_TITLE = "Physical Objects & Systems";
const PAGE_DESCRIPTION =
  "Tactile making, living systems, and installations — metal, wood, animation, and philosophical prototypes built to be used and observed.";

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [{ url: "/work/physical-objects/projects/meat-hammer/hero.jpg" }],
  },
};

const subnavItems = (category?.subsections ?? []).map((sub) => ({
  id: sub.id,
  title: sub.title,
}));

export function PhysicalObjectsHubPage() {
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
            heroImage: "/work/physical-objects/projects/meat-hammer/hero.jpg",
          },
          conceptCards: [
            {
              id: "living-systems",
              title: "Living systems",
              summary:
                "Bonsai, trees, and nursery experiments — care as a long-form practice.",
            },
            {
              id: "prototypes",
              title: "Prototypes",
              summary:
                "Metal and wood objects — cast tools, furniture, and studio pieces.",
            },
            {
              id: "installations",
              title: "Installations",
              summary: "Frame animation and embodied systems beyond the screen.",
            },
          ],
          intro: {
            paragraphs: [
              "Physical Objects & Systems gathers tactile work: things cast, carved, assembled, and grown. The thread emphasises material honesty and philosophical systems you can hold, use, or walk around.",
            ],
          },
          relatedOnSite: [
            {
              href: categoryPath("photography"),
              label: "Photography",
              summary: "Observation through the lens",
            },
            {
              href: categoryPath("plotter"),
              label: "Plotter Works",
              summary: "Code translated into ink",
            },
            {
              href: categoryPath("reflections"),
              label: "Reflections & Writing",
              summary: "Essays on making and value",
            },
          ],
          projectSections: sections,
          ctas: [
            { href: "/work", label: "Back to Explorer", variant: "ghost" },
            {
              href: "/work/physical-objects/projects/meat-hammer",
              label: "Meat hammer",
              variant: "primary",
            },
          ],
        }}
      />
    </>
  );
}
