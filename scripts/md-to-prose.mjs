/**
 * Converts simple markdown files to a prose JSX-friendly structure.
 * Usage: node scripts/md-to-prose.mjs <ingest-md-path> <output-js-path>
 */
import fs from "fs";
import path from "path";

const [,, inputArg, outputArg] = process.argv;
if (!inputArg || !outputArg) {
  console.error("Usage: node scripts/md-to-prose.mjs <input.md> <output.js>");
  process.exit(1);
}

const md = fs.readFileSync(inputArg, "utf8");
const lines = md.split(/\r?\n/);
const blocks = [];
let i = 0;

function esc(s) {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/\n/g, " ");
}

while (i < lines.length) {
  const line = lines[i];
  if (!line.trim()) {
    i++;
    continue;
  }
  if (line.startsWith("# ")) {
    i++;
    continue;
  }
  if (line.startsWith("> ")) {
    blocks.push({ type: "blockquote", text: line.slice(2).trim() });
    i++;
    continue;
  }
  if (line.startsWith("![")) {
    const m = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
    if (m) blocks.push({ type: "image", alt: m[1], src: m[2] });
    i++;
    continue;
  }
  if (line.startsWith("<")) {
    i++;
    continue;
  }
  let para = line;
  i++;
  while (i < lines.length && lines[i].trim() && !lines[i].startsWith("#") && !lines[i].startsWith(">") && !lines[i].startsWith("!")) {
    para += " " + lines[i].trim();
    i++;
  }
  blocks.push({ type: "p", text: para.trim() });
}

const body = blocks
  .map((b) => {
    if (b.type === "blockquote") {
      return `  { type: "blockquote", text: ${JSON.stringify(b.text)} },`;
    }
    if (b.type === "image") {
      return `  { type: "image", alt: ${JSON.stringify(b.alt)}, src: ${JSON.stringify(b.src)} },`;
    }
    return `  { type: "p", text: ${JSON.stringify(b.text)} },`;
  })
  .join("\n");

const out = `/** Auto-generated from ${path.basename(inputArg)} */\nexport const proseBlocks = [\n${body}\n];\n`;

fs.mkdirSync(path.dirname(outputArg), { recursive: true });
fs.writeFileSync(outputArg, out);
console.log(`Wrote ${blocks.length} blocks to ${outputArg}`);
