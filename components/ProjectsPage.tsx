import ProjectsList from "../islands/ProjectsList.tsx";

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

interface ProjectsData {
  description: string;
  projects: Project[];
}

interface ProjectsPageProps {
  projectsData: ProjectsData;
}

export default function ProjectsPage({ projectsData }: ProjectsPageProps) {
  return (
    <div class="min-h-screen bg-white dark:bg-black">
      {/* Hero Section with Apple-style typography */}
      <div class="pt-32 pb-20 px-6 sm:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="text-center space-y-6">
            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-b from-gray-900 via-gray-900 to-gray-600 dark:from-white dark:via-white dark:to-gray-400 bg-clip-text text-transparent">
              Projects
            </h1>
            <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
              {projectsData.description}
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div class="px-6 sm:px-8 pb-24">
        <div class="max-w-7xl mx-auto">
          <ProjectsList projects={projectsData.projects} />
        </div>
      </div>
    </div>
  );
} 