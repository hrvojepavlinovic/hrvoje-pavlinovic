import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { BlogArticle } from "../../types/blog.ts";
import { calculateReadingTime, formatTimeAgo } from "../../utils/blog.ts";
import blogData from "../../data/blog.json" with { type: "json" };

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

export const handler: Handlers<BlogPageData> = {
  async GET(_req, ctx) {
    const kv = await Deno.openKv();

    const sortedArticles = (blogData.articles as BlogArticle[])
      .sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    const articles = await Promise.all(
      sortedArticles.map(async (article) => {
        const [viewsRes, likesRes] = await Promise.all([
          kv.get<number>([`blog:views:${article.slug}`]),
          kv.get<number>([`blog:likes:${article.slug}`]),
        ]);

        return {
          ...article,
          views: viewsRes.value || 0,
          likes: likesRes.value || 0,
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
    "Notes on building resilient backends, leading lean teams, and navigating founder life.";
  const imageUrl = "https://hrvoje.pavlinovic.com/blog.png";
  const keywords =
    "Blog, Software Engineering, Backend, Blockchain, AI, Hrvoje";
  const author = "Hrvoje Pavlinovic";

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

      <div class="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-100">
        <section class="max-w-5xl mx-auto flex min-h-screen flex-col justify-center px-6 py-24 md:py-32">
          <div class="space-y-8">
            <div class="flex items-center gap-4 md:gap-5">
              <img
                src="/pfptbs.png"
                alt="Hrvoje Pavlinovic"
                class="h-12 w-12 rounded-full object-cover md:h-[52px] md:w-[52px]"
                loading="eager"
              />
              <div>
                <h1 class="text-[32px] font-semibold leading-tight text-gray-900 dark:text-gray-100 md:text-[44px]">
                  Notes from the build log
                </h1>
                <p class="text-sm text-gray-600 dark:text-gray-400 md:text-base">
                  Memo-style entries on shipping backend systems, teams, and
                  founder life.
                </p>
              </div>
            </div>

            <p class="max-w-3xl text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-[17px] md:leading-loose">
              Essays stay short, tactical, and grounded in real delivery. Browse
              the archive or subscribe for drops as I ship.
            </p>
          </div>
        </section>

        <section class="border-t border-gray-100 dark:border-gray-800">
          <div class="max-w-4xl mx-auto px-6 py-12 pb-24 md:py-16 md:pb-28 space-y-6">
            {data.articles.map((article) => (
              <article
                key={article.id}
                class="rounded-2xl border border-gray-200 bg-white/80 p-6 transition-colors hover:border-gray-300 dark:border-gray-800 dark:bg-black/40 dark:hover:border-gray-600"
              >
                <a href={`/blog/${article.slug}`} class="space-y-4">
                  <header class="space-y-2">
                    <div class="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      <span class="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 dark:border-gray-700">
                        Essay
                      </span>
                      <span class="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 dark:border-gray-700">
                        {article.timeAgo}
                      </span>
                      <span class="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 dark:border-gray-700">
                        {article.readingTime} min read
                      </span>
                    </div>
                    <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                      {article.title}
                    </h2>
                  </header>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {article.shortDescription}
                  </p>
                  {article.tags.length > 0 && (
                    <div class="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-500">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          class="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-1 dark:border-gray-700 dark:bg-black"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </a>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
