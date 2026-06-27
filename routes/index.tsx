import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import HomePage from "../islands/HomePage.tsx";
import homeDataJson from "../data/home.json" with { type: "json" };
import { HomeData } from "../types/home.ts";
import {
  getMemoatoPublicStats,
  MemoatoPublicStats,
} from "../utils/memoatoStats.ts";

const homeData = homeDataJson as HomeData;

interface HomeRouteData {
  home: HomeData;
  memoatoStats: MemoatoPublicStats | null;
}

export const handler: Handlers<HomeRouteData> = {
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
    return ctx.render({ home: homeData, memoatoStats });
  },
};

export default function Home({ data }: PageProps<HomeRouteData>) {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Hrvoje Pavlinovic</title>
        <meta name="title" content="Hrvoje Pavlinovic" />
        <meta
          name="description"
          content="Hrvoje Pavlinovic builds reliable context systems for AI-assisted software teams, with a focus on memory, provenance, permissions, stale-context detection, and evals."
        />
        <meta
          name="keywords"
          content="Hrvoje Pavlinovic, AI context systems, agent memory, context engineering, software engineering, backend systems, provenance, evals, Codex, Claude, Cursor"
        />
        <meta name="author" content="Hrvoje Pavlinovic" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://hrvoje.pavlinovic.com" />
        <meta property="og:title" content="Hrvoje Pavlinovic" />
        <meta
          property="og:description"
          content="Building reliable context systems for AI-assisted software teams."
        />
        <meta
          property="og:image"
          content="https://hrvoje.pavlinovic.com/pfptbs.png"
        />
        <meta property="og:site_name" content="Hrvoje Pavlinovic" />
        <meta property="profile:first_name" content="Hrvoje" />
        <meta property="profile:last_name" content="Pavlinovic" />
        <meta property="profile:username" content="0xhp10" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@0xhp10" />
        <meta name="twitter:creator" content="@0xhp10" />
        <meta name="twitter:title" content="Hrvoje Pavlinovic" />
        <meta
          name="twitter:description"
          content="Building reliable context systems for AI-assisted software teams."
        />
        <meta
          name="twitter:image"
          content="https://hrvoje.pavlinovic.com/pfptbs.png"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://hrvoje.pavlinovic.com" />

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
                "Software engineer building reliable context systems for AI-assisted software teams.",
              "image": "https://hrvoje.pavlinovic.com/pfptbs.png",
              "url": "https://hrvoje.pavlinovic.com",
              "sameAs": [
                "https://twitter.com/0xhp10",
                "https://github.com/hrvoje-pavlinovic",
                "https://linkedin.com/in/hpavlino",
              ],
              "jobTitle": "Software Engineer",
              "knowsAbout": [
                "AI Context Systems",
                "Agent Memory",
                "Context Engineering",
                "Software Engineering",
                "Provenance",
                "Evals",
                "Backend Systems",
              ],
              "foundingLocation": {
                "@type": "Place",
                "name": "Croatia",
              },
            }),
          }}
        />
      </Head>

      <HomePage data={data.home} memoatoStats={data.memoatoStats} />
    </>
  );
}
