import ProjectsList from "../islands/ProjectsList.tsx";

interface Project {
  id: string;
  name: string;
  url?: string;
  description: string;
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
      <section class="max-w-5xl mx-auto flex min-h-screen flex-col justify-center px-6 py-24 md:py-32">
        <div class="space-y-8">
          <div class="flex items-center gap-4 md:gap-5">
            <img
              src="/pfptbs.png"
              alt="Hrvoje Pavlinovic"
              class="h-12 w-12 rounded-full object-cover md:h-[52px] md:w-[52px]"
              loading="eager"
            />
            <div>
              <h1 class="text-[32px] font-semibold leading-tight text-gray-900 dark:text-gray-100 md:text-[44px]">
                Founder projects & experiments
              </h1>
              <p class="text-sm text-gray-600 dark:text-gray-400 md:text-base">
                Working sessions that grow into products, labs, and
                venture-scale bets.
              </p>
            </div>
          </div>

          <p class="max-w-3xl text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-[17px] md:leading-loose">
            {projectsData.description}
          </p>

          <div class="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
            <span class="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3.5 py-1.5 dark:border-gray-800 dark:bg-black/60">
              <span class="h-1.5 w-1.5 rounded-full bg-orange-400" />
              Founder-funded to date
            </span>
            <span class="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3.5 py-1.5 dark:border-gray-800 dark:bg-black/60">
              <span class="h-1.5 w-1.5 rounded-full bg-orange-400" />
              Live traction & roadmap snapshots
            </span>
            <span class="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3.5 py-1.5 dark:border-gray-800 dark:bg-black/60">
              <span class="h-1.5 w-1.5 rounded-full bg-orange-400" />
              Full memos available for diligence
            </span>
          </div>
        </div>
      </section>

      <section class="border-t border-gray-100 dark:border-gray-800">
        <div class="max-w-5xl mx-auto px-6 py-12 pb-24 md:py-16 md:pb-28">
          <ProjectsList projects={projectsData.projects} />
        </div>
      </section>
    </div>
  );
}
