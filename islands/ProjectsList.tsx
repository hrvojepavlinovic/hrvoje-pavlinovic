import { trackEvent } from "../utils/track.ts";
import { Project, projectStatus } from "../types/projects.ts";
import ProjectArrow from "../components/ProjectArrow.tsx";

interface ProjectsListProps {
  projects: Project[];
}

function tracked(target: string) {
  trackEvent({ type: "click", clickType: "link", target });
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  const products = projects.filter((p) =>
    p.status !== "sunsetted" && p.kind !== "studio"
  );
  const studios = projects.filter((p) => p.kind === "studio");
  const archive = projects.filter((p) => p.status === "sunsetted");

  return (
    <>
      <section
        id="products"
        aria-label="Active products"
        class="project-products"
      >
        {products.map((project) => (
          <article
            key={project.id}
            class="project-row"
            id={project.id}
            aria-labelledby={`${project.id}-title`}
          >
            <div class="project-row-copy">
              <div class="project-name-row">
                <h2 id={`${project.id}-title`}>
                  <a
                    href={`/projects/${project.id}`}
                    onClick={() => tracked(`${project.id}-details`)}
                  >
                    {project.name}
                  </a>
                </h2>
                <span class="project-status">
                  {project.statusLabel ?? projectStatus[project.status]}
                </span>
              </div>
              <p class="project-description">{project.description}</p>
              <div class="project-contribution">
                <h3>My part</h3>
                <p>{project.contribution}</p>
              </div>
              <p class="project-stack">{project.technologies?.join(" · ")}</p>
              <div class="project-actions">
                <a
                  class="project-primary"
                  href={`/projects/${project.id}`}
                  onClick={() => tracked(`${project.id}-details`)}
                >
                  Read the case study<ProjectArrow />
                </a>
                {project.url && (
                  <a
                    class="project-link"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => tracked(`${project.id}-live`)}
                  >
                    Open {project.name}
                    <ProjectArrow diagonal />
                  </a>
                )}
              </div>
            </div>
            {project.screenshot && (
              <a
                href={`/projects/${project.id}`}
                class="project-media"
                onClick={() => tracked(`${project.id}-preview`)}
                aria-label={`${project.name} case study`}
              >
                <img
                  src={project.screenshot.src}
                  alt={project.screenshot.alt}
                  width={project.screenshot.width}
                  height={project.screenshot.height}
                  loading={project.id === "playgrnd" ? "eager" : "lazy"}
                  decoding="async"
                />
              </a>
            )}
          </article>
        ))}
      </section>

      {studios.map((studio) => (
        <section
          key={studio.id}
          id="studio"
          class="project-studio project-section"
          aria-labelledby="project-studio-title"
        >
          <div>
            <div class="project-studio-name">
              {studio.image && (
                <img
                  src={studio.image}
                  alt=""
                  width="44"
                  height="44"
                  loading="lazy"
                />
              )}
              <h2 id="project-studio-title">{studio.name}</h2>
            </div>
            <p>{studio.description}</p>
          </div>
          <div>
            <p>{studio.contribution}</p>
            <div class="project-actions">
              {studio.url && (
                <a
                  class="project-link"
                  href={studio.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => tracked("hills-lab-live")}
                >
                  Explore the studio<ProjectArrow diagonal />
                </a>
              )}
              <a
                class="project-link"
                href={`/projects/${studio.id}`}
                onClick={() => tracked("hills-lab-details")}
              >
                Background<ProjectArrow />
              </a>
            </div>
          </div>
        </section>
      ))}

      {archive.length > 0 && (
        <section
          id="archive"
          class="project-archive project-section"
          aria-labelledby="project-archive-title"
        >
          <div class="project-section-intro">
            <h2 id="project-archive-title">Earlier experiments.</h2>
            <p>
              Projects I have put down, with a record of what I built and
              learned.
            </p>
          </div>
          {archive.map((project) => (
            <article key={project.id} class="project-archive-row">
              <div>
                <h3>
                  <a
                    href={`/projects/${project.id}`}
                    onClick={() =>
                      tracked(`${project.id}-details`)}
                  >
                    {project.name}
                  </a>
                </h3>
                <span class="project-status">Archived</span>
              </div>
              <p>{project.description}</p>
              <a
                href={`/projects/${project.id}`}
                class="project-link"
                onClick={() =>
                  tracked(`${project.id}-details`)}
              >
                Project notes<ProjectArrow />
              </a>
            </article>
          ))}
        </section>
      )}
    </>
  );
}
