import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import ProjectsPage from "../components/ProjectsPage.tsx";

import { ProjectsData } from "../types/projects.ts";

export const handler: Handlers<ProjectsData> = {
  async GET(_, ctx) {
    try {
      const projectsText = await Deno.readTextFile("./data/projects.json");
      const projectsData: ProjectsData = JSON.parse(projectsText);
      return ctx.render(projectsData);
    } catch (error) {
      console.error("Error loading projects data:", error);
      // Fallback data
      const fallbackData: ProjectsData = {
        description: "Unable to load projects data.",
        projects: [],
      };
      return ctx.render(fallbackData);
    }
  },
};

export default function Projects({ data }: PageProps<ProjectsData>) {
  return (
    <>
      <Head>
        <title>Projects — Hrvoje Pavlinovic</title>
        <link rel="stylesheet" href="/projects-20261016.css" />
        <link
          rel="preload"
          href="/fonts/source-sans-3-latin-wght-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta
          name="description"
          content="A small selection of products and side projects by Hrvoje Pavlinovic, led by PLAYGRND, Memoato, and PLAYGRND Draft."
        />
        <meta
          name="keywords"
          content="Hrvoje Pavlinovic projects, PLAYGRND, Memoato, PLAYGRND Draft, backend engineering, product engineering"
        />
        <meta name="author" content="Hrvoje Pavlinovic" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://hrvoje.pavlinovic.com/projects" />

        {/* Open Graph meta tags */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://hrvoje.pavlinovic.com/projects"
        />
        <meta
          property="og:title"
          content="Projects — Hrvoje Pavlinovic"
        />
        <meta
          property="og:description"
          content="A small selection of products and side projects by Hrvoje Pavlinovic, led by PLAYGRND, Memoato, and PLAYGRND Draft."
        />
        <meta
          property="og:image"
          content="https://hrvoje.pavlinovic.com/blog.png"
        />
        <meta property="og:site_name" content="Hrvoje Pavlinovic" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Projects — Hrvoje Pavlinovic"
        />
        <meta
          name="twitter:description"
          content="A small selection of products and side projects by Hrvoje Pavlinovic, led by PLAYGRND, Memoato, and PLAYGRND Draft."
        />
        <meta
          name="twitter:image"
          content="https://hrvoje.pavlinovic.com/blog.png"
        />
      </Head>

      <ProjectsPage projectsData={data} />
    </>
  );
}
