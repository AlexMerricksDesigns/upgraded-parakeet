import { CategoryPage } from "../category-page";
import { categoryPath } from "@/lib/work-paths";
import { PHYSICAL_OBJECT_CATEGORIES } from "../work-hubs";

const HUB_ROUTE = "/work/physical-objects";

const config = {
  categoryTitle: "Physical objects",
  categoryRoute: HUB_ROUTE,
  page: {
    title: "Physical objects",
    subtitle:
      "Metal and wood making — cast tools, furniture, and studio objects built to be used rather than displayed.",
    heroImage: "/work/meat-hammer/hero.jpg",
  },
  conceptCards: [
    {
      id: "material",
      title: "Material histories",
      summary:
        "Recycled aluminium, reclaimed timber, and hybrid handles — prior lives of stock stay visible in the finished piece.",
    },
    {
      id: "use",
      title: "Tools in use",
      summary:
        "Objects meant for the bench and kitchen — maintained joints, repairs, and wear as part of the record.",
    },
  ],
  intro: {
    paragraphs: [
      "Physical objects groups the metalworking and woodworking threads. Choose a category below for project pages, process notes, and images.",
    ],
  },
  relatedOnSite: PHYSICAL_OBJECT_CATEGORIES.map((tile) => ({
    href: tile.href,
    label: tile.label,
    summary: tile.summary,
  })),
  projectSections: [],
  ctas: [
    { href: "/work", label: "Back to Explorer", variant: "ghost" },
    { href: categoryPath("metalworking"), label: "Metalworking", variant: "primary" },
    { href: categoryPath("woodworking"), label: "Woodworking", variant: "ghost" },
  ],
};

export const metadata = {
  title: "Physical objects",
  description: config.page.subtitle,
};

export default function PhysicalObjectsHubPage() {
  return <CategoryPage config={config} />;
}
