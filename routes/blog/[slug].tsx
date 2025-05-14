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
  async GET(req, ctx) {
    const { slug } = ctx.params;
    const article = blogData.articles.find((a) => a.slug === slug);

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

  return (
    <>
      <Head>
        <title>{article.seo.title}</title>
        <meta name="description" content={article.seo.description} />
        <meta name="keywords" content={article.seo.keywords.join(", ")} />
        <meta name="author" content={article.seo.author} />
        
        {/* Open Graph */}
        <meta property="og:title" content={article.seo.title} />
        <meta property="og:description" content={article.seo.description} />
        <meta property="og:image" content={article.seo.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://hrvoje.pavlinovic.com/blog/${article.slug}`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content={article.seo.twitterCard} />
        <meta name="twitter:creator" content={article.seo.twitterCreator} />
        <meta name="twitter:title" content={article.seo.title} />
        <meta name="twitter:description" content={article.seo.description} />
        <meta name="twitter:image" content={article.seo.image} />
        
        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": article.title,
            "description": article.shortDescription,
            "image": article.seo.image,
            "author": {
              "@type": "Person",
              "name": article.seo.author
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
          <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500 mb-8">
            <span>{article.views} views</span>
            <span>•</span>
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              <span>{article.likes}</span>
            </div>
            <span>•</span>
            <span>{article.readingTime} min read</span>
            <span>•</span>
            <span>{article.timeAgo}</span>
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
              title={article.title}
            />
          </div>
        </article>
      </div>
    </>
  );
} 