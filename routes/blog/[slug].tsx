import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { BlogArticle } from "../../types/blog.ts";
import { calculateReadingTime, formatTimeAgo } from "../../utils/blog.ts";
import blogData from "../../data/blog.json" with { type: "json" };
import SocialActions from "../../islands/SocialActions.tsx";

interface BlogPostData {
  article: BlogArticle & {
    readingTime: number;
    timeAgo: string;
    views: number;
    likes: number;
    author: string;
    tags: string[];
  };
}

export const handler: Handlers<BlogPostData> = {
  async GET(_req, ctx) {
    const { slug } = ctx.params;
    const article = (blogData.articles as BlogArticle[]).find((a) => a.slug === slug);

    if (!article) {
      return ctx.renderNotFound();
    }

    const kv = await Deno.openKv();
    const viewsKey = [`blog:views:${slug}`];
    const likesKey = [`blog:likes:${slug}`];

    const [viewsRes, likesRes] = await Promise.all([
      kv.get<number>(viewsKey),
      kv.get<number>(likesKey),
    ]);

    const currentViews = viewsRes.value || 0;
    const currentLikes = likesRes.value || 0;

    await kv.atomic().check(viewsRes).set(viewsKey, currentViews + 1).commit();

    return ctx.render({
      article: {
        ...article,
        views: currentViews + 1,
        likes: currentLikes,
        readingTime: calculateReadingTime(article.fullText),
        timeAgo: formatTimeAgo(article.createdAt),
        author: article.author || "Unknown",
        tags: article.tags || [],
      },
    });
  },
};

export default function BlogPost({ data }: PageProps<BlogPostData>) {
  const { article } = data;
  const canonicalUrl = `https://hrvoje.pavlinovic.com/blog/${article.slug}`;
  const absoluteImageUrl = "https://hrvoje.pavlinovic.com/blog.png";

  return (
    <>
      <Head>
        <title>{article.seo.title}</title>
        <meta name="description" content={article.seo.description} />
        <meta name="keywords" content={article.seo.keywords.join(", ")} />
        <meta name="author" content={article.seo.author} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.seo.title} />
        <meta property="og:description" content={article.seo.description} />
        <meta property="og:image" content={absoluteImageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Hrvoje Pavlinovic" />
        <meta property="article:published_time" content={article.createdAt} />
        <meta name="twitter:card" content={article.seo.twitterCard} />
        <meta name="twitter:site" content="@0xhp10" />
        <meta name="twitter:creator" content={article.seo.twitterCreator} />
        <meta name="twitter:title" content={article.seo.title} />
        <meta name="twitter:description" content={article.seo.description} />
        <meta name="twitter:image" content={absoluteImageUrl} />
        <meta name="twitter:url" content={canonicalUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: article.title,
              description: article.shortDescription,
              image: absoluteImageUrl,
              url: canonicalUrl,
              author: {
                "@type": "Person",
                name: article.seo.author,
              },
              publisher: {
                "@type": "Person",
                name: "Hrvoje Pavlinovic",
                logo: {
                  "@type": "ImageObject",
                  url: "https://hrvoje.pavlinovic.com/pfp.png",
                },
              },
              datePublished: article.createdAt,
              keywords: article.seo.keywords.join(", "),
            }),
          }}
        />
      </Head>

      <div class="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <section class="max-w-3xl mx-auto px-6 py-24 md:py-32 space-y-10">
          <a
            href="/blog"
            class="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-200"
          >
            ← Back to essays
          </a>

          <header class="space-y-4">
            <div class="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              <span class="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 dark:border-gray-700">
                {article.timeAgo}
              </span>
              <span class="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 dark:border-gray-700">
                {article.readingTime} min read
              </span>
              <span class="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 dark:border-gray-700">
                {article.views} views
              </span>
            </div>
            <h1 class="text-[32px] font-semibold leading-tight text-gray-900 dark:text-gray-100 md:text-[42px]">
              {article.title}
            </h1>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              by {article.author}
            </p>
            {article.tags.length > 0 && (
              <div class="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-500">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    class="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-1 dark:border-gray-700 dark:bg-gray-900"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <article class="space-y-8 text-base leading-relaxed text-gray-700 dark:text-gray-300">
            <div
              class="blog-content prose prose-base dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-orange-600 dark:prose-a:text-orange-300 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 max-w-none"
              dangerouslySetInnerHTML={{ __html: article.fullText }}
            />
          </article>

          <footer class="space-y-6 border-t border-gray-200 pt-6 dark:border-gray-800">
            <SocialActions slug={article.slug} initialLikes={article.likes} seo={article.seo} />
          </footer>
        </section>
      </div>
    </>
  );
}
