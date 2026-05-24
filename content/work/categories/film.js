/** /work/film */
export const page = {
  layout: "categoryConfig",
  categoryId: "film",
  metadata: {
    title: "Film / Animation",
    description:
      "Numbered video chapters and frame-animation fragments — narrative experiments built from sequential stills and motion studies.",
  },
  config: {
    categoryRoute: "/work/film",
    page: {
      title: "Film / Animation",
      subtitle:
        "Numbered video chapters and frame-animation fragments — narrative experiments built from sequential stills and motion studies.",
      heroImage: null,
    },
    conceptCards: [
      {
        id: "chapters",
        title: "Numbered chapters",
        summary:
          "Work organised as a serial rather than a single finished film — each chapter a fragment.",
      },
      {
        id: "frame",
        title: "Frame animation",
        summary:
          "Movement assembled from discrete frames rather than continuous capture.",
      },
    ],
    intro: {
      paragraphs: [
        "This thread collects time-based work that never quite became a single theatre-ready piece. Instead it lives as chapters you can enter in any order.",
        "The frame animation series is the anchor project below; more episodes and clips will be wired in as they are republished.",
      ],
    },
    relatedOnSite: [
      {
        href: "/work/physical-objects/projects/frame-animation-series",
        label: "Frame animation series",
        summary: "Main project page",
      },
      {
        href: "/work/photography",
        label: "Photography",
        summary: "Still image and studio work",
      },
    ],
    ctas: [
      { href: "/work", label: "Back to Explorer", variant: "ghost" },
      {
        href: "/work/physical-objects/projects/frame-animation-series",
        label: "Frame animation series",
        variant: "primary",
      },
    ],
  },
};
