import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import ProjectPageTracker from "../../islands/ProjectPageTracker.tsx";

interface ProjectPitch {
  tagline?: string;
  problem?: string;
  solution?: string;
  marketOpportunity?: string;
  vision?: string;
  competitiveAdvantage?: string[];
  pricingModel?: string;
  targetFunding?: string;
  fundsAllocation?: string[];
  teamCosts?: string;
  timeToMarket?: string;
  currentState?: string;
}

interface Project {
  id: string;
  name: string;
  url?: string;
  description: string;
  technologies?: string[];
  status: "early" | "development" | "live";
  featured: boolean;
  likes?: number;
  accent?: string;
  pitch?: ProjectPitch;
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
  if (!project || !project.pitch) {
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

  const pitch = project.pitch;
  const sections: Array<{ title: string; body?: string; list?: string[] }> = [
    { title: "Problem", body: pitch.problem },
    { title: "Solution", body: pitch.solution },
    { title: "Market", body: pitch.marketOpportunity },
    { title: "Why now", body: pitch.vision },
    { title: "Traction", body: pitch.currentState },
    pitch.competitiveAdvantage && pitch.competitiveAdvantage.length
      ? { title: "Moats", list: pitch.competitiveAdvantage }
      : undefined,
    pitch.fundsAllocation && pitch.fundsAllocation.length
      ? { title: "Use of funds", list: pitch.fundsAllocation }
      : undefined,
    pitch.pricingModel
      ? { title: "Business model", body: pitch.pricingModel }
      : undefined,
  ].filter(Boolean) as Array<{ title: string; body?: string; list?: string[] }>;

  return (
    <>
      <Head>
        <title>{project.name} | {pitch.tagline ?? "Project memo"}</title>
        <meta
          name="description"
          content={pitch.problem ?? project.description}
        />
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
              {pitch.targetFunding && (
                <span class="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 text-orange-600 dark:border-gray-700 dark:text-orange-300">
                  Raise plan: {pitch.targetFunding}
                </span>
              )}
            </div>
            <h1 class="text-[32px] font-semibold leading-tight text-gray-900 dark:text-gray-100 md:text-[44px]">
              {project.name}
            </h1>
            {pitch.tagline && (
              <p class="text-lg text-gray-600 dark:text-gray-300">
                {pitch.tagline}
              </p>
            )}
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {project.description}
            </p>
            <div class="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400">
              {project.technologies?.map((tech) => (
                <span
                  key={tech}
                  class="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-1 dark:border-gray-700 dark:bg-black"
                >
                  {tech}
                </span>
              ))}
            </div>
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
                href="/contact"
                class="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-100"
              >
                Request deck
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

        <section class="border-t border-gray-100 dark:border-gray-800">
          <div class="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-8">
            <div class="space-y-3">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Investment memo
              </h2>
              <p class="max-w-3xl text-sm text-gray-600 dark:text-gray-400">
                Snapshot of the problem, solution, and capital plan. Full
                financials available on request.
              </p>
            </div>

            <div class="space-y-6">
              {sections.map((section) => (
                <div
                  key={section.title}
                  class="space-y-3 rounded-2xl border border-gray-200 bg-white/80 p-6 dark:border-gray-800 dark:bg-black/40"
                >
                  <h3 class="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {section.title}
                  </h3>
                  {section.body && (
                    <p class="text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {section.body}
                    </p>
                  )}
                  {section.list && (
                    <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      {section.list.map((item) => (
                        <li key={item} class="flex items-start gap-3">
                          <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {(pitch.teamCosts || pitch.pricingModel) && (
              <div class="space-y-6 rounded-2xl border border-gray-200 bg-white/80 p-6 dark:border-gray-800 dark:bg-black/40">
                {pitch.teamCosts && (
                  <div class="space-y-2">
                    <h3 class="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Team & burn
                    </h3>
                    <p class="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                      {pitch.teamCosts}
                    </p>
                  </div>
                )}
                {pitch.pricingModel && (
                  <div class="space-y-2">
                    <h3 class="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Monetisation
                    </h3>
                    <p class="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                      {pitch.pricingModel}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
