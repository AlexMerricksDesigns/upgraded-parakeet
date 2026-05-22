"use client";

import { PageHero } from "@/components/page-hero";
import { PageSection } from "@/components/page-section";
import { CardLinkKind } from "@/components/card-link-kind";
import { pageHero } from "@/app/site";
import { scrollToSection } from "@/lib/scroll-to-section";

const hero = pageHero.shop;

export function ShopPageClient({ products }) {
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        images={hero.image}
        mediaType={hero.mediaType ?? "image"}
        actions={[
          {
            label: "Browse products",
            onClick: () => scrollToSection("shop-grid"),
            variant: "primary",
          },
          { label: "View work", href: "/work", variant: "ghost" },
        ]}
      />

      <PageSection
        eyebrow="Shop"
        title="Products"
        intro="Shape the offer here before connecting checkout."
      >
        <div id="shop-grid" className="grid-3">
          {products.map((product) => (
            <CardLinkKind
              key={product.href}
              href={product.href}
              context="shop"
              title={product.name}
              summary={product.summary}
              eyebrow={product.status}
              image={product.image}
              footer={
                <div className="card-link__footer">
                  <span>{product.price}</span>
                  {product.format ? (
                    <span className="tag">{product.format}</span>
                  ) : null}
                </div>
              }
            />
          ))}
        </div>
      </PageSection>
    </>
  );
}
