import Link from "next/link";

import { PageSection } from "@/components/page-section";
import { projects, products, siteConfig } from "@/content/site";

export default function Home() {
  const featuredProjects = projects.slice(0, 2);
  const featuredProducts = products.slice(0, 3);

  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.2fr_0.8fr] md:py-24">
        <div>
          <p className="eyebrow">Portfolio / store / studio notes</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-balance md:text-7xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="button-primary" href="/shop">
              Explore the shop
            </Link>
            <Link className="button-secondary" href="/work">
              View the work
            </Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
          <p className="eyebrow">Current focus</p>
          <h2 className="mt-4 text-2xl font-semibold">
            Build a public home for the business while shaping the first offers.
          </h2>
          <p className="mt-4 text-stone-700">
            Use this area to name the product direction, announce the next
            release, or invite early collaborators and customers.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-stone-700">
            <li>• Portfolio credibility and selected work</li>
            <li>• Product placeholders ready for real listings</li>
            <li>• Journal space for process, launches, and updates</li>
          </ul>
        </div>
      </section>

      <PageSection
        eyebrow="Selected work"
        title="A first pass at the portfolio."
        intro="Replace these cards with real projects, collaborations, experiments, or case studies."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <article className="card" key={project.slug}>
              <p className="eyebrow">{project.year}</p>
              <h3 className="mt-3 text-2xl font-semibold">{project.title}</h3>
              <p className="mt-3 text-stone-700">{project.summary}</p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection
        eyebrow="Shop preview"
        title="Product ideas can start as placeholders."
        intro="This keeps momentum going before checkout, photography, pricing, and fulfilment are final."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <article className="card" key={product.slug}>
              <p className="eyebrow">{product.status}</p>
              <h3 className="mt-3 text-xl font-semibold">{product.title}</h3>
              <p className="mt-3 text-sm text-stone-700">{product.summary}</p>
              <p className="mt-5 font-semibold">{product.price}</p>
            </article>
          ))}
        </div>
      </PageSection>
    </>
  );
}
