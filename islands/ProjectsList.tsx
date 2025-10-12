import { useEffect, useState } from "preact/hooks";
import { trackEvent } from "../utils/track.ts";

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

interface ProjectsListProps {
  projects: Project[];
}

const statusCopy: Record<Project["status"], { label: string; tone: string }> = {
  early: { label: "Exploration", tone: "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200" },
  development: { label: "In Build", tone: "bg-orange-50 text-orange-700 dark:bg-orange-900/40 dark:text-orange-200" },
  live: { label: "In Market", tone: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200" },
};

const accentDot: Record<string, string> = {
  emerald: "bg-emerald-400",
  orange: "bg-orange-400",
  green: "bg-green-400",
  violet: "bg-violet-400",
};

export default function ProjectsList({ projects }: ProjectsListProps) {
  const [sortedProjects, setSortedProjects] = useState<Project[]>(projects);

  useEffect(() => {
    trackEvent({ type: "pageview", page: "projects" });

    const fetchLikes = async () => {
      try {
        const enriched = await Promise.all(
          projects.map(async (project) => {
            try {
              const response = await fetch(`/api/likes?project=${encodeURIComponent(project.id)}`);
              if (!response.ok) return { ...project, likes: 0 };
              const data = await response.json();
              return { ...project, likes: data.likes };
            } catch {
              return { ...project, likes: 0 };
            }
          }),
        );

        enriched.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        setSortedProjects(enriched);
      } catch (error) {
        console.error("Error hydrating projects list", error);
        setSortedProjects(projects);
      }
    };

    fetchLikes();
  }, [projects]);

  return (
    <div class="space-y-8">
      {sortedProjects.map((project) => {
        const status = statusCopy[project.status];
        const dot = accentDot[project.accent ?? ""] ?? "bg-gray-300";
        const pitch = project.pitch;

        const infoBlocks = [
          pitch?.problem && { title: "Focus", body: pitch.problem },
          pitch?.currentState && { title: "Traction", body: pitch.currentState },
          pitch?.targetFunding && {
            title: "Raise plan",
            body: `${pitch.targetFunding}${pitch.timeToMarket ? ` · ${pitch.timeToMarket}` : ""}${pitch.teamCosts ? `\n${pitch.teamCosts}` : ""}`,
          },
          pitch?.solution && { title: "Solution", body: pitch.solution },
        ]
          .filter((block): block is { title: string; body: string } => Boolean(block && block.body))
          .slice(0, 2);

        return (
          <article
            key={project.id}
            class="space-y-6 rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm transition-colors hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900/40 dark:hover:border-gray-600"
          >
            <header class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  <span class={`h-1.5 w-1.5 rounded-full ${dot}`} />
                  {project.name}
                </div>
                {pitch?.tagline && (
                  <p class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {pitch.tagline}
                  </p>
                )}
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {project.description}
                </p>
              </div>
              <span class={`inline-flex min-w-[140px] justify-center h-8 items-center rounded-full px-4 text-xs font-semibold text-center ${status.tone}`}>
                {status.label}
              </span>
            </header>

            {infoBlocks.length > 0 && (
              <div class="grid gap-4 md:grid-cols-2">
                {infoBlocks.map((block) => (
                  <div key={block.title} class="space-y-2 rounded-xl border border-gray-100 bg-white/70 p-4 dark:border-gray-800 dark:bg-gray-900/60">
                    <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      {block.title}
                    </p>
                    <p class="text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {block.body}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <footer class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div class="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400">
                {project.technologies?.map((tech) => (
                  <span
                    key={tech}
                    class="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-1 dark:border-gray-700 dark:bg-gray-900"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div class="flex flex-wrap gap-2">
                <a
                  href={`/projects/${project.id}`}
                  onClick={() =>
                    trackEvent({ type: "click", clickType: "link", target: `${project.id}-memo` })
                  }
                  class="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:border-gray-900 hover:text-gray-900 dark:border-gray-700 dark:text-gray-100 dark:hover:border-gray-100"
                >
                  Read memo
                  <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </a>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent({ type: "click", clickType: "link", target: `${project.id}-live` })
                    }
                    class="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-100"
                  >
                    Visit product
                    <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M5 12h14" />
                      <path d="M13 6l6 6-6 6" />
                    </svg>
                  </a>
                )}
              </div>
            </footer>
          </article>
        );
      })}
    </div>
  );
}
