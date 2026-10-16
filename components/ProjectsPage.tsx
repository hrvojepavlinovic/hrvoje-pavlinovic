import ProjectsList from "../islands/ProjectsList.tsx";
import { ProjectsData } from "../types/projects.ts";

interface ProjectsPageProps {
  projectsData: ProjectsData;
}

export default function ProjectsPage({ projectsData }: ProjectsPageProps) {
  return (
    <div class="site-canvas projects-profile">
      <div class="projects-content">
        <header class="projects-intro">
          <h1>Projects.</h1>
          <p>{projectsData.description}</p>
          {projectsData.projects.length > 0 && (
            <nav class="project-jump-links" aria-label="On this page">
              <a href="#products">Products</a>
              <a href="#studio">HILLS Lab</a>
              <a href="#archive">Earlier experiments</a>
            </nav>
          )}
        </header>
        {projectsData.projects.length > 0
          ? <ProjectsList projects={projectsData.projects} />
          : (
            <p class="project-empty">
              Projects are temporarily unavailable. Please try again shortly, or
              {" "}
              <a href="mailto:hrvoje@pavlinovic.com">email me</a>.
            </p>
          )}
      </div>
    </div>
  );
}
