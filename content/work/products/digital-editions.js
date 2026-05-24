/** /work/photography/products/digital-editions */
export const page = {
  layout: "productShelf",
  meta: {
    title: "Digital editions",
    intro:
      "Shop shelf for digital and on-chain editions. The crypto thread holds the curated portfolio; this page will later support wallet connect, listings, and checkout (see content/shop/FUTURE.md).",
  },
  breadcrumb: { category: "photography", label: "Digital editions" },
  sections: [
    {
      type: "tagRow",
      eyebrow: "Shop · static shelf",
      tags: ["Portfolio on /work/photography", "Commerce later"],
    },
    {
      type: "heroMedia",
      image: "/work/photography/crypto/banner.jpg",
      alt: "Banner from the on-chain photography period.",
    },
    {
      type: "proseHtml",
      title: "Product notes",
      html: `<p><strong>Portfolio vs shop:</strong> minted and collected work is presented manually on the <a href="/work/photography">Crypto / NFT</a> thread (Objkt, Teia, fxhash profile links). This product page is reserved for future shop behaviour — wallet connection, live contract state, and checkout — not for dumping a full on-chain holdings grid.</p><p>Until then, browse Under Orchard and xanderhizome holdings on Objkt and fxhash via the portfolio tiles, and add featured pieces to <code>content/crypto/collected/</code> as you curate.</p>`,
    },
    {
      type: "relatedLinks",
      title: "Source material",
      links: [
        {
          href: "/work/photography",
          label: "Crypto / NFT thread",
          eyebrow: "Work",
          summary: "Genesis NFT, portfolio, and Tezos minting from 2021.",
        },
        {
          href: "/work/photography/journal/crypto-art-value-paradigm",
          label: "Cryptoart, Value, and a Cultural Paradigm Shift",
          eyebrow: "Journal",
          summary: "Essay on NFTs, physical works, and cultural value.",
        },
      ],
    },
  ],
};
