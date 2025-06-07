import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export default function AboutPage() {
  const isVisible = useSignal(false);

  useEffect(() => {
    isVisible.value = true;
  }, []);

  return (
    <div class="min-h-screen bg-gradient-to-b from-orange-50/30 via-transparent via-40% to-orange-50/30 dark:from-orange-950/10 dark:via-transparent dark:via-40% dark:to-orange-950/10">
      {/* Hero Section */}
      <div class="pt-32 pb-20 px-6 sm:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center space-y-8">
            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-b from-gray-900 via-gray-900 to-gray-600 dark:from-white dark:via-white dark:to-gray-400 bg-clip-text text-transparent">
              About Me
            </h1>
            <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
              Building the future through code, family, and football
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div class="px-6 sm:px-8 pb-24">
        <div class="max-w-6xl mx-auto space-y-16">
          
          {/* Profile Section */}
          <div class="bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-8 shadow-xl">
            <div class="flex flex-col items-center gap-8">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-br from-orange-200 to-orange-100 dark:from-orange-800/30 dark:to-orange-900/20 rounded-full blur-lg opacity-70"></div>
                <img 
                  src="/pfptbs.png" 
                  alt="Hrvoje Pavlinovic"
                  class="relative w-32 h-32 rounded-full object-cover border-4 border-white/50 dark:border-gray-800/50"
                />
              </div>
              
              {/* Stats Grid - Redesigned */}
              <div class="w-full max-w-4xl">
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  <div class="group bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20 backdrop-blur-sm p-6 rounded-2xl border border-orange-200/50 dark:border-orange-800/30 text-center hover:border-orange-300 dark:hover:border-orange-700/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <div class="text-3xl lg:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2 group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors">12+</div>
                    <div class="text-sm font-medium text-gray-700 dark:text-gray-300">Years Engineering</div>
                  </div>
                  
                  <div class="group bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20 backdrop-blur-sm p-6 rounded-2xl border border-orange-200/50 dark:border-orange-800/30 text-center hover:border-orange-300 dark:hover:border-orange-700/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <div class="text-3xl lg:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2 group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors">4+</div>
                    <div class="text-sm font-medium text-gray-700 dark:text-gray-300">Years Blockchain</div>
                  </div>
                  
                  <div class="group bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20 backdrop-blur-sm p-6 rounded-2xl border border-orange-200/50 dark:border-orange-800/30 text-center hover:border-orange-300 dark:hover:border-orange-700/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <div class="text-3xl lg:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2 group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors">MSc</div>
                    <div class="text-sm font-medium text-gray-700 dark:text-gray-300">Computer Science</div>
                  </div>
                  
                  <div class="group bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20 backdrop-blur-sm p-6 rounded-2xl border border-orange-200/50 dark:border-orange-800/30 text-center hover:border-orange-300 dark:hover:border-orange-700/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <div class="text-3xl lg:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2 group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors">24/7</div>
                    <div class="text-sm font-medium text-gray-700 dark:text-gray-300">Learning & Growing</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values Section */}
          <div class="bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-8 shadow-xl">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Core Values
              </h2>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                { title: 'Family First', desc: 'The foundation of everything I do', value: '100%' },
                { title: 'Transparency', desc: 'Clear and honest communication', value: '100%' },
                { title: 'Integrity', desc: 'Unwavering ethical principles', value: '100%' },
                { title: 'Innovation', desc: 'Pushing boundaries forward', value: '100%' }
              ].map((item, index) => (
                <div key={index} class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between hover:border-orange-200 dark:hover:border-orange-800/50 transition-all duration-300">
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                    <p class="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                  </div>
                  <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Focus Areas Section */}
          <div class="bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-8 shadow-xl">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Focus Areas
              </h2>
            </div>
            <div class="space-y-8">
              <div class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400">Blockchain Technology</h3>
                  <span class="text-sm text-gray-500 dark:text-gray-500">Primary Focus</span>
                </div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
                  <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 w-[85%] rounded-full transition-all duration-500 ease-out"></div>
                </div>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">Deeply fascinated by decentralized systems and their potential to revolutionize finance and technology. Particularly interested in Bitcoin and its underlying principles.</p>
              </div>

              <div class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400">Software Development</h3>
                  <span class="text-sm text-gray-500 dark:text-gray-500">Core Skill</span>
                </div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
                  <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 w-[90%] rounded-full transition-all duration-500 ease-out"></div>
                </div>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">Passionate about creating elegant solutions through code. Focused on building scalable, efficient, and user-centric applications.</p>
              </div>

              <div class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400">Football</h3>
                  <span class="text-sm text-gray-500 dark:text-gray-500">Life Balance</span>
                </div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
                  <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 w-[75%] rounded-full transition-all duration-500 ease-out"></div>
                </div>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">More than just a sport - it's about strategy, teamwork, and the beautiful game that brings people together. And beer.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 