import { assert, assertEquals } from "$std/assert/mod.ts";
import blogData from "../data/blog.json" with { type: "json" };
import connections from "../data/related-articles.json" with { type: "json" };
import { ARCHIVED_INDEX_SLUGS, relatedArticles } from "./articleDiscovery.ts";

Deno.test("editorial connections reference published notes without self-links, archives or duplicates", () => {
  const slugs = new Set(blogData.articles.map((article) => article.slug));
  for (const [source, targets] of Object.entries(connections)) {
    assert(slugs.has(source), source);
    assert(!ARCHIVED_INDEX_SLUGS.has(source), source);
    assert(targets.length > 0 && targets.length <= 2, source);
    assertEquals(targets.length, new Set(targets).size);
    for (const target of targets) {
      assert(slugs.has(target), target);
      assert(target !== source, source);
      assert(!ARCHIVED_INDEX_SLUGS.has(target), target);
    }
  }
  for (const slug of slugs) {
    if (!ARCHIVED_INDEX_SLUGS.has(slug)) assert(slug in connections, slug);
  }
});

Deno.test("related notes keep editorial order and omit missing or uncurated content", () => {
  const source = "how-far-can-one-hetzner-server-go";
  const results = relatedArticles(source, blogData.articles);
  assertEquals(results.map((a) => a.slug), connections[source]);
  assertEquals(relatedArticles(source, []), []);
  assertEquals(relatedArticles("new-unrelated-note", blogData.articles), []);
  assertEquals(
    relatedArticles("build-log-ai-portfolio-session", blogData.articles),
    [],
  );
  assertEquals(relatedArticles(source, [results[1]]), [results[1]]);
  assertEquals(
    relatedArticles("ambition-without-disappearing", blogData.articles).length,
    1,
  );
});
