import { Head } from "$fresh/runtime.ts";
import ProjectsPage from "../islands/ProjectsPage.tsx";

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects | Hrvoje Pavlinovic</title>
        <meta name="description" content="Explore Hrvoje Pavlinovic's portfolio of projects including Memoato, XXI Today, PLAYGRND, and Apes Club. Blockchain development, web applications, and innovative solutions." />
        <meta name="keywords" content="Hrvoje Pavlinovic Projects, Memoato, XXI Today, PLAYGRND, Apes Club, Blockchain Projects, Web Development Portfolio" />
        <meta name="author" content="Hrvoje Pavlinovic" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://hrvoje.pavlinovic.com/projects" />
        
        {/* Open Graph meta tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hrvoje.pavlinovic.com/projects" />
        <meta property="og:title" content="Projects | Hrvoje Pavlinovic" />
        <meta property="og:description" content="Explore Hrvoje Pavlinovic's portfolio of projects including Memoato, XXI Today, PLAYGRND, and Apes Club. Blockchain development, web applications, and innovative solutions." />
        <meta property="og:image" content="https://hrvoje.pavlinovic.com/pfp.png" />
        <meta property="og:site_name" content="Hrvoje Pavlinovic" />
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@0xhp10" />
        <meta name="twitter:creator" content="@0xhp10" />
        <meta name="twitter:title" content="Projects | Hrvoje Pavlinovic" />
        <meta name="twitter:description" content="Explore Hrvoje Pavlinovic's portfolio of projects including Memoato, XXI Today, PLAYGRND, and Apes Club. Blockchain development, web applications, and innovative solutions." />
        <meta name="twitter:image" content="https://hrvoje.pavlinovic.com/pfp.png" />
      </Head>
      
      <ProjectsPage />
    </>
  );
} 