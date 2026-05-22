import { CategoryPage } from "../category-page";
import { OTHER_PROJECT_CATEGORIES } from "../work-hubs";

const HUB_ROUTE = "/work/other-projects";

const config = {
  categoryTitle: "Other projects",
  categoryRoute: HUB_ROUTE,
  page: {
    title: "Other projects",
    subtitle:
      "Threads outside the four feature areas on the work explorer — digital experiments, film, writing, on-chain work, and placeholders awaiting migration.",
    heroImage: "/work/designing-dope/cover.jpg",
  },
  conceptCards: [
    {
      id: "catch-all",
      title: "Catch-all hub",
      summary:
        "Not plotting, photography, or physical making — still part of the same archive and chronicle on /work.",
    },
    {
      id: "threads",
      title: "Parallel threads",
      summary:
        "PC networks, animation, philosophy, crypto, and nursery each keep their own category home.",
    },
  ],
  intro: {
    paragraphs: [
      "Other projects collects work categories that are not in the main 2×2 grid on the explorer. Each link below opens that category’s homepage with its own projects, journal posts, and products.",
    ],
  },
  relatedOnSite: OTHER_PROJECT_CATEGORIES.map((tile) => ({
    href: tile.href,
    label: tile.label,
    summary: tile.summary,
  })),
  projectSections: [],
  ctas: [
    { href: "/work", label: "Back to Explorer", variant: "ghost" },
    { href: "/work", label: "Browse full chronicle", variant: "primary" },
  ],
};

export const metadata = {
  title: "Other projects",
  description: config.page.subtitle,
};

export default function OtherProjectsHubPage() {
  return <CategoryPage config={config} />;
}
