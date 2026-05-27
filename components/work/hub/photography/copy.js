import {
  categoryPath,
  journalPath,
  productPath,
  seriesPath,
} from "@/lib/work-paths";

export const P = "/work/photography";
export const JOURNEY_ANCHOR = "#photography-practice-history";
export const CAPTURED_ANCHOR = "#captured";
export const HIGHLIGHTS_ANCHOR = "#highlights";
export const CURATED_ANCHOR = "#curated";
export const ARCHIVE_ANCHOR = "#archive";
export const PRINTS_ANCHOR = "#prints";

export const PAGE_TITLE = "Photography";
export const PAGE_DESCRIPTION =
  "Lens-based observation — captured works, on-chain editions, field notes, and limited prints. Photography as the first thread in a practice that moves from seeing through code into living systems.";

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [{ url: `${P}/hero.jpg` }],
  },
};

export const subnavItems = [
  { id: "captured", title: "Series & themes" },
  { id: "curated", title: "Curated photographs" },
  { id: "archive", title: "On-chain archive" },
  { id: "prints", title: "Available Prints" },
  { id: "published", title: "Writing & editions" },
  { id: "field-notes", title: "Field Notes" },
];

export const hero = {
  image: `${P}/hero.jpg`,
  imageAlt:
    "Urban bench and street scene — atmospheric photography from the long-form archive practice",
  headline: "Photography",
  tagline: "Observations through the lens",
  lede: "Captured works, on-chain editions, and prints from nearly two decades of seeing, pausing, and archiving.",
  primaryCta: "Explore Works",
  primaryHref: `${P}/captured`,
  secondaryCta: "Shop Prints",
  secondaryHref: `${P}/prints`,
};

export const intro = {
  eyebrow: null,
  title: "Lens, code, and systems",
  lede: "Photography is the first language of this practice — from the Canon 400D in India (2016), through on-chain editions, to plotter output and physical prints today. The hub below leads with completed series and featured works.",
  moreHref: `${P}/captured`,
  moreLabel: "View full catalogue",
};

export const capturedSection = {
  intro:
    "Completed series and thematic bodies of work — flagship collections first, then curated picks from those series.",
};

export const archiveSection = {
  title: "On-chain archive",
  intro:
    "Individual mints grouped by platform and thematic series — Tezos objkt, Hic Et Nunc, Versum, Photez seasons, and more. These works have catalogue pages even when their series is not yet featured above.",
};

export const printsSection = {
  title: "Prints",
  intro:
    "Signed physical prints are available for selected works. Sizes, paper, and editions vary by series — browse what’s currently available, or request a specific image from the archive.",
  requestLabel: "Request a print",
  shopCta: "Browse all print products",
};

export const printsFeaturedExtra = [
  {
    slug: "limited-prints-product",
    title: "Limited edition prints",
    image: `${P}/shop-limited-prints.jpg`,
    summary: "Signed physical prints from key works — Brighton by Bench, archive selects, and atmospheric editions.",
    href: productPath("photography", "limited-prints"),
    sizes: "A4, A3, 50×70cm",
    priceRange: "TBC",
  },
];

export const crossLinks = [
  {
    href: categoryPath("plotter"),
    label: "Plotter Works",
    summary: "Code, cord, and ink — photographic sources plotted into physical editions",
  },
  {
    href: categoryPath("reflections"),
    label: "Reflections & Writing",
    summary: "Essays on value, observation, and design theory linked to this thread",
  },
  {
    href: seriesPath("photography", "brighton-by-bench"),
    label: "Brighton by Bench",
    summary: "100-token bench collection — flagship captured and minted work",
  },
  {
    href: seriesPath("photography", "lightworms"),
    label: "Lightworms",
    summary:
      "Luminous fragments of southern light. A 2022 collection exploring abstraction through intimate observation.",
  },
  {
    href: seriesPath("photography", "india-2016"),
    label: "India 2016 archive",
    summary: "First Canon 400D journey — Agra and travel at the DSLR turning point",
  },
];

export const footerCtas = {
  title: "Continue",
  summary: "Return to the Explorer, explore captured works, or browse prints.",
  buttons: [
    { href: "/work", label: "Back to Explorer", variant: "ghost" },
    {
      href: `${P}/captured`,
      label: "Explore Works",
      variant: "primary",
    },
    {
      href: `${P}/prints`,
      label: "Shop Prints",
      variant: "ghost",
    },
  ],
};

export const practiceHistory = {
  summary:
    "2014–2026 — family heritage, archive growth, on-chain minting, Photez community, and cross-practice links. Expand for the full timeline and context.",
};

export const conceptCards = [
  {
    id: "heritage",
    title: "Family heritage",
    summary:
      "Point-and-shoot childhood through printmaking influence — the archive as inheritance and habit, not a late hobby.",
  },
  {
    id: "archive",
    title: "Archive & pause",
    summary:
      "Nearly 100,000 images across three Canon bodies — intentional shooting, mundane elevation, benches as pause points.",
  },
  {
    id: "onchain",
    title: "xanderhizome",
    summary:
      "236 tokens on Tezos/objkt since 2021 — physical practice meets on-chain provenance under a rhizomatic handle.",
  },
  {
    id: "benches",
    title: "Benches as motif",
    summary:
      "Brighton by Bench (100 tokens) and Lightworms (50) — sitting, light, and street furniture as philosophical form.",
  },
];

export const timelineSection = {
  title: "Practice timeline",
  intro:
    "2014–2026 — from point-and-shoot habit through the Canon 400D in India, on-chain minting from 2021, major collections, and current archive stewardship.",
};

export const timeline = [
  {
    id: "2014-2015",
    date: "2014–2015",
    title: "Pre-DSLR era",
    summary:
      "Early: continued point-and-shoot as a long-standing habit. Late: building a personal archive of everyday and travel subjects.",
    image: `${P}/timeline-2014-2015.jpg`,
    imageAlt: "Early archive photograph — point-and-shoot era before the Canon 400D",
    timelineHref: "#photography-year-2014-2015",
  },
  {
    id: "2016",
    date: "2016",
    title: "DSLR turning point",
    summary:
      "Borrowed mother's Canon 400D for India (Agra / Taj Mahal) — first serious DSLR experience.",
    image: `${P}/timeline-2016.jpg`,
    imageAlt: "India 2016 — architecture and travel from the first Canon 400D trip",
    timelineHref: "#photography-year-2016",
    projectHref: seriesPath("photography", "india-2016"),
  },
  {
    id: "2017",
    date: "2017",
    title: "Brighton urban series",
    summary:
      "Continued on the first 400D body. Street details, mundane elevated, early benches interest.",
    image: `${P}/timeline-2017.jpg`,
    imageAlt: "Brighton urban street detail — signage and street furniture, 2017",
    timelineHref: "#photography-year-2017",
  },
  {
    id: "2018",
    date: "2018",
    title: "Archive building",
    summary:
      "Steady archive growth and ongoing street and local shooting in southern England.",
    image: `${P}/timeline-2018.jpg`,
    imageAlt: "Southern England street photography — transitional composition studies, 2018",
    timelineHref: "#photography-year-2018",
  },
  {
    id: "2019",
    date: "2019",
    title: "Style deepening",
    summary:
      "Continued 400D use; benches and views emerging amid university projects.",
    image: `${P}/timeline-2019.jpg`,
    imageAlt: "Pre-university photography — benches and views emerging, 2019",
    timelineHref: "#photography-year-2019",
  },
  {
    id: "2020",
    date: "2020",
    title: "Pandemic archive",
    summary:
      "Pandemic-era local shooting — introspection, restricted geographies, nature close-ups.",
    image: `${P}/timeline-2020.jpg`,
    imageAlt: "Lockdown-era local documentation — reflective close-range work, 2020",
    timelineHref: "#photography-year-2020",
  },
  {
    id: "2021",
    date: "2021",
    title: "On-chain begins",
    summary:
      "April 29: first on-chain mint. Active Tezos exploration — physical practice meets provenance.",
    image: `${P}/timeline-2021.jpg`,
    imageAlt: "2021 — transition from physical archive to on-chain minting practice",
    timelineHref: "#photography-year-2021",
    projectHref: `${categoryPath("photography")}#published`,
  },
  {
    id: "2022",
    date: "2022",
    title: "Peak on-chain & Photez",
    summary:
      "Brighton by Bench (100 tokens) and Lightworms (50) launched — benches as philosophical motif.",
    image: `${P}/timeline-2022.jpg`,
    imageAlt: "2022 — Brighton by Bench and Lightworms collections on Tezos",
    timelineHref: "#photography-year-2022",
    projectHref: seriesPath("photography", "brighton-by-bench"),
  },
  {
    id: "2023",
    date: "2023",
    title: "Photez & archive dives",
    summary:
      "Bristol robin and pond shots (#photez4earth). Archive reflection 2016–2022.",
    image: `${P}/timeline-2023.jpg`,
    imageAlt: "Environmental and Bristol series photography — Photez submissions, 2023",
    timelineHref: "#photography-year-2023",
  },
  {
    id: "2024",
    date: "2024",
    title: "Consolidation",
    summary:
      "Reduced minting — focus on archive editing and integration with Plotter and other studio threads.",
    image: `${P}/timeline-2024.jpg`,
    imageAlt: "2024 — archive editing and cross-practice consolidation year",
    timelineHref: "#photography-year-2024",
    projectHref: journalPath("photography", "archive-editing-2025"),
  },
  {
    id: "2025",
    date: "2025",
    title: "Archive stewardship",
    summary:
      "Phone experiments, Bristol trip edits, benches revisits. Collecting 1100+ on xander.tez.",
    image: `${P}/timeline-2025.jpg`,
    imageAlt: "Atmospheric contemporary photograph — archive editing and selective minting, 2025",
    timelineHref: "#photography-year-2025",
  },
  {
    id: "2026",
    date: "2026",
    title: "Current practice",
    summary:
      "Selective shooting, editing, archive curation. Rhizomatic growth across categories.",
    image: `${P}/timeline-2026.jpg`,
    imageAlt: "Recent photography — ongoing observation and archive curation, 2026",
    timelineHref: "#photography-year-2026",
  },
];

export const photez = {
  title: "Photez & community leadership",
  lead: "Co-founding and driving collective seasons — benches, earth, and magazine experiments on Tezos.",
  paragraphs: [
    "2022 established the pattern: Sea Cadets mint, formation of Photez, launch of Brighton by Bench and Lightworms, and late-year thematic seasons plus magazine test experiments.",
    "2023 continued with Bristol robin and pond shots under #photez4earth, archive dives across 2016–2022 work, and The Weight of It All in a Photez thematic collection.",
    "Collecting remains part of the practice — 1100+ tokens on the main wallet (xander.tez) — stewardship of others' agreements about instance and scarcity as much as issuing one's own.",
  ],
  links: [
    {
      href: seriesPath("photography", "brighton-by-bench"),
      label: "Brighton by Bench series",
      summary: "100-token flagship bench collection",
    },
    {
      href: `${categoryPath("photography")}#published`,
      label: "Published (NFTs)",
      summary: "On-chain editions, essays, and digital collectibles",
    },
  ],
};
