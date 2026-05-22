/**
 * /work/photography — entire category homepage in this file.
 *
 * HOW TO EDIT
 * ───────────
 * 1. Search "COPY:" — all site text, images paths, timeline, series, shop, links.
 * 2. Search "LAYOUT:" — only change if you are moving sections or markup.
 * 3. Project / journal / product lists at the bottom come from the work registry
 *    (app/work/manifest.json + categories) — not duplicated here.
 *
 * Media files live in: public/work/photography/
 */

import Image from "next/image";
import Link from "next/link";

import { CardLinkKind } from "@/components/card-link-kind";
import { LinkAffordance } from "@/components/link-affordance";
import { PageSection } from "@/components/page-section";
import { SiteLink, siteLinkCardClass } from "@/components/site-link";
import {
  CategoryBreadcrumb,
  ThreadSection,
} from "@/app/work/category-page";
import { categoryThreadSections, getWorkCategory } from "@/app/work/categories";
import {
  categoryPath,
  journalPath,
  productPath,
  projectPath,
} from "@/lib/work-paths";
import { getLinkAriaLabel, resolveLinkKind } from "@/lib/link-kind";

const LINK_CONTEXT = "content";
const P = "/work/photography";
const category = getWorkCategory("photography");
const categoryRoute = categoryPath("photography");

// ─────────────────────────────────────────────────────────────────────────────
// COPY: ANCHORS (in-page jump links)
// ─────────────────────────────────────────────────────────────────────────────

const JOURNEY_ANCHOR = "#photography-journey";
const SHOP_ANCHOR = "#photography-shop";

// ─────────────────────────────────────────────────────────────────────────────
// COPY: SEO / METADATA
// ─────────────────────────────────────────────────────────────────────────────

const PAGE_TITLE = "Photography & On-Chain Works";
const PAGE_DESCRIPTION =
  "Rooted in family photography and printmaking heritage — nearly 100,000 images since the Canon 400D in India, 236 Tezos tokens as xanderhizome, and a continuous thread of seeing, pausing, archiving, and tokenizing.";

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [{ url: `${P}/hero.jpg` }],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// COPY: HERO
// ─────────────────────────────────────────────────────────────────────────────

const hero = {
  image: `${P}/hero.jpg`,
  imageAlt:
    "Urban bench and street scene — atmospheric photography from the long-form archive practice",
  headline: "Photography & On-Chain Works",
  tagline: PAGE_DESCRIPTION,
  primaryCta: "Explore the Timeline",
  secondaryCta: "Browse Prints & Editions",
};

// ─────────────────────────────────────────────────────────────────────────────
// COPY: CONCEPT CARDS (horizontal scroll under hero)
// ─────────────────────────────────────────────────────────────────────────────

const conceptCards = [
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

// ─────────────────────────────────────────────────────────────────────────────
// COPY: PRACTICE OVERVIEW (prose block)
// ─────────────────────────────────────────────────────────────────────────────

const intro = {
  eyebrow: "Thread overview",
  title: "Seeing, pausing, archiving, tokenizing",
  lead: "Family heritage, nearly 100,000 images, 236 Tezos tokens as xanderhizome.",
  paragraphs: [
    "Rooted in a family photography and printmaking heritage, my practice spans point-and-shoot childhood through to nearly 100,000 images captured since first using the Canon 400D in India in 2016 — now on my third body. What began as casual observation became intentional: borrowing my mother's camera for Agra and the Taj Mahal region, then carrying the learning curve home into Brighton streets, lockdown-local documentation, and an archive that grew faster than any single exhibition could hold.",
    "In April 2021 the work moved on-chain — first mint on hic et nunc, then Tezos and objkt as the primary home. Under xanderhizome (xander's rhizome), I have created 236 tokens, including major collections Brighton by Bench (100 tokens, grown from the university project An Assemblage; for sitting) and Lightworms (50 tokens). The handle names the practice: distributed growth, lateral connection, no single root — the same logic that links street benches, pond light, India travel, and late-night archive edits.",
    "Alongside minting I co-founded and drove Photez community initiatives — thematic seasons, magazine tests, environmental submissions such as #photez4earth, and works like Sea Cadets and The Weight of It All. 2022 was the peak on-chain and community year; 2024–2025 shifted toward consolidation, archive editing, and cross-practice links with Plotter, Nursery plant close-ups, and continued collecting (1100+ tokens on the main wallet xander.tez).",
    "This site thread is structured as both portfolio and gentle sales funnel. The timeline below traces 2014–2026 year by year; project pages hold collections in depth; the shop carries prints, postcards, zines, and limited editions as they ship. Browse the journey first — then take home an instance when an edition exists.",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// COPY: TIMELINE (year cards — image, date, title, summary, links)
// ─────────────────────────────────────────────────────────────────────────────

const timelineSection = {
  title: "Practice timeline",
  intro:
    "2014–2026 — from point-and-shoot habit through the Canon 400D in India, on-chain minting from 2021, major collections, and current archive stewardship. Each card links to a year anchor or project.",
};

const timeline = [
  {
    id: "2014-2015",
    date: "2014–2015",
    title: "Pre-DSLR era",
    summary:
      "Early: continued point-and-shoot as a long-standing habit. Late: building a personal archive of everyday and travel subjects — casual observation, family influence strong.",
    image: `${P}/timeline-2014-2015.jpg`,
    imageAlt: "Early archive photograph — point-and-shoot era before the Canon 400D",
    timelineHref: `${JOURNEY_ANCHOR}#photography-year-2014-2015`,
  },
  {
    id: "2016",
    date: "2016",
    title: "DSLR turning point",
    summary:
      "Borrowed mother's Canon 400D for India (Agra / Taj Mahal) — first serious DSLR experience. Large India archive; shift from casual to intentional photography.",
    image: `${P}/timeline-2016.jpg`,
    imageAlt: "India 2016 — architecture and travel from the first Canon 400D trip",
    timelineHref: `${JOURNEY_ANCHOR}#photography-year-2016`,
    projectHref: projectPath("photography", "india-2016"),
  },
  {
    id: "2017",
    date: "2017",
    title: "Brighton urban series",
    summary:
      "Continued on the first 400D body. Late: iconic Designated smoking area Brighton shot — street details, mundane elevated, early benches interest.",
    image: `${P}/timeline-2017.jpg`,
    imageAlt: "Brighton urban street detail — signage and street furniture, 2017",
    timelineHref: `${JOURNEY_ANCHOR}#photography-year-2017`,
  },
  {
    id: "2018",
    date: "2018",
    title: "Archive building",
    summary:
      "Steady archive growth and ongoing street and local shooting in southern England — developing eye for composition and pause points.",
    image: `${P}/timeline-2018.jpg`,
    imageAlt: "Southern England street photography — transitional composition studies, 2018",
    timelineHref: `${JOURNEY_ANCHOR}#photography-year-2018`,
  },
  {
    id: "2019",
    date: "2019",
    title: "Style deepening",
    summary:
      "Continued 400D use; benches and views emerging. Consistency amid university and other projects — pre-degree warm-up shots.",
    image: `${P}/timeline-2019.jpg`,
    imageAlt: "Pre-university photography — benches and views emerging, 2019",
    timelineHref: `${JOURNEY_ANCHOR}#photography-year-2019`,
  },
  {
    id: "2020",
    date: "2020",
    title: "Pandemic archive",
    summary:
      "Pandemic-era local shooting — introspection, restricted geographies, nature close-ups. Archive approaching significant volume.",
    image: `${P}/timeline-2020.jpg`,
    imageAlt: "Lockdown-era local documentation — reflective close-range work, 2020",
    timelineHref: `${JOURNEY_ANCHOR}#photography-year-2020`,
  },
  {
    id: "2021",
    date: "2021",
    title: "On-chain begins",
    summary:
      "Pre-Tezos archive organisation. April 29: first on-chain mint — He's Rising (hic et nunc). Active Tezos exploration — physical practice meets provenance.",
    image: `${P}/timeline-2021.jpg`,
    imageAlt: "2021 — transition from physical archive to on-chain minting practice",
    timelineHref: `${JOURNEY_ANCHOR}#photography-year-2021`,
    projectHref: categoryPath("crypto"),
  },
  {
    id: "2022",
    date: "2022",
    title: "Peak on-chain & Photez",
    summary:
      "Sea Cadets mint; Photez founding role. Brighton by Bench (100 tokens) and Lightworms (50) launched — benches as philosophical motif.",
    image: `${P}/timeline-2022.jpg`,
    imageAlt: "2022 — Brighton by Bench and Lightworms collections on Tezos",
    timelineHref: `${JOURNEY_ANCHOR}#photography-year-2022`,
    projectHref: projectPath("photography", "brighton-by-bench"),
  },
  {
    id: "2023",
    date: "2023",
    title: "Photez & archive dives",
    summary:
      "Bristol robin and pond shots (#photez4earth). Archive reflection 2016–2022. Late: The Weight of It All in Photez thematic collection.",
    image: `${P}/timeline-2023.jpg`,
    imageAlt: "Environmental and Bristol series photography — Photez submissions, 2023",
    timelineHref: `${JOURNEY_ANCHOR}#photography-year-2023`,
  },
  {
    id: "2024",
    date: "2024",
    title: "Consolidation",
    summary:
      "Reduced minting — focus on archive editing and integration with Plotter and other studio threads. Edited older archives brought forward.",
    image: `${P}/timeline-2024.jpg`,
    imageAlt: "2024 — archive editing and cross-practice consolidation year",
    timelineHref: `${JOURNEY_ANCHOR}#photography-year-2024`,
    projectHref: journalPath("photography", "archive-editing-2025"),
  },
  {
    id: "2025",
    date: "2025",
    title: "Archive stewardship",
    summary:
      "Phone experiments, Bristol trip edits, benches revisits. May 12: Trapped within a descending haze (latest mint). Collecting 1100+ on xander.tez.",
    image: `${P}/timeline-2025.jpg`,
    imageAlt: "Atmospheric contemporary photograph — archive editing and selective minting, 2025",
    timelineHref: `${JOURNEY_ANCHOR}#photography-year-2025`,
  },
  {
    id: "2026",
    date: "2026",
    title: "Current practice",
    summary:
      "Selective shooting, editing, archive curation. Rhizomatic growth across categories — recent plant and tree edits, tax qualification alongside making.",
    image: `${P}/timeline-2026.jpg`,
    imageAlt: "Recent photography — ongoing observation and archive curation, 2026",
    timelineHref: `${JOURNEY_ANCHOR}#photography-year-2026`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COPY: MAJOR SERIES & COLLECTIONS (grid cards)
// ─────────────────────────────────────────────────────────────────────────────

const seriesSection = {
  title: "Major series & collections",
  intro:
    "Flagship Tezos collections and archive threads — open projects or shop when a physical edition exists.",
};

const outputSeries = [
  {
    id: "brighton-by-bench",
    title: "Brighton by Bench",
    summary:
      "100 Tezos tokens — benches as pause and permission, from the university project An Assemblage; for sitting.",
    image: `${P}/series-brighton-by-bench.jpg`,
    imageAlt: "Brighton by Bench collection — urban bench street photography",
    projectHref: projectPath("photography", "brighton-by-bench"),
    shopHref: productPath("photography", "limited-prints"),
    shopLabel: "Limited prints",
  },
  {
    id: "lightworms",
    title: "Lightworms",
    summary:
      "50 tokens — pond light, larvae glow, and water-surface abstraction as companion series to the bench work.",
    image: `${P}/series-lightworms.jpg`,
    imageAlt: "Lightworms collection — pond light and reflective water-surface photography",
    projectHref: projectPath("photography", "lightworms"),
    shopHref: null,
    shopLabel: "Editions coming soon",
  },
  {
    id: "india-2016",
    title: "India 2016 archive",
    summary:
      "Canon 400D first journey — Agra, Taj Mahal region, architecture, travel, and cultural scenes at the DSLR turning point.",
    image: `${P}/series-india-2016.jpg`,
    imageAlt: "India 2016 archive — travel and architecture from first DSLR trip",
    projectHref: projectPath("photography", "india-2016"),
    shopHref: null,
    shopLabel: "Prints coming soon",
  },
  {
    id: "benches-views",
    title: "Benches & views",
    summary:
      "Street furniture, vistas, and mundane elevation — the through-line from 2017 Brighton starters to the 100-token collection.",
    image: `${P}/series-benches-views.jpg`,
    imageAlt: "Benches and views — street furniture and southern England vistas",
    projectHref: projectPath("photography", "brighton-by-bench"),
    shopHref: null,
    shopLabel: "Zine planned",
  },
  {
    id: "photez-seasons",
    title: "Photez thematic seasons",
    summary:
      "Community-led seasons, magazine test, Sea Cadets, The Weight of It All — co-founding and driving Photez initiatives.",
    image: `${P}/series-photez.jpg`,
    imageAlt: "Photez community photography — thematic seasons and collective minting",
    projectHref: `${categoryRoute}#photography-photez`,
    shopHref: null,
    shopLabel: "Community collections on objkt",
  },
  {
    id: "recent-works",
    title: "Recent works",
    summary:
      "Phone and DSLR edits 2025–2026 — atmospheric, plant close-ups (Nursery overlap), Trapped within a descending haze and new curation.",
    image: `${P}/series-recent.jpg`,
    imageAlt: "Recent atmospheric photography — contemporary edits and plant studies",
    projectHref: "#photography-year-2026",
    shopHref: productPath("photography", "limited-prints"),
    shopLabel: "Browse prints",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COPY: PHOTEZ & COMMUNITY
// ─────────────────────────────────────────────────────────────────────────────

const photez = {
  title: "Photez & community leadership",
  lead: "Co-founding and driving collective seasons — benches, earth, and magazine experiments on Tezos.",
  paragraphs: [
    "2022 established the pattern: Sea Cadets mint, formation of Photez, launch of Brighton by Bench and Lightworms, and late-year thematic seasons plus magazine test experiments. The community year was also the heaviest minting period within the 236-token total — benches as philosophical motif alongside leadership, not only personal output.",
    "2023 continued with Bristol robin and pond shots under #photez4earth, archive dives across 2016–2022 work, and The Weight of It All in a Photez thematic collection. Environmental submissions and philosophical depth sat beside reactivation of older negatives and exports.",
    "Collecting remains part of the practice — 1100+ tokens on the main wallet (xander.tez) — stewardship of others' agreements about instance and scarcity as much as issuing one's own.",
  ],
  links: [
    {
      href: projectPath("photography", "brighton-by-bench"),
      label: "Brighton by Bench project",
      summary: "100-token flagship bench collection",
    },
    {
      href: categoryPath("crypto"),
      label: "Crypto / NFT thread",
      summary: "On-chain editions, essays, and digital collectibles",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// COPY: JOURNAL TEASER (two cards — edit titles/summaries here)
// ─────────────────────────────────────────────────────────────────────────────

const journalTeaser = {
  title: "Archive & process notes",
  intro:
    "Editing, cross-practice links, and long-form notes live in the journal — parallel to the timeline above.",
  cards: [
    {
      href: journalPath("photography", "archive-editing-2025"),
      title: "Archive editing (2025)",
      summary: "Consolidation year — Bristol edits, Plotter overlap, selective minting.",
      eyebrow: "Journal",
    },
    {
      href: projectPath("photography", "lightworms"),
      title: "Lightworms",
      summary: "50-token pond-light collection — companion to Brighton by Bench.",
      eyebrow: "Project",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// COPY: ELSEWHERE ON SITE (related links grid)
// ─────────────────────────────────────────────────────────────────────────────

const relatedOnSite = [
  {
    href: projectPath("photography", "brighton-by-bench"),
    label: "Brighton by Bench",
    summary: "100-token bench collection — flagship project",
  },
  {
    href: projectPath("photography", "india-2016"),
    label: "India 2016 archive",
    summary: "First Canon 400D journey — Agra and travel",
  },
  {
    href: categoryPath("plotter"),
    label: "Plotter / Polargraph",
    summary: "Physical editions and cross-practice links from 2024 onward",
  },
  {
    href: categoryPath("crypto"),
    label: "Crypto / NFT",
    summary: "Essays, digital editions, and on-chain provenance",
  },
  {
    href: categoryPath("philosophy"),
    label: "Philosophy / Writings",
    summary: "Design theory and studio dissertations",
  },
  {
    href: categoryPath("nursery"),
    label: "Plant / Tree Nursery",
    summary: "Nature close-ups overlapping 2025 practice",
  },
  {
    href: projectPath("photography", "painting-studio"),
    label: "Painting studio",
    summary: "Macro and painting studies — lens in the studio",
  },
  {
    href: projectPath("photography", "drawing-studio"),
    label: "Drawing studio",
    summary: "Projection-led drawing documented photographically",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COPY: SHOP RAIL (featured products on this page)
// ─────────────────────────────────────────────────────────────────────────────

const shopRail = {
  title: "Available works",
  intro:
    "Physical prints, postcards, and zines from this thread — plus on-chain editions. Limited runs list here as they ship; browse the timeline and collections first, then take home an instance.",
  products: [
    {
      slug: "limited-prints",
      href: productPath("photography", "limited-prints"),
      name: "Limited edition prints",
      summary:
        "Signed physical prints from key works — Brighton by Bench, archive selects, and atmospheric editions. Checkout wiring in progress.",
      image: `${P}/shop-limited-prints.jpg`,
      price: "TBC",
    },
    {
      slug: "digital-editions",
      href: productPath("crypto", "digital-editions"),
      name: "Digital editions",
      summary:
        "On-chain and digital editions from the photography and crypto-art period — objkt / Tezos collectibles.",
      image: "/work/crypto/banner.jpg",
      price: "On objkt",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// COPY: FOOTER CTAs
// ─────────────────────────────────────────────────────────────────────────────

const footerCtas = {
  title: "Continue",
  summary:
    "Return to the Explorer, open Brighton by Bench, or browse limited prints and editions.",
  buttons: [
    { href: "/work", label: "Back to Explorer", variant: "ghost" },
    {
      href: projectPath("photography", "brighton-by-bench"),
      label: "Brighton by Bench",
      variant: "primary",
    },
    {
      href: productPath("photography", "limited-prints"),
      label: "Limited prints",
      variant: "ghost",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT: SHOP RAIL (small sub-component — markup only)
// ─────────────────────────────────────────────────────────────────────────────

function ShopRail({ products, title, intro }) {
  if (!products?.length) return null;

  return (
    <section
      id="photography-shop"
      className="plotter-shop-rail card"
      aria-labelledby="photography-shop-heading"
    >
      <header className="plotter-shop-rail__header">
        <h2 id="photography-shop-heading" className="card-link__title">
          {title}
        </h2>
        <p className="card-link__summary">{intro}</p>
      </header>
      <div className="plotter-shop-rail__grid">
        {products.map((product) => {
          const resolved = resolveLinkKind(product.href, {
            context: LINK_CONTEXT,
          });
          const a11y = getLinkAriaLabel(product.name, resolved);
          return (
            <SiteLink
              key={product.href}
              href={product.href}
              context={LINK_CONTEXT}
              variant="card"
              className={`${siteLinkCardClass(product.href, LINK_CONTEXT)} plotter-shop-rail__card`}
              ariaLabel={a11y}
            >
              <div className="plotter-shop-rail__media">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 280px, 100vw"
                    loading="lazy"
                  />
                ) : null}
              </div>
              <div className="plotter-shop-rail__body">
                <LinkAffordance
                  kind={resolved.kind}
                  label={resolved.label}
                  showBadge
                  showExternalIcon={resolved.openInNewTab}
                  badgePosition="card"
                />
                <p className="plotter-shop-rail__name">{product.name}</p>
                <p className="card-link__summary">{product.summary}</p>
                {product.price ? (
                  <p className="plotter-shop-rail__price">{product.price}</p>
                ) : null}
                <span className="plotter-shop-rail__cta">View product →</span>
              </div>
            </SiteLink>
          );
        })}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT: PAGE (section order — change order here if needed)
// ─────────────────────────────────────────────────────────────────────────────

export default function PhotographyCategoryRoute() {
  const threadSections = categoryThreadSections(category);

  return (
    <PageSection
      eyebrow={
        <CategoryBreadcrumb
          categoryTitle={category.title}
          categoryRoute={categoryRoute}
        />
      }
      title=""
      intro={null}
    >
      <article className="crypto-page plotter-page photography-page">
        {/* LAYOUT: Hero */}
        <header className="crypto-hero plotter-hero">
          <div className="crypto-hero__media plotter-hero__media">
            <Image
              src={hero.image}
              alt={hero.imageAlt}
              fill
              priority
              sizes="100vw"
              className="crypto-hero__img"
            />
          </div>
          <div className="crypto-hero__content plotter-hero__content">
            <p className="eyebrow">Work · {category.title}</p>
            <h1 className="crypto-hero__title">{hero.headline}</h1>
            <p className="crypto-hero__subtitle plotter-hero__tagline">
              {hero.tagline}
            </p>
            <div className="plotter-hero__actions btn-row">
              <a href={JOURNEY_ANCHOR} className="btn">
                {hero.primaryCta}
              </a>
              <SiteLink
                href={SHOP_ANCHOR}
                context={LINK_CONTEXT}
                className="btn btn-ghost"
                showBadge={false}
              >
                {hero.secondaryCta}
              </SiteLink>
            </div>
          </div>
        </header>

        {/* LAYOUT: Concept cards */}
        <section className="crypto-concepts" aria-label="Core ideas">
          <div className="crypto-concepts__scroll">
            {conceptCards.map((card) => (
              <div key={card.id} className="card crypto-concept-card">
                <h2 className="crypto-concept-card__title">{card.title}</h2>
                <p className="card-link__summary">{card.summary}</p>
              </div>
            ))}
          </div>
        </section>

        {/* LAYOUT: Practice overview */}
        <section
          className="card crypto-essay-block"
          aria-labelledby="photography-intro-heading"
        >
          <p className="eyebrow">{intro.eyebrow}</p>
          <h2 id="photography-intro-heading" className="crypto-section__title">
            {intro.title}
          </h2>
          <p className="crypto-essay-block__lead">{intro.lead}</p>
          <div className="prose crypto-article__prose">
            {intro.paragraphs.map((para) => (
              <p key={para.slice(0, 48)}>{para}</p>
            ))}
          </div>
        </section>

        {/* LAYOUT: Timeline */}
        <section
          id="photography-journey"
          className="plotter-timeline"
          aria-labelledby="photography-timeline-heading"
        >
          <header className="plotter-timeline__header">
            <h2 id="photography-timeline-heading" className="crypto-section__title">
              {timelineSection.title}
            </h2>
            <p className="crypto-section__intro">{timelineSection.intro}</p>
          </header>
          <ol className="plotter-timeline__track">
            {timeline.map((item, index) => (
              <li
                key={item.id}
                id={`photography-year-${item.id}`}
                className="plotter-timeline__item"
              >
                <article className="plotter-timeline__card">
                  <Link
                    href={item.projectHref ?? item.timelineHref}
                    className="plotter-timeline__card-link"
                  >
                    <div className="plotter-timeline__media">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(min-width: 720px) 220px, 70vw"
                        loading={index < 2 ? "eager" : "lazy"}
                      />
                      <span className="plotter-timeline__date">{item.date}</span>
                    </div>
                    <div className="plotter-timeline__body">
                      <h3 className="plotter-timeline__title">{item.title}</h3>
                      <p className="card-link__summary">{item.summary}</p>
                      <span className="plotter-timeline__more">
                        {item.projectHref ? "View project →" : "View year →"}
                      </span>
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ol>
        </section>

        {/* LAYOUT: Major series */}
        <section
          id="photography-outputs"
          className="plotter-series"
          aria-labelledby="photography-series-heading"
        >
          <header className="plotter-series__header">
            <h2 id="photography-series-heading" className="crypto-section__title">
              {seriesSection.title}
            </h2>
            <p className="crypto-section__intro">{seriesSection.intro}</p>
          </header>
          <div className="plotter-series__grid">
            {outputSeries.map((series) => {
              const shopResolved = series.shopHref
                ? resolveLinkKind(series.shopHref, { context: LINK_CONTEXT })
                : null;
              const projectIsHash =
                series.projectHref?.startsWith("#") ||
                series.projectHref?.includes("#photography");
              return (
                <article
                  key={series.id}
                  className={`plotter-series__card${series.shopHref ? "" : " plotter-series__card--muted"}`}
                >
                  <div className="plotter-series__media">
                    <Image
                      src={series.image}
                      alt={series.imageAlt}
                      fill
                      sizes="(min-width: 900px) 33vw, 50vw"
                      loading="lazy"
                    />
                  </div>
                  <div className="plotter-series__body">
                    <h3 className="plotter-series__title">{series.title}</h3>
                    <p className="card-link__summary">{series.summary}</p>
                    <div className="plotter-series__links">
                      {series.projectHref ? (
                        projectIsHash ? (
                          <a href={series.projectHref} className="plotter-series__link">
                            View section
                          </a>
                        ) : (
                          <SiteLink
                            href={series.projectHref}
                            context={LINK_CONTEXT}
                            className="plotter-series__link"
                            showBadge={false}
                          >
                            View project
                          </SiteLink>
                        )
                      ) : null}
                      {series.shopHref ? (
                        <SiteLink
                          href={series.shopHref}
                          context={LINK_CONTEXT}
                          className="plotter-series__link plotter-series__link--shop"
                          showBadge
                        >
                          {series.shopLabel}
                        </SiteLink>
                      ) : (
                        <span className="plotter-series__soon">
                          {series.shopLabel}
                        </span>
                      )}
                    </div>
                    {shopResolved ? (
                      <LinkAffordance
                        kind={shopResolved.kind}
                        label={shopResolved.label}
                        showBadge
                        badgePosition="card"
                      />
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* LAYOUT: Photez */}
        <section
          id="photography-photez"
          className="card plotter-process-teaser"
          aria-labelledby="photography-photez-heading"
        >
          <h2 id="photography-photez-heading" className="card-link__title">
            {photez.title}
          </h2>
          <p className="card-link__summary" style={{ marginTop: "0.75rem" }}>
            {photez.lead}
          </p>
          <div className="prose" style={{ marginTop: "1.25rem" }}>
            {photez.paragraphs.map((para) => (
              <p key={para.slice(0, 48)}>{para}</p>
            ))}
          </div>
          <div className="grid-2" style={{ marginTop: "1.5rem" }}>
            {photez.links.map((link) => (
              <CardLinkKind
                key={link.href}
                href={link.href}
                context={LINK_CONTEXT}
                title={link.label}
                summary={link.summary}
                mediaEmpty
              />
            ))}
          </div>
        </section>

        {/* LAYOUT: Journal teaser */}
        <section
          className="card plotter-process-teaser"
          aria-labelledby="photography-journal-heading"
        >
          <h2 id="photography-journal-heading" className="card-link__title">
            {journalTeaser.title}
          </h2>
          <p className="card-link__summary" style={{ marginTop: "0.75rem" }}>
            {journalTeaser.intro}
          </p>
          <div className="grid-2" style={{ marginTop: "1.5rem" }}>
            {journalTeaser.cards.map((card) => (
              <CardLinkKind
                key={card.href}
                href={card.href}
                context={LINK_CONTEXT}
                title={card.title}
                summary={card.summary}
                eyebrow={card.eyebrow}
                mediaEmpty
              />
            ))}
          </div>
        </section>

        {/* LAYOUT: Related on site */}
        <section
          className="card crypto-related-strip"
          aria-label="Related on this site"
        >
          <h2 className="card-link__title">Elsewhere on the site</h2>
          <div className="crypto-related-strip__grid">
            {relatedOnSite.map((link) => (
              <CardLinkKind
                key={link.href}
                href={link.href}
                context={LINK_CONTEXT}
                title={link.label}
                summary={link.summary}
                mediaEmpty
              />
            ))}
          </div>
        </section>

        {/* LAYOUT: Registry thread (projects / journal / products from manifest) */}
        {threadSections.map((section) => (
          <ThreadSection key={section.id} section={section} />
        ))}

        <ShopRail
          products={shopRail.products}
          title={shopRail.title}
          intro={shopRail.intro}
        />

        {/* LAYOUT: Footer CTAs */}
        <section className="card crypto-cta-strip">
          <h2 className="card-link__title">{footerCtas.title}</h2>
          <p className="card-link__summary">{footerCtas.summary}</p>
          <div className="btn-row" style={{ marginTop: "1rem" }}>
            {footerCtas.buttons.map((btn) => (
              <SiteLink
                key={btn.href}
                href={btn.href}
                context={LINK_CONTEXT}
                className={`btn${btn.variant === "ghost" ? " btn-ghost" : ""}`}
                showBadge={btn.variant !== "ghost"}
              >
                {btn.label}
              </SiteLink>
            ))}
          </div>
        </section>
      </article>
    </PageSection>
  );
}
