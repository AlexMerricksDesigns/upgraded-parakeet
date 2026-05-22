import { PageHero } from "@/components/page-hero";
import { PageSection } from "@/components/page-section";
import { aboutContent, pageHero } from "@/app/site";

export const metadata = {
  title: "About",
};

const hero = pageHero.about;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        images={hero.image}
        actions={[
          { label: "Browse the work", href: "/work", variant: "primary" },
          { label: "Read the journal", href: "/journal", variant: "ghost" },
        ]}
      />

      <PageSection eyebrow="About" title="Studio notes">
        <div className="grid-2">
          <div className="prose">
            <p>{aboutContent.story}</p>
            <p>
              Trained at the University of Brighton, I&apos;ve long been drawn to
              the camera as both recording device and thinking instrument. Over
              time this has expanded into blockchain-native publishing (primarily
              on Tezos via Objkt and Teia), generative experiments, design
              systems, and small-scale fabrication. The through-line is a
              fascination with derivation: how one thing leads to another, how
              context shifts meaning, and how images and objects can carry
              layered thought.
            </p>
            <p>
              Derive Studio emerged as a container for these explorations — a
              virtual space (and occasional physical echo) for series that play
              with drift, détournement, and the productive accidents of making.
            </p>
            <p>
              This site brings years of scattered digital homes into one place —
              part portfolio, part journal, part storefront. The goal is not just
              to show the work but to sustain it: through editions, prints,
              collaborations, and tools that extend the practice outward.
            </p>
          </div>

          <aside className="card">
            <h2 className="card-link__title">Present lines of interest</h2>
            <ul
              className="stack"
              style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}
            >
              {aboutContent.principles.map((principle) => (
                <li
                  key={principle}
                  className="card"
                  style={{ padding: "1rem", boxShadow: "none" }}
                >
                  {principle}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </PageSection>
    </>
  );
}
