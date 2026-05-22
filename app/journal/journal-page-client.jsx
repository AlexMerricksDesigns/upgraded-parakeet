"use client";

import { PageHero } from "@/components/page-hero";
import { PageSection } from "@/components/page-section";
import { CardLinkKind } from "@/components/card-link-kind";
import { pageHero } from "@/app/site";
import { scrollToSection } from "@/lib/scroll-to-section";

const hero = pageHero.journal;

export function JournalPageClient({ posts }) {
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        images={hero.image}
        actions={[
          {
            label: "Browse writing",
            onClick: () => scrollToSection("journal-grid"),
            variant: "primary",
          },
          { label: "View work", href: "/work", variant: "ghost" },
        ]}
      />

      <PageSection eyebrow="Journal" title="Writing">
        <div id="journal-grid" className="grid-2">
          {posts.map((post) => (
            <CardLinkKind
              key={post.href}
              href={post.href}
              context="content"
              title={post.title}
              summary={post.summary}
              eyebrow={post.date || post.year}
              mediaEmpty
            />
          ))}
        </div>
      </PageSection>
    </>
  );
}
