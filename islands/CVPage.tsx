import cvData from "../data/cv.json" with { type: "json" };
import projectsData from "../data/projects.json" with { type: "json" };

interface Stat {
  value: string;
  label: string;
}

interface Hero {
  title: string;
  subtitle: string;
}

interface Profile {
  name: string;
  title: string;
  photo: string;
  phone: string;
  email: string;
  website: string;
  location: string;
  stats: Stat[];
}

interface ProfessionalSummary {
  description: string;
}

interface TechStack {
  Backend: string[];
  Infrastructure: string[];
  Databases: string[];
  Security: string[];
  "Web3/Blockchain": string[];
  Frontend: string[];
}

interface Skills {
  coreExpertise: string[];
  techStack: TechStack;
}

interface Experience {
  title: string;
  company: string;
  companyUrl?: string;
  period: string;
  achievements: string[];
  technologies?: string[];
  isHighlight: boolean;
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string[];
}

interface Project {
  name: string;
  description: string;
  url: string;
  technologies: string[];
}

interface CVData {
  hero: Hero;
  profile: Profile;
  professionalSummary: ProfessionalSummary;
  skills: Skills;
  experience: Experience[];
  education: Education[];
}

interface ProjectsData {
  projects: Project[];
}

const typedCvData = cvData as unknown as CVData;
const typedProjectsData = projectsData as unknown as ProjectsData;

export default function CVPage() {
  const { hero, profile, professionalSummary, skills, experience, education } =
    typedCvData;
  const { projects } = typedProjectsData;

  const techStackEntries =
    Object.entries(skills.techStack) as Array<[keyof TechStack, string[]]>;

  return (
    <div class="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <section class="max-w-5xl mx-auto px-6 py-24 md:py-32">
        <div class="space-y-10">
          <div class="flex items-center gap-4 md:gap-5">
            <img
              src={profile.photo}
              alt={profile.name}
              class="h-12 w-12 rounded-full object-cover md:h-[52px] md:w-[52px]"
              loading="eager"
            />
            <div>
              <h1 class="text-[32px] font-semibold leading-tight text-gray-900 dark:text-gray-100 md:text-[44px]">
                {hero.title}
              </h1>
              <p class="text-sm text-gray-600 dark:text-gray-400 md:text-base">
                {profile.name} · {profile.title} · {profile.location}
              </p>
            </div>
          </div>

          <p class="max-w-3xl text-base text-gray-600 dark:text-gray-300 md:text-[17px] md:leading-loose">
            {hero.subtitle}
          </p>

          <div class="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-300">
            {profile.stats.map((stat) => (
              <span
                key={stat.label}
                class="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3.5 py-1.5 dark:border-gray-800 dark:bg-gray-900/60"
              >
                <span class="text-gray-900 dark:text-gray-100">{stat.value}</span>
                <span class="text-gray-500 dark:text-gray-400">{stat.label}</span>
              </span>
            ))}
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <a
              href="/cv/pdf"
              target="_blank"
              class="group inline-flex items-center gap-2 rounded-full border border-gray-900 px-4 py-2 text-sm font-semibold text-gray-900 transition-all hover:-translate-y-0.5 hover:bg-gray-900 hover:text-white dark:border-gray-100 dark:text-gray-100 dark:hover:bg-gray-100 dark:hover:text-gray-900"
            >
              Download PDF
              <svg
                class="h-4 w-4 transition-transform group-hover:-translate-y-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 5v14" />
                <path d="M19 12l-7 7-7-7" />
              </svg>
            </a>
            <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <a
                href={`mailto:${profile.email}`}
                class="transition-colors hover:text-orange-500"
              >
                {profile.email}
              </a>
              <span>•</span>
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                class="transition-colors hover:text-orange-500"
              >
                {profile.website}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="border-t border-gray-100 dark:border-gray-800">
        <div class="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Professional summary
          </h2>
          <p class="max-w-3xl text-sm text-gray-600 dark:text-gray-400">
            {professionalSummary.description}
          </p>
        </div>
      </section>

      <section class="border-t border-gray-100 dark:border-gray-800">
        <div class="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-10">
          <div class="space-y-3">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Skills snapshot
            </h2>
            <p class="max-w-3xl text-sm text-gray-600 dark:text-gray-400">
              Core expertise and the toolkits I reach for most often.
            </p>
          </div>

          <div class="space-y-6">
            <div class="rounded-2xl border border-gray-100 bg-white/60 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-gray-300 hover:bg-white dark:border-gray-800 dark:bg-gray-900/40 dark:hover:border-gray-600 dark:hover:bg-gray-900">
              <h3 class="text-sm font-semibold uppercase tracking-wide text-orange-500">
                Core expertise
              </h3>
              <ul class="mt-4 grid gap-3 text-sm text-gray-600 dark:text-gray-400 sm:grid-cols-2">
                {skills.coreExpertise.map((item) => (
                  <li key={item} class="flex items-start gap-3">
                    <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div class="rounded-2xl border border-gray-100 bg-white/60 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-gray-300 hover:bg-white dark:border-gray-800 dark:bg-gray-900/40 dark:hover:border-gray-600 dark:hover:bg-gray-900">
              <h3 class="text-sm font-semibold uppercase tracking-wide text-orange-500">
                Tech stack highlights
              </h3>
              <div class="mt-4 flex flex-wrap gap-4">
                {techStackEntries.map(([group, items]) => (
                  <div key={group} class="min-w-[220px] flex-1 space-y-2">
                    <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-500">
                      {group}
                    </p>
                    <div class="flex flex-wrap gap-2">
                      {items.map((tech) => (
                        <span
                          key={tech}
                          class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="border-t border-gray-100 dark:border-gray-800">
        <div class="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-10">
          <div class="space-y-3">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Experience
            </h2>
            <p class="max-w-3xl text-sm text-gray-600 dark:text-gray-400">
              Recent roles and the impact behind them.
            </p>
          </div>

          <div class="space-y-6">
            {experience.map((role) => (
              <article
                key={`${role.company}-${role.period}`}
                class="group rounded-2xl border border-gray-100 bg-white/60 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-gray-300 hover:bg-white dark:border-gray-800 dark:bg-gray-900/40 dark:hover:border-gray-600 dark:hover:bg-gray-900"
              >
                <div class="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100">
                      {role.title}
                    </h3>
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      {role.companyUrl ? (
                        <a
                          href={role.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="transition-colors hover:text-orange-500"
                        >
                          {role.company}
                        </a>
                      ) : (
                        role.company
                      )}
                    </div>
                  </div>
                  <span class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-500">
                    {role.period}
                  </span>
                </div>

                <ul class="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  {role.achievements.map((achievement) => (
                    <li key={achievement} class="flex items-start gap-3">
                      <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-300 transition-colors group-hover:bg-orange-400" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>

                {role.technologies && role.technologies.length > 0 && (
                  <div class="mt-4 flex flex-wrap gap-2">
                    {role.technologies.map((tech) => (
                      <span
                        key={tech}
                        class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section class="border-t border-gray-100 dark:border-gray-800">
        <div class="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-10">
          <div class="space-y-3">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Personal projects
            </h2>
            <p class="max-w-3xl text-sm text-gray-600 dark:text-gray-400">
              Selected work I build and maintain outside client engagements.
            </p>
          </div>

          <div class="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                class="group rounded-2xl border border-gray-100 bg-white/60 p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-gray-300 hover:bg-white dark:border-gray-800 dark:bg-gray-900/40 dark:hover:border-gray-600 dark:hover:bg-gray-900"
              >
                <div class="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-orange-500">
                  <span class="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  {project.name}
                </div>
                <p class="mt-3 text-sm text-gray-600 transition-colors group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-100">
                  {project.description}
                </p>
                <div class="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section class="border-t border-gray-100 dark:border-gray-800">
        <div class="max-w-5xl mx-auto px-6 py-12 pb-24 md:py-16 md:pb-28 space-y-10">
          <div class="space-y-3">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Education
            </h2>
            <p class="max-w-3xl text-sm text-gray-600 dark:text-gray-400">
              Formal studies that shaped my engineering foundation.
            </p>
          </div>

          <div class="space-y-6">
            {education.map((entry) => (
              <div
                key={entry.degree}
                class="group rounded-2xl border border-gray-100 bg-white/60 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-gray-300 hover:bg-white dark:border-gray-800 dark:bg-gray-900/40 dark:hover:border-gray-600 dark:hover:bg-gray-900"
              >
                <div class="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100">
                      {entry.degree}
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      {entry.institution}
                    </p>
                  </div>
                  <span class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-500">
                    {entry.period}
                  </span>
                </div>
                {entry.details.length > 0 && (
                  <ul class="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    {entry.details.map((detail) => (
                      <li key={detail} class="flex items-start gap-3">
                        <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-300" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
