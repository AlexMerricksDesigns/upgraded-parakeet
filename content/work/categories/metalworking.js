/** /work/metalworking */
export const page = {
  layout: "categoryConfig",
  categoryId: "metalworking",
  metadata: {
    title: "Metalworking",
    description:
      "Cast and worked metal objects from recycled material — tools made to be used rather than displayed.",
  },
  config: {
    categoryRoute: "/work/metalworking",
    page: {
      title: "Metalworking",
      subtitle:
        "Cast and worked metal objects from recycled material — tools made to be used rather than displayed.",
      heroImage: "/work/physical-objects/projects/meat-hammer/hero.jpg",
    },
    conceptCards: [
      {
        id: "recycle",
        title: "Recycled aluminium",
        summary: "Drinks cans melted and cast into a working tenderising hammer.",
      },
      {
        id: "hybrid",
        title: "Wood & metal",
        summary:
          "Reclaimed handles paired with cast heads — two material histories in one tool.",
      },
    ],
    intro: {
      paragraphs: [
        "Metalworking in this archive is small-scale and functional: one flagship piece so far, with room for further casts and forge experiments to be added.",
      ],
    },
    relatedOnSite: [
      {
        href: "/work/woodworking",
        label: "Woodworking",
        summary: "Complementary making thread",
      },
      {
        href: "/work/physical-objects/projects/meat-hammer",
        label: "Meat hammer project",
        summary: "Full project page",
      },
    ],
    ctas: [
      { href: "/work", label: "Back to Explorer", variant: "ghost" },
      {
        href: "/work/physical-objects/projects/meat-hammer",
        label: "Meat hammer project",
        variant: "primary",
      },
    ],
  },
};
