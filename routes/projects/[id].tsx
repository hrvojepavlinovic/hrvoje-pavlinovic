import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import ProjectPageTracker from "../../islands/ProjectPageTracker.tsx";

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
  pitch?: {
    tagline: string;
    problem: string;
    solution: string;
    marketOpportunity?: string;
    vision?: string;
    competitiveAdvantage: string[];
    pricingModel?: string;
    targetFunding?: string;
    fundsAllocation?: string[];
    teamCosts?: string;
    timeToMarket?: string;
    currentState?: string;
  };
}

interface ProjectsData {
  description: string;
  projects: Project[];
}

export const handler: Handlers<Project | null> = {
  async GET(_, ctx) {
    try {
      // Load projects data
      const projectsData = await Deno.readTextFile("./data/projects.json");
      const data = JSON.parse(projectsData) as ProjectsData;
      
      const projectId = ctx.params.id;
      const project = data.projects.find(p => p.id === projectId);
      
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

export default function ProjectPage({ data: project }: PageProps<Project>) {
  if (!project || !project.pitch) {
    return (
      <div class="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white p-8 pt-32">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl font-bold mb-4">Project Not Found</h1>
          <p class="text-gray-600 dark:text-gray-400">
            The project you're looking for doesn't exist or is not available.
          </p>
          <a href="/projects" class="inline-block mt-8 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
            ← Back to Projects
          </a>
        </div>
      </div>
    );
  }

  const { pitch } = project;

  // Function to get accent color classes
  const getAccentClasses = (accent?: string) => {
    switch (accent) {
      case 'emerald':
        return {
          gradient: 'bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 dark:from-emerald-950/20 dark:via-gray-900 dark:to-emerald-950/10',
          sectionBg: 'bg-emerald-50/50 dark:bg-emerald-950/20',
          accent: 'text-emerald-600 dark:text-emerald-400',
          button: 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600'
        };
      case 'orange':
        return {
          gradient: 'bg-gradient-to-br from-orange-50 via-white to-orange-50/50 dark:from-orange-950/20 dark:via-gray-900 dark:to-orange-950/10',
          sectionBg: 'bg-orange-50/50 dark:bg-orange-950/20',
          accent: 'text-orange-600 dark:text-orange-400',
          button: 'bg-orange-500 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600'
        };
      case 'green':
        return {
          gradient: 'bg-gradient-to-br from-green-50 via-white to-green-50/50 dark:from-green-950/20 dark:via-gray-900 dark:to-green-950/10',
          sectionBg: 'bg-green-50/50 dark:bg-green-950/20',
          accent: 'text-green-600 dark:text-green-400',
          button: 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600'
        };
      case 'violet':
        return {
          gradient: 'bg-gradient-to-br from-violet-50 via-white to-violet-50/50 dark:from-violet-950/20 dark:via-gray-900 dark:to-violet-950/10',
          sectionBg: 'bg-violet-50/50 dark:bg-violet-950/20',
          accent: 'text-violet-600 dark:text-violet-400',
          button: 'bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600'
        };
      default:
        return {
          gradient: 'bg-gradient-to-br from-gray-50 via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800',
          sectionBg: 'bg-gray-50/50 dark:bg-gray-800/20',
          accent: 'text-gray-600 dark:text-gray-400',
          button: 'bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100'
        };
    }
  };

  const accentClasses = getAccentClasses(project.accent);

  return (
    <>
      <Head>
        <title>{project.name} - {pitch.tagline} | Hrvoje Pavlinovic</title>
        <meta name="description" content={pitch.problem} />
        <meta property="og:title" content={`${project.name} - ${pitch.tagline}`} />
        <meta property="og:description" content={pitch.problem} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${project.name} - ${pitch.tagline}`} />
        <meta name="twitter:description" content={pitch.problem} />
      </Head>

      {/* Client-side tracking */}
      <ProjectPageTracker projectId={project.id} />

      <div class={`min-h-screen ${accentClasses.gradient}`}>
        {/* Hero Section */}
        <div class="pt-32 pb-20 px-6 sm:px-8">
          <div class="max-w-6xl mx-auto">
            <div class="text-center space-y-8">
              <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-b from-gray-900 via-gray-900 to-gray-600 dark:from-white dark:via-white dark:to-gray-400 bg-clip-text text-transparent">
                {project.name}
              </h1>
              <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
                {pitch.tagline}
              </p>
              {project.url && (
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class={`inline-flex items-center gap-2 px-8 py-4 text-white rounded-2xl transition-colors font-semibold ${accentClasses.button}`}
                  >
                    Visit Live Site
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </a>
                  <a
                    href="/contact"
                    class="inline-flex items-center gap-2 px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-2xl hover:border-gray-400 dark:hover:border-gray-500 transition-colors font-semibold"
                  >
                    Join Seed Round
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div class="px-6 sm:px-8 pb-24">
          <div class="max-w-6xl mx-auto">
            <div class="space-y-12">
              {/* Problem */}
              <div class={`rounded-2xl p-8 ${accentClasses.sectionBg} border border-gray-200/50 dark:border-gray-700/50`}>
                <h2 class={`text-2xl font-bold mb-6 ${accentClasses.accent}`}>1. The Problem</h2>
                <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {pitch.problem}
                </p>
              </div>

              {/* Solution */}
              <div class={`rounded-2xl p-8 ${accentClasses.sectionBg} border border-gray-200/50 dark:border-gray-700/50`}>
                <h2 class={`text-2xl font-bold mb-6 ${accentClasses.accent}`}>2. Our Solution</h2>
                <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {pitch.solution}
                </p>
              </div>

              {/* Market Opportunity */}
              {pitch.marketOpportunity && (
                <div class={`rounded-2xl p-8 ${accentClasses.sectionBg} border border-gray-200/50 dark:border-gray-700/50`}>
                  <h2 class={`text-2xl font-bold mb-6 ${accentClasses.accent}`}>3. Market Opportunity</h2>
                  <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {pitch.marketOpportunity}
                  </p>
                </div>
              )}

              {/* Vision */}
              {pitch.vision && (
                <div class={`rounded-2xl p-8 ${accentClasses.sectionBg} border border-gray-200/50 dark:border-gray-700/50`}>
                  <h2 class={`text-2xl font-bold mb-6 ${accentClasses.accent}`}>4. Vision</h2>
                  <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {pitch.vision}
                  </p>
                </div>
              )}

              {/* Competitive Advantage */}
              <div class={`rounded-2xl p-8 ${accentClasses.sectionBg} border border-gray-200/50 dark:border-gray-700/50`}>
                <h2 class={`text-2xl font-bold mb-6 ${accentClasses.accent}`}>5. Competitive Edge</h2>
                <ul class="space-y-4">
                  {pitch.competitiveAdvantage.map((item, index) => (
                    <li key={index} class="flex items-start gap-4">
                      <div class={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${accentClasses.accent.replace('text-', 'bg-')}`}></div>
                      <span class="text-gray-700 dark:text-gray-300 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing Model */}
              {pitch.pricingModel && (
                <div class={`rounded-2xl p-8 ${accentClasses.sectionBg} border border-gray-200/50 dark:border-gray-700/50`}>
                  <h2 class={`text-2xl font-bold mb-6 ${accentClasses.accent}`}>6. Pricing Model</h2>
                  <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {pitch.pricingModel}
                  </p>
                </div>
              )}

              {/* Funding & Business Details */}
              {(pitch.targetFunding || pitch.fundsAllocation || pitch.teamCosts || pitch.timeToMarket) && (
                <div class={`rounded-2xl p-8 ${accentClasses.sectionBg} border border-gray-200/50 dark:border-gray-700/50`}>
                  <h2 class={`text-2xl font-bold mb-6 ${accentClasses.accent}`}>7. Business & Funding</h2>
                  
                  <div class="space-y-6">
                    {pitch.targetFunding && (
                      <div>
                        <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Target Funding</h3>
                        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {pitch.targetFunding}
                        </p>
                      </div>
                    )}

                    {pitch.fundsAllocation && (
                      <div>
                        <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Funds Allocation</h3>
                        <ul class="space-y-3">
                          {pitch.fundsAllocation.map((item, index) => (
                            <li key={index} class="flex items-start gap-4">
                              <div class={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${accentClasses.accent.replace('text-', 'bg-')}`}></div>
                              <span class="text-gray-700 dark:text-gray-300 leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {pitch.teamCosts && (
                      <div>
                        <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Team & Costs</h3>
                        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {pitch.teamCosts}
                        </p>
                      </div>
                    )}

                    {pitch.timeToMarket && (
                      <div>
                        <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Time to Market</h3>
                        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {pitch.timeToMarket}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Current State & Roadmap */}
              {pitch.currentState && (
                <div class={`rounded-2xl p-8 ${accentClasses.sectionBg} border border-gray-200/50 dark:border-gray-700/50`}>
                  <h2 class={`text-2xl font-bold mb-6 ${accentClasses.accent}`}>8. Current State & Roadmap</h2>
                  <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {pitch.currentState}
                  </p>
                </div>
              )}
            </div>

            {/* Tech Stack */}
            {project.technologies && (
              <div class="mt-16 text-center">
                <h2 class={`text-2xl font-bold mb-8 ${accentClasses.accent}`}>Built With</h2>
                <div class="flex flex-wrap gap-3 justify-center">
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      class={`px-4 py-2 text-sm font-medium rounded-xl border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 ${accentClasses.sectionBg}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Proof Section */}
            <div class="mt-16">
              <div class={`rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 ${accentClasses.sectionBg}`}>
                <div class="text-center mb-8">
                  <div class="flex items-center justify-center gap-3 mb-4">
                    <div class="relative">
                      <img 
                        src="/pfptbs.png" 
                        alt="Hrvoje Pavlinovic"
                        class="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <div class="text-left">
                      <h3 class="font-semibold text-gray-900 dark:text-white">Hrvoje Pavlinovic</h3>
                      <p class="text-sm text-gray-600 dark:text-gray-400">Founder & Senior Software Engineer</p>
                    </div>
                  </div>
                </div>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div class="text-center">
                    <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">12+</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">MSc</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">Computer Science</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">15+</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">Projects Built</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">3.6K</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">Social Following</div>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Experience Highlights</h4>
                    <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li class="flex items-start gap-2">
                        <div class={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${accentClasses.accent.replace('text-', 'bg-')}`}></div>
                        <span>Built OTA system for world's fastest EV (Rimac Nevera)</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <div class={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${accentClasses.accent.replace('text-', 'bg-')}`}></div>
                        <span>Scaled gaming platform to 1.7B ad impressions (ReneVerse)</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <div class={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${accentClasses.accent.replace('text-', 'bg-')}`}></div>
                        <span>Architected DAO version of CoinMarketCap (CryptoToday)</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <div class={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${accentClasses.accent.replace('text-', 'bg-')}`}></div>
                        <span>Expert in Web3, AWS, TypeScript, and blockchain tech</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Personal Highlights</h4>
                    <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li class="flex items-start gap-2">
                        <div class={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${accentClasses.accent.replace('text-', 'bg-')}`}></div>
                        <span>Bitcoin fan since 2017, blockchain enthusiast</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <div class={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${accentClasses.accent.replace('text-', 'bg-')}`}></div>
                        <span>Husband and father of two</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <div class={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${accentClasses.accent.replace('text-', 'bg-')}`}></div>
                        <span>Lives and breathes cutting-edge tech, AI, and innovation</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <div class={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${accentClasses.accent.replace('text-', 'bg-')}`}></div>
                        <span>Passionate about football and building community</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div class="mt-16 text-center">
              <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Ready to Join the Seed Round?</h2>
              <p class="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Let's do this.
              </p>
              <a
                href="/contact"
                class={`inline-flex items-center gap-2 px-12 py-4 text-white rounded-2xl transition-all font-semibold text-lg ${accentClasses.button}`}
              >
                Get In Touch
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
            </div>

            {/* Back to Projects */}
            <div class="mt-12 text-center">
              <a
                href="/projects"
                class="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Back to All Projects
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 