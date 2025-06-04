import { useEffect } from "preact/hooks";
import { trackEvent } from "../utils/track.ts";

interface Project {
  name: string;
  url?: string;
  description: string;
  technologies?: string[];
}

const PROJECTS: Project[] = [
  {
    name: "Memoato",
    url: "https://memoato.com",
    description: "A privacy-focused AI-powered note-taking and knowledge management platform for organizing thoughts and ideas.",
    technologies: ["T3", "AI", "Postgres", "Vercel"]
  },
  {
    name: "XXI Today",
    url: "https://xxi.today",
    description: "A comprehensive Bitcoin portal providing live network statistics, wallet integration, and tools for exploring the Bitcoin ecosystem in the 21 million era.",
    technologies: ["T3", "Postgres", "Vercel", "Bitcoin"]
  },
  {
    name: "PLAYGRND",
    url: "https://playgrnd.app",
    description: "A football community platform for organizing street tournaments and small-format leagues, bringing back the pure joy of football to local communities.",
    technologies: ["T3", "Postgres", "Vercel", "Auth"]
  },
  {
    name: "Apes Club",
    description: "A platform for launching Solana tokens with comprehensive tracking and leaderboard systems, similar to pump.fun for discovering trending coins.",
    technologies: ["Solana", "Web3", "TypeScript", "DeFi"]
  }
];

export default function ProjectsPage() {
  useEffect(() => {
    trackEvent({
      type: "pageview",
      page: "projects"
    });
  }, []);

  return (
    <div class="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white p-8 pt-32 pb-24">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold mb-8">Projects</h1>
        
        <p class="text-gray-600 dark:text-gray-400 text-lg mb-12">
          Here are some of the projects I've worked on, ranging from web applications to blockchain solutions. Each project represents a unique challenge and learning experience.
        </p>

        <div class="grid gap-8 md:grid-cols-2">
          {PROJECTS.map(project => {
            const ProjectCard = ({ children }: { children: any }) => {
              if (project.url) {
                return (
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
                    class="group p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50 block cursor-pointer"
                  >
                    {children}
                  </a>
                );
              } else {
                return (
                  <div class="group p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
                    {children}
                  </div>
                );
              }
            };

            return (
              <ProjectCard key={project.name}>
                <div class="flex items-center justify-between mb-4">
                  <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                    {project.name}
                  </h2>
                  {project.url && (
                    <div class="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </div>
                  )}
                </div>
                
                <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
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
              </ProjectCard>
            );
          })}
        </div>
      </div>
    </div>
  );
} 