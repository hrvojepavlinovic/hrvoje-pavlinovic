import relatedNotes from "../data/related-articles.json" with { type: "json" };
import { BlogArticle } from "../types/blog.ts";

export const ARCHIVED_INDEX_SLUGS = new Set([
  "build-log-ai-portfolio-session",
  "behind-the-code-claude-sonnet-4-development-session",
  "3am-thoughts-ai-gets-tired-humans-get-obsessed",
  "building-modern-web-experience-fresh-ai",
]);

/** Editorial connections, not an arbitrary match on a broad tag such as AI. */
export function relatedArticles(
  slug: string,
  articles: BlogArticle[],
): BlogArticle[] {
  if (ARCHIVED_INDEX_SLUGS.has(slug)) return [];
  const connections: Record<string, string[]> = relatedNotes;
  return [...new Set(connections[slug] ?? [])]
    .filter((target) => target !== slug && !ARCHIVED_INDEX_SLUGS.has(target))
    .flatMap((target) => {
      const article = articles.find((candidate) => candidate.slug === target);
      return article ? [article] : [];
    }).slice(0, 2);
}
