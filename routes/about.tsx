import { Head } from "$fresh/runtime.ts";
import AboutPage from "../islands/AboutPage.tsx";

export default function About() {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>About Hrvoje Pavlinovic | Blockchain Developer & Tech Lead</title>
        <meta name="title" content="About Hrvoje Pavlinovic | Blockchain Developer & Tech Lead" />
        <meta name="description" content="Senior blockchain developer and tech lead with 4+ years of experience in decentralized systems. Specializing in Bitcoin, blockchain technology, and scalable software solutions." />
        <meta name="keywords" content="Hrvoje Pavlinovic, Blockchain Developer, Bitcoin Developer, Tech Lead, Software Engineering, Decentralized Systems, Web3, Football" />
        <meta name="author" content="Hrvoje Pavlinovic" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://hrvoje.pavlinovic.com/about" />
        <meta property="og:title" content="About Hrvoje Pavlinovic | Blockchain Developer & Tech Lead" />
        <meta property="og:description" content="Senior blockchain developer and tech lead with 4+ years of experience in decentralized systems. Specializing in Bitcoin, blockchain technology, and scalable software solutions." />
        <meta property="og:image" content="https://hrvoje.pavlinovic.com/pfptbs.png" />
        <meta property="og:site_name" content="Hrvoje Pavlinovic" />
        <meta property="profile:first_name" content="Hrvoje" />
        <meta property="profile:last_name" content="Pavlinovic" />
        <meta property="profile:username" content="0xhp10" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@0xhp10" />
        <meta name="twitter:creator" content="@0xhp10" />
        <meta name="twitter:title" content="About Hrvoje Pavlinovic | Blockchain Developer & Tech Lead" />
        <meta name="twitter:description" content="Senior blockchain developer and tech lead with 4+ years of experience in decentralized systems. Specializing in Bitcoin, blockchain technology, and scalable software solutions." />
        <meta name="twitter:image" content="https://hrvoje.pavlinovic.com/pfptbs.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://hrvoje.pavlinovic.com/about" />

        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Hrvoje Pavlinovic",
            "alternateName": "0xhp10",
            "description": "Senior blockchain developer and tech lead with 4+ years of experience in decentralized systems.",
            "image": "https://hrvoje.pavlinovic.com/pfptbs.png",
            "url": "https://hrvoje.pavlinovic.com",
            "sameAs": [
              "https://twitter.com/0xhp10",
              "https://github.com/hrvoje-pavlinovic"
            ],
            "jobTitle": "Blockchain Developer & Tech Lead",
            "knowsAbout": [
              "Blockchain Technology",
              "Bitcoin",
              "Software Development",
              "Decentralized Systems",
              "Web3"
            ],
            "worksFor": {
              "@type": "Organization",
              "name": "Independent Contractor"
            }
          })}
        </script>
      </Head>
      
      <AboutPage />
    </>
  );
} 