import {
  categoryPath,
  productPath,
  seriesPath,
} from "@/lib/work-paths";

/** /work/photography/captured/lightworms-01 */
export const page = {
  layout: "photograph",
  meta: {
    title: "Lightworms study I",
    intro:
      "From the Lightworms series, 2022. A momentary convergence of light and texture that felt almost alive.",
    description:
      "Pond light and water-surface abstraction — part of the original objkt mint, now available as print editions.",
    date: "2022",
    series: "lightworms",
    tags: ["Light", "Pond", "Tezos"],
  },
  breadcrumb: {
    category: "photography",
    series: "lightworms",
    label: "Lightworms study I",
  },
  hero: {
    image: "/work/photography/lightworms-01.jpg",
    alt: "Pond light and water-surface abstraction — Lightworms collection",
  },
  story: {
    eyebrow: "From the Lightworms series, 2022",
    paragraphs: [
      "This piece captures a momentary convergence of light and texture that felt almost alive. Part of the original objkt mint, now available as a signed limited edition print or open archival print.",
      "Shot during 2021–2022 in southern England, the image belongs to a body of work exploring how artificial and natural light interact on surfaces at certain times of day — creating glowing, worm-like trails and forms.",
    ],
  },
  printTiers: [
    {
      id: "open",
      label: "Open print",
      summary: "Archival open edition — standard sizes on request.",
      href: productPath("photography", "limited-prints"),
      cta: "Request open print",
      kind: "shop",
    },
    {
      id: "limited",
      label: "Limited signed",
      summary: "Signed limited edition — numbered when the run is fixed.",
      href: productPath("photography", "limited-prints"),
      cta: "Limited edition",
      kind: "shop",
    },
    {
      id: "club",
      label: "Observation Club",
      summary: "Collector tier for sustained observation work — enquire for availability.",
      href: "/contact",
      cta: "Enquire",
      kind: "contact",
    },
  ],
  nft: {
    published: true,
    summary: "Part of the 1/1 Lightworms collection on objkt (2022).",
    link: null,
  },
  crossLinks: [
    {
      href: seriesPath("photography", "lightworms"),
      label: "Lightworms series",
      summary: "Full collection — narrative, grid, and process notes",
    },
    {
      href: categoryPath("plotter"),
      label: "Plotter Works",
      summary: "Photographic sources plotted into physical editions",
    },
    {
      href: categoryPath("reflections"),
      label: "Reflections & Writing",
      summary: "Essays on observation, value, and light as living system",
    },
  ],
};
