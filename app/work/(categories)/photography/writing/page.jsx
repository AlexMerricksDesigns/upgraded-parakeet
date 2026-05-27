import { ThreadSection } from "@/app/work/hub-primitives";
import { PageSection } from "@/components/page-section";
import {
  getCategorySubsection,
  getWorkCategory,
} from "@/app/work/categories";

const category = getWorkCategory("photography");

export default function PhotographyWritingPage() {
  const published = getCategorySubsection(category, "published");
  const fieldNotes = getCategorySubsection(category, "field-notes");

  const writingSection = published
    ? {
        ...published,
        title: "Writing & editions",
        intro:
          published.intro ??
          "Essays on value and crypto art, plus product shelves for digital editions and limited prints.",
      }
    : null;

  return (
    <PageSection eyebrow={null} title="" intro={null}>
      <article className="work-hub-page plotter-page photography-page">
        <header className="photography-writing-page__lead">
          <h1 id="photography-writing-heading" className="work-hub-section__title">
            Writing
          </h1>
          <p className="work-hub-section__intro">
            Essays, editions, and field notes filed under the photography thread.
          </p>
        </header>
        {writingSection ? <ThreadSection section={writingSection} /> : null}
        {fieldNotes ? <ThreadSection section={fieldNotes} /> : null}
      </article>
    </PageSection>
  );
}
