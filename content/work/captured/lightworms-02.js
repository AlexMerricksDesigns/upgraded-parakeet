import {
  categoryPath,
  productPath,
  seriesPath,
} from "@/lib/work-paths";

/** /work/photography/captured/lightworms-02 */
export const page = {
  layout: "photograph",
  meta: {
    title: "Lightworms study II",
    intro:
      "Water and light texture from the Lightworms series — luminous surface study, 2022.",
    description:
      "Second highlight from the Lightworms collection — reflective water and bioluminescent quality.",
    date: "2022",
    series: "lightworms",
    tags: ["Light", "Water", "Tezos"],
  },
  breadcrumb: {
    category: "photography",
    series: "lightworms",
    label: "Lightworms study II",
  },
  hero: {
    image: "/work/photography/lightworms-02.jpg",
    alt: "Lightworms collection photograph — water and light texture",
  },
  story: {
    paragraphs: [
      "Part of the 50-token Lightworms series on Tezos — a companion to the bench-led Brighton work from the same minting period. The wet counterpart to horizontal pause points in the city.",
      "Available as open archival print or signed limited edition as editions open on the shop.",
    ],
  },
  printTiers: [
    {
      id: "open",
      label: "Open print",
      summary: "Archival open edition on request.",
      href: productPath("photography", "limited-prints"),
      cta: "Request open print",
      kind: "shop",
    },
    {
      id: "limited",
      label: "Limited signed",
      summary: "Signed limited edition when numbered runs are live.",
      href: productPath("photography", "limited-prints"),
      cta: "Limited edition",
      kind: "shop",
    },
  ],
  nft: {
    published: true,
    summary: "From the Lightworms objkt collection (2022).",
  },
  crossLinks: [
    {
      href: seriesPath("photography", "lightworms"),
      label: "Lightworms series",
      summary: "Browse the full collection and series statement",
    },
    {
      href: categoryPath("photography"),
      label: "Photography hub",
      summary: "Captured works, editions, and field notes",
    },
  ],
};
