/**
 * /work/plotter — category homepage in this file.
 *
 * HOW TO EDIT
 * ───────────
 * 1. Search "COPY:" — hero, concepts, intro, timeline milestones, media gallery, series, shop.
 * 2. Search "LAYOUT:" — section order and markup only.
 * 3. Full chronological build log: app/work/plotter/timeline/page.jsx
 * 4. Projects / journal / products from app/work/manifest.json
 *
 * Media files: public/work/plotter/media/
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
import {
  categorySubsectionSections,
  getWorkCategory,
} from "@/app/work/categories";
import { WORK_TAGLINE } from "@/app/work/work-tagline";
import { HubSubnav } from "@/components/work/hub-subnav";
import {
  categoryPath,
  journalPath,
  productPath,
  projectPath,
} from "@/lib/work-paths";
import { getLinkAriaLabel, resolveLinkKind } from "@/lib/link-kind";

const LINK_CONTEXT = "content";
const category = getWorkCategory("plotter");
const categoryRoute = categoryPath("plotter");

// ─────────────────────────────────────────────────────────────────────────────
// COPY: PATHS & HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const PLOTTER_TIMELINE_PATH = "/work/plotter/timeline";
const M = "/work/plotter/media";

function xPost(postId) {
  return `https://x.com/i/status/${postId}`;
}

const PLOTTER_HERO_VIDEO = `${M}/will-it-draw-clip.mp4`;

// ─────────────────────────────────────────────────────────────────────────────
// COPY: CONCEPT CARDS
// ─────────────────────────────────────────────────────────────────────────────

const plotterConceptCards = [
  {
    id: "collaborator",
    title: "Machine as collaborator",
    summary:
      "The polargraph is not a printer — slack, gravity, and pen drag co-author every line with the code.",
  },
  {
    id: "translation",
    title: "Code into ink",
    summary:
      "Vector paths become physical marks: a slow translation from screen geometry to paper materiality.",
  },
  {
    id: "iteration",
    title: "Iteration & repair",
    summary:
      "Crashes, cord stretch, and re-tensioning are part of the workflow — each rebuild teaches the next.",
  },
  {
    id: "generative",
    title: "Generative creativity",
    summary:
      "Parameters, layers, and accidents produce families of plots rather than single perfect outputs.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COPY: PRACTICE OVERVIEW
// ─────────────────────────────────────────────────────────────────────────────

const plotterIntroParagraphs = [
  "This thread is a long-term DIY polargraph drawing machine project — a long time in the coming. What began as curiosity about whether a beaded blind cord and two stepper motors could draw at all became a studio practice: translating code into physical ink, learning to work with a machine that has its own temperament, and building a public record of tests, failures, and finished plots along the way.",
  "The polargraph sits between engineering and drawing. Software defines paths; gravity and friction rewrite them. Multi-layer biro experiments, portability tests, self-referential plots, and portrait series all share the same question: what happens when you treat the plotter not as a printer but as a collaborator whose mistakes are material?",
  "The site is structured as both portfolio and gentle sales funnel. Process notes and timeline posts document how the machine evolved; project pages hold series in depth; the shop carries editions — postcards today, prints and process zines as they are ready. Browse the journey first, then the works available to take home.",
];

// ─────────────────────────────────────────────────────────────────────────────
// COPY: BUILD MEDIA GALLERY (grouped by phase)
// ─────────────────────────────────────────────────────────────────────────────

const plotterMediaPhases = [
  {
    id: "will-it-draw",
    title: "1 Feb 2023 — Will it draw?",
    summary:
      "First major public test: beaded blind cord as tension strings, initial assembly and reinforcement.",
    items: [
      {
        type: "video",
        src: `${M}/will-it-draw-clip.mp4`,
        poster: "/work/plotter/hero.jpg",
        alt: "Video — first polargraph test, machine in operation.",
      },
    ],
  },
  {
    id: "feb-09-reliability",
    title: "9 Feb 2023 — Reliability & aesthetic tests",
    summary:
      "Multi-session plot after a PC crash; pen up/down disabled for deliberate mark continuity.",
    items: [
      {
        type: "image",
        src: `${M}/initial-polargraph-testing-1.jpg`,
        alt: "Early polargraph test photo — session after PC crash.",
      },
      {
        type: "image",
        src: `${M}/initial-polargraph-testing-2.jpg`,
        alt: "Polargraph plot continuation — reliability testing.",
      },
      {
        type: "image",
        src: `${M}/initial-polargraph-testing-3.jpg`,
        alt: "Further early polargraph drawing test on paper.",
      },
    ],
  },
  {
    id: "apr-08-software-material",
    title: "8 Apr 2023 — Software & cartridge paper",
    summary:
      "Image path creator in Polargraph software; stress-testing cartridge paper stocks.",
    items: [
      {
        type: "image",
        src: `${M}/stress-test-biro-1.jpg`,
        alt: "Cartridge paper stress test — before/after comparison.",
      },
      {
        type: "image",
        src: `${M}/a4-coverage-test-1.jpg`,
        alt: "Prior material test referenced in April software exploration post.",
      },
    ],
  },
  {
    id: "apr-11-multi-layer-biro",
    title: "11 Apr 2023 — Multi-layer biro",
    summary: "Red, green, and blue layers on A4; scaling experiments down to A6.",
    items: [
      {
        type: "image",
        src: `${M}/stress-test-biro-1.jpg`,
        alt: "Multi-layer biro pen plot — colour layering on A4.",
      },
      {
        type: "image",
        src: `${M}/stress-test-biro-2.jpg`,
        alt: "Multi-layer biro plot detail — A6 scaling tests.",
      },
    ],
  },
  {
    id: "apr-18-a4-long-plot",
    title: "18 Apr 2023 — Long A4 plots",
    summary: "Multi-hour A4 test plots; speed and duration iteration.",
    items: [
      {
        type: "image",
        src: `${M}/a4-coverage-test-1.jpg`,
        alt: "Large A4 pen plotter test — coverage and duration.",
      },
      {
        type: "image",
        src: `${M}/a4-coverage-test-2.jpg`,
        alt: "A4 long-plot test — speed experimentation.",
      },
      {
        type: "image",
        src: `${M}/a4-coverage-test-3.jpg`,
        alt: "A4 multi-hour plot documentation.",
      },
      {
        type: "image",
        src: `${M}/a4-coverage-test-4.jpg`,
        alt: "A4 test plot — full sheet output.",
      },
    ],
  },
  {
    id: "apr-20-portability",
    title: "20 Apr 2023 — Portability at parents'",
    summary:
      "Original gondola head; plots of the head and comparison to an original painting — meta/self-referential work.",
    items: [
      {
        type: "video",
        src: `${M}/portability-of-plotter-header-outputs-video.mp4`,
        poster: `${M}/stress-test-biro-2.jpg`,
        alt: "Video — portability test with original head version away from main studio.",
      },
    ],
  },
  {
    id: "plotted-heads-prep",
    title: "Plotted heads — series prep",
    summary: "Test plot ahead of the flagship portrait series.",
    items: [
      {
        type: "image",
        src: `${M}/testing-for-plotted-heads-series.jpg`,
        alt: "Test plot for the plotted heads portrait series.",
      },
    ],
  },
  {
    id: "jul-2025-tower",
    title: "20 Jul 2025 — New tower setup",
    summary:
      "Re-install after move; first test plots; remote monitoring and timelapse planned.",
    items: [
      {
        type: "video",
        src: `${M}/rebuild-machine-test-1.mp4`,
        poster: `${M}/move-set-up-test-new-positions-1.jpg`,
        alt: "Video — new tower setup, re-assembly and first test plots.",
      },
    ],
  },
  {
    id: "aug-2025-gondola",
    title: "22 Aug 2025 — New gondola",
    summary: "Chain swap, new gondola build, pen-lift mechanism test.",
    items: [
      {
        type: "video",
        src: `${M}/rebuild-machine-test-2-new-belts-new-gondola.mp4`,
        poster: `${M}/initial-polargraph-testing-2.jpg`,
        alt: "Video — new gondola, belts, and pen lift mechanism test.",
      },
    ],
  },
  {
    id: "mar-2026-head-height",
    title: "28 Mar 2026 — Above head height",
    summary:
      "New mount location; network/remote setup; “mountain moons” plot with stripe troubleshooting.",
    items: [
      {
        type: "image",
        src: `${M}/move-set-up-test-new-positions-1.jpg`,
        alt: "Above-head-height polargraph mount — new workspace position.",
      },
      {
        type: "image",
        src: `${M}/move-set-up-test-new-positions-2.jpg`,
        alt: "Network and remote setup for head-height plotter installation.",
      },
      {
        type: "image",
        src: `${M}/move-set-up-test-new-positions-3.jpg`,
        alt: "Mountain moons plot — stripe troubleshooting documentation.",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COPY: TIMELINE MILESTONES (homepage — full log on /work/plotter/timeline)
// ─────────────────────────────────────────────────────────────────────────────

const plotterTimeline = [
  {
    id: "will-it-draw",
    date: "1 Feb 2023",
    title: "Will it draw?",
    summary:
      "Beaded blind cord, first assembly — the earliest public proof the gondola leaves a trace.",
    image: `${M}/initial-polargraph-testing-3.jpg`,
    imageAlt: "First polargraph pen plot on paper.",
    timelineHref: `${PLOTTER_TIMELINE_PATH}#will-it-draw`,
    externalHref: xPost("1620791998562308096"),
    externalLabel: "Post on X",
  },
  {
    id: "apr-11-multi-layer-biro",
    date: "11 Apr 2023",
    title: "Multi-layer biro",
    summary: "Red, green, and blue on A4 — layering technique that feeds later series.",
    image: `${M}/stress-test-biro-1.jpg`,
    imageAlt: "Multi-layer biro pen plot on A4.",
    timelineHref: `${PLOTTER_TIMELINE_PATH}#apr-11-multi-layer-biro`,
    externalHref: xPost("1645699444753551360"),
    externalLabel: "Post on X",
  },
  {
    id: "apr-18-a4-long-plot",
    date: "18 Apr 2023",
    title: "Long A4 plots",
    summary: "Multi-hour tests — iterating on speed and how long a sheet could run.",
    image: `${M}/a4-coverage-test-2.jpg`,
    imageAlt: "Long A4 pen plotter test.",
    timelineHref: `${PLOTTER_TIMELINE_PATH}#apr-18-a4-long-plot`,
    externalHref: xPost("1648374348942655489"),
    externalLabel: "Post on X",
  },
  {
    id: "apr-20-portability",
    date: "20 Apr 2023",
    title: "Portability",
    summary:
      "Original head at my parents' — self-referential plots of the apparatus itself.",
    image: `${M}/stress-test-biro-2.jpg`,
    imageAlt: "Portability test with original gondola head.",
    timelineHref: `${PLOTTER_TIMELINE_PATH}#apr-20-portability`,
    externalHref: xPost("1649037643693322242"),
    externalLabel: "Post on X",
  },
  {
    id: "jun-19-react",
    date: "19 Jun 2023",
    title: "React project home",
    summary:
      "A digital home for the long-term plotter thread — ancestor of this website build.",
    image: "/work/plotter/hero.jpg",
    imageAlt: "Polargraph studio setup.",
    timelineHref: `${PLOTTER_TIMELINE_PATH}#jun-19-react`,
    externalHref: xPost("1670773352472911874"),
    externalLabel: "Post on X",
  },
  {
    id: "jul-2025-tower",
    date: "20 Jul 2025",
    title: "New tower",
    summary: "Re-install after the move; first plots on the new tower setup.",
    image: `${M}/move-set-up-test-new-positions-1.jpg`,
    imageAlt: "New tower plotter setup.",
    timelineHref: `${PLOTTER_TIMELINE_PATH}#jul-2025-tower`,
    externalHref: xPost("1946992814061191548"),
    externalLabel: "Post on X",
  },
  {
    id: "mar-2026-head-height",
    date: "28 Mar 2026",
    title: "Above head height",
    summary:
      "Current workspace — remote setup, mountain moons plot, stripe troubleshooting.",
    image: `${M}/move-set-up-test-new-positions-2.jpg`,
    imageAlt: "Above-head-height polargraph installation.",
    timelineHref: `${PLOTTER_TIMELINE_PATH}#mar-2026-head-height`,
    externalHref: xPost("2038010667131625791"),
    externalLabel: "Post on X",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COPY: OUTPUT SERIES
// ─────────────────────────────────────────────────────────────────────────────

const plotterOutputSeries = [
  {
    id: "multi-layer-biro",
    title: "Multi-layer biro",
    summary:
      "Layered pen passes building density and colour drift — each pass shifts registration slightly.",
    image: `${M}/stress-test-biro-1.jpg`,
    imageAlt: "Multi-layer biro pen plotter art experiment on paper.",
    shopHref: null,
    shopLabel: "Prints coming soon",
  },
  {
    id: "self-referential",
    title: "Self-referential plots",
    summary:
      "Plots that document the machine, cord path, or workspace — drawing as meta-instrument.",
    image: `${M}/a4-coverage-test-4.jpg`,
    imageAlt: "Self-referential DIY polargraph plot of the drawing apparatus.",
    shopHref: null,
    shopLabel: "Editions TBC",
  },
  {
    id: "material-experiments",
    title: "Material experiments",
    summary:
      "Cord types, pen weights, paper stocks — finding the vocabulary of mark the setup can hold.",
    image: `${M}/initial-polargraph-testing-2.jpg`,
    imageAlt: "Pen plotter material and cord tests on the polargraph rig.",
    shopHref: null,
    shopLabel: "Process zine planned",
  },
  {
    id: "plotted-heads",
    title: "Plotted heads",
    summary:
      "Portrait series where faces emerge through repetition, drift, and density — flagship project thread.",
    image: `${M}/testing-for-plotted-heads-series.jpg`,
    imageAlt: "Plotted heads series — DIY polargraph portrait pen plot art.",
    shopHref: productPath("plotter", "postcards"),
    shopLabel: "Shop postcards",
    projectHref: projectPath("plotter", "plotted-heads"),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COPY: SEO / METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata = {
  title: "Plotter / Polargraph",
  description:
    "Long-term DIY polargraph drawing machine — pen plotter art, process timeline, plotted heads series, and shop editions.",
  openGraph: {
    title: "Plotter / Polargraph",
    description:
      "Long-term DIY polargraph drawing machine — pen plotter art, process timeline, plotted heads series, and shop editions.",
    images: [{ url: "/work/plotter/projects/plotted-heads/plotter-drawings001.jpg" }],
  },
};


// ─────────────────────────────────────────────────────────────────────────────
// COPY: SHOP RAIL
// ─────────────────────────────────────────────────────────────────────────────

const shopRail = {
  title: "From the shop",
  intro:
    "Physical editions from this thread — postcards available as a prototype; prints and process documents will list here as they ship.",
  products: [
    {
      slug: "postcards",
      href: productPath("plotter", "postcards"),
      name: "Postcard Series (6-card set)",
      summary:
        "First shelf-ready edition from the plotted-image language — six cards, prototype pricing.",
      image: "/work/plotter/products/postcards/IMG_5206.jpg",
      price: "TBC",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// COPY: RELATED LINKS
// ─────────────────────────────────────────────────────────────────────────────

const relatedOnSiteLinks = [
  {
    href: PLOTTER_TIMELINE_PATH,
    label: "Development timeline",
    summary: "Full chronological log with photos and video",
  },
  {
    href: projectPath("plotter", "plotted-heads"),
    label: "Plotted heads project",
    summary: "Portrait series — full gallery and notes",
  },
  {
    href: journalPath("plotter", "polargraph-process-notes"),
    label: "Process notes",
    summary: "Build log, materials, and lessons (journal)",
  },
  {
    href: productPath("plotter", "postcards"),
    label: "Postcard edition",
    summary: "Six-card set from the series",
  },
  {
    href: categoryPath("photography"),
    label: "Crypto / NFT",
    summary: "Digital editions from the same studio period",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COPY: FOOTER CTAs
// ─────────────────────────────────────────────────────────────────────────────

const footerCtas = {
  title: "Continue",
  summary:
    "Return to the Explorer, open the flagship project, or browse the postcard edition.",
  buttons: [
    { href: "/work", label: "Back to Explorer", variant: "ghost" },
    {
      href: projectPath("plotter", "plotted-heads"),
      label: "Plotted heads project",
      variant: "primary",
    },
    {
      href: productPath("plotter", "postcards"),
      label: "Postcards",
      variant: "ghost",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT: PlotterMedia helper
// ─────────────────────────────────────────────────────────────────────────────

function PlotterMedia({
  item,
  className = "",
  fill = false,
  priority = false,
  sizes = "(min-width: 900px) 33vw, 100vw",
  controls = true,
}) {
  if (item.type === "video") {
    if (fill) {
      return (
        <video
          className={`plotter-media plotter-media--video ${className}`.trim()}
          src={item.src}
          poster={item.poster}
          controls={controls}
          playsInline
          preload="metadata"
          aria-label={item.alt}
        />
      );
    }
    return (
      <video
        className={`plotter-media plotter-media--video ${className}`.trim()}
        src={item.src}
        poster={item.poster}
        controls={controls}
        playsInline
        preload="metadata"
        aria-label={item.alt}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className={`plotter-media plotter-media--img ${className}`.trim()}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={item.src}
      alt={item.alt}
      width={1200}
      height={800}
      className={`plotter-media plotter-media--img ${className}`.trim()}
      sizes={sizes}
      priority={priority}
      style={{ width: "100%", height: "auto" }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT: Shop rail
// ─────────────────────────────────────────────────────────────────────────────

function ShopRail({ products, title, intro }) {
  if (!products?.length) return null;

  return (
    <section
      id="plotter-shop"
      className="plotter-shop-rail card"
      aria-labelledby="plotter-shop-heading"
    >
      <header className="plotter-shop-rail__header">
        <h2 id="plotter-shop-heading" className="card-link__title">
          {title}
        </h2>
        <p className="card-link__summary">{intro}</p>
      </header>
      <div className="plotter-shop-rail__grid">
        {products.map((product) => {
          const resolved = resolveLinkKind(product.href, { context: LINK_CONTEXT });
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
// LAYOUT: PAGE
// ─────────────────────────────────────────────────────────────────────────────

export function PlotterHubPage() {
  const threadSections = categorySubsectionSections(category);
  const subnavItems = (category?.subsections ?? []).map((sub) => ({
    id: sub.id,
    title: sub.title,
  }));
  const featuredProducts = shopRail.products;
  const relatedOnSite = relatedOnSiteLinks;

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
      <article className="work-hub-page work-hub-page--category-home plotter-page">
        {/* —— Hero: video loop when asset exists, else high-impact still —— */}
        <header className="work-hub-hero work-hub-hero--fullbleed plotter-hero">
          <div className="work-hub-hero__media plotter-hero__media">
            {PLOTTER_HERO_VIDEO ? (
              <video
                className="plotter-hero__video"
                autoPlay
                muted
                loop
                playsInline
                poster="/work/plotter/hero.jpg"
                aria-label="Looping video of a DIY polargraph pen plotter drawing on paper"
              >
                <source src={PLOTTER_HERO_VIDEO} type="video/mp4" />
              </video>
            ) : (
              <Image
                src="/work/plotter/projects/plotted-heads/plotter-drawings001.jpg"
                alt="DIY polargraph pen plotter portrait — dense overlapping ink lines from a long-term drawing machine project"
                fill
                priority
                sizes="100vw"
                className="work-hub-hero__img"
              />
            )}
          </div>
          <div className="work-hub-hero__content plotter-hero__content">
            <p className="eyebrow">Work · {category.title}</p>
            <h1 className="work-hub-hero__title">Polargraph drawing machine</h1>
            <p className="work-hub-hero__subtitle plotter-hero__tagline">
              {WORK_TAGLINE}
            </p>
            <p className="plotter-hero__lede">
              A long time in the coming — code, cord, and ink learning to draw together.
            </p>
            <div className="plotter-hero__actions btn-row">
              <Link href={PLOTTER_TIMELINE_PATH} className="btn">
                Development timeline
              </Link>
              <a href="#plotter-media" className="btn btn-ghost">
                Build photos &amp; video
              </a>
              <SiteLink
                href="#plotter-shop"
                context={LINK_CONTEXT}
                className="btn btn-ghost"
                showBadge={false}
              >
                Browse available works
              </SiteLink>
            </div>
          </div>
        </header>

        <HubSubnav items={subnavItems} />

        {/* —— Core ideas (horizontal scroll on narrow viewports) —— */}
        <section className="work-hub-concepts" aria-label="Core ideas">
          <div className="work-hub-concepts__scroll">
            {plotterConceptCards.map((card) => (
              <div key={card.id} className="card work-hub-concept-card">
                <h2 className="work-hub-concept-card__title">{card.title}</h2>
                <p className="card-link__summary">{card.summary}</p>
              </div>
            ))}
          </div>
        </section>

        {/* —— Project introduction (~400 words) —— */}
        <section
          className="card work-hub-essay-block"
          aria-labelledby="plotter-intro-heading"
        >
          <p className="eyebrow">Thread overview</p>
          <h2 id="plotter-intro-heading" className="work-hub-section__title">
            The polargraph as studio practice
          </h2>
          <p className="work-hub-essay-block__lead">
            Machines as collaborators — translation of code into physical ink.
          </p>
          <div className="prose work-hub-article__prose">
            {plotterIntroParagraphs.map((para) => (
              <p key={para.slice(0, 48)}>{para}</p>
            ))}
          </div>
        </section>

        {/* —— Visual timeline —— */}
        <section
          id="plotter-journey"
          className="plotter-timeline"
          aria-labelledby="plotter-timeline-heading"
        >
          <header className="plotter-timeline__header">
            <h2 id="plotter-timeline-heading" className="work-hub-section__title">
              Journey
            </h2>
            <p className="work-hub-section__intro">
              Milestones from the first &ldquo;will it draw?&rdquo; post (Feb 2023)
              through the current head-height mount (Mar 2026) — open the{" "}
              <Link href={PLOTTER_TIMELINE_PATH}>full development timeline</Link> for
              all eleven entries with X links and archived media.
            </p>
          </header>
          <ol className="plotter-timeline__track">
            {plotterTimeline.map((item, index) => (
              <li key={item.id} className="plotter-timeline__item">
                <article className="plotter-timeline__card">
                  <Link
                    href={item.timelineHref}
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
                      <span className="plotter-timeline__more">View phase →</span>
                    </div>
                  </Link>
                  {item.externalHref ? (
                    <a
                      href={item.externalHref}
                      className="plotter-timeline__external plotter-timeline__external--below"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.externalLabel}
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                  ) : null}
                </article>
              </li>
            ))}
          </ol>
          <p className="plotter-timeline__footer">
            <Link href={PLOTTER_TIMELINE_PATH} className="btn btn-ghost">
              Full development timeline
            </Link>
          </p>
        </section>

        {/* —— Build media from ingest folder —— */}
        <section
          id="plotter-media"
          className="plotter-media-gallery"
          aria-labelledby="plotter-media-heading"
        >
          <header className="plotter-media-gallery__header">
            <h2 id="plotter-media-heading" className="work-hub-section__title">
              Build photos &amp; video
            </h2>
            <p className="work-hub-section__intro">
              Documentation from the bench — initial tests, coverage maps, rebuilds,
              and portability runs. Grouped by phase; expand copy on the timeline page.
            </p>
          </header>
          {plotterMediaPhases.map((phase) => (
            <section
              key={phase.id}
              id={phase.id}
              className="plotter-media-gallery__phase"
              aria-labelledby={`plotter-phase-${phase.id}`}
            >
              <header className="plotter-media-gallery__phase-header">
                <h3 id={`plotter-phase-${phase.id}`} className="plotter-media-gallery__phase-title">
                  {phase.title}
                </h3>
                <p className="card-link__summary">{phase.summary}</p>
                <Link
                  href={`${PLOTTER_TIMELINE_PATH}#${phase.id}`}
                  className="plotter-media-gallery__phase-link"
                >
                  Timeline entry →
                </Link>
              </header>
              <div className="plotter-media-gallery__grid">
                {phase.items.map((item) => (
                  <figure key={item.src} className="plotter-media-gallery__figure">
                    <div className="plotter-media-gallery__figure-media">
                      <PlotterMedia item={item} />
                    </div>
                    <figcaption className="plotter-media-gallery__caption">
                      {item.alt}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ))}
        </section>

        {/* —— Output series teasers (masonry-style grid) —— */}
        <section
          id="plotter-outputs"
          className="plotter-series"
          aria-labelledby="plotter-series-heading"
        >
          <header className="plotter-series__header">
            <h2 id="plotter-series-heading" className="work-hub-section__title">
              Output series
            </h2>
            <p className="work-hub-section__intro">
              Families of plots from the machine — follow into projects or shop
              when an edition exists.
            </p>
          </header>
          <div className="plotter-series__grid">
            {plotterOutputSeries.map((series) => {
              const shopResolved = series.shopHref
                ? resolveLinkKind(series.shopHref, { context: LINK_CONTEXT })
                : null;
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
                        <SiteLink
                          href={series.projectHref}
                          context={LINK_CONTEXT}
                          className="plotter-series__link"
                          showBadge={false}
                        >
                          View project
                        </SiteLink>
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

        {/* —— Process & learnings → journal —— */}
        <section
          className="card plotter-process-teaser"
          aria-labelledby="plotter-process-heading"
        >
          <h2 id="plotter-process-heading" className="card-link__title">
            Process &amp; learnings
          </h2>
          <p className="card-link__summary" style={{ marginTop: "0.75rem" }}>
            Build notes, material choices, and troubleshooting live in the journal
            — a running log parallel to the timeline above.
          </p>
          <div className="grid-2" style={{ marginTop: "1.5rem" }}>
            <CardLinkKind
              href={journalPath("plotter", "polargraph-process-notes")}
              context={LINK_CONTEXT}
              title="Polargraph process notes"
              summary="Cord, gondola, software, and what broke — placeholder log expanding over time."
              eyebrow="Journal"
              mediaEmpty
            />
            <CardLinkKind
              href={projectPath("plotter", "plotted-heads")}
              context={LINK_CONTEXT}
              title="Plotted heads series"
              summary="Flagship portrait project with gallery and shop link-through."
              eyebrow="Project"
              mediaEmpty
            />
          </div>
        </section>

        {/* —— Elsewhere on site —— */}
        <section
          className="card work-hub-related-strip"
          aria-label="Related on this site"
        >
          <h2 className="card-link__title">Elsewhere on the site</h2>
          <div className="work-hub-related-strip__grid">
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

        {/* —— Registry thread: projects, journal, products from categories.js —— */}
        {threadSections.map((section) => (
          <ThreadSection key={section.id} section={section} />
        ))}

        <ShopRail products={featuredProducts} title={shopRail.title} intro={shopRail.intro} />

        {/* —— Footer CTAs —— */}
        <section className="card work-hub-cta-strip">
          <h2 className="card-link__title">Continue</h2>
          <p className="card-link__summary">
            Return to the Explorer, open the flagship project, or browse the postcard
            edition.
          </p>
          <div className="btn-row" style={{ marginTop: "1rem" }}>
            <SiteLink href="/work" context={LINK_CONTEXT} className="btn btn-ghost" showBadge={false}>
              Back to Explorer
            </SiteLink>
            <SiteLink
              href={projectPath("plotter", "plotted-heads")}
              context={LINK_CONTEXT}
              className="btn"
              showBadge={false}
            >
              Plotted heads project
            </SiteLink>
            <SiteLink
              href={productPath("plotter", "postcards")}
              context={LINK_CONTEXT}
              className="btn btn-ghost"
              showBadge
            >
              Postcards
            </SiteLink>
          </div>
        </section>
      </article>
    </PageSection>
  );
}
