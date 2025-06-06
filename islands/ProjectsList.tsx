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
  accent?: string;
}

interface ProjectsListProps {
  projects: Project[];
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  const [sortedProjects, setSortedProjects] = useState<Project[]>(projects);

  // Function to get accent color classes
  const getAccentClasses = (accent?: string) => {
    switch (accent) {
      case 'purple':
        return {
          progress: 'bg-purple-600 dark:bg-purple-400',
          badge: 'bg-purple-600 dark:bg-purple-400',
          background: 'bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/30 dark:to-gray-900',
          hoverBackground: 'group-hover:from-purple-100 group-hover:to-purple-50 dark:group-hover:from-purple-900/50 dark:group-hover:to-purple-950/20'
        };
      case 'orange':
        return {
          progress: 'bg-orange-500 dark:bg-orange-400',
          badge: 'bg-orange-500 dark:bg-orange-400',
          background: 'bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/30 dark:to-gray-900',
          hoverBackground: 'group-hover:from-orange-100 group-hover:to-orange-50 dark:group-hover:from-orange-900/50 dark:group-hover:to-orange-950/20'
        };
      case 'green':
        return {
          progress: 'bg-green-600 dark:bg-green-400',
          badge: 'bg-green-600 dark:bg-green-400',
          background: 'bg-gradient-to-br from-green-50 to-white dark:from-green-950/30 dark:to-gray-900',
          hoverBackground: 'group-hover:from-green-100 group-hover:to-green-50 dark:group-hover:from-green-900/50 dark:group-hover:to-green-950/20'
        };
      case 'violet':
        return {
          progress: 'bg-violet-600 dark:bg-violet-400',
          badge: 'bg-violet-600 dark:bg-violet-400',
          background: 'bg-gradient-to-br from-violet-50 to-white dark:from-violet-950/30 dark:to-gray-900',
          hoverBackground: 'group-hover:from-violet-100 group-hover:to-violet-50 dark:group-hover:from-violet-900/50 dark:group-hover:to-violet-950/20'
        };
      default:
        return {
          progress: 'bg-gray-900 dark:bg-white',
          badge: 'bg-gray-900 dark:bg-white',
          background: 'bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-900',
          hoverBackground: 'group-hover:from-gray-100 group-hover:to-gray-50 dark:group-hover:from-gray-800 dark:group-hover:to-gray-900'
        };
    }
  };

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
    <div class="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {sortedProjects.map(project => {
        const accentClasses = getAccentClasses(project.accent);
        
        return (
          <div 
            key={project.id} 
            class={`group relative flex flex-col h-full border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 ${accentClasses.background} ${accentClasses.hoverBackground}`}
          >
            {/* Main clickable area */}
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
              {/* Header */}
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1 min-w-0">
                  <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                    {project.name}
                  </h2>
                  <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
                
                <div class="ml-3 opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                  <div class="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <svg class="w-3 h-3 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Progress indicator */}
              <div class="mt-auto">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-medium text-gray-500 dark:text-gray-500">Progress</span>
                  <span class="text-xs font-bold text-gray-900 dark:text-white">{project.completion}%</span>
                </div>
                <div class="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
                  <div 
                    class={`h-1.5 rounded-full transition-all duration-500 ${accentClasses.progress}`}
                    style={`width: ${project.completion}%`}
                  ></div>
                </div>
              </div>
            </a>
            
            {/* Bottom section */}
            <div class="p-6 pt-0 mt-auto">
              {/* Technologies */}
              {project.technologies && (
                <div class="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map(tech => {
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
                          class="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          {tech}
                        </a>
                      );
                    }
                    return (
                      <span
                        key={tech}
                        class="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md"
                      >
                        {tech}
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Actions */}
              <div class="flex items-center justify-between">
                {/* Visit site button */}
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
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span>Visit Site</span>
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
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