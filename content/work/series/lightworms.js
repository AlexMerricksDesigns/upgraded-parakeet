import {
  capturedPath,
  categoryPath,
  productPath,
  seriesPath,
} from "@/lib/work-paths";

/** /work/photography/series/lightworms */
// Promo / working assets: public/work/photography/projects/lightworms/ — swap hero.image when a projects poster beats series-lightworms.jpg.
export const page = {
  layout: "series",
  meta: {
    title: "Lightworms",
    intro:
      "Luminous fragments of southern light — a 2022 collection exploring abstraction through intimate observation.",
    description:
      "Lightworms captures fleeting moments where light reveals hidden forms in the everyday landscape. Originally released as a 1/1 collection on objkt.",
    date: "2022",
    series: "lightworms",
    tags: ["Tezos", "Light", "Pond", "objkt"],
  },
  breadcrumb: {
    category: "photography",
    series: "lightworms",
    label: "Lightworms",
  },
  hero: {
    year: "2022 · 50 tokens",
    image: "/work/photography/series-lightworms.jpg",
    alt: "Lightworms — pond light and reflective water-surface photography",
    description:
      "Pond light, larvae glow, and water-surface abstraction — the wet counterpart to dry bench pause points.",
  },
  intro: {
    eyebrow: "Series introduction",
    title: "Lightworms",
    paragraphs: [
      "Lightworms captures fleeting moments where light reveals hidden forms in the everyday landscape. Shot during 2021–2022 in southern England, this series explores the boundary between the seen and the imagined — where ordinary surfaces glow with an almost living energy. Originally released as a 1/1 collection on objkt, Lightworms remains one of my most personal bodies of observational work.",
      "Abstract light play, glowing forms, and intimate close-ups that feel mysterious and organic — positioned as a distinct collection rather than random shots, often shared as selection grids that highlight color and texture.",
    ],
  },
  gridTitle: "The collection",
  gridIntro: "Individual works from the series — open prints and limited editions as they become available.",
  statement: {
    title: "What the collection is doing",
    paragraphs: [
      "Where benches fix a horizontal pause in the city, Lightworms fix vertical light in water — larvae, reflection, and surface tension as a second vocabulary within the same minting period. Environmental submissions such as #photez4earth in 2023 extend the pond thread into community seasons.",
    ],
  },
  process: {
    title: "Field notes",
    paragraphs: [
      "The Lightworms collection emerged during a period of quiet daily walks with camera in hand. I became fascinated by how artificial and natural light interact on surfaces at certain times of day — creating these glowing, worm-like trails and forms. Many of the shots that didn't make the final objkt cut still hold their own resonance and are now finding new life as prints.",
      "Raw photographic observation here connects to plotter translation and philosophical reflection on light as a living system — one thread in a rhizomatic practice.",
    ],
  },
  printTiers: [
    {
      id: "open",
      label: "Open print",
      href: productPath("photography", "limited-prints"),
      kind: "shop",
    },
    {
      id: "limited",
      label: "Limited signed",
      href: productPath("photography", "limited-prints"),
      kind: "shop",
    },
  ],
  crossLinks: [
    {
      href: seriesPath("photography", "brighton-by-bench"),
      label: "Brighton by Bench",
      summary: "100-token bench collection — flagship sibling series",
    },
    {
      href: categoryPath("plotter"),
      label: "Plotter Works",
      summary: "Photographic sources plotted into physical editions",
    },
    {
      href: categoryPath("reflections"),
      label: "Reflections & Writing",
      summary: "Essays on observation, value, and light as living system",
    },
    {
      href: capturedPath("photography", "lightworms-01"),
      label: "Lightworms study I",
      summary: "Featured piece from the collection",
    },
  ],
};
