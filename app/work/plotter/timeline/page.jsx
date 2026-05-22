/**
 * /work/plotter/timeline — full development timeline in this file.
 *
 * HOW TO EDIT
 * ───────────
 * 1. Search "COPY:" — each chronological entry, media phases, page intro.
 * 2. Search "LAYOUT:" — markup only.
 * 3. Homepage milestones: app/work/plotter/page.jsx (COPY: TIMELINE MILESTONES)
 */

import Link from "next/link";

import { PageSection } from "@/components/page-section";
import { CategoryBreadcrumb } from "@/app/work/category-page";
import { getWorkCategory } from "@/app/work/categories";
import { categoryPath } from "@/lib/work-paths";

const category = getWorkCategory("plotter");
const categoryRoute = categoryPath("plotter");

function xPost(postId) {
  return `https://x.com/i/status/${postId}`;
}

const M = "/work/plotter/media";

// ─────────────────────────────────────────────────────────────────────────────
// COPY: SEO / METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata = {
  title: "Polargraph development timeline",
  description:
    "Chronological build log for the DIY polargraph — tests, rebuilds, and milestones with photos and video.",
};

// ─────────────────────────────────────────────────────────────────────────────
// COPY: PAGE INTRO
// ─────────────────────────────────────────────────────────────────────────────

const pageIntro =
  "Chronological build log for the DIY polargraph (2023–2026), aligned to the original X thread. Each entry links to the source post; photos and video are from the local media archive where available.";

const pageLead =
  "← Plotter thread home";

// ─────────────────────────────────────────────────────────────────────────────
// COPY: MEDIA PHASES (shared IDs with homepage gallery)
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



function getPlotterMediaForPhase(phaseId) {
  return plotterMediaPhases.find((p) => p.id === phaseId) ?? null;
}

/** Resolve gallery items for a timeline entry (inline media or phase bucket). */
function getTimelineEntryMedia(entry) {
  if (entry.media?.length) return entry.media;
  const phase = entry.mediaPhaseId
    ? getPlotterMediaForPhase(entry.mediaPhaseId)
    : null;
  return phase?.items ?? null;
}



const plotterDevelopmentTimeline = [
  {
    id: "will-it-draw",
    phase: "01",
    date: "1 Feb 2023",
    title: "Will it draw?",
    summary:
      "First major public test: beaded blind cord as tension strings driving the gondola. Initial assembly and reinforcement.",
    paragraphs: [
      "Earliest core build post — hardware foundation with DIY materials (blind cord, steppers, improvised frame). The clip documents the machine actually moving and leaving ink.",
      "This milestone established that the polargraph was worth pursuing as a long-term studio thread rather than a one-off experiment.",
    ],
    mediaPhaseId: "will-it-draw",
    postId: "1620791998562308096",
    externalHref: xPost("1620791998562308096"),
    externalLabel: "Post on X (1 Feb 2023)",
    notes: "Earliest core build — DIY tension cord, initial assembly.",
    status: "documented",
  },
  {
    id: "feb-09-reliability",
    phase: "02",
    date: "9 Feb 2023",
    title: "Reliability & continuous marks",
    summary:
      "Further testing; multi-session plot after a PC crash. Pen up/down disabled for an aesthetic effect.",
    paragraphs: [
      "Early reliability testing: returning to a plot after failure and choosing to keep the pen down for visual continuity rather than conventional travel moves.",
      "Process resilience — learning what the machine and workflow could survive before investing in longer runs.",
    ],
    mediaPhaseId: "feb-09-reliability",
    postId: "1623635672039825408",
    externalHref: xPost("1623635672039825408"),
    externalLabel: "Post on X (9 Feb 2023)",
    notes: "Aesthetic discovery; post-crash continuation.",
    status: "documented",
  },
  {
    id: "apr-08-software-material",
    phase: "03",
    date: "8 Apr 2023",
    title: "Polargraph software & cartridge paper",
    summary:
      "Image path creator in Polargraph software; stress-testing cartridge paper.",
    paragraphs: [
      "Software exploration — using the Polargraph controller’s image path tools and pushing cheap cartridge paper to see what surface the biro plots could tolerate.",
      "Before/after documentation on the post; local archive includes a related prior test sheet.",
    ],
    mediaPhaseId: "apr-08-software-material",
    postId: "1644785362726731776",
    externalHref: xPost("1644785362726731776"),
    externalLabel: "Post on X (8 Apr 2023)",
    notes: "Material experiments; software path workflow.",
    status: "documented",
  },
  {
    id: "apr-11-multi-layer-biro",
    phase: "04",
    date: "11 Apr 2023",
    title: "Multi-layer biro (A4 → A6)",
    summary:
      "Red, green, and blue multi-layer experiments on A4; scaling tests down to A6.",
    paragraphs: [
      "Creative output series milestone — deliberately overlapping pen colours to build density and drift, then shrinking the format to see what survived at A6.",
      "Feeds the later “multi-layer biro” output family and the plotted heads language.",
    ],
    mediaPhaseId: "apr-11-multi-layer-biro",
    postId: "1645699444753551360",
    externalHref: xPost("1645699444753551360"),
    externalLabel: "Post on X (11 Apr 2023)",
    notes: "Layering technique development.",
    status: "documented",
  },
  {
    id: "apr-15-windows-crashes",
    phase: "05",
    date: "15 Apr 2023",
    title: "Windows crashes & desync",
    summary:
      "Windows update interrupted a multi-layer plot; desync between software and hardware.",
    paragraphs: [
      "Troubleshooting narrative only on X — no photos archived on this site yet. Documents the fragility of long plots under desktop OS updates.",
      "Humanizes the build story: the machine as something that fails in ordinary ways, not only mechanical ones.",
    ],
    mediaPhaseId: null,
    postId: "1647190777859043330",
    externalHref: xPost("1647190777859043330"),
    externalLabel: "Post on X (15 Apr 2023, part 1)",
    externalLinks: [
      {
        href: xPost("1647190777859043330"),
        label: "Post on X (part 1)",
      },
      {
        href: xPost("1647191499396857856"),
        label: "Post on X (part 2)",
      },
    ],
    notes: "Text-only thread on X.",
    status: "text-only",
  },
  {
    id: "apr-18-a4-long-plot",
    phase: "06",
    date: "18 Apr 2023",
    title: "Long A4 test plots",
    summary:
      "Larger A4 multi-hour test plot; speed experimentation across four documented sheets.",
    paragraphs: [
      "Process documentation at working scale — how long the machine could run, how speed changed the mark, and what a full sheet looked like when the session completed.",
      "Four photos on the original post; local archive mirrors the coverage test set.",
    ],
    mediaPhaseId: "apr-18-a4-long-plot",
    postId: "1648374348942655489",
    externalHref: xPost("1648374348942655489"),
    externalLabel: "Post on X (18 Apr 2023)",
    notes: "Duration and speed iteration.",
    status: "documented",
  },
  {
    id: "apr-20-portability",
    phase: "07",
    date: "20 Apr 2023",
    title: "Portability at parents'",
    summary:
      "Portability test with the original head; plots of the head and comparison to an original painting.",
    paragraphs: [
      "Key historical piece — original gondola/head before later rebuilds. Meta/self-referential art: the machine drawing itself and relating back to prior studio painting work.",
      "Video documents header outputs away from the main mount — proof the thread could travel.",
    ],
    mediaPhaseId: "apr-20-portability",
    postId: "1649037643693322242",
    externalHref: xPost("1649037643693322242"),
    externalLabel: "Post on X (20 Apr 2023)",
    notes: "Original head; self-referential plots.",
    status: "documented",
  },
  {
    id: "jun-19-react",
    phase: "08",
    date: "19 Jun 2023",
    title: "React project — digital home",
    summary:
      'Started a React project as the long-term digital "home" for the plotter thread.',
    paragraphs: [
      "No photos on the original post — the milestone is organizational. The interface was meant to hold archive, control, and narrative in one place.",
      "Direct line to this website rebuild: the plotter thread is still structured as portfolio + process log + shop funnel.",
    ],
    mediaPhaseId: null,
    postId: "1670773352472911874",
    externalHref: xPost("1670773352472911874"),
    externalLabel: "Post on X (19 Jun 2023)",
    notes: "Ties to current site architecture.",
    status: "text-only",
  },
  {
    id: "jul-2025-tower",
    phase: "09",
    date: "20 Jul 2025",
    title: "New tower setup",
    summary:
      "New tower after the move; re-install and first test plots. Remote monitoring / timelapse planned.",
    paragraphs: [
      "Re-assembly chapter — workspace evolution after relocating the studio. Video log of the tower coming back online.",
      "Sets up the 2025–2026 hardware iteration arc (gondola, belts, pen lift, then head-height mount).",
    ],
    mediaPhaseId: "jul-2025-tower",
    postId: "1946992814061191548",
    externalHref: xPost("1946992814061191548"),
    externalLabel: "Post on X (20 Jul 2025)",
    notes: "Post-move re-install.",
    status: "documented",
  },
  {
    id: "aug-2025-gondola",
    phase: "10",
    date: "22 Aug 2025",
    title: "New gondola & pen lift",
    summary:
      "New gondola build; chain swap; pen lift mechanism test.",
    paragraphs: [
      "Hardware iteration for reliability — addressing wear from the earlier cord-driven head and improving pen lift behaviour before longer portrait runs.",
      "Second rebuild video in the local archive (new belts, new gondola).",
    ],
    mediaPhaseId: "aug-2025-gondola",
    postId: "1958981621257806284",
    externalHref: xPost("1958981621257806284"),
    externalLabel: "Post on X (22 Aug 2025)",
    notes: "Mechanical refresh.",
    status: "documented",
  },
  {
    id: "mar-2026-head-height",
    phase: "11",
    date: "28 Mar 2026",
    title: "Above head height — current workspace",
    summary:
      'New above-head-height location; network/remote setup; "mountain moons" plot with stripe troubleshooting.',
    paragraphs: [
      "Current workspace integration — motors and anchors repositioned for head-height drawing. Remote/network control in progress alongside stripe registration issues on a large plot.",
      "Follow-up posts on X document troubleshooting; three photos archived here from the new mount tests.",
    ],
    mediaPhaseId: "mar-2026-head-height",
    postId: "2038010667131625791",
    externalHref: xPost("2038010667131625791"),
    externalLabel: "Post on X (28 Mar 2026)",
    notes: "Ongoing refinement; remote setup.",
    status: "documented",
  },
];



import Image from "next/image";

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
// COPY: FOOTER CTAs
// ─────────────────────────────────────────────────────────────────────────────

const footerCtas = {
  title: "Continue",
  summary:
    "Return to the plotter thread, the plotted heads project, or the Explorer.",
  buttons: [
    { href: categoryRoute, label: "Plotter thread home", primary: true },
    { href: "/work/plotter/projects/plotted-heads", label: "Plotted heads", primary: false },
    { href: "/work", label: "Explorer", primary: false },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT: PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function PlotterDevelopmentTimelinePage() {
  return (
    <PageSection
      eyebrow={
        <CategoryBreadcrumb
          categoryTitle={category.title}
          categoryRoute={categoryRoute}
          projectLabel="Development timeline"
        />
      }
      title="Polargraph development timeline"
      intro={pageIntro}
    >
      <article className="plotter-dev-timeline">
        <p className="plotter-dev-timeline__lead card-link__summary">
          <Link href={categoryRoute} className="plotter-dev-timeline__back">
            {pageLead}
          </Link>
        </p>

        <ol className="plotter-dev-timeline__list">
          {plotterDevelopmentTimeline.map((entry) => {
            const mediaItems = getTimelineEntryMedia(entry);
            const externalLinks =
              entry.externalLinks ??
              (entry.externalHref
                ? [{ href: entry.externalHref, label: entry.externalLabel }]
                : []);

            return (
              <li
                key={entry.id}
                id={entry.id}
                className={`plotter-dev-timeline__entry plotter-dev-timeline__entry--${entry.status}`}
              >
                <header className="plotter-dev-timeline__entry-header">
                  <span className="plotter-dev-timeline__phase">{entry.phase}</span>
                  <span className="plotter-dev-timeline__date">{entry.date}</span>
                  {entry.postId ? (
                    <span className="plotter-dev-timeline__post-id">
                      Post {entry.postId}
                    </span>
                  ) : null}
                  <h2 className="plotter-dev-timeline__entry-title">{entry.title}</h2>
                  <p className="card-link__summary">{entry.summary}</p>
                  {entry.notes ? (
                    <p className="plotter-dev-timeline__notes">{entry.notes}</p>
                  ) : null}
                  {entry.status === "text-only" ? (
                    <p className="plotter-dev-timeline__badge">
                      Narrative on X — no local media archive yet
                    </p>
                  ) : null}
                </header>

                {mediaItems?.length ? (
                  <div className="plotter-dev-timeline__media-grid">
                    {mediaItems.map((item) => (
                      <figure
                        key={item.src}
                        className="plotter-dev-timeline__figure"
                      >
                        <div className="plotter-dev-timeline__figure-media">
                          <PlotterMedia item={item} />
                        </div>
                        <figcaption className="plotter-dev-timeline__caption">
                          {item.alt}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                ) : entry.status === "text-only" ? null : (
                  <p className="plotter-dev-timeline__media-tbc">
                    Media referenced on the original post — not yet in the local
                    archive.
                  </p>
                )}

                <div className="prose crypto-article__prose plotter-dev-timeline__prose">
                  {entry.paragraphs.map((para) => (
                    <p key={para.slice(0, 40)}>{para}</p>
                  ))}
                </div>

                {externalLinks.length ? (
                  <ul className="plotter-dev-timeline__external-list">
                    {externalLinks.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="plotter-timeline__external"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {link.label}
                          <span className="sr-only"> (opens in new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ol>

        <section className="card crypto-cta-strip">
          <h2 className="card-link__title">Continue</h2>
          <p className="card-link__summary">
            Return to the plotter thread, the plotted heads project, or the Explorer.
          </p>
          <div className="btn-row" style={{ marginTop: "1rem" }}>
            <Link href={categoryRoute} className="btn">
              Plotter thread home
            </Link>
            <Link href="/work/plotter/projects/plotted-heads" className="btn btn-ghost">
              Plotted heads
            </Link>
            <Link href="/work" className="btn btn-ghost">
              Explorer
            </Link>
          </div>
        </section>
      </article>
    </PageSection>
  );
}
