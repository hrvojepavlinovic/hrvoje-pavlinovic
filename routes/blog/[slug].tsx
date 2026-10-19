import SocialImage, { socialImageUrl } from "../../components/SocialImage.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { BlogArticle } from "../../types/blog.ts";
import { calculateReadingTime, formatBlogDate } from "../../utils/blog.ts";
import blogData from "../../data/blog.json" with { type: "json" };
import SocialActions from "../../islands/SocialActions.tsx";
import ArticleReadingTools from "../../islands/ArticleReadingTools.tsx";
import { buildArticleOutline } from "../../utils/articleOutline.ts";
import { isLikelyBot } from "../../utils/kv.ts";
import { getValue, incrementValue } from "../../utils/store.ts";

interface BlogPostData {
  article: BlogArticle & {
    readingTime: number;
    views: number;
    likes: number;
    author: string;
    tags: string[];
  };
}

export const handler: Handlers<BlogPostData> = {
  async GET(req, ctx) {
    const { slug } = ctx.params;
    if (slug === "phone-first-coding-setup") {
      const url = new URL(req.url);
      url.pathname = "/blog/mobile-first-coding-setup";
      return Response.redirect(url, 301);
    }
    const article = (blogData.articles as BlogArticle[]).find((a) =>
      a.slug === slug
    );

    if (!article) {
      return ctx.renderNotFound();
    }

    const viewsKey = [`blog:views:${slug}`];
    const likesKey = [`blog:likes:${slug}`];

    const [viewsRes, likesRes] = await Promise.all([
      getValue<number>(viewsKey),
      getValue<number>(likesKey),
    ]);
    const currentLikes = likesRes || 0;
    const updatedViews = isLikelyBot(req.headers.get("user-agent") || undefined)
      ? viewsRes || 0
      : await incrementValue(viewsKey);

    return ctx.render({
      article: {
        ...article,
        views: updatedViews,
        likes: currentLikes,
        readingTime: calculateReadingTime(article.fullText),
        author: article.author || "Unknown",
        tags: article.tags || [],
      },
    });
  },
};

export default function BlogPost({ data }: PageProps<BlogPostData>) {
  const { article } = data;
  const outline = buildArticleOutline(article.fullText);
  const canonicalUrl = `https://hrvoje.pavlinovic.com/blog/${article.slug}`;
  const markdownUrl = `${canonicalUrl}.md`;
  const hasArticleImage = Boolean(
    article.seo.image && !article.seo.image.endsWith("/blog.png"),
  );
  const absoluteImageUrl = hasArticleImage
    ? article.seo.image
    : socialImageUrl("blog");
  const pageTitle = article.seo.title.includes("Hrvoje Pavlinovic")
    ? article.seo.title
    : `${article.seo.title} \u2014 Hrvoje Pavlinovic`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="stylesheet" href="/blog-20261019-v2.css" />
        <link
          rel="preload"
          href="/fonts/source-sans-3-latin-wght-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta name="description" content={article.seo.description} />
        <meta name="keywords" content={article.seo.keywords.join(", ")} />
        <meta name="author" content={article.seo.author} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" type="text/markdown" href={markdownUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={article.seo.description} />

        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Hrvoje Pavlinovic" />
        <meta property="article:published_time" content={article.createdAt} />
        <meta name="twitter:card" content={article.seo.twitterCard} />
        <meta name="twitter:site" content="@0xhp10" />
        <meta name="twitter:creator" content={article.seo.twitterCreator} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={article.seo.description} />

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
        <SocialImage
          src={absoluteImageUrl}
          alt={article.title}
          standard={!hasArticleImage}
        />
      </Head>

      <div class="site-canvas blog-page">
        <article class="blog-reading-content">
          <header class="blog-post-intro">
            <a href="/blog" class="blog-back">Back to field notes</a>
            <h1>{article.title}</h1>
            <div class="blog-meta">
              <span>By {article.author}</span>
              <time dateTime={article.createdAt}>
                {formatBlogDate(article.createdAt)}
              </time>
              <span>{article.readingTime} min read</span>
              <span>
                {article.views.toLocaleString("en-GB")}{" "}
                {article.views === 1 ? "view" : "views"}
              </span>
            </div>
            {article.tags.length > 0 && (
              <p class="blog-post-tags">{article.tags.join(" · ")}</p>
            )}
            <a class="blog-text-link blog-markdown" href={markdownUrl}>
              Download Markdown
            </a>
          </header>
          <div class="blog-reading-layout">
            <aside class="article-tools-rail" aria-label="Reading tools">
              <ArticleReadingTools sections={outline.sections} />
            </aside>
            <div
              id="article-body"
              class="blog-content"
              dangerouslySetInnerHTML={{ __html: outline.html }}
            />
          </div>
          <footer class="blog-post-footer">
            <SocialActions
              slug={article.slug}
              initialLikes={article.likes}
              seo={article.seo}
            />
            <a class="blog-text-link" href="/blog">All field notes</a>
          </footer>
        </article>
      </div>
    </>
  );
}
