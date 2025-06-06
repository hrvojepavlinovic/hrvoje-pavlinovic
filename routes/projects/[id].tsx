import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import ProjectPageTracker from "../../islands/ProjectPageTracker.tsx";

interface Project {
  id: string;
  name: string;
  url?: string;
  description: string;
  technologies?: string[];
  completion: number;
  featured: boolean;
  likes?: number;
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

      <div class="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
        {/* Hero Section */}
        <div class="pt-32 pb-16 px-8">
          <div class="max-w-6xl mx-auto">
            <div class="text-center mb-16">
              <h1 class="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                {project.name}
              </h1>
              <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-4xl mx-auto">
                {pitch.tagline}
              </p>
              {project.url && (
                <div class="flex gap-4 justify-center">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-semibold"
                  >
                    Visit Live Site
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </a>
                  <a
                    href="/contact"
                    class="inline-flex items-center gap-2 px-8 py-4 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors font-semibold"
                  >
                    Join Seed Round
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div class="px-8 pb-24">
          <div class="max-w-6xl mx-auto">
            <div class="space-y-16">
              {/* Problem */}
              <div>
                <h2 class="text-3xl font-bold mb-6 text-red-600 dark:text-red-400">1. The Problem</h2>
                <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {pitch.problem}
                </p>
              </div>

              {/* Solution */}
              <div>
                <h2 class="text-3xl font-bold mb-6 text-green-600 dark:text-green-400">2. Our Solution</h2>
                <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {pitch.solution}
                </p>
              </div>

              {/* Market Opportunity */}
              {pitch.marketOpportunity && (
                <div>
                  <h2 class="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">3. Market Opportunity</h2>
                  <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {pitch.marketOpportunity}
                  </p>
                </div>
              )}

              {/* Vision */}
              {pitch.vision && (
                <div>
                  <h2 class="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400">4. Vision</h2>
                  <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {pitch.vision}
                  </p>
                </div>
              )}

              {/* Competitive Advantage */}
              <div>
                <h2 class="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">5. Competitive Edge</h2>
                <ul class="space-y-3">
                  {pitch.competitiveAdvantage.map((item, index) => (
                    <li key={index} class="flex items-start gap-3">
                      <div class="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span class="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing Model */}
              {pitch.pricingModel && (
                <div>
                  <h2 class="text-3xl font-bold mb-6 text-emerald-600 dark:text-emerald-400">6. Pricing Model</h2>
                  <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {pitch.pricingModel}
                  </p>
                </div>
              )}

              {/* Funding & Business Details */}
              {(pitch.targetFunding || pitch.fundsAllocation || pitch.teamCosts || pitch.timeToMarket) && (
                <div>
                  <h2 class="text-3xl font-bold mb-6 text-yellow-600 dark:text-yellow-400">7. Business & Funding</h2>
                  
                  {pitch.targetFunding && (
                    <div class="mb-6">
                      <h3 class="text-xl font-semibold mb-3">Target Funding</h3>
                      <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        {pitch.targetFunding}
                      </p>
                    </div>
                  )}

                  {pitch.fundsAllocation && (
                    <div class="mb-6">
                      <h3 class="text-xl font-semibold mb-3">Funds Allocation</h3>
                      <ul class="space-y-2">
                        {pitch.fundsAllocation.map((item, index) => (
                          <li key={index} class="flex items-start gap-3">
                            <div class="w-2 h-2 bg-yellow-600 dark:bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span class="text-gray-700 dark:text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {pitch.teamCosts && (
                    <div class="mb-6">
                      <h3 class="text-xl font-semibold mb-3">Team & Costs</h3>
                      <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        {pitch.teamCosts}
                      </p>
                    </div>
                  )}

                  {pitch.timeToMarket && (
                    <div>
                      <h3 class="text-xl font-semibold mb-3">Time to Market</h3>
                      <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        {pitch.timeToMarket}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Current State & Roadmap */}
              {pitch.currentState && (
                <div>
                  <h2 class="text-3xl font-bold mb-6 text-orange-600 dark:text-orange-400">8. Current State & Roadmap</h2>
                  <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {pitch.currentState}
                  </p>
                </div>
              )}
            </div>

            {/* Tech Stack */}
            {project.technologies && (
              <div class="mt-20 text-center">
                <h2 class="text-2xl font-bold mb-8">Built With</h2>
                <div class="flex flex-wrap gap-3 justify-center">
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      class="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Proof Section */}
            <div class="mt-20">
              <div class="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8">
                <div class="text-center mb-8">
                  <div class="flex items-center justify-center gap-3 mb-4">
                    <div class="relative">
                      <img 
                        src="/pfptbs.png" 
                        alt="Hrvoje Pavlinovic"
                        class="w-12 h-12 rounded-full"
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
                    <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">2.9K</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">Social Following</div>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Experience Highlights</h4>
                    <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li class="flex items-start gap-2">
                        <div class="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Built OTA system for world's fastest EV (Rimac Nevera)</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <div class="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Scaled gaming platform to 1.7B ad impressions (ReneVerse)</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <div class="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Architected DAO version of CoinMarketCap (CryptoToday)</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <div class="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Expert in Web3, AWS, TypeScript, and blockchain tech</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Personal Highlights</h4>
                    <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li class="flex items-start gap-2">
                        <div class="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Pro-Bitcoin since 2017, blockchain enthusiast</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <div class="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Husband and father of two</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <div class="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Lives and breathes cutting-edge tech, AI, and innovation</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <div class="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Passionate about football and building community</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div class="mt-20 text-center">
              <h2 class="text-4xl font-bold mb-6">Ready to Join the Seed Round?</h2>
              <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Let's do this.
              </p>
              <a
                href="/contact"
                class="inline-flex items-center gap-2 px-12 py-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 text-white dark:text-black rounded-lg hover:from-gray-800 hover:to-gray-600 dark:hover:from-gray-100 dark:hover:to-gray-300 transition-all font-semibold text-lg"
              >
                Get In Touch
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
            </div>

            {/* Back to Projects */}
            <div class="mt-16 text-center">
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