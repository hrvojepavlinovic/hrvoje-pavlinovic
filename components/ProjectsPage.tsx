import ProjectsList from "../islands/ProjectsList.tsx";

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

interface ProjectsPageProps {
  projectsData: ProjectsData;
}

export default function ProjectsPage({ projectsData }: ProjectsPageProps) {
  return (
    <div class="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-100">
      <section class="max-w-5xl mx-auto px-6 pt-28 pb-24 md:pt-32 md:pb-28">
        <ProjectsList projects={projectsData.projects} />
      </section>
    </div>
  );
}
