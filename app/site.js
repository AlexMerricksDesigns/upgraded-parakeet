// Site-wide copy and settings — used by layout, home, about, contact.

export const siteConfig = {
  name: "Dérivé Studio / Xander Merricks",
  shortName: "Dérivé Studio",
  heroEyebrow: "portfolio / store / studio notes",
  tagline:
    "Derivations from the observed world. Editions for collectors who value process as much as outcome.",
  description:
    "Portfolio, store, and studio notes for design-led products. A home for bringing together design experiments, products, writing, and side-business ideas into one public website.",
  email: "x@xanderhizome.com",
  navigation: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/work", label: "Work" },
    { href: "/shop", label: "Shop" },
    { href: "/journal", label: "Journal" },
    { href: "/contact", label: "Contact" },
  ],
};

export const heroImages = [
  "/assets/hero/_MG_0444.webp",
  "/assets/hero/_MG_2096.webp",
  "/assets/hero/_MG_3265.webp",
  "/assets/hero/_MG_3586.webp",
];

/** Parent-page hero copy and optimized image paths (WebP). */
export const pageHero = {
  work: {
    eyebrow: "Work",
    title: "Dérivé Studio",
    description:
      "Work by Alexander S. Merricks — in timeline or filter by category.",
    image: "/assets/hero/portfolio-hero.webp",
  },
  about: {
    eyebrow: "About",
    title: "A studio home for work with a point of view",
    description:
      "Photography, design, and lens-based practice at the intersection of observation, systems, and experimentation.",
    image: "/assets/hero/about-hero.webp",
  },
  shop: {
    eyebrow: "Shop",
    title: "A first shelf for products, editions, and experiments.",
    description:
      "Each item starts as a prototype and graduates when it is ready to sell.",
    image: "/assets/hero/shop-hero.webp",
    mediaType: "image",
  },
  journal: {
    eyebrow: "Journal",
    title: "Updates, making notes, and the public process.",
    description:
      "Essays and research notes: crypto-art, value, design theory, and studio thinking.",
    image: "/assets/hero/journal-hero.webp",
  },
  contact: {
    eyebrow: "Contact",
    title: "Start a conversation.",
    description:
      "Commissions, collaborations, product questions, or wholesale conversations.",
    image: "/assets/hero/contact-hero.webp",
  },
};

export const aboutContent = {
  story:
    "I am a photographer, designer, and lens-based artist based in southern England. My practice sits at the intersection of observation, systems, and experimentation — translating lived encounters, urban rhythms, and philosophical curiosities into photographic works, digital editions, installations, and creative tools.",
  principles: [
    "Creative technology and AI-augmented workflows",
    "Material & digital hybrids (prints that feel like objects)",
    "Philosophical approaches to image-making",
    "Building slower, more intentional systems for independent creative work",
  ],
};
