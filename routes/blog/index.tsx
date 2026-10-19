import SocialImage, { socialImageUrl } from "../../components/SocialImage.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { BlogArticle } from "../../types/blog.ts";
import { calculateReadingTime, formatBlogDate } from "../../utils/blog.ts";
import { ARCHIVED_INDEX_SLUGS } from "../../utils/articleDiscovery.ts";
import blogData from "../../data/blog.json" with { type: "json" };

interface BlogPageData {
  articles: (BlogArticle & { readingTime: number })[];
  query: string;
}

const FEATURED_SLUGS = [
  "bitcoin-stablecoins-payment-rails-ai-agents-need",
  "i-wanted-a-break-from-prompting-so-i-planted-some-trees",
  "reliable-context-for-ai-assisted-teams",
];

export const handler: Handlers<BlogPageData> = {
  GET(req, ctx) {
    const query = (new URL(req.url).searchParams.get("q") ?? "").trim().slice(
      0,
      120,
    );
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const articles = (blogData.articles as BlogArticle[])
      .filter((article) => !ARCHIVED_INDEX_SLUGS.has(article.slug))
      .filter((article) => {
        const searchable = [
          article.title,
          article.shortDescription,
          ...(article.tags ?? []),
        ].join(" ").toLowerCase();
        return terms.every((term) => searchable.includes(term));
      })
      .toSorted((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      .map((article) => ({
        ...article,
        readingTime: calculateReadingTime(article.fullText),
      }));
    return ctx.render({ articles, query });
  },
};

export default function BlogPage({ data }: PageProps<BlogPageData>) {
  const canonicalUrl = "https://hrvoje.pavlinovic.com/blog";
  const title = "Blog — Hrvoje Pavlinovic";
  const description =
    "Notes on backend engineering, operational tooling, self-hosting, product work, and building small software systems.";
  const featured = data.query ? [] : FEATURED_SLUGS.flatMap((slug) => {
    const article = data.articles.find((a) => a.slug === slug);
    return article ? [article] : [];
  });
  const notes = data.query
    ? data.articles
    : data.articles.filter((a) => !FEATURED_SLUGS.includes(a.slug));

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="stylesheet" href="/blog-20261016-v2.css" />
        <link
          rel="preload"
          href="/fonts/source-sans-3-latin-wght-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta name="description" content={description} />
        <meta name="author" content="Hrvoje Pavlinovic" />
        <meta
          name="robots"
          content={data.query ? "noindex, follow" : "index, follow"}
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />

        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Hrvoje Pavlinovic" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@0xhp10" />
        <meta name="twitter:creator" content="@0xhp10" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        <meta name="twitter:url" content={canonicalUrl} />
        <SocialImage
          src={socialImageUrl("blog")}
          alt="Field notes by Hrvoje Pavlinovic"
        />
      </Head>
      <div class="site-canvas blog-page">
        <div class="blog-index-content">
          <header class="blog-index-intro">
            <h1>Field notes.</h1>
            <p>
              Practical notes from backend engineering and building products,
              plus occasional writing about business, family, and ambition.
            </p>
            <form class="blog-search" method="get" action="/blog" role="search">
              <label for="note-search">Find a note</label>
              <div class="blog-search-controls">
                <input
                  id="note-search"
                  name="q"
                  type="search"
                  value={data.query}
                  maxLength={120}
                  placeholder="Search titles, topics or descriptions"
                />
                <button type="submit">Search</button>
                {data.query && (
                  <a class="blog-text-link" href="/blog">Clear search</a>
                )}
              </div>
            </form>
          </header>
          {featured.length > 0 && (
            <section
              class="blog-index-section"
              aria-labelledby="featured-notes-title"
            >
              <h2 id="featured-notes-title">Start here.</h2>
              <div class="blog-featured">
                {featured.map((article) => (
                  <article key={article.slug}>
                    <h3>
                      <a href={`/blog/${article.slug}`}>{article.title}</a>
                    </h3>
                    <p>{article.shortDescription}</p>
                    <div class="blog-meta">
                      <time dateTime={article.createdAt}>
                        {formatBlogDate(article.createdAt)}
                      </time>
                      <span>{article.readingTime} min read</span>
                      <span>{article.tags?.[0] ?? "Note"}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
          <section
            id="notes"
            class="blog-index-section blog-all-notes"
            aria-labelledby="notes-title"
          >
            <div class="blog-section-heading">
              <h2 id="notes-title">
                {data.query ? "Search results." : "More notes."}
              </h2>
              <p>
                {notes.length} {notes.length === 1 ? "note" : "notes"}
                {data.query ? ` for “${data.query}”` : ""}
              </p>
            </div>
            {notes.length > 0
              ? (
                <div>
                  {notes.map((article) => (
                    <article key={article.slug} class="blog-note-row">
                      <div class="blog-note-date">
                        <time dateTime={article.createdAt}>
                          {formatBlogDate(article.createdAt)}
                        </time>
                        <span>{article.readingTime} min read</span>
                      </div>
                      <div>
                        <h3>
                          <a href={`/blog/${article.slug}`}>{article.title}</a>
                        </h3>
                        <p>{article.shortDescription}</p>
                      </div>
                    </article>
                  ))}
                </div>
              )
              : (
                <div class="blog-empty">
                  <p>
                    No notes found. Try a different title, topic or keyword.
                  </p>
                  <a class="blog-text-link" href="/blog">Browse all notes</a>
                </div>
              )}
          </section>
        </div>
      </div>
    </>
  );
}
