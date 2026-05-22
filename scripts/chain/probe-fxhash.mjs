#!/usr/bin/env node
/**
 * Dev-only: sample fxhash user objkts / generative tokens.
 *
 * Usage:
 *   node scripts/chain/probe-fxhash.mjs --user tz1… [--limit 5] [--mode collected|authored]
 */

import { gql, loadIdentities, parseArgs, printTiles, PROBE_OUT_DIR, toThreadTile } from "./lib.mjs";
import path from "path";

const FXHASH = "https://api.fxhash.xyz/graphql";

const QUERY_USER_COLLECTED = `
  query UserObjkts($id: String!, $take: Int!) {
    user(id: $id) {
      id
      objkts(take: $take, skip: 0) {
        id
        iteration
        generativeToken { id name }
        metadata { name thumbnailUri }
      }
    }
  }
`;

const QUERY_USER_AUTHORED = `
  query UserProjects($filters: GenerativeTokenFilter, $take: Int!) {
    generativeTokens(filters: $filters, take: $take) {
      id
      name
      createdAt
      thumbnailUri
    }
  }
`;

function gentkTile(objkt) {
  const gt = objkt.generativeToken;
  const name =
    objkt.metadata?.name ?? `${gt?.name ?? "GENTK"} #${objkt.iteration ?? "?"}`;
  const href = `https://www.fxhash.xyz/gentk/${objkt.id}`;
  return toThreadTile({
    slug: `fxhash-gentk-${objkt.id}`,
    title: name,
    year: null,
    summary: `Collected on fxhash — project ${gt?.id ?? "?"}.`,
    href,
    external: true,
    image: null,
    platform: "fxhash",
  });
}

function projectTile(gt) {
  const year = gt.createdAt
    ? String(new Date(gt.createdAt).getFullYear())
    : null;
  return toThreadTile({
    slug: `fxhash-project-${gt.id}`,
    title: gt.name ?? `Project #${gt.id}`,
    year,
    summary: `Generative project on fxhash.`,
    href: `https://www.fxhash.xyz/generative/${gt.id}`,
    external: true,
    image: null,
    platform: "fxhash",
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const limit = Math.min(parseInt(args.limit ?? "5", 10) || 5, 30);
  const id = loadIdentities();

  const userId =
    args.user ??
    args.wallet ??
    (args.mint ? id.mint?.tezos : null) ??
    id.collect?.tezos;

  if (!userId) {
    console.error("Provide --user tz1… or set mint.tezos / collect.tezos in identities.json");
    process.exit(1);
  }

  const mode = args.mode ?? "collected";
  let tiles = [];

  if (mode === "authored") {
    const data = await gql(FXHASH, QUERY_USER_AUTHORED, {
      filters: { authorId_eq: userId },
      take: limit,
    });
    tiles = (data?.generativeTokens ?? []).map(projectTile);
  } else {
    const data = await gql(FXHASH, QUERY_USER_COLLECTED, {
      id: userId,
      take: limit,
    });
    const user = data?.user;
    if (!user) {
      console.error("No fxhash user for", userId);
      process.exit(1);
    }
    tiles = (user.objkts ?? []).map(gentkTile);
  }

  const out = args.out ?? (args.write ? path.join(PROBE_OUT_DIR, `fxhash-${userId.slice(0, 10)}.json`) : undefined);
  printTiles(tiles, { out });
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
