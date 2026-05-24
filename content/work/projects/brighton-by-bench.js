/** /work/photography/projects/brighton-by-bench */
export const page = {
  layout: "projectRich",
  meta: {
    title: "Brighton by Bench",
    intro:
      "100 Tezos tokens — benches as pause and permission, from the university project An Assemblage; for sitting.",
    tags: ["Tezos", "Brighton", "Benches", "objkt"],
  },
  breadcrumb: { category: "photography", label: "Brighton by Bench" },
  sections: [
    {
      type: "contextCard",
      eyebrow: "Photography thread · Project",
      summary:
        "Flagship on-chain collection under xanderhizome — see the category homepage for the full 2014–2026 timeline, Photez context, and shop links.",
      links: [
        { href: "/work/photography", 
          label: "Photography overview" 
        },
        {
          href: "/work/photography/projects/lightworms",
          label: "Lightworms",
        },
        { href: "/work/photography", 
          label: "Crypto thread" 
        },
      ],
    },
    {
      type: "hero",
      year: "2022 · 100 tokens",
      title: "Brighton by Bench",
      image: "/work/photography/series-brighton-by-bench.jpg",
      alt: "Brighton by Bench — urban bench street photography collection",
      description:
        "Benches as philosophical motif — sitting, permission, and mundane street furniture elevated through the archive and minted on Tezos.",
    },
    { type: "tagRow", 
      year: "2022", 
      tags: ["Tezos", "Brighton", "Benches", "objkt"] 
    },
    {
      type: "details",
      title: "Collection notes",
      rows: [
        { dt: "Year", dd: "2022 (peak on-chain year)" },
        { dt: "Edition", dd: "100 tokens on Tezos / objkt" },
        { dt: "Origin", dd: "University project — An Assemblage; for sitting" },
        { dt: "Handle", dd: "xanderhizome" },
      ],
    },
    {
      type: "prose",
      title: "What the collection is doing",
      paragraphs: [
        "The bench is a pause point — street furniture that holds bodies, conversations, and weather. Brighton by Bench tokenises that habit: one hundred instances along a through-line that begins with 2017 urban starters (including the Designated smoking area shot) and culminates in the 2022 minting period alongside Photez community work.",
        "Physical prints and postcards from select tokens will list in the shop as editions are prepared — the collection remains the canonical on-chain home; the site connects portfolio narrative to tactile output.",
      ],
    },
    {
      type: "gallery",
      title: "Gallery",
      items: [
        {
          src: "/work/photography/brighton-by-bench-01.jpg",
          alt: "Brighton bench street photograph from the collection.",
          caption: "Urban bench study — pause point and street furniture.",
        },
        {
          src: "/work/photography/brighton-by-bench-02.jpg",
          alt: "Second Brighton by Bench archive photograph.",
          caption: "Part of the 100-token Brighton by Bench series on Tezos.",
        },
        {
          src: "/work/photography/series-brighton-by-bench.jpg",
          alt: "Brighton by Bench collection overview image.",
          caption:
            "Collection grown from An Assemblage; for sitting (university project).",
        },
      ],
    },
    {
      type: "connected",
      title: "Connected outputs",
      cards: [
        {
          href: "/work/photography/products/limited-prints",
          title: "Limited edition prints",
          summary: "Physical prints from key works — prototype pricing.",
          eyebrow: "Product",
        },
        {
          href: "/work/photography/projects/lightworms",
          title: "Lightworms",
          summary: "50-token companion collection — pond light and surface.",
          eyebrow: "Project",
        },
      ],
    },
  ],
};
