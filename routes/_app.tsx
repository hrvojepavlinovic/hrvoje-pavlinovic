import { type PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import Footer from "../islands/Footer.tsx";

const THEME_SCRIPT = `
(function() {
  if (typeof globalThis === "undefined") return;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  } else {
    const prefersDark = globalThis.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', prefersDark);
    localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
  }

  // Track page view
  if (globalThis.fetch && globalThis.location && globalThis.navigator) {
    globalThis.fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'pageview',
        page: globalThis.location.pathname,
        userAgent: globalThis.navigator.userAgent
      })
    }).catch(console.error);
  }
})();
`;

export default function App({ Component, url }: PageProps) {
  // Check if current URL is a specific route that handles its own SEO
  const isCustomSEORoute = url.pathname.startsWith('/blog/') || 
                         url.pathname === '/blog' || 
                         url.pathname === '/about' || 
                         url.pathname === '/contact' || 
                         url.pathname === '/projects' || 
                         url.pathname === '/cv' || 
                         url.pathname === '/stats';

  return (
    <html lang="en">
      <head>
        {/* Basic Meta Tags */}
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        {/* Default SEO tags - only for homepage and routes without custom SEO */}
        {!isCustomSEORoute && (
          <>
            <title>Hrvoje Pavlinovic</title>
            <meta name="description" content="Software engineer passionate about blockchain innovation and AI. When not coding, you'll find me on the football pitch." />
            <meta name="keywords" content="Hrvoje Pavlinovic, Software Engineer, Blockchain Innovation, AI Engineering, Web3, Full Stack Developer, Modern Architecture, Football Enthusiast" />
            <meta name="author" content="Hrvoje Pavlinovic" />
            <meta name="robots" content="index, follow" />
            
            {/* Open Graph Meta Tags */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://hrvoje.pavlinovic.com" />
            <meta property="og:site_name" content="Hrvoje Pavlinovic" />
            <meta property="og:title" content="Hrvoje Pavlinovic" />
            <meta property="og:description" content="Software engineer passionate about blockchain innovation and AI. When not coding, you'll find me on the football pitch." />
            <meta property="og:image" content="https://hrvoje.pavlinovic.com/pfp.png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content="Hrvoje Pavlinovic" />
            
            {/* Twitter Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@0xhp10" />
            <meta name="twitter:creator" content="@0xhp10" />
            <meta name="twitter:title" content="Hrvoje Pavlinovic" />
            <meta name="twitter:description" content="Software engineer passionate about blockchain innovation and AI. When not coding, you'll find me on the football pitch." />
            <meta name="twitter:image" content="https://hrvoje.pavlinovic.com/pfp.png" />
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
        
        <script>{THEME_SCRIPT}</script>
      </head>
      <body class="dark:bg-black bg-white dark:text-white/80 text-black/80 min-h-screen flex flex-col font-mono">
        <Header />
        <main 
          class="flex-1 overflow-y-auto w-full"
        >
          <Component />
        </main>
        <Footer />
      </body>
    </html>
  );
}
