import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import ProjectsPage from "../components/ProjectsPage.tsx";

interface Project {
  id: string;
  name: string;
  url?: string;
  description: string;
  highlights?: string[];
  technologies?: string[];
  status: "early" | "development" | "live";
  featured: boolean;
  accent?: string;
}

interface ProjectsData {
  description: string;
  projects: Project[];
}

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
        <title>Projects &mdash; Hrvoje Pavlinovic</title>
        <meta
          name="description"
          content="A small selection of products and side projects by Hrvoje Pavlinovic, including Memoato, PLAYGRND, and XXI Today."
        />
        <meta
          name="keywords"
          content="Hrvoje Pavlinovic projects, Memoato, PLAYGRND, XXI Today, backend engineering, Bitcoin"
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
          content="Projects &mdash; Hrvoje Pavlinovic"
        />
        <meta
          property="og:description"
          content="A small selection of products and side projects by Hrvoje Pavlinovic, including Memoato, PLAYGRND, and XXI Today."
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
        <meta
          name="twitter:title"
          content="Projects &mdash; Hrvoje Pavlinovic"
        />
        <meta
          name="twitter:description"
          content="A small selection of products and side projects by Hrvoje Pavlinovic, including Memoato, PLAYGRND, and XXI Today."
        />
        <meta
          name="twitter:image"
          content="https://hrvoje.pavlinovic.com/pfp.png"
        />
      </Head>

      <ProjectsPage projectsData={data} />
    </>
  );
}
