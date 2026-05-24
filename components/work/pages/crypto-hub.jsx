/**
 * /work/crypto — entire category homepage in this file.
 *
 * HOW TO EDIT
 * ───────────
 * 1. Search "COPY:" — hero, concepts, essay, Creating/Collected tiles, CTAs, links.
 * 2. Search "LAYOUT:" — section order and markup only.
 * 3. Featured token tiles from content/crypto/*.json — see lib/crypto-portfolio.js
 * 4. Journal / Products lists come from app/work/manifest.json (thread sections).
 *
 * On-chain probe scripts: npm run probe:objkt | probe:fxhash | probe:base
 */

import Image from "next/image";

import { CardLinkKind } from "@/components/card-link-kind";
import { PageSection } from "@/components/page-section";
import { SiteLink } from "@/components/site-link";
import { CategoryPage } from "@/app/work/category-page";
import { categoryThreadSections, getWorkCategory } from "@/app/work/categories";
import {
  categoryPath,
  journalPath,
  productPath,
  projectPath,
} from "@/lib/work-paths";
import {
  getChainIdentities,
  getCollectTezos,
  getMintTezos,
  getCollectedSeriesItems,
  getMintedSeriesItems,
  profileUrl,
} from "@/lib/crypto-portfolio";

const categoryRoute = "/work/crypto";

// ─────────────────────────────────────────────────────────────────────────────
// COPY: SEO / METADATA
// ─────────────────────────────────────────────────────────────────────────────

const PAGE_TITLE = "Crypto / NFT";
const PAGE_DESCRIPTION =
  "Collecting and creating on-chain — spectrum of representation, provenance, and practice from 2021 onward.";

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [{ url: "/work/photography/crypto/banner.jpg" }],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// COPY: HERO
// ─────────────────────────────────────────────────────────────────────────────

const page = {
  title: "Crypto / NFT",
  subtitle:
    "Collecting and creating within the spectrum of representational ownership — from physical original to tokenised instance.",
  heroImage: "/work/photography/crypto/banner.jpg",
  meta: "Original essay · March 2021 · Edited and republished 2026",
};

// ─────────────────────────────────────────────────────────────────────────────
// COPY: CONCEPT CARDS
// ─────────────────────────────────────────────────────────────────────────────

const conceptCards = [
  {
    id: "spectrum",
    title: "The Spectrum of Representation",
    summary:
      "From 1/1 physical original through print editions and digital exports to a tokenised digital instance — instances along one continuum, not separate categories.",
  },
  {
    id: "provenance",
    title: "Provenance as Value",
    summary:
      "The NFT/JPEG distinction is metadata and social agreement, not content — analogous to signed versus unsigned photographic editions.",
  },
  {
    id: "paradigm",
    title: "Paradigm Shift",
    summary:
      "Christie's staking institutional reputation on tokenised provenance (Beeple, March 2021) as inflection point — axioms of authenticity and scarcity in motion.",
  },
  {
    id: "collecting",
    title: "Collecting vs Owning",
    summary:
      "Under Orchard and deliberate edition practice — holding provenance carefully when social agreements are fragile, not abandoning the form.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COPY: RELATED LINKS (strip under essay)
// ─────────────────────────────────────────────────────────────────────────────

const relatedOnSite = [
  {
    href: journalPath("crypto", "crypto-art-value-paradigm"),
    label: "2021 essay",
    summary: "Full published version with notes",
  },
  {
    href: journalPath("crypto", "the-problem-of-value"),
    label: "The Problem of Value",
    summary: "Relational pricing and crypto",
  },
  {
    href: productPath("crypto", "digital-editions"),
    label: "Digital editions",
    summary: "Shop shelf — commerce wiring later",
  },
  {
    href: categoryPath("plotter"),
    label: "Plotter / Polargraph",
    summary: "Physical editions from the same studio",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COPY: ESSAY (preface + 2021 piece sections)
// ─────────────────────────────────────────────────────────────────────────────

const essay = {
  preface: {
    title: "2026 framing",
    lead: "Republished with a short note on what held up after the market moved on.",
    paragraphs: [
      "I wrote the piece below in March 2021, days before the Beeple auction closed. It never made it out of a website development environment — one of several half-built sites from when the thinking outran the infrastructure. The paradigm-shift framing survived. The market did not, which is beside the point.",
      "What clarified since is that the interesting question was never NFTs as technology or instrument. It was always the edition — what it means to fix an instance and attach provenance, and what that encodes that posting a JPEG does not. Photography has lived inside that question since the negative.",
      "Copy minting on Tezos from around 2022 sharpened a more deliberate curatorial stance: hold social agreements carefully, not abandon them. That is the logic behind Under Orchard and my own minting practice. The 2021 argument is the foundation; the sections below are what was built on it.",
    ],
  },
  essayTitle: "Cryptoart, Value, and a Cultural Paradigm Shift",
  essayDate: "March 2021, Edited and republished 2026",
  sections: [
    {
      id: "trust",
      title: "Trust, reputation, and legible provenance",
      paragraphs: [
        "The art world is built on trust and runs on reputation. Galleries have traditionally managed both — communicating confidence, brokering introductions, maintaining the fiction that value is inherent rather than socially constructed. What NFTs do, at their most structurally interesting, is make that fiction visible. The provenance record has always been doing the work. The blockchain just makes it legible.",
      ],
    },
    {
      id: "spectrum",
      title: "The photographic spectrum of instances",
      paragraphs: [
        "I am primarily a photographer. The process produces objects at every stage: the RAW file, the edited export, the print, the scan of the negative, the negative itself. The question of which of these is the photograph has no clean answer — only conventions that different contexts weight differently.",
        "A signed, numbered edition print commands a premium not because the paper or ink differs materially from an unsigned print of the same image, but because the provenance record encodes a specific set of social agreements about authenticity and scarcity. This is not a property of the object. It is a property of the network of trust surrounding it.",
        "NFTs do not change this structure. They complete it. From the 1/1 physical original through numbered print editions, digital exports, to a 1/1 tokenised digital representation — these are instances along a spectrum, each encoding a different set of agreements about what is being fixed and for whom.",
      ],
      pullQuote:
        "The better comparison is not painting versus photograph but unsigned print versus signed edition.",
    },
    {
      id: "assemblage",
      title: "Connected works, distributed value",
      paragraphs: [
        "Trevor Jones, whose practice straddles physical and digital — minting NFT animations from the same works sold as physical paintings — framed it well: the painting, the digital image, and the animation are connected but independent works. Together they blur the line between material and digital art worlds.",
        "I would put it more bluntly: the line was always permeable, and value was always distributed across the assemblage rather than residing in any single instance.",
      ],
    },
    {
      id: "inflection",
      title: "Inflection, not endpoint",
      paragraphs: [
        "The Christie's auction of Beeple's Everydays in March 2021 — running at $9.75m with under twenty-four hours remaining as I first wrote this — was a paradigm-shift moment. Not because it legitimised digital art, which did not need Christie's, but because a major institutional actor staked its reputational infrastructure on the social agreements underlying tokenised provenance.",
        "Thomas Kuhn's framework generalises: practices organised around axioms can undergo structural revolution when those axioms shift rather than accumulate. Christie's putting its name on a JPEG is not an endpoint. It is an inflection point, and inflection points compound.",
        "Where this leads is not yet fully legible. But the structure is clear enough: the spectrum of the instance is now complete, the provenance record has a new register, and the question of what it means to own, collect, and make within that register is open. That question is what the work in the Created and Collected sections below attempts to answer in practice.",
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// COPY: FOOTER CTAs
// ─────────────────────────────────────────────────────────────────────────────

const ctas = [
  { href: "/work", label: "Back to Explorer", variant: "ghost" },
  {
    href: productPath("crypto", "digital-editions"),
    label: "Digital editions (shop)",
    variant: "primary",
  },
  {
    href: journalPath("crypto", "crypto-art-value-paradigm"),
    label: "Original 2021 essay",
    variant: "ghost",
  },
];

const ctaSummary =
  "Return to the Explorer, open the digital-editions shop shelf, or read the journal version of the 2021 piece.";

// ─────────────────────────────────────────────────────────────────────────────
// COPY: CREATING / COLLECTED (project sections — tiles)
// Wallet addresses: content/crypto/identities.json
// Extra tiles: content/crypto/minted/*.json & collected/*.json
// ─────────────────────────────────────────────────────────────────────────────

function buildProjectSections() {
  const mint = getMintTezos();
  const mintObjkt = profileUrl("objkt", mint);
  const mintTeia = profileUrl("teia", mint);
  const collect = getCollectTezos();
  const collectObjkt = profileUrl("objkt", collect);
  const collectTeia = profileUrl("teia", collect);
  const collectFxhash = profileUrl("fxhashTezos", collect);
  const identities = getChainIdentities();
  const mintedFromSeries = getMintedSeriesItems();
  const collectedFromSeries = getCollectedSeriesItems();

  const mintProfileSummary = mint
    ? "Full minting history on Objkt and Teia — add series tiles below as you curate."
    : "Resolve mint wallet: npm run probe:objkt -- --resolve-mint (see content/crypto/README.md).";

  return [
    {
      id: "creating",
      title: "Creating",
      intro:
        "Works minted and published on-chain from my own photographic practice — from first Ethereum experiments through Tezos editions and ongoing instance decisions. Tiles are added manually; use content/crypto/ and probe scripts when researching contracts.",
      groups: [
        {
          id: "genesis",
          title: "Genesis & early mints",
          items: [
            {
              slug: "bae-genesis",
              title: "Genesis BAE piece",
              year: "2021",
              summary:
                "First on-chain photographic work via BlockchainArtExchange — introduction to tokenised provenance.",
              href: "https://www.mybae.io/artwork/893",
              external: true,
              image: "/work/photography/crypto/banner.jpg",
              platform: "Ethereum · BAE",
            },
          ],
        },
        {
          id: "tezos",
          title: "Tezos · xanderhizome",
          items: [
            ...(mintObjkt
              ? [
                  {
                    slug: "objkt-profile-mint",
                    title: "Objkt profile",
                    year: "2021–",
                    summary: mintProfileSummary,
                    href: mintObjkt,
                    external: true,
                    image: "/work/photography/crypto/hicetnunc.png",
                    platform: "Tezos · objkt",
                  },
                ]
              : []),
            ...(mintTeia
              ? [
                  {
                    slug: "teia-profile-mint",
                    title: "Teia profile",
                    year: "2021–",
                    summary: "HEN-era and later Tezos mints (Teia).",
                    href: mintTeia,
                    external: true,
                    image: "/work/photography/crypto/hicetnunc.png",
                    platform: "Tezos · Teia",
                  },
                ]
              : [
                  {
                    slug: "tezos-mint-profiles",
                    title: "Tezos mint profiles",
                    year: "2021–",
                    summary: mintProfileSummary,
                    href: journalPath("crypto", "crypto-art-research"),
                    external: false,
                    image: "/work/photography/crypto/hicetnunc.png",
                    platform: "Setup",
                  },
                ]),
            {
              slug: "brighton-by-bench",
              title: "Brighton by Bench",
              year: "2022",
              summary:
                "100 Tezos tokens — benches as pause and permission; project page and objkt collection.",
              href: projectPath("photography", "brighton-by-bench"),
              external: false,
              image: "/work/photography/series-brighton-by-bench.jpg",
              platform: "Photography",
            },
            ...mintedFromSeries,
          ],
        },
        {
          id: "ongoing",
          title: "Editions & off-chain instances",
          items: [
            {
              slug: "portfolio",
              title: "Photographic portfolio",
              year: "Ongoing",
              summary:
                "Broader lens-based work — prints, exports, and editions that may or may not be tokenised.",
              href: "https://xandermerricks.myportfolio.com/",
              external: true,
              image: "/work/photography/crypto/banner.jpg",
              platform: "Web",
            },
            {
              slug: "plotted-heads",
              title: "Plotted heads → postcards",
              year: "2021",
              summary: "Plotter portraits on-site; physical editions in the shop.",
              href: projectPath("plotter", "plotted-heads"),
              external: false,
              image: "/work/plotter/projects/plotted-heads/plotter-drawings001.jpg",
              platform: "Project",
            },
          ],
        },
      ],
    },
    {
      id: "collecting",
      title: "Collected",
      intro:
        "Under Orchard (tz1Nfdm…) is the collecting identity — lens-based, generative, and format experiments. Featured tiles are curated here; the full holdings archive stays on marketplace profiles until shop wiring is live.",
      groups: [
        {
          id: "under-orchard",
          title: "Under Orchard",
          items: [
            {
              slug: "under-orchard-hub",
              title: "Under Orchard",
              year: "2022–",
              summary:
                "Curated collecting identity — featured works on this site; shop shelf for digital editions (commerce later).",
              href: productPath("crypto", "digital-editions"),
              external: false,
              image: "/work/photography/crypto/hicetnunc.png",
              platform: "Collecting",
            },
            ...(collectObjkt
              ? [
                  {
                    slug: "objkt-profile-collect",
                    title: "Objkt collection",
                    year: "2022–",
                    summary:
                      "Full holdings on Objkt (~2k tokens) — browse on platform; add highlights to content/crypto/collected/.",
                    href: collectObjkt,
                    external: true,
                    image: "/work/photography/crypto/banner.jpg",
                    platform: "Tezos · objkt",
                  },
                ]
              : []),
            ...(collectTeia
              ? [
                  {
                    slug: "teia-profile-collect",
                    title: "Teia collection",
                    year: "2022–",
                    summary: "Acquisitions visible on Teia.",
                    href: collectTeia,
                    external: true,
                    image: "/work/photography/crypto/banner.jpg",
                    platform: "Tezos · Teia",
                  },
                ]
              : []),
            {
              slug: "photography-collected",
              title: "Photography (featured)",
              year: "Curated",
              summary:
                "Selected lens-based acquisitions — append tiles in content/crypto/collected/under-orchard-featured.json.",
              href: journalPath("crypto", "crypto-art-research"),
              external: false,
              image: "/work/photography/crypto/banner.jpg",
              platform: "Notes",
            },
            ...collectedFromSeries,
          ],
        },
        {
          id: "generative",
          title: "Code-based & generative",
          items: [
            ...(collectFxhash
              ? [
                  {
                    slug: "fxhash-profile-collect",
                    title: "fxhash collection",
                    year: "2022–",
                    summary:
                      "Generative pieces held on fxhash — add featured gentks via probe-fxhash and collected JSON.",
                    href: collectFxhash,
                    external: true,
                    image: "/work/photography/crypto/banner.jpg",
                    platform: "fxhash",
                  },
                ]
              : []),
            {
              slug: "base-wallet",
              title: "Base",
              year: "2024–",
              summary: `EVM wallet ${identities.base?.evm?.slice(0, 10)}… — use probe-base locally; shop integration later.`,
              href: null,
              external: false,
              image: null,
              platform: "Base · manual",
            },
          ],
        },
      ],
    },
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT: PAGE
// ─────────────────────────────────────────────────────────────────────────────

export function CryptoHubPage() {
  const category = getWorkCategory("crypto");
  const thread = categoryThreadSections(category);
  const projectSections = [
    ...thread.filter((s) => s.id === "journal" || s.id === "products"),
    ...buildProjectSections(),
  ];

  return (
    <CategoryPage
      config={{
        categoryTitle: PAGE_TITLE,
        categoryRoute,
        page,
        conceptCards,
        relatedOnSite,
        essay,
        projectSections,
        ctas,
        ctaSummary,
      }}
    />
  );
}
