import {
  categoryPath,
  productPath,
  seriesPath,
} from "@/lib/work-paths";

/** /work/photography/series/brighton-by-bench */
// Promo / working assets: public/work/photography/projects/ (posters, alternates) — swap hero.image here when curated.
export const page = {
  layout: "series",
  meta: {
    title: "Brighton by Bench",
    intro:
      "100 Tezos tokens — benches as pause and permission, from the university project An Assemblage; for sitting.",
    description:
      "Benches as philosophical motif — sitting, permission, and mundane street furniture elevated through the archive and minted on Tezos.",
    date: "2022",
    series: "brighton-by-bench",
    tags: ["Tezos", "Brighton", "Benches", "objkt"],
  },
  breadcrumb: {
    category: "photography",
    series: "brighton-by-bench",
    label: "Brighton by Bench",
  },
  hero: {
    year: "2022 · 100 tokens",
    image: "/work/photography/series-brighton-by-bench.jpg",
    alt: "Brighton by Bench — urban bench street photography collection",
    description:
      "Benches as philosophical motif — sitting, permission, and mundane street furniture elevated through the archive and minted on Tezos.",
  },
  intro: {
    paragraphs: [
      "The bench is a pause point — street furniture that holds bodies, conversations, and weather. Brighton by Bench tokenises that habit: one hundred instances along a through-line that begins with 2017 urban starters and culminates in the 2022 minting period alongside Photez community work.",
      "Physical prints and postcards from select tokens list in the shop as editions are prepared — the collection remains the canonical on-chain home; the site connects portfolio narrative to tactile output.",
    ],
  },
  statement: {
    title: "Collection notes",
    paragraphs: [
      "Flagship on-chain collection under xanderhizome — see the category homepage for the full 2014–2026 timeline, Photez context, and shop links.",
      "Edition: 100 tokens on Tezos / objkt. Origin: University project — An Assemblage; for sitting.",
    ],
  },
  printTiers: [
    {
      id: "limited",
      label: "Limited edition prints",
      href: productPath("photography", "limited-prints"),
      kind: "shop",
    },
  ],
  crossLinks: [
    {
      href: seriesPath("photography", "lightworms"),
      label: "Lightworms",
      summary: "50-token companion collection — pond light and surface",
    },
    {
      href: productPath("photography", "limited-prints"),
      label: "Limited edition prints",
      summary: "Physical prints from key works",
    },
    {
      href: categoryPath("photography"),
      label: "Photography hub",
      summary: "Captured works, editions, and field notes",
    },
  ],
};
