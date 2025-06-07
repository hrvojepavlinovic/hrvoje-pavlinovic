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
          author: article.author || "Unknown",
          tags: article.tags || [],
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
      
      <div class="min-h-screen bg-gradient-to-b from-orange-50/30 via-transparent via-40% to-orange-50/30 dark:from-orange-950/10 dark:via-transparent dark:via-40% dark:to-orange-950/10">
        {/* Hero Section */}
        <div class="pt-32 pb-20 px-6 sm:px-8">
          <div class="max-w-6xl mx-auto">
            <div class="text-center space-y-8">
              <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-b from-gray-900 via-gray-900 to-gray-600 dark:from-white dark:via-white dark:to-gray-400 bg-clip-text text-transparent">
                Read & Think
              </h1>
              <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
                Thoughts on software engineering, blockchain innovation, AI, and the future we're building
              </p>
            </div>
          </div>
        </div>

        {/* Articles */}
        <div class="px-6 sm:px-8 pb-24">
          <div class="max-w-4xl mx-auto">
            <div class="space-y-8">
              {data.articles.map((article) => (
                <article key={article.id} class="bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-8 shadow-xl hover:border-orange-200 dark:hover:border-orange-900/50 transition-all duration-300 group">
                  <a href={`/blog/${article.slug}`} class="block">
                    <h2 class="text-2xl sm:text-3xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {article.title}
                    </h2>
                    <div class="flex items-center gap-2 mb-4 text-sm text-gray-500 dark:text-gray-500">
                      <svg class="w-4 h-4 text-orange-500 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span class="font-medium">by {article.author}</span>
                    </div>
                    <div class="flex items-center gap-3 mb-4">
                      <div class="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-medium rounded-full">
                        Essay #{article.id}
                      </div>
                      {article.tags.map((tag) => (
                        <div key={tag} class="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full">
                          {tag}
                        </div>
                      ))}
                    </div>
                    <p class="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {article.shortDescription}
                    </p>
                    
                    {/* Article Stats */}
                    <div class="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-500">
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-orange-500 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span class="font-medium">{article.views}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-orange-500 dark:text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        <span class="font-medium">{article.likes}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-orange-500 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="font-medium">{article.readingTime} min read</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-orange-500 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span class="font-medium">{article.timeAgo}</span>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>

            {/* Empty State */}
            {data.articles.length === 0 && (
              <div class="text-center py-20">
                <div class="text-6xl mb-6">✍️</div>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  More thoughts coming soon
                </h2>
                <p class="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  I'm working on new articles about software engineering, blockchain, and AI. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 