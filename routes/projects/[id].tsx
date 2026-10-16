import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { Project, ProjectsData, projectStatus } from "../../types/projects.ts";
import ProjectArrow from "../../components/ProjectArrow.tsx";

const SITE_URL = "https://hrvoje.pavlinovic.com";

export const handler: Handlers<Project> = {
  async GET(_, ctx) {
    try {
      const data = JSON.parse(
        await Deno.readTextFile("./data/projects.json"),
      ) as ProjectsData;
      const project = data.projects.find((p) => p.id === ctx.params.id);
      if (!project) return new Response("Project not found", { status: 404 });
      return ctx.render(project);
    } catch (error) {
      console.error("Error loading project:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};

export default function ProjectPage({ data: project }: PageProps<Project>) {
  const study = project.caseStudy;
  const title = `${project.name} — Hrvoje Pavlinovic`;
  const canonicalUrl = `${SITE_URL}/projects/${project.id}`;
  const imageUrl = `${SITE_URL}${project.screenshot?.src ?? "/blog.png"}`;
  const isArchived = project.status === "sunsetted";

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="stylesheet" href="/projects-20261016.css" />
        <link
          rel="preload"
          href="/fonts/source-sans-3-latin-wght-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta name="description" content={project.description} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Hrvoje Pavlinovic" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={project.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta
          property="og:image:alt"
          content={project.screenshot?.alt ?? "Hrvoje Pavlinovic"}
        />
        <meta
          property="og:image:type"
          content={project.screenshot ? "image/webp" : "image/png"}
        />
        {project.screenshot && (
          <>
            <meta
              property="og:image:width"
              content={String(project.screenshot.width)}
            />
            <meta
              property="og:image:height"
              content={String(project.screenshot.height)}
            />
          </>
        )}
        <meta property="og:site_name" content="Hrvoje Pavlinovic" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@0xhp10" />
        <meta name="twitter:creator" content="@0xhp10" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={project.description} />
        <meta name="twitter:image" content={imageUrl} />
        <meta
          name="twitter:image:alt"
          content={project.screenshot?.alt ?? "Hrvoje Pavlinovic"}
        />
        <meta name="twitter:url" content={canonicalUrl} />
      </Head>
      <div class="site-canvas projects-profile">
        <article class="projects-content project-case">
          <header class="project-case-intro">
            <a href="/projects" class="project-back">Back to projects</a>
            <div class="project-name-row">
              <h1>{project.name}</h1>
              <span class="project-status">
                {project.statusLabel ?? projectStatus[project.status]}
              </span>
            </div>
            <p class="project-case-lead">
              {study?.intro ?? project.description}
            </p>
            <div class="project-actions">
              {project.url && !isArchived && (
                <a
                  href={project.url}
                  class="project-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.kind === "studio"
                    ? "Visit the studio"
                    : `Open ${project.name}`}
                  <ProjectArrow diagonal />
                </a>
              )}
              <a href="mailto:hrvoje@pavlinovic.com" class="project-link">
                Discuss a project<ProjectArrow />
              </a>
            </div>
          </header>

          {project.screenshot && (
            <figure class="project-case-image">
              <img
                src={project.screenshot.src}
                srcSet={project.screenshot.srcSet}
                sizes="(max-width: 1152px) calc(100vw - 4rem), 1024px"
                alt={project.screenshot.alt}
                width={project.screenshot.width}
                height={project.screenshot.height}
                loading="eager"
                decoding="async"
              />
              <figcaption>{project.screenshot.caption}</figcaption>
            </figure>
          )}

          <section
            class="project-section project-case-split"
            aria-labelledby="case-contribution"
          >
            <h2 id="case-contribution">My part.</h2>
            <div>
              <p>{project.contribution}</p>
              {study && (
                <dl class="project-case-facts">
                  {[["Role", study.role], ["Period", study.period], [
                    "Stage",
                    study.stage,
                  ]].map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {project.technologies && (
                <p class="project-stack">{project.technologies.join(" · ")}</p>
              )}
            </div>
          </section>

          {study
            ? (
              <>
                {study.founderWork && (
                  <section
                    class="project-section"
                    aria-labelledby="case-founder"
                  >
                    <h2 id="case-founder">{study.founderWork.title}</h2>
                    <p class="project-case-lead">{study.founderWork.intro}</p>
                    <div class="project-decisions">
                      {study.founderWork.areas.map((area) => (
                        <section key={area.title}>
                          <h3>{area.title}</h3>
                          <p>{area.text}</p>
                        </section>
                      ))}
                    </div>
                  </section>
                )}
                <section
                  class="project-section project-case-split"
                  aria-labelledby="case-problem"
                >
                  <h2 id="case-problem">The problem.</h2>
                  <p>{study.challenge}</p>
                </section>
                <section
                  class="project-section project-case-split"
                  aria-labelledby="case-loop"
                >
                  <h2 id="case-loop">{study.loopTitle ?? "How it works."}</h2>
                  <ol class="project-loop">
                    {study.productLoop.map((item) => <li key={item}>{item}
                    </li>)}
                  </ol>
                </section>
                <section
                  class="project-section project-case-split"
                  aria-labelledby="case-system"
                >
                  <h2 id="case-system">Under the hood.</h2>
                  <dl class="project-system">
                    {study.architecture.map((item) => (
                      <div key={item.label}>
                        <dt>{item.label}</dt>
                        <dd>{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
                <section
                  class="project-section"
                  aria-labelledby="case-decisions"
                >
                  <h2 id="case-decisions">Engineering choices.</h2>
                  <div class="project-decisions">
                    {study.decisions.map((item) => (
                      <section key={item.title}>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </section>
                    ))}
                  </div>
                </section>
                <section
                  class="project-section project-case-split"
                  aria-labelledby="case-built"
                >
                  <h2 id="case-built">What I’ve worked on.</h2>
                  <ul class="project-delivered">
                    {study.delivered.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </section>
                <section
                  class="project-section project-case-split"
                  aria-labelledby="case-next"
                >
                  <h2 id="case-next">
                    {study.nextTitle ?? "What comes next."}
                  </h2>
                  <div>
                    <p>{study.next}</p>
                    <div class="project-related">
                      {study.related.map((link) => (
                        <a
                          key={link.href}
                          class="project-link"
                          href={link.href}
                          {...(link.href.startsWith("https://")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {link.label}
                          <ProjectArrow
                            diagonal={link.href.startsWith("https://")}
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                </section>
              </>
            )
            : project.highlights && (
              <section
                class="project-section project-case-split"
                aria-labelledby="case-notes"
              >
                <h2 id="case-notes">
                  {isArchived ? "Project notes." : "The work."}
                </h2>
                <ul class="project-delivered">
                  {project.highlights.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            )}
          <footer class="project-case-footer">
            <a href="/projects" class="project-link">
              All projects<ProjectArrow />
            </a>
            <a href="/cv" class="project-link">
              Client work and experience<ProjectArrow />
            </a>
          </footer>
        </article>
      </div>
    </>
  );
}
