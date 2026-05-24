import Link from "next/link";

import { CardLinkKind } from "@/components/card-link-kind";
import { PageSection } from "@/components/page-section";
import { getWorkProjects } from "@/lib/manifests";

export const metadata = {
  title: "Archive",
  description: "Earlier experiments and studio work from the archive.",
};

export default function ArchivePage() {
  const archived = getWorkProjects().filter(
    (p) => p.year && Number(p.year) < 2020
  );

  return (
    <PageSection
      eyebrow={
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/work">Work</Link>
          <span className="breadcrumb__sep">/</span>
          <span>Archive</span>
        </nav>
      }
      title="Archive"
      intro="Earlier making and studio work from before 2020, grouped for browsing."
    >
      <div className="grid-2">
        {archived.length > 0 ? (
          archived.map((project) => (
            <CardLinkKind
              key={project.href}
              href={project.href}
              context="content"
              title={project.title}
              summary={project.summary}
              eyebrow={project.year}
              image={project.image}
            />
          ))
        ) : (
          <p className="card-link__summary">No archived entries yet.</p>
        )}
      </div>
    </PageSection>
  );
}
