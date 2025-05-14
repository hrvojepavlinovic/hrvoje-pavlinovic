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
      },
    });
  },
};

export default function BlogPost({ data }: PageProps<BlogPostData>) {
  const { article } = data;
  const absoluteImageUrl = article.seo.image.startsWith('http') 
    ? article.seo.image 
    : `https://hrvoje.pavlinovic.com${article.seo.image}`;
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
        <script type="application/ld+json">
          {JSON.stringify({
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
          })}
        </script>
      </Head>
      
      <div class="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white p-8 pt-32 pb-24 max-w-3xl mx-auto">
        <a href="/blog" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 inline-block">
          ← Back to blog
        </a>
        <article>
          <h1 class="text-4xl font-bold mb-4">{article.title}</h1>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-500 mb-8">
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
          <div class="prose dark:prose-invert prose-gray dark:prose-gray max-w-none">
            {article.fullText.split('\n\n').map((paragraph, i) => (
              <p key={i} class="mb-4 text-gray-700 dark:text-gray-300">
                {paragraph}
              </p>
            ))}
          </div>
          
          <div class="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
            <SocialActions 
              slug={article.slug}
              initialLikes={article.likes}
              seo={article.seo}
            />
          </div>
        </article>
      </div>
    </>
  );
} 