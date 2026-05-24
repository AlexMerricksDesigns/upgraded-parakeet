/** /work/photography/projects/lightworms */
export const page = {
  layout: "projectRich",
  meta: {
    title: "Lightworms",
    intro:
      "50 Tezos tokens — pond light, larvae glow, and water-surface abstraction.",
    tags: ["Tezos", "Light", "Pond", "objkt"],
  },
  breadcrumb: { category: "photography", label: "Lightworms" },
  sections: [
    {
      type: "contextCard",
      eyebrow: "Photography thread · Project",
      summary:
        "Companion collection to Brighton by Bench — launched in the 2022 peak on-chain year. Full practice timeline on the photography homepage.",
      links: [
        { href: "/work/photography", label: "Photography overview" },
        {
          href: "/work/photography/projects/brighton-by-bench",
          label: "Brighton by Bench",
        },
      ],
    },
    {
      type: "hero",
      year: "2022 · 50 tokens",
      title: "Lightworms",
      image: "/work/photography/series-lightworms.jpg",
      alt: "Lightworms — pond light and reflective water-surface photography",
      description:
        "Pond light, larvae glow, and water-surface abstraction — the wet counterpart to dry bench pause points.",
    },
    {
      type: "tagRow",
      year: "2022",
      tags: ["Tezos", "Light", "Pond", "objkt"],
    },
    {
      type: "details",
      title: "Collection notes",
      rows: [
        { dt: "Year", dd: "2022" },
        { dt: "Edition", dd: "50 tokens on Tezos / objkt" },
        { dt: "Relation", dd: "Companion to Brighton by Bench" },
      ],
    },
    {
      type: "prose",
      title: "What the collection is doing",
      paragraphs: [
        "Where benches fix a horizontal pause in the city, Lightworms fix vertical light in water — larvae, reflection, and surface tension as a second vocabulary within the same minting period. Environmental submissions such as #photez4earth in 2023 extend the pond thread into community seasons.",
        "Gallery and shop editions for this series are placeholders on the live site — objkt remains the primary distribution; physical zines and prints are planned.",
      ],
    },
    {
      type: "gallery",
      title: "Gallery",
      items: [
        {
          src: "/work/photography/lightworms-01.jpg",
          alt: "Pond light and water-surface abstraction — Lightworms collection.",
          caption: "Pond light study — larvae glow and reflective surface.",
        },
        {
          src: "/work/photography/lightworms-02.jpg",
          alt: "Lightworms collection photograph — water and light texture.",
          caption: "Part of the 50-token Lightworms series on Tezos.",
        },
      ],
    },
    {
      type: "connected",
      title: "Connected outputs",
      cards: [
        {
          href: "/work/photography/projects/brighton-by-bench",
          title: "Brighton by Bench",
          summary: "100-token bench collection — flagship sibling series.",
          eyebrow: "Project",
        },
        {
          href: "/work/photography",
          title: "Crypto / NFT",
          summary: "On-chain essays and digital editions thread.",
          eyebrow: "Work",
        },
      ],
    },
  ],
};
