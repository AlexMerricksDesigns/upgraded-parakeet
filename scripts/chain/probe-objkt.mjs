#!/usr/bin/env node
/**
 * Dev-only: query Objkt GraphQL for one wallet or FA2 contract.
 * Prints ThreadTile JSON for manual paste into content/crypto/.
 *
 * Usage:
 *   node scripts/chain/probe-objkt.mjs --wallet tz1… [--limit 5] [--out path]
 *   node scripts/chain/probe-objkt.mjs --contract KT1… [--limit 5]
 *   node scripts/chain/probe-objkt.mjs --resolve-mint
 */

import {
  gql,
  loadIdentities,
  mediaUrl,
  parseArgs,
  printTiles,
  PROBE_OUT_DIR,
  toThreadTile,
} from "./lib.mjs";
import path from "path";

const OBJKT = "https://data.objkt.com/v3/graphql";

const QUERY_WALLET_MINTS = `
  query WalletMints($address: String!, $limit: Int!, $offset: Int!) {
    holder(where: { address: { _eq: $address } }) {
      address
      alias
      tzdomain
      created_tokens(
        order_by: { timestamp: desc }
        limit: $limit
        offset: $offset
      ) {
        timestamp
        token {
          name
          fa_contract
          token_id
          display_uri
          thumbnail_uri
          fa { name }
        }
      }
    }
  }
`;

const QUERY_WALLET_HELD = `
  query WalletHeld($address: String!, $limit: Int!, $offset: Int!) {
    holder(where: { address: { _eq: $address } }) {
      address
      held_tokens(
        where: { quantity: { _gt: "0" } }
        order_by: { last_incremented_at: desc }
        limit: $limit
        offset: $offset
      ) {
        token {
          name
          fa_contract
          token_id
          display_uri
          thumbnail_uri
          fa { name }
        }
      }
    }
  }
`;

const QUERY_CONTRACT = `
  query FaTokens($contract: String!, $limit: Int!, $offset: Int!) {
    token(
      where: { fa_contract: { _eq: $contract } }
      order_by: { token_id: asc }
      limit: $limit
      offset: $offset
    ) {
      name
      fa_contract
      token_id
      display_uri
      thumbnail_uri
      timestamp
      fa { name }
    }
  }
`;

const QUERY_RESOLVE_ALIAS = `
  query Holders($pattern: String!) {
    holder(where: { alias: { _ilike: $pattern } }, limit: 10) {
      address
      alias
      tzdomain
    }
  }
`;

function tokenToTile(token, { role = "token" }) {
  const contract = token.fa_contract;
  const tokenId = token.token_id;
  const href = `https://objkt.com/tokens/${contract}/${tokenId}`;
  const slug = `${contract.slice(0, 8)}-${tokenId}`.toLowerCase();
  const year = token.timestamp
    ? String(new Date(token.timestamp).getFullYear())
    : null;
  const platform = token.fa?.name
    ? `Tezos · ${token.fa.name}`
    : "Tezos · objkt";

  return toThreadTile({
    slug,
    title: token.name || `Token #${tokenId}`,
    year,
    summary: `${role} — ${contract} #${tokenId}. Paste image path locally if needed.`,
    href,
    external: true,
    image: null,
    platform,
  });
}

async function resolveMint() {
  const id = loadIdentities();
  const data = await gql(OBJKT, QUERY_RESOLVE_ALIAS, {
    pattern: "%xander%",
  });
  const holders = data?.holder ?? [];
  console.error("Candidates (set mint.tezos in content/crypto/identities.json):");
  for (const h of holders) {
    console.error(
      `  ${h.address}  alias=${h.alias ?? "—"}  tzdomain=${h.tzdomain ?? "—"}`
    );
  }
  if (holders.length === 1) {
    console.error(`\nSuggested: ${holders[0].address}`);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const limit = Math.min(parseInt(args.limit ?? "5", 10) || 5, 50);

  if (args["resolve-mint"]) {
    await resolveMint();
    return;
  }

  let tiles = [];
  let label = "objkt";

  if (args.contract) {
    const data = await gql(OBJKT, QUERY_CONTRACT, {
      contract: args.contract,
      limit,
      offset: parseInt(args.offset ?? "0", 10) || 0,
    });
    tiles = (data?.token ?? []).map((t) => tokenToTile(t, { role: "contract" }));
    label = `contract-${args.contract.slice(0, 12)}`;
  } else if (args.wallet) {
    const mode = args.mode ?? "held";
    const query = mode === "mints" ? QUERY_WALLET_MINTS : QUERY_WALLET_HELD;
    const data = await gql(OBJKT, query, {
      address: args.wallet,
      limit,
      offset: parseInt(args.offset ?? "0", 10) || 0,
    });
    const holder = data?.holder?.[0];
    if (!holder) {
      console.error("No holder found for", args.wallet);
      process.exit(1);
    }
    if (mode === "mints") {
      tiles = (holder.created_tokens ?? []).map((row) =>
        tokenToTile(
          { ...row.token, timestamp: row.timestamp },
          { role: "minted" }
        )
      );
    } else {
      tiles = (holder.held_tokens ?? []).map((row) =>
        tokenToTile(row.token, { role: "collected" })
      );
    }
    label = `wallet-${args.wallet.slice(0, 10)}-${mode}`;
  } else {
    console.error(`Usage:
  --wallet tz1… [--mode held|mints] [--limit N]
  --contract KT1… [--limit N]
  --resolve-mint
  --out content/crypto/.probe-output/sample.json`);
    process.exit(1);
  }

  const out =
    args.out ??
    (args.write
      ? path.join(PROBE_OUT_DIR, `${label}.json`)
      : undefined);

  printTiles(tiles, { out });
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
