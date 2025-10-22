import { Head } from "$fresh/runtime.ts";
import HomePage from "../islands/HomePage.tsx";
import homeDataJson from "../data/home.json" with { type: "json" };
import { HomeData } from "../types/home.ts";

const homeData = homeDataJson as HomeData;

export default function Home() {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Hrvoje Pavlinovic</title>
        <meta name="title" content="Hrvoje Pavlinovic" />
        <meta
          name="description"
          content="Senior Software Engineer with 12+ years engineering experience. Founder of multiple innovative projects including Memoato, XXI Today, and HILLS Lab. Specializing in AI, blockchain, and Web3 solutions."
        />
        <meta
          name="keywords"
          content="Hrvoje Pavlinovic, Blockchain Developer, Tech Entrepreneur, AI, Web3, Bitcoin, Software Engineering, Startup Founder"
        />
        <meta name="author" content="Hrvoje Pavlinovic" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://hrvoje.pavlinovic.com/" />
        <meta property="og:title" content="Hrvoje Pavlinovic" />
        <meta
          property="og:description"
          content="Senior Software Engineer with 12+ years engineering experience. Founder of multiple innovative projects including Memoato, XXI Today, and HILLS Lab. Specializing in AI, blockchain, and Web3 solutions."
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
          content="Senior Software Engineer with 12+ years engineering experience. Founder of multiple innovative projects including Memoato, XXI Today, and HILLS Lab. Specializing in AI, blockchain, and Web3 solutions."
        />
        <meta
          name="twitter:image"
          content="https://hrvoje.pavlinovic.com/pfptbs.png"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://hrvoje.pavlinovic.com/" />

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
                "Senior Software Engineer and tech entrepreneur with 12+ years engineering experience.",
              "image": "https://hrvoje.pavlinovic.com/pfptbs.png",
              "url": "https://hrvoje.pavlinovic.com",
              "sameAs": [
                "https://twitter.com/0xhp10",
                "https://github.com/hrvoje-pavlinovic",
                "https://linkedin.com/in/hpavlino",
              ],
              "jobTitle": "Senior Software Engineer & Tech Entrepreneur",
              "knowsAbout": [
                "Blockchain Technology",
                "Bitcoin",
                "Artificial Intelligence",
                "Software Development",
                "Web3",
                "Entrepreneurship",
              ],
              "foundingLocation": {
                "@type": "Place",
                "name": "Croatia",
              },
            }),
          }}
        />
      </Head>

      <HomePage data={homeData} />
    </>
  );
}
