export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: string;
  tags: string[];
};

export type Product = {
  slug: string;
  title: string;
  summary: string;
  name: string;
  description: string;
  format: string;
  price: string;
  status: "available soon" | "idea" | "prototype";
};

export type Post = {
  title: string;
  date: string;
  summary: string;
  excerpt: string;
};

export const siteConfig = {
  name: "Alex Merricks Designs",
  shortName: "AMD",
  tagline: "Portfolio, store, and studio notes for design-led products.",
  description:
    "A home for bringing together design experiments, products, writing, and side-business ideas into one public website.",
  email: "hello@example.com",
  navigation: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/work", label: "Work" },
    { href: "/shop", label: "Shop" },
    { href: "/journal", label: "Journal" },
    { href: "/contact", label: "Contact" },
  ],
};

export const site = siteConfig;

export const siteContent = {
  about: {
    story:
      "Alex Merricks Designs is being shaped as a public home for design work, product ideas, experiments, and practical notes. This first version is deliberately editable so the strongest threads from previous attempts can be gathered, tested, and turned into offers.",
    principles: [
      "Make the work visible before every detail is perfect.",
      "Use the website as a place to clarify what is worth producing.",
      "Turn experiments into products, stories, and repeatable offers.",
    ],
  },
  contact: {
    email: siteConfig.email,
  },
};

export const projects: Project[] = [
  {
    slug: "archive-project-placeholder",
    title: "Archive project placeholder",
    summary:
      "A space to gather previous experiments, design explorations, sketches, prototypes, or client work.",
    year: "2026",
    tags: ["Portfolio", "Archive", "Design"],
  },
  {
    slug: "product-concept-placeholder",
    title: "Product concept placeholder",
    summary:
      "A future case study for turning one recurring idea into a product that can be promoted and sold.",
    year: "2026",
    tags: ["Product", "Concept", "Development"],
  },
  {
    slug: "visual-system-placeholder",
    title: "Visual system placeholder",
    summary:
      "A place to document the emerging visual direction, brand language, and reusable creative rules.",
    year: "2026",
    tags: ["Brand", "Identity", "System"],
  },
];

export const products: Product[] = [
  {
    slug: "first-product-placeholder",
    title: "First product placeholder",
    summary:
      "Use this slot for the first product, print, digital download, service, or small-batch offer.",
    name: "First product placeholder",
    description:
      "Use this slot for the first product, print, digital download, service, or small-batch offer.",
    format: "Product",
    price: "TBC",
    status: "prototype",
  },
  {
    slug: "digital-product-placeholder",
    title: "Digital product placeholder",
    summary:
      "A potential template, guide, design asset, downloadable pack, or repeatable offer.",
    name: "Digital product placeholder",
    description:
      "A potential template, guide, design asset, downloadable pack, or repeatable offer.",
    format: "Digital",
    price: "TBC",
    status: "idea",
  },
  {
    slug: "limited-run-placeholder",
    title: "Limited run placeholder",
    summary:
      "A future shop item for physical goods, prints, merch, or seasonal experiments.",
    name: "Limited run placeholder",
    description:
      "A future shop item for physical goods, prints, merch, or seasonal experiments.",
    format: "Limited run",
    price: "TBC",
    status: "available soon",
  },
];

export const posts: Post[] = [
  {
    title: "Starting the studio website",
    date: "2026-04-29",
    summary:
      "A first note about bringing past experiments into one focused portfolio and store.",
    excerpt:
      "A first note about bringing past experiments into one focused portfolio and store.",
  },
  {
    title: "Choosing the first offer",
    date: "2026-04-29",
    summary:
      "A placeholder for narrowing the initial product or service into something promotable.",
    excerpt:
      "A placeholder for narrowing the initial product or service into something promotable.",
  },
  {
    title: "Weekend content gathering",
    date: "2026-04-29",
    summary:
      "A checklist-style post for collecting images, sketches, copy, and product ideas.",
    excerpt:
      "A checklist-style post for collecting images, sketches, copy, and product ideas.",
  },
];

export const journalEntries = posts;
