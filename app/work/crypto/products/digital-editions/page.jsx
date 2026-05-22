import Image from "next/image";

import { PageSection } from "@/components/page-section";
import { RelatedLinks } from "@/components/related-links";
import { CategoryBreadcrumb } from "@/app/work/category-page";
import { getWorkCategory } from "@/app/work/categories";
import { categoryPath, journalPath } from "@/lib/work-paths";

export const metadata = {
  title: "Digital editions",
  description:
    "Shop shelf for on-chain editions. Portfolio is curated on the crypto thread; wallet and live listings come later.",
};

const cryptoCategory = getWorkCategory("crypto");

const related = [
  {
    href: categoryPath("crypto"),
    label: "Crypto / NFT thread",
    eyebrow: "Work",
    summary: "Genesis NFT, portfolio, and Tezos minting from 2021.",
  },
  {
    href: journalPath("crypto", "crypto-art-value-paradigm"),
    label: "Cryptoart, Value, and a Cultural Paradigm Shift",
    eyebrow: "Journal",
    summary: "Essay on NFTs, physical works, and cultural value.",
  },
];

export default function DigitalEditionsPage() {
  return (
    <PageSection
      eyebrow={
        <CategoryBreadcrumb
          categoryTitle={cryptoCategory.title}
          categoryRoute={categoryPath("crypto")}
          projectLabel="Digital editions"
        />
      }
      title="Digital editions"
      intro="Shop shelf for digital and on-chain editions. The crypto thread holds the curated portfolio; this page will later support wallet connect, listings, and checkout (see content/shop/FUTURE.md)."
    >
      <div className="tag-row">
        <span className="eyebrow">Shop · static shelf</span>
        <span className="tag">Portfolio on /work/crypto</span>
        <span className="tag">Commerce later</span>
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
            <strong>Portfolio vs shop:</strong> minted and collected work is
            presented manually on the{" "}
            <a href={categoryPath("crypto")}>Crypto / NFT</a> thread (Objkt, Teia,
            fxhash profile links). This product page is reserved for future shop
            behaviour — wallet connection, live contract state, and checkout — not
            for dumping a full on-chain holdings grid.
          </p>
          <p>
            Until then, browse Under Orchard and xanderhizome holdings on Objkt
            and fxhash via the portfolio tiles, and add featured pieces to{" "}
            <code>content/crypto/collected/</code> as you curate.
          </p>
        </div>
      </section>

      <RelatedLinks title="Source material" links={related} context="content" />
    </PageSection>
  );
}
