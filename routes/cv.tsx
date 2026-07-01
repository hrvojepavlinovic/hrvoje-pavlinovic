import { Head } from "$fresh/runtime.ts";
import CVPage from "../islands/CVPage.tsx";

export default function CV() {
  return (
    <>
      <Head>
        <title>CV &mdash; Hrvoje Pavlinovic</title>
        <meta
          name="description"
          content="Professional experience and projects by Hrvoje Pavlinovic, a software engineer focused on backend systems, AI-assisted engineering workflows, context infrastructure, and reliable delivery."
        />
        <meta
          name="keywords"
          content="Hrvoje Pavlinovic, Resume, CV, Software Engineer, AI Context Systems, Backend Engineering, Tech Lead, PLAYGRND, Memoato"
        />
        <meta name="author" content="Hrvoje Pavlinovic" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://hrvoje.pavlinovic.com/cv" />

        {/* Open Graph meta tags */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://hrvoje.pavlinovic.com/cv" />
        <meta
          property="og:title"
          content="CV &mdash; Hrvoje Pavlinovic"
        />
        <meta
          property="og:description"
          content="Professional experience and projects by Hrvoje Pavlinovic, focused on backend systems, AI-assisted engineering workflows, and reliable delivery."
        />
        <meta
          property="og:image"
          content="https://hrvoje.pavlinovic.com/pfp.png"
        />
        <meta property="og:site_name" content="Hrvoje Pavlinovic" />

        {/* Social preview meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="CV &mdash; Hrvoje Pavlinovic"
        />
        <meta
          name="twitter:description"
          content="Professional experience and projects by Hrvoje Pavlinovic, focused on backend systems, AI-assisted engineering workflows, and reliable delivery."
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
