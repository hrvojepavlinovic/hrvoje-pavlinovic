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
    <div class="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white p-8 pt-32 pb-24">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold mb-8">Projects</h1>
        
        <p class="text-gray-600 dark:text-gray-400 text-lg mb-12">
          {projectsData.description}
        </p>

        <ProjectsList projects={projectsData.projects} />
      </div>
    </div>
  );
} 