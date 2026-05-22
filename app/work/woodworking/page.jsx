import { CategoryPage } from "../category-page";
import {
  categoryThreadSections,
  getWorkCategory,
} from "../categories";
import { categoryPath, projectPath } from "@/lib/work-paths";

const category = getWorkCategory("woodworking");

const config = {
  categoryTitle: category.title,
  categoryRoute: categoryPath("woodworking"),
  page: {
    title: category.title,
    subtitle:
      "Furniture, handles, and studio objects in wood — reclaimed stock, hand joints, and tools that stay in use.",
    heroImage: "/work/shelving-a-level/Shelves2.jpg",
  },
  conceptCards: [
    {
      id: "reuse",
      title: "Reclaimed material",
      summary: "Wardrobes and offcuts become shelving — the prior life of the timber stays visible.",
    },
    {
      id: "joint",
      title: "Joints & repair",
      summary: "Dovetails, dowels, and leather wraps — making objects that can be maintained.",
    },
  ],
  intro: {
    paragraphs: [
      "Woodworking projects here span A-Level coursework through studio furniture. Each link below is a full project page with process notes and images.",
    ],
  },
  relatedOnSite: [
    { href: categoryPath("metalworking"), label: "Metalworking", summary: "Cast and forged metal tools" },
    { href: projectPath("philosophy", "design-philosophy"), label: "Design philosophy", summary: "Materials and reuse in writing" },
  ],
  projectSections: categoryThreadSections(category),
  ctas: [
    { href: "/work", label: "Back to Explorer", variant: "ghost" },
    { href: projectPath("woodworking", "shelving-a-level"), label: "A-Level shelving", variant: "primary" },
  ],
};

export const metadata = {
  title: "Woodworking",
  description: config.page.subtitle,
};

export default function WoodworkingCategoryPage() {
  return <CategoryPage config={config} />;
}
