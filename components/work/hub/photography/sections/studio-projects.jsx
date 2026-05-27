import { ThreadSection } from "@/app/work/hub-primitives";
import {
  getWorkCategory,
  manifestToProjectTiles,
} from "@/app/work/categories";

export function StudioProjectsSection() {
  const category = getWorkCategory("photography");
  const subsection = category?.subsections?.find((s) => s.id === "captured");
  const slugs = subsection?.slugs ?? [];
  const projects = manifestToProjectTiles("photography", slugs);

  if (!projects.length) return null;

  return (
    <ThreadSection
      section={{
        id: "studio",
        title: "Studio projects",
        intro: "Projector-led drawing and painting studies from the studio blog.",
        groups: [{ id: "projects", title: "On this site", items: projects }],
      }}
    />
  );
}
