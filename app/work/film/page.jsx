import { CategoryPage } from "../category-page";
import {
  categoryThreadSections,
  getWorkCategory,
} from "../categories";
import { categoryPath, projectPath } from "@/lib/work-paths";

const category = getWorkCategory("film");

const config = {
  categoryTitle: category.title,
  categoryRoute: categoryPath("film"),
  page: {
    title: category.title,
    subtitle:
      "Numbered video chapters and frame-animation fragments — narrative experiments built from sequential stills and motion studies.",
    heroImage: null,
  },
  conceptCards: [
    {
      id: "chapters",
      title: "Numbered chapters",
      summary: "Work organised as a serial rather than a single finished film — each chapter a fragment.",
    },
    {
      id: "frame",
      title: "Frame animation",
      summary: "Movement assembled from discrete frames rather than continuous capture.",
    },
  ],
  intro: {
    paragraphs: [
      "This thread collects time-based work that never quite became a single theatre-ready piece. Instead it lives as chapters you can enter in any order.",
      "The frame animation series is the anchor project below; more episodes and clips will be wired in as they are republished.",
    ],
  },
  relatedOnSite: [
    { href: projectPath("film", "frame-animation-series"), label: "Frame animation series", summary: "Main project page" },
    { href: categoryPath("photography"), label: "Photography", summary: "Still image and studio work" },
  ],
  projectSections: categoryThreadSections(category),
  ctas: [
    { href: "/work", label: "Back to Explorer", variant: "ghost" },
    { href: projectPath("film", "frame-animation-series"), label: "Frame animation series", variant: "primary" },
  ],
};

export const metadata = {
  title: "Film / Animation",
  description: config.page.subtitle,
};

export default function FilmCategoryPage() {
  return <CategoryPage config={config} />;
}
