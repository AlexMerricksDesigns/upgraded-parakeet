import { PageSection } from "@/components/page-section";
import { projects } from "@/content/site";

export const metadata = {
  title: "Work",
  description: "Selected portfolio projects and experiments.",
};

export default function WorkPage() {
  return (
    <PageSection
      eyebrow="Work"
      title="A focused place for design work, experiments, and proof of direction."
      intro="Replace these cards with the projects, collections, prototypes, and client work that best explain where the business is going."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <article
            className="flex min-h-72 flex-col rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm"
            key={project.title}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
              {project.year}
            </p>
            <h2 className="mt-5 text-2xl font-semibold text-stone-950">
              {project.title}
            </h2>
            <p className="mt-4 flex-1 text-sm leading-7 text-stone-600">
              {project.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </PageSection>
  );
}
