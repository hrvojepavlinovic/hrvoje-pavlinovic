const WORDS_PER_MINUTE = 200;

interface MarkdownArticle {
  title: string;
  author: string;
  tags: string[];
  shortDescription: string;
  fullText: string;
  slug: string;
  createdAt: string;
}

export function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / WORDS_PER_MINUTE);
}

export function formatTimeAgo(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { unit: "y", seconds: 31536000 },
    { unit: "mo", seconds: 2592000 },
    { unit: "w", seconds: 604800 },
    { unit: "d", seconds: 86400 },
    { unit: "h", seconds: 3600 },
    { unit: "m", seconds: 60 },
    { unit: "s", seconds: 1 },
  ];

  for (const { unit, seconds: secondsInUnit } of intervals) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval}${unit} ago`;
    }
  }

  return "now";
}

const decodeHtmlEntities = (value: string): string =>
  value
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&amp;", "&");

const stripTags = (value: string): string =>
  decodeHtmlEntities(value.replace(/<[^>]*>/g, "")).trim();

const inlineHtmlToMarkdown = (html: string): string =>
  decodeHtmlEntities(
    html
      .replace(
        /<a\s+[^>]*href=['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/a>/gi,
        (_match, href: string, label: string) =>
          `[${stripTags(label)}](${decodeHtmlEntities(href)})`,
      )
      .replace(/<(strong|b)>([\s\S]*?)<\/\1>/gi, "**$2**")
      .replace(/<(em|i)>([\s\S]*?)<\/\1>/gi, "*$2*")
      .replace(/<code>([\s\S]*?)<\/code>/gi, (_match, code: string) =>
        `\`${decodeHtmlEntities(code)}\``)
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]*>/g, ""),
  ).trim();

export function htmlToMarkdown(html: string): string {
  const codeBlocks: string[] = [];
  let markdown = html.replace(/\r\n/g, "\n").trim();

  markdown = markdown.replace(
    /<pre><code(?:\s+class=['"]language-([^'"]+)['"])?>([\s\S]*?)<\/code><\/pre>/gi,
    (_match, lang: string | undefined, code: string) => {
      const language = lang ? lang.trim() : "";
      const block = `\`\`\`${language}\n${
        decodeHtmlEntities(code).trimEnd()
      }\n\`\`\``;
      const token = `@@CODE_BLOCK_${codeBlocks.length}@@`;
      codeBlocks.push(block);
      return `\n\n${token}\n\n`;
    },
  );

  markdown = markdown
    .replace(
      /<h1>([\s\S]*?)<\/h1>/gi,
      (_match, text: string) => `\n\n# ${inlineHtmlToMarkdown(text)}\n\n`,
    )
    .replace(
      /<h2>([\s\S]*?)<\/h2>/gi,
      (_match, text: string) => `\n\n## ${inlineHtmlToMarkdown(text)}\n\n`,
    )
    .replace(
      /<h3>([\s\S]*?)<\/h3>/gi,
      (_match, text: string) => `\n\n### ${inlineHtmlToMarkdown(text)}\n\n`,
    )
    .replace(
      /<h4>([\s\S]*?)<\/h4>/gi,
      (_match, text: string) => `\n\n#### ${inlineHtmlToMarkdown(text)}\n\n`,
    )
    .replace(/<ul>([\s\S]*?)<\/ul>/gi, (_match, items: string) =>
      "\n\n" +
      Array.from(items.matchAll(/<li>([\s\S]*?)<\/li>/gi))
        .map((item) => `- ${inlineHtmlToMarkdown(item[1])}`)
        .join("\n") +
      "\n\n")
    .replace(/<ol>([\s\S]*?)<\/ol>/gi, (_match, items: string) => {
      const lines = Array.from(items.matchAll(/<li>([\s\S]*?)<\/li>/gi))
        .map((item, index) => `${index + 1}. ${inlineHtmlToMarkdown(item[1])}`);
      return `\n\n${lines.join("\n")}\n\n`;
    })
    .replace(
      /<p>([\s\S]*?)<\/p>/gi,
      (_match, text: string) => `\n\n${inlineHtmlToMarkdown(text)}\n\n`,
    )
    .replace(
      /<figure>[\s\S]*?<img\s+[^>]*src=['"]([^'"]+)['"][^>]*alt=['"]([^'"]*)['"][^>]*>[\s\S]*?(?:<figcaption>([\s\S]*?)<\/figcaption>)?[\s\S]*?<\/figure>/gi,
      (_match, src: string, alt: string, caption: string | undefined) => {
        const image = `![${decodeHtmlEntities(alt)}](${
          decodeHtmlEntities(src)
        })`;
        const captionText = caption ? inlineHtmlToMarkdown(caption) : "";
        return captionText
          ? `\n\n${image}\n\n_${captionText}_\n\n`
          : `\n\n${image}\n\n`;
      },
    )
    .replace(/<hr\s*\/?>/gi, "\n\n---\n\n")
    .replace(/<[^>]*>/g, "");

  for (const [index, block] of codeBlocks.entries()) {
    markdown = markdown.replace(`@@CODE_BLOCK_${index}@@`, block);
  }

  return decodeHtmlEntities(markdown)
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function articleToMarkdown(article: MarkdownArticle): string {
  const canonicalUrl = `https://hrvoje.pavlinovic.com/blog/${article.slug}`;
  const published = article.createdAt.slice(0, 10);
  const tags = article.tags.length > 0 ? article.tags.join(", ") : "None";

  return [
    `# ${article.title}`,
    article.shortDescription,
    `Author: ${article.author}`,
    `Published: ${published}`,
    `Canonical: ${canonicalUrl}`,
    `Tags: ${tags}`,
    "Use this Markdown when pasting the article into Codex, Claude, ChatGPT, a gist, or a personal runbook.",
    htmlToMarkdown(article.fullText),
  ].join("\n\n") + "\n";
}
