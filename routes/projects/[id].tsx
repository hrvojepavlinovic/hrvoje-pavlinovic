import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

const SITE_URL = "https://hrvoje.pavlinovic.com";

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
  image?: string;
  imageAlt?: string;
  caseStudy?: ProjectCaseStudy;
}

interface CaseStudyItem {
  label?: string;
  title?: string;
  value?: string;
  text?: string;
}

interface CaseStudyLink {
  label: string;
  href: string;
}

interface ProjectCaseStudy {
  eyebrow: string;
  intro: string;
  role: string;
  period: string;
  stage: string;
  challenge: string;
  productLoop: string[];
  architecture: CaseStudyItem[];
  decisions: CaseStudyItem[];
  delivered: string[];
  next: string;
  related: CaseStudyLink[];
}

interface ProjectsData {
  description: string;
  projects: Project[];
}

export const handler: Handlers<Project | null> = {
  async GET(_, ctx) {
    try {
      const projectsData = await Deno.readTextFile("./data/projects.json");
      const data = JSON.parse(projectsData) as ProjectsData;
      const project = data.projects.find((p) => p.id === ctx.params.id);

      if (!project) {
        return new Response("Project not found", { status: 404 });
      }

      return ctx.render(project);
    } catch (error) {
      console.error("Error loading project:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};

const statusCopy: Record<Project["status"], string> = {
  early: "Exploration",
  development: "In Build",
  live: "In Market",
  sunsetted: "Sunsetted",
};

const statusDot: Record<Project["status"], string> = {
  early: "bg-blue-400",
  development: "bg-orange-400",
  live: "bg-emerald-400",
  sunsetted: "bg-gray-400",
};

export default function ProjectPage({ data: project }: PageProps<Project>) {
  if (!project) {
    return (
      <div class="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-100 px-6 py-24">
        <div class="max-w-4xl mx-auto text-center space-y-6">
          <h1 class="text-3xl font-semibold">Project not found</h1>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            The project you were looking for is no longer listed.
          </p>
          <a
            href="/projects"
            class="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:border-gray-900 hover:text-gray-900 dark:border-gray-700 dark:text-gray-100 dark:hover:border-gray-100"
          >
            Back to projects
          </a>
        </div>
      </div>
    );
  }

  const pageTitle = `${project.name} \u2014 Hrvoje Pavlinovic`;
  const description = project.description;
  const canonicalUrl = `${SITE_URL}/projects/${project.id}`;
  const imageUrl = project.image
    ? `${SITE_URL}${project.image}`
    : `${SITE_URL}/pfptbs.png`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={description}
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Hrvoje Pavlinovic" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta
          property="og:image"
          content={imageUrl}
        />
        <meta property="og:site_name" content="Hrvoje Pavlinovic" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@0xhp10" />
        <meta name="twitter:creator" content="@0xhp10" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={imageUrl}
        />
        <meta name="twitter:url" content={canonicalUrl} />
      </Head>

      <div class="site-canvas">
        <section class="mx-auto max-w-5xl px-6 pb-16 pt-32 md:pb-20 md:pt-40">
          <div class="max-w-4xl space-y-5" data-reveal>
            {project.image && (
              <img
                src={project.image}
                alt={project.imageAlt ?? `${project.name} brand mark`}
                class="h-20 w-20 object-contain md:h-24 md:w-24"
              />
            )}
            <div class="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              <span class="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 dark:border-gray-700">
                <span
                  class={`h-1.5 w-1.5 rounded-full ${
                    statusDot[project.status]
                  }`}
                />
                {statusCopy[project.status]}
              </span>
            </div>
            <h1 class="display-title">
              {project.name}
            </h1>
            <p class="max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg">
              {project.caseStudy?.intro ?? project.description}
            </p>
            {project.technologies && project.technologies.length > 0 && (
              <div class="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    class="tag-chip inline-flex items-center px-2.5 py-1"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            <div class="flex flex-wrap gap-3">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="action-button"
                >
                  Visit product
                  <svg
                    class="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </a>
              )}
              <a
                href="mailto:hrvoje@pavlinovic.com"
                class="action-button"
              >
                Email me
                <svg
                  class="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {project.caseStudy && (
          <>
            <section class="section-band" data-reveal>
              <div class="max-w-5xl mx-auto grid gap-8 px-6 py-12 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:py-16">
                <div>
                  <p class="text-xs font-semibold uppercase text-orange-600 dark:text-orange-400">
                    {project.caseStudy.eyebrow}
                  </p>
                  <h2 class="mt-3 text-2xl font-semibold">The product bet</h2>
                </div>
                <div class="space-y-7">
                  <p class="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    {project.caseStudy.challenge}
                  </p>
                  <dl class="grid gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200 text-sm dark:border-gray-800 dark:bg-gray-800 sm:grid-cols-3">
                    {[
                      ["Role", project.caseStudy.role],
                      ["Period", project.caseStudy.period],
                      ["Stage", project.caseStudy.stage],
                    ].map(([label, value]) => (
                      <div class="bg-white p-4 dark:bg-black">
                        <dt class="text-xs uppercase text-gray-500">{label}</dt>
                        <dd class="mt-2 font-semibold text-gray-900 dark:text-gray-100">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </section>

            <section class="section-band" data-reveal>
              <div class="max-w-5xl mx-auto grid gap-8 px-6 py-12 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:py-16">
                <div>
                  <p class="text-xs font-semibold uppercase text-gray-500">
                    Product loop
                  </p>
                  <h2 class="mt-3 text-2xl font-semibold">
                    From public record to trusted input
                  </h2>
                </div>
                <ol class="border-t border-gray-200 dark:border-gray-800">
                  {project.caseStudy.productLoop.map((item, index) => (
                    <li class="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 border-b border-gray-200 py-5 text-sm leading-relaxed text-gray-700 dark:border-gray-800 dark:text-gray-300">
                      <span class="font-semibold text-orange-600 dark:text-orange-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            <section class="section-band" data-reveal>
              <div class="max-w-5xl mx-auto px-6 py-12 md:py-16">
                <div class="max-w-3xl">
                  <p class="text-xs font-semibold uppercase text-gray-500">
                    System shape
                  </p>
                  <h2 class="mt-3 text-2xl font-semibold">
                    Simple boundaries, explicit sources of truth
                  </h2>
                </div>
                <div class="mt-8 grid gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200 dark:border-gray-800 dark:bg-gray-800 md:grid-cols-2">
                  {project.caseStudy.architecture.map((item) => (
                    <article class="min-w-0 bg-white p-5 dark:bg-black">
                      <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {item.label}
                      </h3>
                      <p class="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        {item.value}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section class="section-band" data-reveal>
              <div class="max-w-5xl mx-auto px-6 py-12 md:py-16">
                <div class="max-w-3xl">
                  <p class="text-xs font-semibold uppercase text-gray-500">
                    Engineering judgment
                  </p>
                  <h2 class="mt-3 text-2xl font-semibold">
                    Decisions that keep the product legible
                  </h2>
                </div>
                <div class="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2">
                  {project.caseStudy.decisions.map((item) => (
                    <article class="border-t border-gray-300 pt-4 dark:border-gray-700">
                      <h3 class="text-base font-semibold">{item.title}</h3>
                      <p class="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        {item.text}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section class="section-band" data-reveal>
              <div class="max-w-5xl mx-auto grid gap-8 px-6 py-12 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:py-16">
                <div>
                  <p class="text-xs font-semibold uppercase text-gray-500">
                    Current proof
                  </p>
                  <h2 class="mt-3 text-2xl font-semibold">
                    What is already delivered
                  </h2>
                </div>
                <div>
                  <ul class="space-y-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    {project.caseStudy.delivered.map((item) => (
                      <li class="flex items-start gap-3">
                        <span class="mt-[0.55rem] h-1.5 w-1.5 flex-none rounded-full bg-orange-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div class="mt-8 border-l-2 border-orange-500 pl-5">
                    <p class="text-xs font-semibold uppercase text-gray-500">
                      Next proof
                    </p>
                    <p class="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                      {project.caseStudy.next}
                    </p>
                  </div>
                  <div class="mt-8 flex flex-wrap gap-3">
                    {project.caseStudy.related.map((link) => (
                      <a
                        href={link.href}
                        class="action-button"
                      >
                        {link.label} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {!project.caseStudy && project.highlights &&
          project.highlights.length > 0 && (
          <section class="section-band" data-reveal>
            <div class="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-6">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Highlights
              </h2>
              <ul class="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                {project.highlights.map((item) => (
                  <li key={item} class="flex items-start gap-3">
                    <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
