import fs from "node:fs";
import path from "node:path";

/**
 * Parse simple YAML frontmatter + markdown body from override files.
 * @param {string} filePath
 * @returns {{ data: Record<string, string>, content: string } | null}
 */
export function parseOverrideMd(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  if (!raw.startsWith("---")) {
    return { data: {}, content: raw.trim() };
  }
  const end = raw.indexOf("---", 3);
  if (end === -1) return { data: {}, content: raw.trim() };
  const fm = raw.slice(3, end).trim();
  const content = raw.slice(end + 3).trim();
  const data = {};
  for (const line of fm.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return { data, content };
}

/**
 * Merge override markdown into a catalog photograph page.
 * @param {object} page
 * @param {string} slug
 */
export function mergePhotographOverride(page, slug) {
  const overridePath = path.join(
    process.cwd(),
    "content/overrides/photographs",
    `${slug}.md`
  );
  const parsed = parseOverrideMd(overridePath);
  if (!parsed) return page;

  const next = JSON.parse(JSON.stringify(page));
  if (parsed.data.title) {
    next.meta = { ...next.meta, title: parsed.data.title };
    next.breadcrumb = { ...next.breadcrumb, label: parsed.data.title };
  }
  if (parsed.data.intro) {
    next.meta = { ...next.meta, intro: parsed.data.intro };
  }
  if (parsed.content) {
    const paragraphs = parsed.content
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean);
    if (paragraphs.length) {
      next.story = {
        ...next.story,
        paragraphs,
      };
    }
  }
  return next;
}
