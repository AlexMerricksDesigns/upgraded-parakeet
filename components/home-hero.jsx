"use client";

import { PageHero } from "@/components/page-hero";
import { heroImages, siteConfig } from "@/app/site";

export function HomeHero() {
  return (
    <PageHero
      eyebrow={siteConfig.heroEyebrow ?? siteConfig.tagline}
      title={siteConfig.name}
      description={siteConfig.description}
      images={heroImages}
      actions={[
        { label: "Visit the shop", href: "/shop", variant: "primary" },
        { label: "Browse the work", href: "/work", variant: "ghost" },
      ]}
      credit="photography by Xander Merricks."
    />
  );
}
