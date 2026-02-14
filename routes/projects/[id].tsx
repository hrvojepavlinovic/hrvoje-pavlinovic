import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import ProjectPageTracker from "../../islands/ProjectPageTracker.tsx";

const SITE_URL = "https://hrvoje.pavlinovic.com";

interface Project {
  id: string;
  name: string;
  url?: string;
  description: string;
  highlights?: string[];
  technologies?: string[];
  status: "early" | "development" | "live";
  featured: boolean;
  likes?: number;
  accent?: string;
}

interface ProjectsData {
  description: string;
  projects: Project[];
}

export const handler: Handlers<Project | null> = {
  async GET(_, ctx) {
    try {
      const projectsData = await Deno.readTextFile("./data/projects.json");
      const data = JSON.parse(projectsData) as ProjectsData;
      const project = data.projects.find((p) => p.id === ctx.params.id);

      if (!project) {
        return new Response("Project not found", { status: 404 });
      }

      return ctx.render(project);
    } catch (error) {
      console.error("Error loading project:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};

const statusCopy: Record<Project["status"], string> = {
  early: "Exploration",
  development: "In Build",
  live: "In Market",
};

export default function ProjectPage({ data: project }: PageProps<Project>) {
  if (!project) {
    return (
      <div class="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-100 px-6 py-24">
        <div class="max-w-4xl mx-auto text-center space-y-6">
          <h1 class="text-3xl font-semibold">Project not found</h1>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            The project you were looking for is no longer listed.
          </p>
          <a
            href="/projects"
            class="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:border-gray-900 hover:text-gray-900 dark:border-gray-700 dark:text-gray-100 dark:hover:border-gray-100"
          >
            Back to projects
          </a>
        </div>
      </div>
    );
  }

  const pageTitle = `${project.name} \u2014 Hrvoje Pavlinovic`;
  const description = project.description;
  const canonicalUrl = `${SITE_URL}/projects/${project.id}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={description}
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Hrvoje Pavlinovic" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta
          property="og:image"
          content="https://hrvoje.pavlinovic.com/pfptbs.png"
        />
        <meta property="og:site_name" content="Hrvoje Pavlinovic" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@0xhp10" />
        <meta name="twitter:creator" content="@0xhp10" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content="https://hrvoje.pavlinovic.com/pfptbs.png"
        />
        <meta name="twitter:url" content={canonicalUrl} />
      </Head>

      <ProjectPageTracker projectId={project.id} />

      <div class="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-100">
        <section class="max-w-5xl mx-auto px-6 py-24 md:py-32 space-y-10">
          <div class="space-y-4">
            <div class="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              <span class="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 dark:border-gray-700">
                <span class="h-1.5 w-1.5 rounded-full bg-orange-400" />
                {statusCopy[project.status]}
              </span>
            </div>
            <h1 class="text-[32px] font-semibold leading-tight text-gray-900 dark:text-gray-100 md:text-[44px]">
              {project.name}
            </h1>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {project.description}
            </p>
            {project.technologies && project.technologies.length > 0 && (
              <div class="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    class="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-1 dark:border-gray-700 dark:bg-black"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            <div class="flex flex-wrap gap-3">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:border-gray-900 hover:text-gray-900 dark:border-gray-700 dark:text-gray-100 dark:hover:border-gray-100"
                >
                  Visit product
                  <svg
                    class="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </a>
              )}
              <a
                href="mailto:hrvoje@pavlinovic.com"
                class="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-100"
              >
                Email me
                <svg
                  class="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {project.highlights && project.highlights.length > 0 && (
          <section class="border-t border-gray-100 dark:border-gray-800">
            <div class="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-6">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Highlights
              </h2>
              <ul class="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                {project.highlights.map((item) => (
                  <li key={item} class="flex items-start gap-3">
                    <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
