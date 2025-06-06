import { useEffect, useState } from "preact/hooks";
import { trackEvent } from "../utils/track.ts";
import LikeButton from "./LikeButton.tsx";

interface Project {
  id: string;
  name: string;
  url?: string;
  description: string;
  technologies?: string[];
  completion: number;
  featured: boolean;
  likes?: number;
}

interface ProjectsListProps {
  projects: Project[];
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  const [sortedProjects, setSortedProjects] = useState<Project[]>(projects);

  useEffect(() => {
    trackEvent({
      type: "pageview",
      page: "projects"
    });

    // Fetch likes for all projects and sort them
    const fetchLikes = async () => {
      try {
        const projectsWithLikes = await Promise.all(
          projects.map(async (project) => {
            try {
              const likesResponse = await fetch(`/api/likes?project=${encodeURIComponent(project.id)}`);
              if (likesResponse.ok) {
                const likesData = await likesResponse.json();
                return { ...project, likes: likesData.likes };
              }
            } catch (error) {
              console.error(`Error fetching likes for ${project.name}:`, error);
            }
            return { ...project, likes: 0 };
          })
        );

        // Sort by likes count in descending order
        const sorted = projectsWithLikes.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        setSortedProjects(sorted);
      } catch (error) {
        console.error("Error fetching likes data:", error);
        setSortedProjects(projects);
      }
    };

    fetchLikes();
  }, [projects]);

  return (
    <div class="grid gap-8 md:grid-cols-2">
      {sortedProjects.map(project => {
        return (
          <div key={project.id} class="group border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50 flex flex-col h-full overflow-hidden">
            {/* Main clickable area - links to project page */}
            <a
              href={`/projects/${project.id}`}
              onClick={() => {
                trackEvent({
                  type: "click",
                  clickType: "link",
                  target: project.id
                });
              }}
              class="flex-1 flex flex-col p-6 cursor-pointer"
            >
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {project.name}
                </h2>
                <div class="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
              
              {/* Progress bar */}
              <div class="mb-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                  <span class="text-sm font-medium text-gray-900 dark:text-white">{project.completion}%</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                  <div 
                    class="bg-gray-900 dark:bg-white h-2 rounded-full transition-all duration-300"
                    style={`width: ${project.completion}%`}
                  ></div>
                </div>
              </div>
              
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
                {project.description}
              </p>
            </a>
            
            {/* Bottom section with tags, external link, and likes */}
            <div class="p-6 pt-0 space-y-4">
              {/* Technologies */}
              {project.technologies && (
                <div class="flex flex-wrap gap-2">
                  {project.technologies.map(tech => {
                    // Special handling for T3 to make it a link
                    if (tech === "T3") {
                      return (
                        <a
                          key={tech}
                          href="https://create.t3.gg"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            trackEvent({
                              type: "click",
                              clickType: "link",
                              target: "t3"
                            });
                          }}
                          class="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          {tech}
                        </a>
                      );
                    }
                    return (
                      <span
                        key={tech}
                        class="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md"
                      >
                        {tech}
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Actions row */}
              <div class="flex items-center justify-between">
                {/* External link button */}
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      trackEvent({
                        type: "click",
                        clickType: "link",
                        target: project.id
                      });
                    }}
                    class="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-md hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                  >
                    Visit Site
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                  </a>
                ) : (
                  <div></div>
                )}
                
                {/* Like button */}
                <div class="flex-shrink-0">
                  <LikeButton projectId={project.id} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 