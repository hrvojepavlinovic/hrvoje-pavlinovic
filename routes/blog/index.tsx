import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { BlogArticle } from "../../types/blog.ts";
import { calculateReadingTime, formatTimeAgo } from "../../utils/blog.ts";
import blogData from "../../data/blog.json" with { type: "json" };
import { getValue } from "../../utils/store.ts";

interface BlogPageData {
  articles: (BlogArticle & {
    readingTime: number;
    timeAgo: string;
    views: number;
    likes: number;
    author: string;
    tags: string[];
  })[];
}

const FEATURED_SLUGS = [
  "playgrnd-cache-query-optimization",
  "playgrnd-whatsapp-auth-login-claims",
  "ambition-without-disappearing",
];

const ARCHIVED_INDEX_SLUGS = new Set([
  "build-log-ai-portfolio-session",
  "behind-the-code-claude-sonnet-4-development-session",
  "3am-thoughts-ai-gets-tired-humans-get-obsessed",
  "building-modern-web-experience-fresh-ai",
]);

export const handler: Handlers<BlogPageData> = {
  async GET(_req, ctx) {
    const sortedArticles = (blogData.articles as BlogArticle[])
      .filter((article) => !ARCHIVED_INDEX_SLUGS.has(article.slug))
      .sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    const articles = await Promise.all(
      sortedArticles.map(async (article) => {
        const [viewsRes, likesRes] = await Promise.all([
          getValue<number>([`blog:views:${article.slug}`]),
          getValue<number>([`blog:likes:${article.slug}`]),
        ]);

        return {
          ...article,
          views: viewsRes || 0,
          likes: likesRes || 0,
          readingTime: calculateReadingTime(article.fullText),
          timeAgo: formatTimeAgo(article.createdAt),
          author: article.author || "Unknown",
          tags: article.tags || [],
        };
      }),
    );

    return ctx.render({ articles });
  },
};

export default function BlogPage({ data }: PageProps<BlogPageData>) {
  const canonicalUrl = "https://hrvoje.pavlinovic.com/blog";
  const title = "Blog \u2014 Hrvoje Pavlinovic";
  const description =
    "Notes on backend engineering, operational tooling, self-hosting, product work, and building small software systems.";
  const imageUrl = "https://hrvoje.pavlinovic.com/blog.png";
  const keywords =
    "Blog, Software Engineering, Backend Engineering, Operational Tooling, Self Hosting, Product Engineering, Hrvoje";
  const author = "Hrvoje Pavlinovic";
  const featuredArticles = FEATURED_SLUGS.map((slug) =>
    data.articles.find((article) => article.slug === slug)
  ).filter((article): article is BlogPageData["articles"][number] =>
    Boolean(article)
  );
  const latestArticles = data.articles.filter((article) =>
    !FEATURED_SLUGS.includes(article.slug)
  );

  const articleCard = (
    article: BlogPageData["articles"][number],
    featured = false,
  ) => (
    <article
      key={article.id}
      class={`surface-card ${featured ? "accent-card p-6" : "p-5"}`}
      data-tilt
      data-reveal
    >
      <a href={`/blog/${article.slug}`} class="block space-y-4">
        <header class="space-y-2">
          <div class="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
            <span class="text-orange-700 dark:text-orange-300">
              {article.tags[0] ?? "Note"}
            </span>
            <span>{article.timeAgo}</span>
            <span>{article.readingTime} min read</span>
          </div>
          <h2
            class={`${
              featured ? "text-xl" : "text-lg"
            } font-semibold text-gray-900 dark:text-gray-100`}
          >
            {article.title}
          </h2>
        </header>
        <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {article.shortDescription}
        </p>
      </a>
    </article>
  );

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Hrvoje Pavlinovic" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@0xhp10" />
        <meta name="twitter:creator" content="@0xhp10" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:url" content={canonicalUrl} />
      </Head>

      <div class="site-canvas">
        <main class="mx-auto max-w-5xl px-6 pb-24 pt-32 md:pb-28 md:pt-40">
          <header class="page-intro" data-reveal>
            <p class="eyebrow">
              Field notes
            </p>
            <h1 class="display-title mt-4">
              Systems, products, and the life around the work.
            </h1>
            <p class="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400 md:text-base">
              Practical notes from backend engineering and building products,
              plus occasional writing about business, family, and ambition.
            </p>
          </header>

          <section class="mt-14">
            <h2 class="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
              Start here
            </h2>
            <div class="mt-4 grid gap-4 md:grid-cols-3">
              {featuredArticles.map((article) => articleCard(article, true))}
            </div>
          </section>

          <section class="mt-14">
            <h2 class="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
              Latest notes
            </h2>
            <div class="mt-4 grid gap-4 md:grid-cols-2">
              {latestArticles.map((article) => articleCard(article))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
