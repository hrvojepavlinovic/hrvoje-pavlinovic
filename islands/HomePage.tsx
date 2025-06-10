import { trackEvent } from "../utils/track.ts";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ end, suffix = "", duration = 2000 }: CounterProps) {
  const count = useSignal(0);
  
  useEffect(() => {
    const increment = end / (duration / 50);
    const timer = setInterval(() => {
      count.value = Math.min(count.value + increment, end);
      if (count.value >= end) {
        clearInterval(timer);
        count.value = end;
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, []);
  
  return <span>{Math.floor(count.value)}{suffix}</span>;
}

interface Project {
  id: string;
  name: string;
  url?: string;
  description: string;
  technologies?: string[];
  completion: number;
  featured: boolean;
  accent?: string;
}

export default function HomePage() {
  const btcPrice = useSignal<number | null>(null);
  const isVisible = useSignal(false);
  const activeSection = useSignal(0);
  const featuredProjects = useSignal<Project[]>([]);

  useEffect(() => {
    // Fetch Bitcoin price
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
      .then(res => res.json())
      .then(data => {
        if (data.bitcoin?.usd) {
          btcPrice.value = data.bitcoin.usd;
        }
      })
      .catch(() => btcPrice.value = null);

    // Fetch projects data
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (data.projects) {
          // Filter for specific projects: memoato, xxi-today, apes-club
          const targetIds = ['memoato', 'xxi-today', 'apes-club'];
          const filtered = data.projects.filter((project: Project) => 
            targetIds.includes(project.id)
          );
          // Sort them in the order we want
          const sorted = targetIds.map(id => filtered.find((p: Project) => p.id === id)).filter(Boolean);
          featuredProjects.value = sorted;
        }
      })
      .catch(() => {
        // Fallback data if API fails
        featuredProjects.value = [
          {
            id: "memoato",
            name: "Memoato",
            description: "Voice/text/app integration input for life tracking. AI labels your data and gives you customized insights.",
            technologies: ["AI", "T3", "Postgres"],
            accent: "purple",
            url: "/projects#memoato",
            completion: 7,
            featured: true
          },
          {
            id: "xxi-today",
            name: "XXI Today",
            description: "The ultimate Bitcoin hub - complete information ecosystem with resources directory and wallet explorer.",
            technologies: ["Bitcoin", "Lightning", "T3"],
            accent: "orange",
            url: "/projects#xxi-today",
            completion: 8,
            featured: true
          },
          {
            id: "apes-club",
            name: "Apes Club",
            description: "Pump.fun style Solana token launcher with advanced dashboards and creator leaderboards.",
            technologies: ["Solana", "Web3", "DeFi"],
            accent: "violet",
            url: "/projects#apes-club",
            completion: 3,
            featured: false
          }
        ];
      });

    // Animate sections
    setTimeout(() => isVisible.value = true, 100);
    
    // Section animation cycle
    const sectionTimer = setInterval(() => {
      activeSection.value = (activeSection.value + 1) % 3;
    }, 4000);
    
    return () => clearInterval(sectionTimer);
  }, []);

  const handleLinkClick = (target: string) => {
    trackEvent({
      type: "click",
      clickType: "link",
      target,
    });
  };

  const achievements = [
    { number: 12, suffix: "+", label: "Years Engineering", color: "from-orange-500 to-red-500" },
    { number: 6, suffix: "", label: "Active Projects", color: "from-blue-500 to-purple-500" },
    { number: 4, suffix: "+", label: "Years Blockchain", color: "from-green-500 to-teal-500" },
    { number: 50, suffix: "+", label: "Clients Served", color: "from-purple-500 to-pink-500" }
  ];

  const expertise = [
    { icon: "🤖", title: "Real-World AI Implementation", desc: "Transforming theoretical AI into practical solutions that solve actual problems", progress: 90 },
    { icon: "⛓️", title: "Blockchain Architecture", desc: "Deep expertise in decentralized systems and the philosophy of distributed trust", progress: 95 },
    { icon: "🚀", title: "Concept to Reality", desc: "Building the bridge between visionary ideas and scalable systems", progress: 88 },
    { icon: "🧭", title: "Edge Technology Navigation", desc: "Exploring the boundaries of what's possible in modern software", progress: 92 }
  ];

  return (
    <div class="min-h-screen">
      {/* Hero Section */}
      <section class="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50 dark:from-gray-950 dark:via-orange-950/20 dark:to-gray-950">
        {/* Animated Background Elements */}
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-200/20 dark:bg-orange-800/10 rounded-full blur-3xl animate-pulse"></div>
          <div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s"></div>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-purple-200/10 dark:bg-purple-800/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 4s"></div>
        </div>

        <div class="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
          <div class="text-center space-y-16">
            
            {/* Profile Image - Clean */}
            <div class="relative group mx-auto w-fit mt-16">
              <img 
                src="/pfptbs.png" 
                alt="Hrvoje Pavlinovic"
                class="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Bitcoin Easter Egg */}
              {btcPrice.value && (
                <div class="absolute inset-0 w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-orange-500/95 to-red-500/95 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 cursor-default">
                  <div class="text-center">
                    <div class="text-white font-mono text-lg sm:text-xl font-bold">
                      ${btcPrice.value.toLocaleString()}
                    </div>
                    <div class="text-white/90 font-mono text-sm">
                      BTC/USD
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Main Title */}
            <div class="space-y-3">
              <h1 class={`text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight transition-all duration-1000 leading-tight ${isVisible.value ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <span class="block bg-gradient-to-b from-gray-900 via-gray-900 to-gray-600 dark:from-white dark:via-white dark:to-gray-400 bg-clip-text text-transparent font-black leading-tight pb-2">
                  Hrvoje Pavlinovic
                </span>
              </h1>
              
              <div class={`transition-all duration-1000 delay-300 ${isVisible.value ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <p class="text-xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-200">
                  Senior Software Engineer & Tech Founder
                </p>
              </div>
            </div>

            {/* Achievements Counter */}
            <div class={`hidden grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto transition-all duration-1000 delay-500 ${isVisible.value ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {achievements.map((achievement, index) => (
                <div key={index} class="group bg-white/60 dark:bg-white/[0.02] backdrop-blur-xl border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-6 hover:border-orange-300 dark:hover:border-orange-700/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div class={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent mb-2`}>
                    <AnimatedCounter end={achievement.number} suffix={achievement.suffix} />
                  </div>
                  <div class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Primary CTAs */}
            <div class={`flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto transition-all duration-1000 delay-700 ${isVisible.value ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <a 
                href="/projects"
                class="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden"
                onClick={() => handleLinkClick("projects")}
              >
                <span class="relative z-10">Explore My Work</span>
                <div class="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a 
                href="/contact"
                class="group relative px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-2xl hover:border-orange-400 dark:hover:border-orange-500 transition-all duration-300 font-semibold text-lg hover:shadow-lg hover:scale-105 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                onClick={() => handleLinkClick("contact")}
              >
                <span class="relative z-10">Let's Connect</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section class="py-24 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto px-6 sm:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Core Philosophy
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Operating at the intersection of emerging technology and practical implementation
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {expertise.map((skill, index) => (
              <div key={index} class="group bg-white/60 dark:bg-white/[0.02] backdrop-blur-xl border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-8 hover:border-orange-300 dark:hover:border-orange-700/50 transition-all duration-300 hover:scale-102 hover:shadow-xl">
                <div class="flex items-start gap-4">
                  <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <div class="flex-1">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {skill.title}
                    </h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-4">
                      {skill.desc}
                    </p>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div 
                        class="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000 ease-out"
                        style={`width: ${skill.progress}%`}
                      ></div>
                    </div>
                    <div class="text-right text-sm text-gray-500 dark:text-gray-500 mt-1">
                      {skill.progress}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section class="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div class="max-w-7xl mx-auto px-6 sm:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Concepts in Motion
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Ideas transformed into reality through thoughtful engineering and innovative thinking
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredProjects.value.map((project, index) => (
              <a 
                key={index}
                href={project.url || `/projects#${project.id}`}
                class="group bg-white/60 dark:bg-white/[0.02] backdrop-blur-xl border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-8 hover:border-orange-300 dark:hover:border-orange-700/50 transition-all duration-300 hover:scale-105 hover:shadow-xl block"
                onClick={() => handleLinkClick(`project-${project.name.toLowerCase()}`)}
              >
                <div class="space-y-4">
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {project.name}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                  <div class="flex flex-wrap gap-2">
                    {project.technologies?.map((tech, i) => (
                      <span key={i} class="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div class="text-orange-600 dark:text-orange-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    Learn More →
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div class="text-center mt-12">
            <a 
              href="/projects"
              class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-100 text-white dark:text-gray-900 rounded-2xl hover:shadow-xl transition-all duration-300 font-semibold text-lg hover:scale-105"
              onClick={() => handleLinkClick("all-projects")}
            >
              Explore All Concepts
            </a>
          </div>
        </div>
      </section>

      {/* Social Proof & Connect */}
      <section class="py-24 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div class="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <div class="space-y-8">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Let's Push Boundaries Together
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Whether exploring blockchain frontiers, implementing cutting-edge AI, or building tomorrow's systems, 
              let's discuss what's possible at the edge of technology.
            </p>

            {/* Enhanced Social Links */}
            <div class="bg-white/60 dark:bg-white/[0.02] backdrop-blur-xl border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-8 shadow-xl">
              <div class="flex flex-wrap justify-center gap-4 sm:gap-6">
                {[
                  { href: "https://x.com/0xhp10", label: "Twitter", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                  { href: "https://www.linkedin.com/in/hpavlino", label: "LinkedIn", icon: "M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" },
                  { href: "mailto:hrvoje@pavlinovic.com", label: "Email", icon: "M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67zM22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" },
                  { href: "https://t.me/Oxhp10", label: "Telegram", icon: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.href}
                    target={social.href.startsWith('mailto:') ? undefined : "_blank"}
                    rel={social.href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                    class="group p-4 rounded-xl bg-gray-50/80 dark:bg-white/5 hover:bg-gradient-to-br hover:from-orange-100 hover:to-red-100 dark:hover:from-orange-900/30 dark:hover:to-red-900/30 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    onClick={() => handleLinkClick(social.label.toLowerCase())}
                  >
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon}/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Final CTA */}
            <div class="space-y-6 pb-16">
              <a 
                href="/contact"
                class="group relative inline-flex items-center px-12 py-5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl transition-all duration-300 font-bold text-xl shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden"
                onClick={() => handleLinkClick("main-contact-cta")}
              >
                <span class="relative z-10">Start a Conversation</span>
                <div class="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <p class="text-gray-500 dark:text-gray-500">
                Let's explore what's possible together
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 