/** /work/woodworking */
export const page = {
  layout: "categoryConfig",
  categoryId: "woodworking",
  metadata: {
    title: "Woodworking",
    description:
      "Furniture, handles, and studio objects in wood — reclaimed stock, hand joints, and tools that stay in use.",
  },
  config: {
    categoryRoute: "/work/woodworking",
    page: {
      title: "Woodworking",
      subtitle:
        "Furniture, handles, and studio objects in wood — reclaimed stock, hand joints, and tools that stay in use.",
      heroImage: "/work/physical-objects/projects/shelving-a-level/Shelves2.jpg",
    },
    conceptCards: [
      {
        id: "reuse",
        title: "Reclaimed material",
        summary:
          "Wardrobes and offcuts become shelving — the prior life of the timber stays visible.",
      },
      {
        id: "joint",
        title: "Joints & repair",
        summary:
          "Dovetails, dowels, and leather wraps — making objects that can be maintained.",
      },
    ],
    intro: {
      paragraphs: [
        "Woodworking projects here span A-Level coursework through studio furniture. Each link below is a full project page with process notes and images.",
      ],
    },
    relatedOnSite: [
      {
        href: "/work/metalworking",
        label: "Metalworking",
        summary: "Cast and forged metal tools",
      },
      {
        href: "/work/reflections/projects/design-philosophy",
        label: "Design philosophy",
        summary: "Materials and reuse in writing",
      },
    ],
    ctas: [
      { href: "/work", label: "Back to Explorer", variant: "ghost" },
      {
        href: "/work/physical-objects/projects/shelving-a-level",
        label: "A-Level shelving",
        variant: "primary",
      },
    ],
  },
};
