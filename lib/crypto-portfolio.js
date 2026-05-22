/**
 * Load manually curated crypto portfolio series (static JSON).
 * See content/crypto/README.md for the ThreadTile schema.
 */

import brightonByBench from "@/content/crypto/minted/brighton-by-bench.json";
import underOrchardFeatured from "@/content/crypto/collected/under-orchard-featured.json";
import identities from "@/content/crypto/identities.json";

const MINTED_SERIES = [brightonByBench];
const COLLECTED_SERIES = [underOrchardFeatured];

/** @returns {typeof identities} */
export function getChainIdentities() {
  return identities;
}

/** Profile URL for a Tezos address on a marketplace. */
export function profileUrl(kind, tezos) {
  if (!tezos) return null;
  const templates = identities.profiles ?? {};
  const template = templates[kind];
  return template ? template.replace("{tezos}", tezos) : null;
}

/** Mint wallet tz1 if resolved in identities.json. */
export function getMintTezos() {
  return identities.mint?.tezos ?? null;
}

/** Under Orchard collector tz1. */
export function getCollectTezos() {
  return identities.collect?.tezos ?? null;
}

/**
 * Flatten series files into ThreadTile items.
 * @param {{ id: string; title: string; items: object[] }[]} series
 */
export function flattenSeriesItems(series) {
  return series.flatMap((s) =>
    (s.items ?? []).map((item) => ({
      ...item,
      slug: item.slug ?? `${s.id}-${item.title}`.toLowerCase().replace(/\s+/g, "-"),
    }))
  );
}

export function getMintedSeriesItems() {
  return flattenSeriesItems(MINTED_SERIES);
}

export function getCollectedSeriesItems() {
  return flattenSeriesItems(COLLECTED_SERIES);
}
