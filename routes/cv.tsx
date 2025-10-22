import { Head } from "$fresh/runtime.ts";
import CVPage from "../islands/CVPage.tsx";

export default function CV() {
  return (
    <>
      <Head>
        <title>CV | Hrvoje Pavlinovic</title>
        <meta
          name="description"
          content="Professional experience and skills of Hrvoje Pavlinovic - Senior Software Engineer and Tech Lead with expertise in Bitcoin, blockchain technology, and decentralized systems."
        />
        <meta
          name="keywords"
          content="Hrvoje Pavlinovic, Resume, CV, Blockchain Developer, Bitcoin Developer, Tech Lead, Software Engineering"
        />
        <meta name="author" content="Hrvoje Pavlinovic" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://hrvoje.pavlinovic.com/cv" />

        {/* Open Graph meta tags */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://hrvoje.pavlinovic.com/cv" />
        <meta property="og:title" content="CV | Hrvoje Pavlinovic" />
        <meta
          property="og:description"
          content="Professional experience and skills of Hrvoje Pavlinovic - Senior Software Engineer and Tech Lead with expertise in Bitcoin, blockchain technology, and decentralized systems."
        />
        <meta
          property="og:image"
          content="https://hrvoje.pavlinovic.com/pfp.png"
        />
        <meta property="og:site_name" content="Hrvoje Pavlinovic" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@0xhp10" />
        <meta name="twitter:creator" content="@0xhp10" />
        <meta name="twitter:title" content="CV | Hrvoje Pavlinovic" />
        <meta
          name="twitter:description"
          content="Professional experience and skills of Hrvoje Pavlinovic - Senior Software Engineer and Tech Lead with expertise in Bitcoin, blockchain technology, and decentralized systems."
        />
        <meta
          name="twitter:image"
          content="https://hrvoje.pavlinovic.com/pfp.png"
        />
      </Head>

      <CVPage />
    </>
  );
}
