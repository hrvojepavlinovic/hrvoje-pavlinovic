export default function CVPage() {
  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - 60; // Scroll 20px less
      
      globalThis.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Project URLs mapping
  const projectUrls: Record<string, string> = {
    "Memoato": "https://memoato.com",
    "HILLS Lab": "https://hills-lab.hr",
    "Personal Portfolio": "https://hrvoje.pavlinovic.com",
    "XXI Today": "https://xxi.today",
    "Apes Club": "https://apes.club",
    "PLAYGRND": "https://playgrnd.app"
  };

  return (
    <div class="min-h-screen bg-gradient-to-b from-orange-50/30 via-transparent via-40% to-orange-50/30 dark:from-orange-950/10 dark:via-transparent dark:via-40% dark:to-orange-950/10">
      {/* Hero Section */}
      <div class="pt-32 pb-20 px-6 sm:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center space-y-8">
            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-b from-gray-900 via-gray-900 to-gray-600 dark:from-white dark:via-white dark:to-gray-400 bg-clip-text text-transparent">
              Curriculum Vitae
            </h1>
            <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-6xl mx-auto leading-relaxed font-light">
              12+ years of building scalable software and blockchain solutions
            </p>
            
            {/* Navigation Buttons */}
            <div class="hidden lg:flex flex-wrap justify-center gap-4 mt-12">
              <button 
                type="button"
                onClick={() => scrollToSection('about')}
                class="px-6 py-3 bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.08] rounded-xl text-gray-900 dark:text-white font-medium hover:bg-orange-50/80 dark:hover:bg-orange-950/20 hover:border-orange-200/50 dark:hover:border-orange-800/50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                About Me
              </button>
              <button 
                type="button"
                onClick={() => scrollToSection('experience')}
                class="px-6 py-3 bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.08] rounded-xl text-gray-900 dark:text-white font-medium hover:bg-orange-50/80 dark:hover:bg-orange-950/20 hover:border-orange-200/50 dark:hover:border-orange-800/50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Experience
              </button>
              <button 
                type="button"
                onClick={() => scrollToSection('projects')}
                class="px-6 py-3 bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.08] rounded-xl text-gray-900 dark:text-white font-medium hover:bg-orange-50/80 dark:hover:bg-orange-950/20 hover:border-orange-200/50 dark:hover:border-orange-800/50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Personal Projects
              </button>
              <button 
                type="button"
                onClick={() => scrollToSection('education')}
                class="px-6 py-3 bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.08] rounded-xl text-gray-900 dark:text-white font-medium hover:bg-orange-50/80 dark:hover:bg-orange-950/20 hover:border-orange-200/50 dark:hover:border-orange-800/50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Education
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div class="px-6 sm:px-8 pb-24">
        <div class="max-w-6xl mx-auto space-y-16">
          
          {/* Profile Header */}
          <div class="bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-8 lg:p-12 shadow-xl">
            <div class="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
              {/* Profile Photo */}
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-br from-orange-200 to-orange-100 dark:from-orange-800/30 dark:to-orange-900/20 rounded-full blur-lg opacity-70"></div>
                <img 
                  src="/pfptbs.png" 
                  alt="Hrvoje Pavlinovic"
                  class="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-white/50 dark:border-gray-800/50"
                />
              </div>

              <div class="flex-1 text-center lg:text-left">
                {/* Name and Title */}
                <div class="mb-8">
                  <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                    Hrvoje Pavlinovic
                  </h2>
                  <p class="text-lg lg:text-xl text-orange-600 dark:text-orange-400 font-semibold">
                    Senior Software Engineer
                  </p>
                </div>

                {/* Stats Cards */}
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  <div class="bg-orange-50/80 dark:bg-orange-950/20 backdrop-blur-sm p-6 rounded-xl border border-orange-200/50 dark:border-orange-800/50 text-center">
                    <div class="text-3xl lg:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">12+</div>
                    <div class="text-sm font-medium text-gray-600 dark:text-gray-400">Years Experience</div>
                  </div>

                  <div class="bg-orange-50/80 dark:bg-orange-950/20 backdrop-blur-sm p-6 rounded-xl border border-orange-200/50 dark:border-orange-800/50 text-center">
                    <div class="text-3xl lg:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">15+</div>
                    <div class="text-sm font-medium text-gray-600 dark:text-gray-400">Projects</div>
                  </div>

                  <div class="bg-orange-50/80 dark:bg-orange-950/20 backdrop-blur-sm p-6 rounded-xl border border-orange-200/50 dark:border-orange-800/50 text-center">
                    <div class="text-3xl lg:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">MSc</div>
                    <div class="text-sm font-medium text-gray-600 dark:text-gray-400">Computer Science</div>
                  </div>

                  <div class="bg-orange-50/80 dark:bg-orange-950/20 backdrop-blur-sm p-6 rounded-xl border border-orange-200/50 dark:border-orange-800/50 text-center">
                    <div class="text-3xl lg:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">Remote</div>
                    <div class="text-sm font-medium text-gray-600 dark:text-gray-400">Work Style</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div id="about" class="bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-8 shadow-xl">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                About Me
              </h2>
            </div>
            <div class="space-y-6">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="space-y-3">
                  <p class="text-sm flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                    <span class="text-xl">🎂</span>
                    <span>25th of July 1992 (age 32)</span>
                  </p>
                  <p class="text-sm flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                    <span class="text-xl">🎓</span>
                    <span>Master's Degree in Computer Science (2016)</span>
                  </p>
                  <p class="text-sm flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                    <span class="text-xl">👨‍💻</span>
                    <span>12 years of experience (since April 2013)</span>
                  </p>
                </div>
                <div class="space-y-3">
                  <p class="text-sm flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                    <span class="text-xl">🌟</span>
                    <span>Husband and father of two</span>
                  </p>
                  <p class="text-sm flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                    <span class="text-xl">⚽</span>
                    <span>Love playing football</span>
                  </p>
                  <p class="text-sm flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                    <span class="text-xl">🔸</span>
                    <span>Pro-Bitcoin since 2017</span>
                  </p>
                </div>
              </div>
              <div class="space-y-4">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Doing what I really love - building, exploring and learning how to use technology and software to make this world at least little better than it was. Blockchain and equal opportunities enthusiast, advocating for meritocracy and numbers, but often making decisions by heart.
                </p>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                  As a person, I'm calm, focused on personal growth, learning, and exploring new possibilities. Inspiring future generations so they want to help others and be the best versions of themselves is my definition of success.
                </p>
              </div>
              <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
                <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Currently reading <span class="italic">Meditations by Marcus Aurelius</span> • 
                  Investing in Bitcoin, S&P 500, Real Estate • 
                  Using Todoist, Toggl Track, Obsidian, and Cursor
                </p>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div class="bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-8 shadow-xl">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Technical Expertise
              </h2>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400 mb-6">Top Skills</h3>
                <div class="space-y-4">
                  <div>
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Web3 & Blockchain</span>
                      <span class="text-sm font-bold text-orange-600 dark:text-orange-400">Expert</span>
                    </div>
                    <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 w-[95%] rounded-full transition-all duration-500 ease-out"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Application Architecture</span>
                      <span class="text-sm font-bold text-orange-600 dark:text-orange-400">Expert</span>
                    </div>
                    <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 w-[95%] rounded-full transition-all duration-500 ease-out"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">AWS</span>
                      <span class="text-sm font-bold text-orange-600 dark:text-orange-400">Expert</span>
                    </div>
                    <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 w-[95%] rounded-full transition-all duration-500 ease-out"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">TypeScript</span>
                      <span class="text-sm font-bold text-orange-600 dark:text-orange-400">Expert</span>
                    </div>
                    <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 w-[95%] rounded-full transition-all duration-500 ease-out"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">PostgreSQL</span>
                      <span class="text-sm font-bold text-orange-600 dark:text-orange-400">Expert</span>
                    </div>
                    <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 w-[95%] rounded-full transition-all duration-500 ease-out"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400 mb-6">Tech Stack Highlights</h3>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 class="font-semibold mb-3 text-gray-900 dark:text-white">Infrastructure</h4>
                    <ul class="space-y-2 text-gray-600 dark:text-gray-400">
                      <li>AWS (CDK, Lambda, ECS)</li>
                      <li>Docker & Kubernetes</li>
                      <li>Vercel & Deno Deploy</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold mb-3 text-gray-900 dark:text-white">Backend</h4>
                    <ul class="space-y-2 text-gray-600 dark:text-gray-400">
                      <li>Node.js & Express</li>
                      <li>Next.js & Nest.js</li>
                      <li>GraphQL & REST</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold mb-3 text-gray-900 dark:text-white">Data</h4>
                    <ul class="space-y-2 text-gray-600 dark:text-gray-400">
                      <li>PostgreSQL & MongoDB</li>
                      <li>Redis & Elasticsearch</li>
                      <li>Kafka & MQTT</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold mb-3 text-gray-900 dark:text-white">Web3</h4>
                    <ul class="space-y-2 text-gray-600 dark:text-gray-400">
                      <li>Ethers & Wagmi</li>
                      <li>Smart Contracts</li>
                      <li>TonConnect</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div id="experience" class="bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-8 shadow-xl">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Professional Experience
              </h2>
            </div>
            <div class="space-y-6">
              <div class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-200 dark:hover:border-orange-800/50 transition-all duration-300">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400">Software Engineer</h3>
                    <p class="text-gray-600 dark:text-gray-400">ReneVerse.io</p>
                  </div>
                  <span class="text-sm text-gray-500 dark:text-gray-500 font-medium">Mar 2023 - Present</span>
                </div>
                <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Built interoperable assets standard for gaming assets</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Created tooling for game developers and gamers (automatic wallet creation, minting assets)</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Developed immersive brand placement in games with Unity and Unreal Engine SDK</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Created NFT drop on Blast</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span class="font-medium">Scaled system to handle 1.7B ad impressions, unified multiple repos into monorepo</span>
                  </li>
                </ul>
              </div>

              <div class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-200 dark:hover:border-orange-800/50 transition-all duration-300">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400">Software Engineer</h3>
                    <p class="text-gray-600 dark:text-gray-400">Povio</p>
                  </div>
                  <span class="text-sm text-gray-500 dark:text-gray-500 font-medium">Nov 2021 - Mar 2023</span>
                </div>
                <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Worked on clinical trials project for German company Clariness</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Tech stack: AWS, Terraform, Docker, GitLab CI, Node.js, Express.js, NestJS, TypeORM, PostgreSQL</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Implemented Twilio API for direct call agent integration</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span class="font-medium">Fixed critical timezone bug affecting patient appointment times</span>
                  </li>
                </ul>
              </div>

              <div class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-200 dark:hover:border-orange-800/50 transition-all duration-300">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400">Backend Engineer</h3>
                    <p class="text-gray-600 dark:text-gray-400">Rimac Automobili</p>
                  </div>
                  <span class="text-sm text-gray-500 dark:text-gray-500 font-medium">Oct 2020 - Nov 2021</span>
                </div>
                <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Worked in M2M team on Telemetry API and OTA updates system</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Tech stack: TypeScript, GraphQL (Apollo Federation), PostgreSQL, Kafka, HiveMQ, AWS</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Conducted technical interviews and led developer hiring</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span class="font-medium">Created OTA updates system for the world's fastest homologated car</span>
                  </li>
                </ul>
              </div>

              <div class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-200 dark:hover:border-orange-800/50 transition-all duration-300">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400">Software Engineer</h3>
                    <p class="text-gray-600 dark:text-gray-400">Profico</p>
                  </div>
                  <span class="text-sm text-gray-500 dark:text-gray-500 font-medium">Aug 2018 - Oct 2020</span>
                </div>
                <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Led development standards meetings and collaborated with CEO</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Built large-scale web applications for Norwegian media company Hegnar</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Created Real Estate market module integrating 4 different agency APIs</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span class="font-medium">Led definition of company-wide development standards</span>
                  </li>
                </ul>
              </div>

              <div class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-200 dark:hover:border-orange-800/50 transition-all duration-300">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400">Software Engineer</h3>
                    <p class="text-gray-600 dark:text-gray-400">Ericsson</p>
                  </div>
                  <span class="text-sm text-gray-500 dark:text-gray-500 font-medium">Feb 2015 - Aug 2018</span>
                </div>
                <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Developed internal tools: Nodebook (Symfony), Atlas (data analysis), AAT (testing)</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Improved performance by migrating from Groovy & Grails to Node.js</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Created framework-agnostic schema language for testing tools</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span class="font-medium">Optimized internal tools, promoted to senior engineer, presented to SoftBank</span>
                  </li>
                </ul>
              </div>

              <div class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-200 dark:hover:border-orange-800/50 transition-all duration-300">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400">Student Software Developer</h3>
                    <p class="text-gray-600 dark:text-gray-400">Various Projects</p>
                  </div>
                  <span class="text-sm text-gray-500 dark:text-gray-500 font-medium">Apr 2013 - July 2016</span>
                </div>
                <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Tracked 3000+ hours on various projects while studying</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Worked with Joomla, WordPress, Magento, custom PHP + jQuery</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Managed ad campaigns, SEO optimization, and server maintenance</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span class="font-medium">Balanced work and studies, graduating with multiple job offers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Projects Section - Moved before Education */}
          <div id="projects" class="bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-8 shadow-xl">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Personal Projects
              </h2>
            </div>
            <div class="space-y-6">
              <div class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-200 dark:hover:border-orange-800/50 transition-all duration-300">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400">Memoato</h3>
                    <p class="text-gray-600 dark:text-gray-400">AI-powered life tracking platform</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">7% complete</span>
                    <a href={projectUrls["Memoato"]} target="_blank" rel="noopener noreferrer" class="text-xs text-gray-500 dark:text-gray-500 hover:text-orange-600 dark:hover:text-orange-400 underline transition-colors">Live</a>
                  </div>
                </div>
                <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">Voice/text/app integration input for life tracking. AI labels your data and gives you customized dashboards, insights, agenda. Replaces 5+ productivity apps with one intelligent solution.</p>
                <div class="flex flex-wrap gap-2">
                  <span class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">T3</span>
                  <span class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">AI</span>
                  <span class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Postgres</span>
                  <span class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Vercel</span>
                </div>
              </div>

              <div class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-200 dark:hover:border-orange-800/50 transition-all duration-300">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400">HILLS Lab</h3>
                    <p class="text-gray-600 dark:text-gray-400">Technology laboratory for AI, blockchain & Web3</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full">35% complete</span>
                    <a href={projectUrls["HILLS Lab"]} target="_blank" rel="noopener noreferrer" class="text-xs text-gray-500 dark:text-gray-500 hover:text-orange-600 dark:hover:text-orange-400 underline transition-colors">Live</a>
                  </div>
                </div>
                <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">Technology laboratory specializing in cutting-edge AI, blockchain, and Web3 solutions. 6 active client projects, 4 senior developers, partnerships with major Croatian tech companies.</p>
                <div class="flex flex-wrap gap-2">
                  <span class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Deno</span>
                  <span class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Fresh</span>
                  <span class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Tailwind</span>
                </div>
              </div>

              <div class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-200 dark:hover:border-orange-800/50 transition-all duration-300">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400">Personal Portfolio</h3>
                    <p class="text-gray-600 dark:text-gray-400">Modern portfolio with real-time analytics</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full">20% complete</span>
                    <a href={projectUrls["Personal Portfolio"]} target="_blank" rel="noopener noreferrer" class="text-xs text-gray-500 dark:text-gray-500 hover:text-orange-600 dark:hover:text-orange-400 underline transition-colors">Live</a>
                  </div>
                </div>
                <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">Personal brand platform showcasing technical expertise with modern design, real-time analytics, and integrated project portfolio. 15K+ monthly visitors with high engagement.</p>
                <div class="flex flex-wrap gap-2">
                  <span class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Deno</span>
                  <span class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">KV</span>
                  <span class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Fresh</span>
                  <span class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Tailwind</span>
                </div>
              </div>

              <div class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-200 dark:hover:border-orange-800/50 transition-all duration-300">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400">XXI Today</h3>
                    <p class="text-gray-600 dark:text-gray-400">Bitcoin milestone tracking platform</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full">5% complete</span>
                    <a href={projectUrls["XXI Today"]} target="_blank" rel="noopener noreferrer" class="text-xs text-gray-500 dark:text-gray-500 hover:text-orange-600 dark:hover:text-orange-400 underline transition-colors">Live</a>
                  </div>
                </div>
                <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">The definitive Bitcoin portal for tracking the historic journey to 21 million coins. Beta platform processing 10K+ API calls daily with real-time network stats and milestone celebrations.</p>
                <div class="flex flex-wrap gap-2">
                  <span class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">T3</span>
                  <span class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Postgres</span>
                  <span class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Vercel</span>
                  <span class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Bitcoin</span>
                </div>
              </div>

              <div class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-200 dark:hover:border-orange-800/50 transition-all duration-300">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400">Apes Club</h3>
                    <p class="text-gray-600 dark:text-gray-400">Smart Solana token discovery platform</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs px-2 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full">1% complete</span>
                    <a href={projectUrls["Apes Club"]} target="_blank" rel="noopener noreferrer" class="text-xs text-gray-500 dark:text-gray-500 hover:text-orange-600 dark:hover:text-orange-400 underline transition-colors">Prototype</a>
                  </div>
                </div>
                <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">Smart Solana token discovery platform with advanced analytics and community curation for safer meme coin exploration. Technical prototype with analytics engine addressing Solana's $50B+ daily trading volume.</p>
                <div class="flex flex-wrap gap-2">
                  <span class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Solana</span>
                  <span class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Web3</span>
                  <span class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">TypeScript</span>
                  <span class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">DeFi</span>
                </div>
              </div>

              <div class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-200 dark:hover:border-orange-800/50 transition-all duration-300">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400">PLAYGRND</h3>
                    <p class="text-gray-600 dark:text-gray-400">Street football community platform</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">Pre-launch</span>
                    <a href={projectUrls["PLAYGRND"]} target="_blank" rel="noopener noreferrer" class="text-xs text-gray-500 dark:text-gray-500 hover:text-orange-600 dark:hover:text-orange-400 underline transition-colors">Coming Soon</a>
                  </div>
                </div>
                <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">Returning football to the streets with local league platform, player profiles with comprehensive stats, venue partnerships, and community-driven grassroots organization.</p>
                <div class="flex flex-wrap gap-2">
                  <span class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">T3</span>
                  <span class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Postgres</span>
                  <span class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Vercel</span>
                  <span class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Auth</span>
                </div>
              </div>
            </div>
          </div>

          {/* Education Section - Moved after Projects */}
          <div id="education" class="bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-8 shadow-xl">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Education
              </h2>
            </div>
            <div class="space-y-6">
              <div class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-200 dark:hover:border-orange-800/50 transition-all duration-300">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400">Master's Degree, Computer Science</h3>
                    <p class="text-gray-600 dark:text-gray-400">FESB - Faculty of Electrical Engineering, Mechanical Engineering and Naval Architecture</p>
                  </div>
                  <span class="text-sm text-gray-500 dark:text-gray-500 font-medium">2014 - 2016</span>
                </div>
                <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Master's thesis @ Universidad de Las Palmas de Gran Canaria (Erasmus scholarship)</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Student Teaching Assistant for Introduction to Distributed Information Systems</span>
                  </li>
                </ul>
              </div>

              <div class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-200 dark:hover:border-orange-800/50 transition-all duration-300">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400">Bachelor's Degree, Computer Science</h3>
                    <p class="text-gray-600 dark:text-gray-400">FESB - Faculty of Electrical Engineering, Mechanical Engineering and Naval Architecture</p>
                  </div>
                  <span class="text-sm text-gray-500 dark:text-gray-500 font-medium">2011 - 2014</span>
                </div>
              </div>

              <div class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-200 dark:hover:border-orange-800/50 transition-all duration-300">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400">Electronics Technician</h3>
                    <p class="text-gray-600 dark:text-gray-400">Electrotechnical School Split</p>
                  </div>
                  <span class="text-sm text-gray-500 dark:text-gray-500 font-medium">2007 - 2011</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 