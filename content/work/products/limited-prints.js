/** /work/photography/products/limited-prints */
export const page = {
  layout: "productShelf",
  meta: {
    title: "Limited edition prints",
    intro:
      "Signed physical prints from key works — Brighton by Bench, archive selects, and atmospheric editions.",
  },
  breadcrumb: { category: "photography", label: "Limited edition prints" },
  sections: [
    {
      type: "contextCard",
      eyebrow: "Photography thread · Product",
      summary:
        "Gentle sales funnel from the long-form archive — prototype pricing while checkout wires up. Browse the category homepage for the timeline and collections.",
      links: [
        { href: "/work/photography", label: "Photography overview" },
        {
          href: "/work/photography/projects/brighton-by-bench",
          label: "Brighton by Bench",
        },
      ],
    },
    {
      type: "tagRow",
      eyebrow: "Coming soon",
      tags: ["TBC", "Physical", "Signed"],
    },
    {
      type: "heroMedia",
      image: "/work/photography/shop-limited-prints.jpg",
      alt: "Limited edition photographic prints from the archive practice",
    },
    {
      type: "details",
      title: "Product notes",
      rows: [
        { dt: "Status", dd: "Coming soon" },
        { dt: "Format", dd: "Signed limited prints" },
        {
          dt: "Sources",
          dd: "Brighton by Bench, India archive, recent atmospheric work",
        },
      ],
    },
    {
      type: "prose",
      title: "Why prints from this thread",
      paragraphs: [
        "The photographic spectrum runs from RAW through export to print and on-chain instance — this product holds the signed physical register. Selects from Brighton by Bench, the India 2016 turning point, and recent edits such as Trapped within a descending haze are candidates for small numbered runs.",
        "Postcards and zines will list alongside prints as formats are tested. On-chain editions remain on objkt under xanderhizome; see digital editions under the Crypto thread for tokenised work.",
      ],
    },
    {
      type: "gallery",
      title: "Gallery",
      items: [
        {
          src: "/work/photography/shop-limited-prints.jpg",
          alt: "Limited edition photographic print — sample from the archive.",
          caption: "Print tests from archive selects — edition sizing TBC.",
        },
        {
          src: "/work/photography/brighton-by-bench-01.jpg",
          alt: "Brighton bench photograph — candidate for limited print edition.",
          caption: "Brighton by Bench lineage — bench as pause point.",
        },
        {
          src: "/work/photography/series-recent.jpg",
          alt: "Recent atmospheric photograph — contemporary edit.",
          caption: "Recent works — atmospheric and contemplative frames.",
        },
      ],
    },
    {
      type: "checkout",
      title: "Checkout",
      summary:
        "Purchase wiring is in progress — contact via the site for availability while the shop backend is connected.",
    },
    {
      type: "connected",
      title: "Source collections",
      cards: [
        {
          href: "/work/photography/projects/brighton-by-bench",
          title: "Brighton by Bench",
          summary: "100-token collection — primary print source.",
          eyebrow: "Project",
        },
        {
          href: "/work/photography/products/digital-editions",
          title: "Digital editions",
          summary: "On-chain instances — objkt / Tezos.",
          eyebrow: "Product",
        },
      ],
    },
  ],
};
