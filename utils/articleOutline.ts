export interface ArticleSection {
  id: string;
  title: string;
  level: 2 | 3;
}

function decodeEntities(text: string): string {
  const named: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
    ndash: "–",
    mdash: "—",
    rsquo: "’",
    lsquo: "‘",
    rdquo: "”",
    ldquo: "“",
  };
  return text.replace(
    /&(#x[\da-f]+|#\d+|[a-z]+);/gi,
    (entity, value: string) => {
      if (!value.startsWith("#")) return named[value.toLowerCase()] ?? entity;
      const hex = value[1].toLowerCase() === "x";
      const code = Number.parseInt(value.slice(hex ? 2 : 1), hex ? 16 : 10);
      return code > 0 && code <= 0x10ffff && !(code >= 0xd800 && code <= 0xdfff)
        ? String.fromCodePoint(code)
        : entity;
    },
  );
}

/** Add anchors only to rendered, trusted article HTML; never rewrite the source. */
export function buildArticleOutline(source: string): {
  html: string;
  sections: ArticleSection[];
} {
  const sections: ArticleSection[] = [];
  const ids = new Set<string>();
  const idPattern = /\sid\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;
  for (const match of source.matchAll(idPattern)) {
    ids.add(decodeEntities(match[1] ?? match[2] ?? match[3]));
  }
  // Skip literal examples and hidden/non-content markup in authored HTML.
  const html = source.replace(
    /<!--[\s\S]*?-->|<(pre|code|script|style)\b[^>]*>[\s\S]*?<\/\1\s*>|<h([23])\b([^>]*)>([\s\S]*?)<\/h\2\s*>/gi,
    (whole, _ignored, level, attributes: string, content: string) => {
      if (!level) return whole;
      const title = decodeEntities(content.replace(/<[^>]*>/g, ""))
        .replace(/\s+/g, " ").trim();
      if (!title) return whole;
      const existing = [...attributes.matchAll(idPattern)][0];
      let id = existing
        ? decodeEntities(existing[1] ?? existing[2] ?? existing[3])
        : "";
      if (!existing) {
        const slug = title.normalize("NFKD").replace(/\p{M}/gu, "")
          .toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-")
          .replace(/^-|-$/g, "");
        const base = `section-${slug || "note"}`;
        id = base;
        let suffix = 2;
        while (ids.has(id)) id = `${base}-${suffix++}`;
        ids.add(id);
      }
      if (!id) return whole;
      sections.push({ id, title, level: Number(level) as 2 | 3 });
      return existing
        ? whole
        : `<h${level}${attributes} id="${id}">${content}</h${level}>`;
    },
  );
  return { html, sections };
}

/** 100% when the end of the article is visible, excluding page chrome/footer. */
export function articleReadingProgress(
  bodyTop: number,
  bodyHeight: number,
  viewportHeight: number,
  readingOffset: number,
): number {
  const travel = bodyHeight - Math.max(0, viewportHeight - readingOffset);
  if (travel <= 0) return bodyTop + bodyHeight <= viewportHeight ? 100 : 0;
  return Math.round(
    Math.min(1, Math.max(0, (readingOffset - bodyTop) / travel)) * 100,
  );
}
