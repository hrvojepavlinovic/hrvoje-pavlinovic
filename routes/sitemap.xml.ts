import { Handlers } from "$fresh/server.ts";
import blogData from "../data/blog.json" with { type: "json" };
import projectsData from "../data/projects.json" with { type: "json" };
import { BlogArticle } from "../types/blog.ts";

const SITE_URL = "https://hrvoje.pavlinovic.com";
const PROJECTS_LASTMOD = "2026-06-27";

type SitemapEntry = {
  loc: string;
  lastmod: string;
  changefreq: "weekly" | "monthly";
  priority: string;
};

type Project = {
  id: string;
};

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const toDate = (isoDate: string) => isoDate.slice(0, 10);

const latestDate = (dates: string[]) =>
  dates.toSorted((a, b) => b.localeCompare(a))[0] ?? PROJECTS_LASTMOD;

const renderSitemap = (entries: SitemapEntry[]) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  entries.map((entry) =>
    [
      "  <url>",
      `    <loc>${escapeXml(entry.loc)}</loc>`,
      `    <lastmod>${entry.lastmod}</lastmod>`,
      `    <changefreq>${entry.changefreq}</changefreq>`,
      `    <priority>${entry.priority}</priority>`,
      "  </url>",
    ].join("\n")
  ).join("\n") +
  "\n</urlset>\n";

export const handler: Handlers = {
  GET() {
    const articles = blogData.articles as BlogArticle[];
    const projects = projectsData.projects as Project[];
    const latestBlogDate = latestDate(
      articles.map((article) => toDate(article.createdAt)),
    );
    const siteLastmod = latestDate([latestBlogDate, PROJECTS_LASTMOD]);

    const entries: SitemapEntry[] = [
      {
        loc: SITE_URL,
        lastmod: siteLastmod,
        changefreq: "monthly",
        priority: "1.0",
      },
      {
        loc: `${SITE_URL}/about`,
        lastmod: siteLastmod,
        changefreq: "monthly",
        priority: "0.9",
      },
      {
        loc: `${SITE_URL}/projects`,
        lastmod: PROJECTS_LASTMOD,
        changefreq: "monthly",
        priority: "0.8",
      },
      ...projects.map((project) => ({
        loc: `${SITE_URL}/projects/${project.id}`,
        lastmod: PROJECTS_LASTMOD,
        changefreq: "monthly" as const,
        priority: "0.7",
      })),
      {
        loc: `${SITE_URL}/blog`,
        lastmod: latestBlogDate,
        changefreq: "weekly",
        priority: "0.8",
      },
      ...articles.map((article) => ({
        loc: `${SITE_URL}/blog/${article.slug}`,
        lastmod: toDate(article.createdAt),
        changefreq: "monthly" as const,
        priority: "0.7",
      })),
      {
        loc: `${SITE_URL}/cv`,
        lastmod: siteLastmod,
        changefreq: "monthly",
        priority: "0.6",
      },
      {
        loc: `${SITE_URL}/cover`,
        lastmod: siteLastmod,
        changefreq: "monthly",
        priority: "0.4",
      },
    ];

    return new Response(renderSitemap(entries), {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  },
};
