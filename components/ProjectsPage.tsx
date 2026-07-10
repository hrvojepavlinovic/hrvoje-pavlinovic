import ProjectsList from "../islands/ProjectsList.tsx";

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
    <div class="site-canvas">
      <section class="mx-auto max-w-5xl px-6 pb-24 pt-32 md:pb-28 md:pt-40">
        <header class="page-intro mb-12" data-reveal>
          <p class="eyebrow">Projects</p>
          <h1 class="display-title mt-4">Selected work</h1>
          <p class="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400 md:text-base">
            {projectsData.description}
          </p>
        </header>
        <ProjectsList projects={projectsData.projects} />
      </section>
    </div>
  );
}
