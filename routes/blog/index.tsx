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
  })[];
}

export const handler: Handlers<BlogPageData> = {
  async GET(_req, ctx) {
    const kv = await Deno.openKv();
    const articles = await Promise.all(
      (blogData.articles as BlogArticle[]).map(async (article) => {
        const [viewsRes, likesRes] = await Promise.all([
          kv.get<number>([`blog:views:${article.slug}`]),
          kv.get<number>([`blog:likes:${article.slug}`])
        ]);
        
        const views = viewsRes.value || 0;
        const likes = likesRes.value || 0;
        
        return {
          ...article,
          views,
          likes,
          readingTime: calculateReadingTime(article.fullText),
          timeAgo: formatTimeAgo(article.createdAt),
        };
      })
    );

    return ctx.render({ articles });
  },
};

export default function BlogPage({ data }: PageProps<BlogPageData>) {
  const canonicalUrl = "https://hrvoje.pavlinovic.com/blog";
  const title = "Blog | Hrvoje Pavlinovic";
  const description = "Read my thoughts on software engineering, blockchain innovation, AI, and more.";
  const imageUrl = "https://hrvoje.pavlinovic.com/blog.png";
  const keywords = "Blog, Software Engineering, Blockchain, AI, Web Development, Fresh, Deno";
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
        
        {/* Open Graph meta tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Hrvoje Pavlinovic Blog" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Hrvoje Pavlinovic" />
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@0xhp10" />
        <meta name="twitter:creator" content="@0xhp10" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:image:alt" content="Hrvoje Pavlinovic Blog" />
        <meta name="twitter:url" content={canonicalUrl} />
      </Head>
      
      <div class="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white p-8 pt-32 pb-24">
        <h1 class="text-4xl font-bold mb-12">Blog</h1>
        <div class="space-y-12">
          {data.articles.map((article) => (
            <article key={article.id} class="border border-gray-200 dark:border-gray-800 p-6 rounded-lg hover:border-gray-300 dark:hover:border-gray-700">
              <a href={`/blog/${article.slug}`} class="block">
                <h2 class="text-2xl font-semibold mb-3 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
                  {article.title}
                </h2>
                <p class="text-gray-600 dark:text-gray-400 mb-4">{article.shortDescription}</p>
                <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-500">
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{article.views}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                    <span>{article.likes}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{article.readingTime} min</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{article.timeAgo}</span>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </>
  );
} 