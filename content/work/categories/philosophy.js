/** /work/reflections */
export const page = {
  layout: "categoryConfig",
  categoryId: "philosophy",
  metadata: {
    title: "Philosophy / Writings",
    description:
      "Design dissertations, theory notes, and journal essays — writing as a parallel thread to making.",
  },
  config: {
    categoryRoute: "/work/reflections",
    page: {
      title: "Philosophy / Writings",
      subtitle:
        "Design dissertations, theory notes, and journal essays — writing as a parallel thread to making.",
      heroImage: "/work/reflections/projects/designing-dope/cover.jpg",
    },
    conceptCards: [
      {
        id: "dissertation",
        title: "Dissertation work",
        summary: "University design theory — materials, paradigm shifts, and practice.",
      },
      {
        id: "journal",
        title: "Journal essays",
        summary:
          "Shorter pieces on value, nationhood, and crypto — cross-linked from here.",
      },
    ],
    intro: {
      paragraphs: [
        "Philosophy / Writings is the hub for text-first work. Dissertations live as work project pages; essays live in the journal. Both are listed below so you can move between formats without losing the thread.",
      ],
    },
    relatedOnSite: [
      { href: "/journal", label: "Journal index", summary: "All published essays" },
      {
        href: "/work/photography",
        label: "Crypto / NFT",
        summary: "On-chain work with paired essays",
      },
    ],
    ctas: [
      { href: "/work", label: "Back to Explorer", variant: "ghost" },
      { href: "/journal", label: "Journal index", variant: "primary" },
      {
        href: "/work/reflections/projects/designing-dope",
        label: "Designing Dope",
        variant: "ghost",
      },
    ],
  },
};
