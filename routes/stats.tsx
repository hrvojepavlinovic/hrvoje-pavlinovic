import { Head } from "$fresh/runtime.ts";
import StatsPage from "../islands/StatsPage.tsx";

export default function Stats() {
  return (
    <>
      <Head>
        <title>Stats | Hrvoje Pavlinovic</title>
        <meta name="description" content="Analytics and statistics for hrvoje.pavlinovic.com - Explore visitor metrics, page views, and performance data." />
        <meta name="keywords" content="Website Analytics, Site Statistics, Page Views, Performance Metrics, Hrvoje Pavlinovic" />
        <meta name="author" content="Hrvoje Pavlinovic" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://hrvoje.pavlinovic.com/stats" />
        
        {/* Open Graph meta tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hrvoje.pavlinovic.com/stats" />
        <meta property="og:title" content="Website Stats | Hrvoje Pavlinovic" />
        <meta property="og:description" content="Analytics and statistics for hrvoje.pavlinovic.com - Explore visitor metrics, page views, and performance data." />
        <meta property="og:image" content="https://hrvoje.pavlinovic.com/pfp.png" />
        <meta property="og:site_name" content="Hrvoje Pavlinovic" />
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@0xhp10" />
        <meta name="twitter:creator" content="@0xhp10" />
        <meta name="twitter:title" content="Website Stats | Hrvoje Pavlinovic" />
        <meta name="twitter:description" content="Analytics and statistics for hrvoje.pavlinovic.com - Explore visitor metrics, page views, and performance data." />
        <meta name="twitter:image" content="https://hrvoje.pavlinovic.com/pfp.png" />
      </Head>
      
      <StatsPage />
    </>
  );
} 