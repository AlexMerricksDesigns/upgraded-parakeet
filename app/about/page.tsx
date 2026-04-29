import { PageSection } from "@/components/page-section";
import { siteContent } from "@/content/site";

export default function AboutPage() {
  return (
    <>
      <PageSection eyebrow="About" title="A studio home for work with a point of view">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5 text-lg leading-8 text-stone-700">
            <p>{siteContent.about.story}</p>
            <p>
              This page can become the fuller story: background, process,
              influences, materials, and the reason the business exists.
            </p>
          </div>
          <div className="rounded-[2rem] border border-stone-200 bg-stone-100 p-6">
            <h2 className="font-display text-2xl text-stone-950">Working principles</h2>
            <ul className="mt-5 space-y-3 text-sm text-stone-700">
              {siteContent.about.principles.map((principle) => (
                <li key={principle} className="rounded-2xl bg-white p-4 shadow-sm">
                  {principle}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>
    </>
  );
}
