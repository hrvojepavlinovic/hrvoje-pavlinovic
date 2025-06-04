import { useEffect, useState } from "preact/hooks";
import { ComponentChildren } from "preact";
import { trackEvent } from "../utils/track.ts";
import LikeButton from "./LikeButton.tsx";

interface Project {
  name: string;
  url?: string;
  description: string;
  technologies?: string[];
  completion: number;
  likes?: number;
}

const PROJECTS: Project[] = [
  {
    name: "Memoato",
    url: "https://memoato.com",
    description: "A privacy-focused AI-powered note-taking and knowledge management platform for organizing thoughts, ideas, and research with intelligent connections and seamless workflow integration.",
    technologies: ["T3", "AI", "Postgres", "Vercel"],
    completion: 7
  },
  {
    name: "XXI Today",
    url: "https://xxi.today",
    description: "A comprehensive Bitcoin portal providing live network statistics, wallet integration, and tools for exploring the Bitcoin ecosystem in the 21 million era.",
    technologies: ["T3", "Postgres", "Vercel", "Bitcoin"],
    completion: 5
  },
  {
    name: "PLAYGRND",
    url: "https://playgrnd.app",
    description: "A football community platform for organizing street tournaments and small-format leagues, bringing back the pure joy of football to local communities.",
    technologies: ["T3", "Postgres", "Vercel", "Auth"],
    completion: 0
  },
  {
    name: "Apes Club",
    url: "https://apes.club",
    description: "A platform for launching Solana tokens with comprehensive tracking and leaderboard systems, similar to pump.fun for discovering trending coins.",
    technologies: ["Solana", "Web3", "TypeScript", "DeFi"],
    completion: 1
  },
  {
    name: "Hrvoje Pavlinovic",
    url: "https://hrvoje.pavlinovic.com",
    description: "My personal website and portfolio built with modern web technologies. Features a minimalist design, real-time analytics, blog system, and comprehensive project showcase.",
    technologies: ["Deno", "KV", "Fresh", "Tailwind"],
    completion: 20
  },
  {
    name: "HILLS Lab",
    url: "https://hills-lab.hr",
    description: "High-tech company focused on innovative solutions and cutting-edge technology development. As founder, leading strategic direction and technological advancement in various domains.",
    technologies: ["Deno", "Fresh", "Tailwind"],
    completion: 35
  }
];

export default function ProjectsPage() {
  const [sortedProjects, setSortedProjects] = useState<Project[]>(PROJECTS);

  useEffect(() => {
    trackEvent({
      type: "pageview",
      page: "projects"
    });

    // Fetch likes for all projects and sort them
    const fetchAllLikes = async () => {
      try {
        const projectsWithLikes = await Promise.all(
          PROJECTS.map(async (project) => {
            const projectId = project.name.toLowerCase().replace(/\s+/g, '-');
            try {
              const response = await fetch(`/api/likes?project=${encodeURIComponent(projectId)}`);
              if (response.ok) {
                const data = await response.json();
                return { ...project, likes: data.likes };
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
        setSortedProjects(PROJECTS);
      }
    };

    fetchAllLikes();
  }, []);

  return (
    <div class="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white p-8 pt-32 pb-24">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold mb-8">Projects</h1>
        
        <p class="text-gray-600 dark:text-gray-400 text-lg mb-12">
          Here are some of the projects I've started building as a solo founder, ranging from AI-powered platforms to blockchain solutions. Each project represents a unique challenge and learning experience in my entrepreneurial journey.
        </p>

        <div class="grid gap-8 md:grid-cols-2">
          {sortedProjects.map(project => {
            return (
              <div key={project.name} class="group p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50 flex flex-col h-full">
                {/* Clickable content area */}
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackEvent({
                        type: "click",
                        clickType: "link",
                        target: project.name.toLowerCase()
                      });
                    }}
                    class="flex-1 flex flex-col cursor-pointer"
                  >
                    <div class="flex items-center justify-between mb-4">
                      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                        {project.name}
                      </h2>
                      <div class="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
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
                ) : (
                  <div class="flex-1 flex flex-col">
                    <div class="flex items-center justify-between mb-4">
                      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                        {project.name}
                      </h2>
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
                  </div>
                )}
                
                {/* Non-clickable bottom section with tags and likes */}
                <div class="flex items-end justify-between mt-4 pt-4">
                  {project.technologies && (
                    <div class="flex flex-wrap gap-2 flex-1">
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
                  
                  {/* Like button positioned in the bottom right */}
                  <div class="ml-4">
                    <LikeButton projectId={project.name.toLowerCase().replace(/\s+/g, '-')} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 