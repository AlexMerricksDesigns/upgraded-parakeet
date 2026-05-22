import { CategoryPage } from "../category-page";
import {
  categoryThreadSections,
  getWorkCategory,
} from "../categories";
import { categoryPath, projectPath } from "@/lib/work-paths";

const category = getWorkCategory("pc-networks");

const config = {
  categoryTitle: category.title,
  categoryRoute: categoryPath("pc-networks"),
  page: {
    title: category.title,
    subtitle:
      "Experiments with AI image generation, manipulation, and upscaling — workflows that treat the network as a material in the pipeline.",
    heroImage: null,
  },
  conceptCards: [
    {
      id: "pipeline",
      title: "Pipeline thinking",
      summary: "Models as stages in a larger process — input, transform, upscale, export.",
    },
    {
      id: "instance",
      title: "Instances & exports",
      summary: "Each run produces candidates; selection and edition decisions happen downstream.",
    },
  ],
  intro: {
    paragraphs: [
      "This thread tracks digital experiments where computation replaces or extends the darkroom. The anchor project documents generation and upscaling workflows from 2021 onward.",
    ],
  },
  relatedOnSite: [
    { href: projectPath("pc-networks", "ai-image-upscaling"), label: "AI upscaling project", summary: "Main write-up" },
    { href: categoryPath("crypto"), label: "Crypto / NFT", summary: "Adjacent digital edition practice" },
  ],
  projectSections: categoryThreadSections(category),
  ctas: [
    { href: "/work", label: "Back to Explorer", variant: "ghost" },
    { href: projectPath("pc-networks", "ai-image-upscaling"), label: "AI image project", variant: "primary" },
  ],
};

export const metadata = {
  title: "PC Networks",
  description: config.page.subtitle,
};

export default function PcNetworksCategoryPage() {
  return <CategoryPage config={config} />;
}
