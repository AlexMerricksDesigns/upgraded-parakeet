/** /work/plotter/products/postcards */
export const page = {
  layout: "productShelf",
  meta: {
    title: "Postcard Series (6-card set)",
    intro:
      "A small edition set pulled from derivations and detours in image-making.",
  },
  breadcrumb: { category: "plotter", label: "Postcard Series (6-card set)" },
  sections: [
    {
      type: "contextCard",
      eyebrow: "Plotter thread · Product",
      summary:
        "First shelf-ready edition from the polargraph practice — prototype pricing. Browse the category homepage for the machine story and timeline.",
      links: [
        { href: "/work/plotter", label: "Plotter overview" },
        {
          href: "/work/plotter/projects/plotted-heads",
          label: "Source project",
        },
      ],
    },
    { type: "tagRow", eyebrow: "Prototype", tags: ["TBC", "Physical"] },
    {
      type: "heroMedia",
      image: "/work/plotter/products/postcards/IMG_5206.jpg",
      alt: "The six-card postcard series photographed as a physical set.",
    },
    {
      type: "details",
      title: "Product notes",
      rows: [
        { dt: "Status", dd: "Prototype" },
        { dt: "Format", dd: "Physical postcard set" },
        { dt: "Set size", dd: "Six cards" },
      ],
    },
    {
      type: "prose",
      title: "Why start here",
      paragraphs: [
        "This is the first shelf-ready product because it lets the wider studio experiment become something concrete without waiting for the entire shop to be defined.",
        "The postcard set works as a small edition, a test of packaging and sequencing, and a way to carry the plotted-image language into something people can hold, send, or collect.",
      ],
    },
    {
      type: "gallery",
      title: "Gallery",
      items: [
        {
          src: "/work/plotter/products/postcards/_MG_3396.jpg",
          alt: "Close-up of postcard prints laid out together.",
          caption:
            "The set begins as a compact way to test imagery in a tactile format.",
        },
        {
          src: "/work/plotter/products/postcards/_MG_4293.jpg",
          alt: "Another view of the postcard set on display.",
          caption:
            "Variations across the cards make the edition feel like a small sequence rather than one repeated image.",
        },
        {
          src: "/work/plotter/products/postcards/IMG_3790.jpg",
          alt: "Detail photograph of an individual postcard from the set.",
          caption:
            "Each card can stand alone while still belonging to the wider series.",
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
      title: "Source material",
      summary: "The product grows out of the plotted portrait work.",
      cards: [
        {
          href: "/work/plotter/projects/plotted-heads",
          title: "Plotted heads series",
          summary: "The portrait work this postcard edition is drawn from.",
          eyebrow: "Work · Project",
        },
      ],
    },
  ],
};
