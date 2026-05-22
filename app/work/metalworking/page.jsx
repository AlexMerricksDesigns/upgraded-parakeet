import { CategoryPage } from "../category-page";
import {
  categoryThreadSections,
  getWorkCategory,
} from "../categories";
import { categoryPath, projectPath } from "@/lib/work-paths";

const category = getWorkCategory("metalworking");

const config = {
  categoryTitle: category.title,
  categoryRoute: categoryPath("metalworking"),
  page: {
    title: category.title,
    subtitle:
      "Cast and worked metal objects from recycled material — tools made to be used rather than displayed.",
    heroImage: "/work/meat-hammer/hero.jpg",
  },
  conceptCards: [
    {
      id: "recycle",
      title: "Recycled aluminium",
      summary: "Drinks cans melted and cast into a working tenderising hammer.",
    },
    {
      id: "hybrid",
      title: "Wood & metal",
      summary: "Reclaimed handles paired with cast heads — two material histories in one tool.",
    },
  ],
  intro: {
    paragraphs: [
      "Metalworking in this archive is small-scale and functional: one flagship piece so far, with room for further casts and forge experiments to be added.",
    ],
  },
  relatedOnSite: [
    { href: categoryPath("woodworking"), label: "Woodworking", summary: "Complementary making thread" },
    { href: projectPath("metalworking", "meat-hammer"), label: "Meat hammer project", summary: "Full project page" },
  ],
  projectSections: categoryThreadSections(category),
  ctas: [
    { href: "/work", label: "Back to Explorer", variant: "ghost" },
    { href: projectPath("metalworking", "meat-hammer"), label: "Meat hammer project", variant: "primary" },
  ],
};

export const metadata = {
  title: "Metalworking",
  description: config.page.subtitle,
};

export default function MetalworkingCategoryPage() {
  return <CategoryPage config={config} />;
}
