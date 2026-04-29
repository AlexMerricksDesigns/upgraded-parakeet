import { posts } from "@/content/site";
import { PageSection } from "@/components/page-section";

export default function JournalPage() {
  return (
    <PageSection
      eyebrow="Journal"
      title="Updates, making notes, and the public process."
      intro="A lightweight place for the thinking behind the work: launches, experiments, lessons, and useful context for people following the studio."
    >
      <div className="grid gap-5">
        {posts.map((post) => (
          <article
            key={post.title}
            className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-500">
              {post.date}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-stone-950">
              {post.title}
            </h2>
            <p className="mt-3 text-stone-700">{post.summary}</p>
          </article>
        ))}
      </div>
    </PageSection>
  );
}
