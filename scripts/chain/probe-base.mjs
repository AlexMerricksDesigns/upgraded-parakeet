#!/usr/bin/env node
/**
 * Dev-only: sample Base NFTs via Alchemy (requires ALCHEMY_API_KEY in .env).
 *
 * Usage:
 *   node scripts/chain/probe-base.mjs [--wallet 0x…] [--limit 5]
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadIdentities, parseArgs, printTiles, PROBE_OUT_DIR, toThreadTile } from "./lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "../..");

function loadEnv() {
  const envPath = path.join(ROOT, ".env");
  if (!fs.existsSync(envPath)) return {};
  const out = {};
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) out[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
  }
  return out;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const id = loadIdentities();
  const wallet = (args.wallet ?? id.base?.evm)?.toLowerCase();
  const limit = Math.min(parseInt(args.limit ?? "5", 10) || 5, 20);

  if (!wallet) {
    console.error("Set base.evm in identities.json or pass --wallet 0x…");
    process.exit(1);
  }

  const key = loadEnv().ALCHEMY_API_KEY ?? process.env.ALCHEMY_API_KEY;
  if (!key) {
    console.error("Missing ALCHEMY_API_KEY in .env (not required for the static site).");
    process.exit(1);
  }

  const url = `https://base-mainnet.g.alchemy.com/nft/v3/${key}/getNFTsForOwner?owner=${wallet}&withMetadata=true&pageSize=${limit}`;
  const res = await fetch(url);
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || json.error || res.statusText);
  }

  const nfts = json.ownedNfts ?? [];

  const tiles = nfts.slice(0, limit).map((nft, i) => {
    const meta = nft.raw?.metadata ?? nft.metadata ?? {};
    const contract = nft.contract?.address ?? "unknown";
    const tokenId = nft.tokenId ?? String(i);
    const title = meta.name ?? `NFT #${tokenId}`;
    const image = meta.image ?? null;
    return toThreadTile({
      slug: `base-${contract.slice(2, 10)}-${tokenId}`.replace(/[^a-z0-9-]/gi, "-"),
      title,
      year: null,
      summary: `Base — ${contract.slice(0, 10)}… #${tokenId}.`,
      href: `https://opensea.io/assets/base/${contract}/${tokenId}`,
      external: true,
      image: typeof image === "string" && image.startsWith("http") ? image : null,
      platform: "Base",
    });
  });

  const out =
    args.out ??
    (args.write ? path.join(PROBE_OUT_DIR, `base-${wallet.slice(0, 10)}.json`) : undefined);

  printTiles(tiles, { out });
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
