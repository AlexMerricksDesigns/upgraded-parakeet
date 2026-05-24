/** /work/photography/projects/india-2016 */
export const page = {
  layout: "projectRich",
  meta: {
    title: "India 2016 archive",
    intro:
      "First Canon 400D journey — Agra, Taj Mahal region, architecture, travel, and cultural scenes.",
    tags: ["India", "Travel", "Canon 400D", "Archive"],
  },
  breadcrumb: { category: "photography", label: "India 2016 archive" },
  sections: [
    {
      type: "contextCard",
      eyebrow: "Photography thread · Project",
      summary:
        "The DSLR turning point — borrowed mother's Canon 400D for India, then continued on the first body through Brighton and beyond. See the practice timeline.",
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
      year: "2016",
      title: "India 2016 archive",
      image: "/work/photography/series-india-2016.jpg",
      alt: "India 2016 — travel and architecture from first Canon 400D journey",
      description:
        "Early–mid: borrowed Canon 400D for Agra and the Taj Mahal region. Late: post-India learning curve — intentional, technical photography begins.",
    },
    { type: "tagRow", year: "2016", tags: ["India", "Travel", "Canon 400D", "Archive"] },
    {
      type: "details",
      title: "Archive notes",
      rows: [
        { dt: "Year", dd: "2016" },
        { dt: "Camera", dd: "Canon 400D (first body, borrowed)" },
        { dt: "Significance", dd: "Shift from casual to intentional practice" },
        {
          dt: "Volume",
          dd: "Large India archive — architecture, travel, cultural scenes",
        },
      ],
    },
    {
      type: "prose",
      title: "What this archive holds",
      paragraphs: [
        "Before 2016 the habit was point-and-shoot — family heritage, everyday and travel subjects. India with the 400D changed the technical and intentional frame: architecture at scale, cultural distance, and the discipline of carrying a DSLR body. That archive still feeds mints and edits in 2023–2025 reflection passes.",
        "Now on the third Canon body and nearly 100,000 images total, 2016 remains the hinge year named on the category homepage timeline.",
      ],
    },
    {
      type: "gallery",
      title: "Gallery",
      items: [
        {
          src: "/work/photography/india-2016-01.jpg",
          alt: "India 2016 — architecture and travel from first Canon 400D trip.",
          caption:
            "Agra region — first serious DSLR experience (mother's Canon 400D).",
        },
        {
          src: "/work/photography/india-2016-02.jpg",
          alt: "India 2016 archive — travel and cultural scene.",
          caption:
            "Large India archive — shift from casual to intentional photography.",
        },
        {
          src: "/work/photography/series-india-2016.jpg",
          alt: "India 2016 collection overview — travel photography.",
          caption: "Foundation of the nearly 100,000-image archive that follows.",
        },
      ],
    },
    {
      type: "connected",
      title: "Connected outputs",
      cards: [
        {
          href: "/work/photography",
          title: "Crypto / NFT",
          summary: "On-chain minting from 2021 — archive instances tokenised.",
          eyebrow: "Work",
        },
        {
          href: "/work/photography/projects/painting-studio",
          title: "Painting studio",
          summary: "Later studio macro work — lens in the making space.",
          eyebrow: "Project",
        },
      ],
    },
  ],
};
