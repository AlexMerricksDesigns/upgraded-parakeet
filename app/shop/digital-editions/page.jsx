import Image from "next/image";
import Link from "next/link";

import { PageSection } from "@/components/page-section";
import { RelatedLinks } from "@/components/related-links";

export const metadata = {
  title: "Digital editions",
  description:
    "On-chain and digital editions from the photography and crypto-art period. Checkout wiring in progress.",
};

const related = [
  {
    href: "/work/crypto",
    label: "Photography and on-chain work",
    eyebrow: "Work",
    summary: "Genesis NFT, portfolio, and Tezos minting from 2021.",
  },
  {
    href: "/work/crypto/journal/crypto-art-value-paradigm",
    label: "Cryptoart, Value, and a Cultural Paradigm Shift",
    eyebrow: "Journal",
    summary: "Essay on NFTs, physical works, and cultural value.",
  },
];

export default function DigitalEditionsPage() {
  return (
    <PageSection
      eyebrow={
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/shop">Shop</Link>
          <span className="breadcrumb__sep">/</span>
          <span>Digital editions</span>
        </nav>
      }
      title="Digital editions"
      intro="On-chain and digital editions from the photography and crypto-art period. Checkout wiring in progress."
    >
      <div className="tag-row">
        <span className="eyebrow">Coming soon</span>
        <span className="tag">TBC</span>
        <span className="tag">Digital</span>
      </div>

      <div className="hero-media">
        <Image
          src="/work/crypto/banner.jpg"
          alt="Banner from the on-chain photography period."
          fill
          priority
          sizes="(min-width: 1024px) 72rem, 100vw"
        />
      </div>

      <section className="card">
        <h2 className="card-link__title">Product notes</h2>
        <div className="prose" style={{ marginTop: "1.5rem" }}>
          <p>
            This shelf is a placeholder for digital and on-chain editions linked
            to the 2021 crypto-art work. External platforms (BAE, Hic et Nunc,
            portfolio sites) remain linked from the work and journal pages until
            checkout is wired here.
          </p>
          <p>
            When the store is ready, this page will list available editions with
            price, format, and purchase flow—without changing the underlying
            project and essay structure.
          </p>
        </div>
      </section>

      <RelatedLinks title="Source material" links={related} context="shop" />
    </PageSection>
  );
}
