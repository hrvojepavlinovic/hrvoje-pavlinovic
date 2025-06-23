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
    
    // Get views and likes
    const [viewsRes, likesRes] = await Promise.all([
      kv.get<number>(viewsKey),
      kv.get<number>(likesKey),
    ]);
    
    const currentViews = viewsRes.value || 0;
    const currentLikes = likesRes.value || 0;
    
    // Increment views atomically
    const result = await kv.atomic()
      .check(viewsRes)
      .set(viewsKey, currentViews + 1)
      .commit();

    if (!result.ok) {
      console.error("Failed to increment view count");
    }

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
  const absoluteImageUrl = 'https://hrvoje.pavlinovic.com/blog.png';
  const canonicalUrl = `https://hrvoje.pavlinovic.com/blog/${article.slug}`;

  return (
    <>
      <Head>
        <title>{article.seo.title}</title>
        <meta name="description" content={article.seo.description} />
        <meta name="keywords" content={article.seo.keywords.join(", ")} />
        <meta name="author" content={article.seo.author} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph meta tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.seo.title} />
        <meta property="og:description" content={article.seo.description} />
        <meta property="og:image" content={absoluteImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={article.title} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Hrvoje Pavlinovic" />
        <meta property="article:published_time" content={article.createdAt} />
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content={article.seo.twitterCard} />
        <meta name="twitter:site" content="@0xhp10" />
        <meta name="twitter:creator" content={article.seo.twitterCreator} />
        <meta name="twitter:title" content={article.seo.title} />
        <meta name="twitter:description" content={article.seo.description} />
        <meta name="twitter:image" content={absoluteImageUrl} />
        <meta name="twitter:image:alt" content={article.title} />
        <meta name="twitter:url" content={canonicalUrl} />
        
        {/* JSON-LD */}
        <script 
          type="application/ld+json"
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": article.title,
              "description": article.shortDescription,
              "image": absoluteImageUrl,
              "url": canonicalUrl,
              "author": {
                "@type": "Person",
                "name": article.seo.author
              },
              "publisher": {
                "@type": "Person",
                "name": "Hrvoje Pavlinovic",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://hrvoje.pavlinovic.com/pfp.png"
                }
              },
              "datePublished": article.createdAt,
              "keywords": article.seo.keywords.join(", ")
            })
          }}
        />
      </Head>
      
      <div class="min-h-screen bg-gradient-to-b from-orange-50/30 via-transparent via-40% to-orange-50/30 dark:from-orange-950/10 dark:via-transparent dark:via-40% dark:to-orange-950/10">
        <div class="pt-32 pb-24 px-6 sm:px-8">
          <div class="max-w-4xl mx-auto">
            <a href="/blog" class="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 mb-8 transition-colors duration-300">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to blog
            </a>
            
            <article class="bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-8 lg:p-12 shadow-xl">
              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-600 dark:from-white dark:via-white dark:to-gray-400 bg-clip-text text-transparent leading-tight">
                {article.title}
              </h1>
              
              {/* Author */}
              <div class="flex items-center gap-2 mb-6 text-sm text-gray-500 dark:text-gray-500">
                <svg class="w-4 h-4 text-orange-500 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="font-medium">by {article.author}</span>
              </div>

              {/* Tags */}
              <div class="flex flex-wrap items-center gap-2 sm:gap-3 mb-8">
                <div class="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-medium rounded-full">
                  Essay #{article.id}
                </div>
                {article.tags.map((tag) => (
                  <div key={tag} class="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full">
                    {tag}
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div class="flex items-center gap-3 sm:gap-6 text-sm text-gray-500 dark:text-gray-500 mb-12 pb-8 border-b border-gray-200/50 dark:border-gray-700/50">
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
                  <span class="font-medium">{article.readingTime}m<span class="hidden sm:inline"> read</span></span>
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-orange-500 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                  </svg>
                  <span class="font-medium">{article.timeAgo}</span>
                </div>
              </div>

              {/* Article Content */}
              <div class="max-w-none">
                <div 
                  class="blog-content prose prose-lg dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-orange-600 dark:prose-a:text-orange-400 prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50/50 dark:prose-blockquote:bg-orange-950/20 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 max-w-none"
                  // deno-lint-ignore react-no-danger
                  dangerouslySetInnerHTML={{ __html: article.fullText }} 
                />
              </div>
              
              {/* Social Actions */}
              <div class="mt-12 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
                <SocialActions 
                  slug={article.slug}
                  initialLikes={article.likes}
                  seo={article.seo}
                />
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
} 