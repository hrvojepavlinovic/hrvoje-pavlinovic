import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import AboutPage from "../islands/AboutPage.tsx";
import aboutDataJson from "../data/about.json" with { type: "json" };
import { AboutData } from "../types/about.ts";
import {
  getMemoatoPublicStats,
  MemoatoPublicStats,
} from "../utils/memoatoStats.ts";

const aboutData = aboutDataJson as AboutData;

interface AboutRouteData {
  about: AboutData;
  memoatoStats: MemoatoPublicStats | null;
}

export const handler: Handlers<AboutRouteData> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const host = req.headers.get("host") ?? "";
    const forceRefresh = url.searchParams.get("refresh") === "1" ||
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1" ||
      url.hostname === "0.0.0.0" ||
      host.includes("localhost") ||
      host.includes("127.0.0.1") ||
      host.includes("0.0.0.0");
    const memoatoStats = await getMemoatoPublicStats({ forceRefresh });
    return ctx.render({ about: aboutData, memoatoStats });
  },
};

export default function About({ data }: PageProps<AboutRouteData>) {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>About &mdash; Hrvoje Pavlinovic</title>
        <meta
          name="title"
          content="About &mdash; Hrvoje Pavlinovic"
        />
        <meta
          name="description"
          content="About Hrvoje Pavlinovic, a senior backend engineer building reliable production systems for complex products and product-heavy teams."
        />
        <meta
          name="keywords"
          content="Hrvoje Pavlinovic, Software Engineer, Backend Engineering, Production Systems, Live Commerce, Payments, AWS, Croatia"
        />
        <meta name="author" content="Hrvoje Pavlinovic" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://hrvoje.pavlinovic.com/about" />
        <meta
          property="og:title"
          content="About &mdash; Hrvoje Pavlinovic"
        />
        <meta
          property="og:description"
          content="Senior backend engineer building reliable production systems for complex products."
        />
        <meta
          property="og:image"
          content="https://hrvoje.pavlinovic.com/blog.png"
        />
        <meta property="og:site_name" content="Hrvoje Pavlinovic" />
        <meta property="profile:first_name" content="Hrvoje" />
        <meta property="profile:last_name" content="Pavlinovic" />
        <meta property="profile:username" content="0xhp10" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@0xhp10" />
        <meta name="twitter:creator" content="@0xhp10" />
        <meta
          name="twitter:title"
          content="About &mdash; Hrvoje Pavlinovic"
        />
        <meta
          name="twitter:description"
          content="Senior backend engineer building reliable production systems for complex products."
        />
        <meta
          name="twitter:image"
          content="https://hrvoje.pavlinovic.com/blog.png"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://hrvoje.pavlinovic.com/about" />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Hrvoje Pavlinovic",
              "alternateName": "@0xhp10",
              "description":
                "Senior backend engineer building reliable production systems for complex products.",
              "image": "https://hrvoje.pavlinovic.com/pfptbs.png",
              "url": "https://hrvoje.pavlinovic.com",
              "sameAs": [
                "https://twitter.com/0xhp10",
                "https://github.com/hrvoje-pavlinovic",
                "https://linkedin.com/in/hpavlino",
              ],
              "jobTitle": "Software Engineer",
              "knowsAbout": [
                "Backend Engineering",
                "Production Systems",
                "Distributed Systems",
                "Live Commerce",
                "Payments",
                "AWS Infrastructure",
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Tilt",
              },
            }),
          }}
        />
      </Head>

      <AboutPage data={data.about} memoatoStats={data.memoatoStats} />
    </>
  );
}
