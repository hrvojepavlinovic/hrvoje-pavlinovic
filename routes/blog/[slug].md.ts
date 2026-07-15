import { Handlers } from "$fresh/server.ts";
import blogData from "../../data/blog.json" with { type: "json" };
import { BlogArticle } from "../../types/blog.ts";
import { articleToMarkdown } from "../../utils/blog.ts";

export const handler: Handlers = {
  GET(_req, ctx) {
    const { slug } = ctx.params;
    const articleSlug = slug.endsWith(".md") ? slug.slice(0, -3) : slug;
    const article = (blogData.articles as BlogArticle[]).find((item) =>
      item.slug === articleSlug
    );

    if (!article) {
      return new Response("Not found\n", { status: 404 });
    }

    return new Response(articleToMarkdown(article), {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Content-Disposition": `inline; filename="${article.slug}.md"`,
        "Cache-Control": "public, max-age=300",
      },
    });
  },
};
