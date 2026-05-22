import Image from "next/image";

import { SiteLink } from "@/components/site-link";

function inlineMarkdown(text, context = "content") {
  const parts = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      parts.push(text.slice(last, m.index));
    }
    if (m[1]) {
      parts.push(
        <SiteLink
          key={m.index}
          href={m[2]}
          variant="inline"
          context={context}
        >
          {m[1]}
        </SiteLink>
      );
    } else if (m[3]) {
      parts.push(<strong key={m.index}>{m[3]}</strong>);
    } else if (m[4]) {
      parts.push(<em key={m.index}>{m[4]}</em>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length ? parts : text;
}

export function ProseBlocks({ blocks, imageBase = "", linkContext = "content" }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "blockquote") {
          return (
            <blockquote key={i}>
              <p>{inlineMarkdown(block.text, linkContext)}</p>
            </blockquote>
          );
        }
        if (block.type === "image") {
          const src = block.src.startsWith("/")
            ? block.src
            : `${imageBase}/${block.src}`.replace(/\/+/g, "/");
          return (
            <figure key={i} className="figure" style={{ marginTop: "1.5rem" }}>
              <div className="figure__media" style={{ position: "relative", aspectRatio: "4/3" }}>
                <Image src={src} alt={block.alt || ""} fill sizes="(min-width: 700px) 72rem, 100vw" />
              </div>
            </figure>
          );
        }
        return <p key={i}>{inlineMarkdown(block.text, linkContext)}</p>;
      })}
    </>
  );
}
