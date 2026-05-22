import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.join(__dirname, "../..");
export const IDENTITIES_PATH = path.join(ROOT, "content/crypto/identities.json");
export const PROBE_OUT_DIR = path.join(ROOT, "content/crypto/.probe-output");

export function loadIdentities() {
  return JSON.parse(fs.readFileSync(IDENTITIES_PATH, "utf8"));
}

export async function gql(endpoint, query, variables = {}) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  return json.data;
}

/** IPFS / display URI → https URL for previews */
export function mediaUrl(uri) {
  if (!uri) return null;
  if (uri.startsWith("http")) return uri;
  const cid = uri.replace(/^ipfs:\/\//, "").replace(/^\/ipfs\//, "");
  return `https://assets.objkt.media/file/assets-003/${cid}/display/800`;
}

/**
 * ThreadTile-shaped object for paste into content/crypto JSON or content.js.
 */
export function toThreadTile({
  slug,
  title,
  year,
  summary,
  href,
  external = true,
  image = null,
  platform,
}) {
  return {
    slug,
    title,
    year: year ?? null,
    summary,
    href,
    external,
    image,
    platform,
  };
}

export function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith("--")) {
        args[key] = next;
        i++;
      } else {
        args[key] = true;
      }
    } else {
      args._.push(a);
    }
  }
  return args;
}

export function printTiles(tiles, { out } = {}) {
  const json = JSON.stringify(tiles, null, 2);
  console.log(json);
  if (out) {
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, json + "\n");
    console.error(`Wrote ${out}`);
  }
}
