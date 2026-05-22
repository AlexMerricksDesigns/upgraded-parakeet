import Image from "next/image";
import Link from "next/link";

import { HomeHero } from "@/components/home-hero";
import { PageSection } from "@/components/page-section";

const featuredProjects = [
  {
    href: "/work/plotter/projects/plotted-heads",
    year: "2021",
    title: "Plotted heads series",
    summary:
      "An evolving plotter-led portrait series where repeated marks let faces emerge through drift, density, and misalignment.",
    image: "/work/plotted-heads/plotter-drawings001.jpg",
    tags: ["Emergent forms", "Plotter"],
  },
];

const featuredProducts = [
  {
    href: "/work/plotter/products/postcards",
    status: "Prototype",
    name: "Postcard Series (6-card set)",
    summary:
      "A small edition set pulled from derivations and detours in image-making.",
    image: "/shop/postcards/IMG_5206.jpg",
    price: "TBC",
  },
];

export default function Home() {
  return (
    <>
      <HomeHero />

      <PageSection
        eyebrow="Recent work"
        title="A foundation series, with more to follow."
        intro="The current focus: portrait work made with a plotter, and the first product editions that grow out of it."
      >
        <div className="grid-3">
          {featuredProjects.map((project) => (
            <Link
              href={project.href}
              key={project.href}
              className="card-link"
            >
              <div className="card-link__media">
                {project.image ? (
                  <Image
                    alt={project.title}
                    src={project.image}
                    fill
                    sizes="(min-width: 900px) 33vw, 100vw"
                  />
                ) : null}
              </div>
              <div className="card-link__body">
                <p className="eyebrow">{project.year}</p>
                <h2 className="card-link__title">{project.title}</h2>
                <p className="card-link__summary">{project.summary}</p>
                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </PageSection>

      <PageSection
        eyebrow="Shop"
        title="A small shelf, growing slowly."
        intro="Each item starts as a prototype and graduates when it's ready. The first one is a six-card postcard set, drawn from the plotted portrait work."
      >
        <div className="grid-3">
          {featuredProducts.map((product) => (
            <Link
              href={product.href}
              key={product.href}
              className="card-link"
            >
              <div className="card-link__media">
                {product.image ? (
                  <Image
                    alt={product.name}
                    src={product.image}
                    fill
                    sizes="(min-width: 900px) 33vw, 100vw"
                  />
                ) : null}
              </div>
              <div className="card-link__body">
                <p className="eyebrow">{product.status}</p>
                <h2 className="card-link__title">{product.name}</h2>
                <p className="card-link__summary">{product.summary}</p>
                <div className="card-link__footer">
                  <span>{product.price}</span>
                  <span>View</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </PageSection>
    </>
  );
}
