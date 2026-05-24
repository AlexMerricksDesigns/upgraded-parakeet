/** /work/physical-objects */
export const page = {
  layout: "categoryConfig",
  categoryId: "nursery",
  metadata: {
    title: "Plant / Tree Nursery",
    description:
      "Plant and tree nursery experiments — propagation, grafting, and land-based work held lightly in the archive until more is republished.",
  },
  config: {
    categoryRoute: "/work/physical-objects",
    page: {
      title: "Plant / Tree Nursery",
      subtitle:
        "Plant and tree nursery experiments — propagation, grafting, and land-based work held lightly in the archive until more is republished.",
      heroImage: null,
    },
    intro: {
      paragraphs: [
        "This thread is a placeholder for horticultural work that does not yet have dedicated project pages on the new site. Older material may appear in the work archive as it is reviewed.",
      ],
    },
    relatedOnSite: [
      {
        href: "/work/archive",
        label: "Work archive",
        summary: "Older and in-progress entries",
      },
      { href: "/work", label: "Explorer", summary: "Return to the full work index" },
    ],
    projectSections: [
      {
        id: "coming",
        title: "Coming soon",
        intro:
          "Nursery project pages will be added here as they are migrated from cold storage.",
        groups: [
          {
            id: "placeholder",
            title: "Placeholder",
            items: [
              {
                slug: "archive",
                title: "Browse the archive",
                year: "Archive",
                summary:
                  "Interim index of older work while this thread is built out.",
                href: "/work/archive",
                external: false,
                image: null,
                platform: "Archive",
              },
            ],
          },
        ],
      },
    ],
    ctas: [
      { href: "/work", label: "Back to Explorer", variant: "ghost" },
      { href: "/work/archive", label: "Work archive", variant: "primary" },
    ],
  },
};
