import Link from "next/link";
import { notFound } from "next/navigation";

import { PageSection } from "@/components/page-section";
import { ProseBlocks } from "@/components/prose-blocks";
import { RelatedLinks } from "@/components/related-links";
import { journalBodies } from "@/app/journal/registry";
import journalManifest from "@/app/journal/manifest.json";

export function generateStaticParams() {
  return journalManifest
    .filter((item) => item.status === "published")
    .map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entry = journalManifest.find((item) => item.slug === slug);
  if (!entry) return { title: "Journal" };
  return {
    title: entry.title,
    description: entry.summary,
  };
}

export default async function JournalEntryPage({ params }) {
  const { slug } = await params;
  const entry = journalManifest.find((item) => item.slug === slug);
  const blocks = journalBodies[slug];

  if (!entry || !blocks) notFound();

  return (
    <PageSection
      eyebrow={
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/journal">Journal</Link>
          <span className="breadcrumb__sep">/</span>
          <span>{entry.title}</span>
        </nav>
      }
      title={entry.title}
      intro={entry.summary}
    >
      {entry.date ? <p className="eyebrow">{entry.date}</p> : null}

      <article className="card prose">
        <ProseBlocks blocks={blocks} linkContext="content" />
      </article>

      {entry.related?.length ? (
        <RelatedLinks title="Related reading" links={entry.related} />
      ) : null}
    </PageSection>
  );
}
