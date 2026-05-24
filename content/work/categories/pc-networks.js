/** /work/pc-networks */
export const page = {
  layout: "categoryConfig",
  categoryId: "pc-networks",
  metadata: {
    title: "PC Networks",
    description:
      "Experiments with AI image generation, manipulation, and upscaling — workflows that treat the network as a material in the pipeline.",
  },
  config: {
    categoryRoute: "/work/pc-networks",
    page: {
      title: "PC Networks",
      subtitle:
        "Experiments with AI image generation, manipulation, and upscaling — workflows that treat the network as a material in the pipeline.",
      heroImage: null,
    },
    conceptCards: [
      {
        id: "pipeline",
        title: "Pipeline thinking",
        summary:
          "Models as stages in a larger process — input, transform, upscale, export.",
      },
      {
        id: "instance",
        title: "Instances & exports",
        summary:
          "Each run produces candidates; selection and edition decisions happen downstream.",
      },
    ],
    intro: {
      paragraphs: [
        "This thread tracks digital experiments where computation replaces or extends the darkroom. The anchor project documents generation and upscaling workflows from 2021 onward.",
      ],
    },
    relatedOnSite: [
      {
        href: "/work/plotter/projects/ai-image-upscaling",
        label: "AI upscaling project",
        summary: "Main write-up",
      },
      {
        href: "/work/photography",
        label: "Crypto / NFT",
        summary: "Adjacent digital edition practice",
      },
    ],
    ctas: [
      { href: "/work", label: "Back to Explorer", variant: "ghost" },
      {
        href: "/work/plotter/projects/ai-image-upscaling",
        label: "AI image project",
        variant: "primary",
      },
    ],
  },
};
