import { useEffect, useState } from "preact/hooks";
import { trackEvent } from "../utils/track.ts";

interface Project {
  id: string;
  name: string;
  url?: string;
  description: string;
  highlights?: string[];
  technologies?: string[];
  status: "early" | "development" | "live" | "sunsetted";
  featured: boolean;
  likes?: number;
  accent?: string;
  image?: string;
  imageAlt?: string;
  caseStudy?: unknown;
}

interface ProjectsListProps {
  projects: Project[];
}

const statusCopy: Record<Project["status"], { label: string; tone: string }> = {
  early: {
    label: "Exploration",
    tone: "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200",
  },
  development: {
    label: "In Build",
    tone:
      "bg-orange-50 text-orange-700 dark:bg-orange-900/40 dark:text-orange-200",
  },
  live: {
    label: "In Market",
    tone:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200",
  },
  sunsetted: {
    label: "Sunsetted",
    tone: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  },
};

const statusRank: Record<Project["status"], number> = {
  early: 0,
  development: 0,
  live: 0,
  sunsetted: 1,
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
    const fetchLikes = async () => {
      try {
        const enriched = await Promise.all(
          projects.map(async (project) => {
            try {
              const response = await fetch(
                `/api/likes?project=${encodeURIComponent(project.id)}`,
              );
              if (!response.ok) return { ...project, likes: 0 };
              const data = await response.json();
              return { ...project, likes: data.likes };
            } catch {
              return { ...project, likes: 0 };
            }
          }),
        );

        setSortedProjects(
          enriched.toSorted((a, b) =>
            statusRank[a.status] - statusRank[b.status]
          ),
        );
      } catch (error) {
        console.error("Error hydrating projects list", error);
        setSortedProjects(
          projects.toSorted((a, b) =>
            statusRank[a.status] - statusRank[b.status]
          ),
        );
      }
    };

    fetchLikes();
  }, [projects]);

  return (
    <div class="space-y-8">
      {sortedProjects.map((project) => {
        const status = statusCopy[project.status];
        const dot = accentDot[project.accent ?? ""] ?? "bg-gray-300";

        return (
          <article
            key={project.id}
            class={`surface-card space-y-6 p-6 ${
              project.id === "playgrnd" ? "accent-card" : ""
            }`}
            data-tilt
            data-reveal
          >
            <header class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div class="flex min-w-0 items-start gap-4">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.imageAlt ?? ""}
                    class="h-12 w-12 flex-none object-contain"
                  />
                )}
                <div class="min-w-0 space-y-2">
                  <div class="flex flex-wrap items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    <span class={`h-1.5 w-1.5 rounded-full ${dot}`} />
                    {project.name}
                    {project.id === "playgrnd" && (
                      <span class="text-orange-600 dark:text-orange-400">
                        Flagship product
                      </span>
                    )}
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {project.description}
                  </p>
                </div>
              </div>
              <span
                class={`inline-flex min-w-[140px] justify-center h-8 items-center rounded-full px-4 text-xs font-semibold text-center ${status.tone}`}
              >
                {status.label}
              </span>
            </header>

            {project.highlights && project.highlights.length > 0 && (
              <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {project.highlights.slice(0, 3).map((item) => (
                  <li key={item} class="flex items-start gap-3">
                    <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            <footer class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {project.technologies && project.technologies.length > 0 && (
                <div class="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      class="tag-chip inline-flex items-center px-2.5 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div class="flex flex-wrap gap-2">
                <a
                  href={`/projects/${project.id}`}
                  onClick={() =>
                    trackEvent({
                      type: "click",
                      clickType: "link",
                      target: `${project.id}-details`,
                    })}
                  class="action-button"
                >
                  {project.caseStudy ? "Case study" : "Details"}
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
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent({
                        type: "click",
                        clickType: "link",
                        target: `${project.id}-live`,
                      })}
                    class="action-button"
                  >
                    Check it out
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
              </div>
            </footer>
          </article>
        );
      })}
    </div>
  );
}
