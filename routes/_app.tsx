import { type PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import Footer from "../islands/Footer.tsx";

const SITE_TITLE = "Hrvoje Pavlinovic";
const SITE_URL = "https://hrvoje.pavlinovic.com";

const deriveDefaultTitle = (pathname: string) => {
  if (pathname === "/" || pathname === "") return SITE_TITLE;

  const cleanedPath = pathname.replace(/^\/+|\/+$/g, "");
  if (!cleanedPath) return SITE_TITLE;

  const lastSegment = cleanedPath.split("/").pop() ?? "";
  if (!lastSegment) return SITE_TITLE;

  const words = lastSegment.split(/[-_]/g).map((word) =>
    word ? word[0].toUpperCase() + word.slice(1) : ""
  ).filter(Boolean);

  if (words.length === 0) return SITE_TITLE;

  return `${words.join(" ")} \u2014 ${SITE_TITLE}`;
};

const deriveCanonicalUrl = (pathname: string) => {
  const normalizedPath = pathname === "/" ? "" : pathname.replace(/\/+$/g, "");
  return `${SITE_URL}${normalizedPath}`;
};

export default function App({ Component, url }: PageProps) {
  const canonicalUrl = deriveCanonicalUrl(url.pathname);
  const defaultTitle = deriveDefaultTitle(url.pathname);

  // Check if current URL is a specific route that handles its own SEO
  const isCustomSEORoute = url.pathname === "/" ||
    url.pathname.startsWith("/blog/") ||
    url.pathname === "/blog" ||
    url.pathname.startsWith("/projects/") ||
    url.pathname === "/projects" ||
    url.pathname === "/about" ||
    url.pathname === "/cv" ||
    url.pathname === "/webstats" ||
    url.pathname.startsWith("/branding/");

  return (
    <html lang="en" class="dark">
      <head>
        {/* Immediate theme script - must be first */}
        <script>
          {`
            (function() {
              const savedTheme = localStorage.getItem('theme');
              if (savedTheme === 'light') {
                document.documentElement.classList.remove('dark');
              } else {
                document.documentElement.classList.add('dark');
              }
            })();
          `}
        </script>

        {/* Basic Meta Tags */}
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        {/* Default SEO tags - only for homepage and routes without custom SEO */}
        {!isCustomSEORoute && (
          <>
            <title>{defaultTitle}</title>
            <meta
              name="description"
              content="Hrvoje Pavlinovic is a senior backend engineer with 13+ years of experience building reliable production systems across live commerce, payments, logistics, AWS, and complex product domains."
            />
            <meta
              name="keywords"
              content="Hrvoje Pavlinovic, senior backend engineer, software engineering, backend systems, TypeScript, Node.js, AWS, PostgreSQL, live commerce, payments, logistics, PLAYGRND, Memoato"
            />
            <meta name="author" content="Hrvoje Pavlinovic" />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph Meta Tags */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:site_name" content="Hrvoje Pavlinovic" />
            <meta property="og:title" content={defaultTitle} />
            <meta
              property="og:description"
              content="Senior backend engineer building reliable systems for real businesses."
            />
            <meta
              property="og:image"
              content="https://hrvoje.pavlinovic.com/pfp.png"
            />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content="Hrvoje Pavlinovic" />

            {/* Twitter Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@0xhp10" />
            <meta name="twitter:creator" content="@0xhp10" />
            <meta name="twitter:title" content={defaultTitle} />
            <meta
              name="twitter:description"
              content="Senior backend engineer building reliable systems for real businesses."
            />
            <meta
              name="twitter:image"
              content="https://hrvoje.pavlinovic.com/pfp.png"
            />
            <meta name="twitter:image:alt" content="Hrvoje Pavlinovic" />
            <meta name="twitter:url" content={canonicalUrl} />
          </>
        )}

        {/* Always include icons and style resources regardless of route */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />

        {/* Preload and Resource Hints */}
        <link rel="preload" href="/styles.css" as="style" />
        <link rel="stylesheet" href="/styles.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />

        {/* Databuddy Analytics - Only in production */}
        {url.hostname !== "localhost" && (
          <script
            src="https://cdn.databuddy.cc/databuddy.js"
            data-client-id="M-4ShisWAZcWCPjl6j3u-"
            data-track-screen-views="true"
            data-track-attributes="true"
            data-track-performance="true"
            data-track-web-vitals="true"
            data-track-errors="true"
            data-track-sessions="true"
            data-track-outgoing-links="true"
            defer
          >
          </script>
        )}
      </head>
      <body class="dark:bg-black bg-white dark:text-white/80 text-black/80 min-h-screen font-mono">
        <Header />
        <main class="w-full">
          <Component />
        </main>
        <Footer />
      </body>
    </html>
  );
}
