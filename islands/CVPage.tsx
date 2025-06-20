import cvData from "../data/cv.json" with { type: "json" };

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

  // Helper function to get completion color classes
  const getCompletionColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      'emerald': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
      'orange': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
      'violet': 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',
      'gray': 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
    };
    return colorMap[color] || colorMap.gray;
  };

  return (
    <div class="min-h-screen bg-gradient-to-b from-orange-50/30 via-transparent via-40% to-orange-50/30 dark:from-orange-950/10 dark:via-transparent dark:via-40% dark:to-orange-950/10">
      {/* Hero Section */}
      <div class="pt-32 pb-20 px-6 sm:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center space-y-8">
            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-b from-gray-900 via-gray-900 to-gray-600 dark:from-white dark:via-white dark:to-gray-400 bg-clip-text text-transparent">
              {cvData.hero.title}
            </h1>
            <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-6xl mx-auto leading-relaxed font-light">
              {cvData.hero.subtitle}
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

            <div class="flex justify-center mt-8">
              <a 
                href="/cv/pdf"
                target="_blank"
                class="px-8 py-4 bg-orange-500/90 hover:bg-orange-600 backdrop-blur-sm border border-orange-400/50 rounded-xl text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 text-lg [-webkit-appearance:none] [appearance:none]"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Download PDF
              </a>
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
                  src={cvData.profile.photo} 
                  alt={cvData.profile.name}
                  class="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-white/50 dark:border-gray-800/50"
                />
              </div>

              <div class="flex-1 text-center lg:text-left">
                {/* Name and Title */}
                <div class="mb-8">
                  <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                    {cvData.profile.name}
                  </h2>
                  <p class="text-lg lg:text-xl text-orange-600 dark:text-orange-400 font-semibold">
                    {cvData.profile.title}
                  </p>
                </div>

                {/* Stats Cards */}
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  {cvData.profile.stats.map((stat, index) => (
                    <div key={index} class="bg-orange-50/80 dark:bg-orange-950/20 backdrop-blur-sm p-6 rounded-xl border border-orange-200/50 dark:border-orange-800/50 text-center">
                      <div class="text-3xl lg:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">{stat.value}</div>
                      <div class="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</div>
                    </div>
                  ))}
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
                  {cvData.about.personalInfo.slice(0, 3).map((info, index) => (
                    <p key={index} class="text-sm flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                      <span class="text-xl">{info.icon}</span>
                      <span>{info.text}</span>
                    </p>
                  ))}
                </div>
                <div class="space-y-3">
                  {cvData.about.personalInfo.slice(3).map((info, index) => (
                    <p key={index} class="text-sm flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                      <span class="text-xl">{info.icon}</span>
                      <span>{info.text}</span>
                    </p>
                  ))}
                </div>
              </div>
              <div class="space-y-4">
                {cvData.about.description.map((paragraph, index) => (
                  <p key={index} class="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
                <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {cvData.about.currentActivities}
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
                  {cvData.skills.topSkills.map((skill, index) => (
                    <div key={index}>
                      <div class="flex justify-between items-center mb-2">
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                        <span class="text-sm font-bold text-orange-600 dark:text-orange-400">{skill.level}</span>
                      </div>
                      <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 rounded-full transition-all duration-500 ease-out" style={`width: ${skill.percentage}%`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400 mb-6">Tech Stack Highlights</h3>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  {Object.entries(cvData.skills.techStack).map(([category, technologies]) => (
                    <div key={category}>
                      <h4 class="font-semibold mb-3 text-gray-900 dark:text-white">{category}</h4>
                      <ul class="space-y-2 text-gray-600 dark:text-gray-400">
                        {technologies.map((tech, techIndex) => (
                          <li key={techIndex}>{tech}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
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
              {cvData.experience.map((job, index) => (
                <div key={index} class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-200 dark:hover:border-orange-800/50 transition-all duration-300">
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400">{job.title}</h3>
                      <p class="text-gray-600 dark:text-gray-400">{job.company}</p>
                    </div>
                    <span class="text-sm text-gray-500 dark:text-gray-500 font-medium">{job.period}</span>
                  </div>
                  <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    {job.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} class="flex items-start gap-2">
                        <div class={`${achievementIndex === job.achievements.length - 1 ? 'w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mt-1.5' : 'w-1 h-1 bg-orange-500 rounded-full mt-2'} flex-shrink-0`}></div>
                        <span class={achievementIndex === job.achievements.length - 1 ? 'font-medium' : ''}>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div id="projects" class="bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-8 shadow-xl">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Personal Projects
              </h2>
            </div>
            <div class="space-y-6">
              {cvData.projects.map((project, index) => (
                <div key={index} class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-200 dark:hover:border-orange-800/50 transition-all duration-300">
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400">{project.name}</h3>
                      <p class="text-gray-600 dark:text-gray-400">{project.description}</p>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class={`text-xs px-2 py-1 rounded-full ${getCompletionColorClasses(project.completionColor)}`}>{project.completion}</span>
                      <a href={project.url} target="_blank" rel="noopener noreferrer" class="text-xs text-gray-500 dark:text-gray-500 hover:text-orange-600 dark:hover:text-orange-400 underline transition-colors">{project.urlLabel}</a>
                    </div>
                  </div>
                  <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">{project.details}</p>
                  <div class="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div id="education" class="bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-8 shadow-xl">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Education
              </h2>
            </div>
            <div class="space-y-6">
              {cvData.education.map((edu, index) => (
                <div key={index} class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-200 dark:hover:border-orange-800/50 transition-all duration-300">
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <h3 class="text-lg font-semibold text-orange-600 dark:text-orange-400">{edu.degree}</h3>
                      <p class="text-gray-600 dark:text-gray-400">{edu.institution}</p>
                    </div>
                    <span class="text-sm text-gray-500 dark:text-gray-500 font-medium">{edu.period}</span>
                  </div>
                  {edu.details.length > 0 && (
                    <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      {edu.details.map((detail, detailIndex) => (
                        <li key={detailIndex} class="flex items-start gap-2">
                          <div class="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 