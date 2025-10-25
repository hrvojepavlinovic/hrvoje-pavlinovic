import { type PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import Footer from "../islands/Footer.tsx";

const SITE_TITLE = "Hrvoje Pavlinovic";

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

const THEME_SCRIPT = `
(function() {
  if (typeof globalThis === "undefined") return;

  // Initialize theme (redundant check, but safe)
  const savedTheme = localStorage.getItem('theme');
  if (!savedTheme) {
    // Default to dark mode
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  }

  // Robust tracking function with retry logic
  function trackEvent(eventData, retries = 2) {
    if (!globalThis.fetch || !globalThis.location || !globalThis.navigator) return;
    
    const data = JSON.stringify(eventData);
    
    // Try sendBeacon first (more reliable for page unload scenarios)
    if (globalThis.navigator.sendBeacon) {
      const blob = new Blob([data], { type: 'application/json' });
      if (globalThis.navigator.sendBeacon('/api/track', blob)) {
        // Also send to Databuddy if available
        if (globalThis.databuddy && eventData.type === 'click') {
          globalThis.databuddy.track(eventData.clickType + '_click', {
            target: eventData.target,
            page: globalThis.location.pathname,
            timestamp: new Date().toISOString()
          });
        }
        return; // Success
      }
    }
    
    // Fallback to fetch with retry logic
    globalThis.fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
      keepalive: true // Helps with requests during page navigation
    }).then(() => {
      // Also send to Databuddy if available
      if (globalThis.databuddy && eventData.type === 'click') {
        globalThis.databuddy.track(eventData.clickType + '_click', {
          target: eventData.target,
          page: globalThis.location.pathname,
          timestamp: new Date().toISOString()
        });
      }
    }).catch(error => {
      console.warn('Tracking failed:', error);
      if (retries > 0) {
        // Retry after a short delay
        setTimeout(() => trackEvent(eventData, retries - 1), 100);
      }
    });
  }

  // Track page view client-side (in addition to server-side middleware)
  setTimeout(() => {
    // Don't track 404 pages - check if we're on a 404 page
    const is404Page = document.title.includes('404') || 
                     document.querySelector('h1')?.textContent?.includes('404') ||
                     globalThis.location.pathname === '/404';
    
    if (!is404Page) {
      trackEvent({
        type: 'pageview',
        page: globalThis.location.pathname,
        userAgent: globalThis.navigator.userAgent
      });
      
      // Also track page view in Databuddy
      if (globalThis.databuddy) {
        globalThis.databuddy.track('page_view', {
          path: globalThis.location.pathname,
          referrer: document.referrer || 'direct',
          user_agent: globalThis.navigator.userAgent
        });
      }
    }
  }, 100);

  // Add automatic link click tracking
  globalThis.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    if (!target) return;
    
    let linkType = 'link';
    let linkTarget = target.href;
    
    // Determine link type and target
    if (target.hasAttribute('data-internal')) {
      linkType = 'menu';
      linkTarget = target.getAttribute('href') || target.href;
    } else if (target.href) {
      // External links or regular links
      if (target.href.startsWith(globalThis.location.origin)) {
        linkType = 'internal';
        linkTarget = target.getAttribute('href') || target.pathname;
      } else {
        linkType = 'external';
        try {
          const url = new URL(target.href);
          linkTarget = url.hostname;
        } catch {
          linkTarget = target.href;
        }
      }
    }
    
    // Track the click
    trackEvent({
      type: 'click',
      clickType: linkType,
      target: linkTarget
    });
  });

  // Enhanced button click tracking for CTAs
  globalThis.addEventListener('click', (e) => {
    const button = e.target.closest('a[data-track], button[data-track]');
    if (!button) return;
    
    const trackingData = button.getAttribute('data-track');
    const buttonText = button.textContent?.trim() || 'unknown';
    
    // Track internal system
    trackEvent({
      type: 'click',
      clickType: 'cta',
      target: trackingData || buttonText
    });
    
    // Track Databuddy
    if (globalThis.databuddy) {
      globalThis.databuddy.track('cta_click', {
        button_text: buttonText,
        button_id: trackingData,
        page: globalThis.location.pathname,
        button_position: button.getBoundingClientRect().top < globalThis.innerHeight / 2 ? 'above_fold' : 'below_fold'
      });
    }
  });
})();
`;

export default function App({ Component, url }: PageProps) {
  // Check if current URL is a specific route that handles its own SEO
  const isCustomSEORoute = url.pathname.startsWith("/blog/") ||
    url.pathname === "/blog" ||
    url.pathname === "/about" ||
    url.pathname === "/contact" ||
    url.pathname === "/projects" ||
    url.pathname === "/cv";

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
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />

        {/* Default SEO tags - only for homepage and routes without custom SEO */}
        {!isCustomSEORoute && (
          <>
            <title>{deriveDefaultTitle(url.pathname)}</title>
            <meta
              name="description"
              content="Software engineer passionate about blockchain innovation and AI. When not coding, you'll find me on the football pitch."
            />
            <meta
              name="keywords"
              content="Hrvoje Pavlinovic, Software Engineer, Blockchain Innovation, AI Engineering, Web3, Full Stack Developer, Modern Architecture, Football Enthusiast"
            />
            <meta name="author" content="Hrvoje Pavlinovic" />
            <meta name="robots" content="index, follow" />

            {/* Open Graph Meta Tags */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://hrvoje.pavlinovic.com" />
            <meta property="og:site_name" content="Hrvoje Pavlinovic" />
            <meta property="og:title" content="Hrvoje Pavlinovic" />
            <meta
              property="og:description"
              content="Software engineer passionate about blockchain innovation and AI. When not coding, you'll find me on the football pitch."
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
            <meta name="twitter:title" content="Hrvoje Pavlinovic" />
            <meta
              name="twitter:description"
              content="Software engineer passionate about blockchain innovation and AI. When not coding, you'll find me on the football pitch."
            />
            <meta
              name="twitter:image"
              content="https://hrvoje.pavlinovic.com/pfp.png"
            />
            <meta name="twitter:image:alt" content="Hrvoje Pavlinovic" />
          </>
        )}

        {/* Always include icons and style resources regardless of route */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
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

        {/* Main application script */}
        <script>{THEME_SCRIPT}</script>

        {/* Databuddy Analytics - Only in production */}
        {url.hostname !== "localhost" && (
          <script
            src="https://app.databuddy.cc/databuddy.js"
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
