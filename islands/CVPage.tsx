export default function CVPage() {
  return (
    <div class="dark:bg-black bg-white text-black dark:text-white w-full pt-32 pb-16">
      <div class="max-w-screen-xl mx-auto px-4">
        <div>
          {/* Header Stats */}
          <div class="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-br from-btc-orange/20 to-transparent rounded-full"></div>
              <img 
                src="/pfptbs.png" 
                alt="Hrvoje Pavlinovic"
                class="w-24 h-24 rounded-full relative"
              />
            </div>
            <div class="flex-1">
              <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h1 class="text-3xl font-semibold tracking-tight mb-2">Hrvoje Pavlinovic</h1>
                  <p class="text-btc-orange">Senior Software Engineer</p>
                </div>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="dark:bg-white/5 bg-black/5 p-4 rounded-lg">
                  <div class="text-btc-orange text-2xl font-medium">12+</div>
                  <div class="dark:text-white/60 text-black/60 text-sm">Years Experience</div>
                </div>
                <div class="dark:bg-white/5 bg-black/5 p-4 rounded-lg">
                  <div class="text-btc-orange text-2xl font-medium">15+</div>
                  <div class="dark:text-white/60 text-black/60 text-sm">Projects</div>
                </div>
                <div class="dark:bg-white/5 bg-black/5 p-4 rounded-lg">
                  <div class="text-btc-orange text-2xl font-medium">MSc</div>
                  <div class="dark:text-white/60 text-black/60 text-sm">Computer Science</div>
                </div>
                <div class="dark:bg-white/5 bg-black/5 p-4 rounded-lg">
                  <div class="text-btc-orange text-2xl font-medium">Remote</div>
                  <div class="dark:text-white/60 text-black/60 text-sm">Work Style</div>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div class="mb-12">
            <h2 class="text-xl font-medium tracking-tight mb-6 flex items-center">
              <span class="w-1.5 h-1.5 bg-btc-orange rounded-full mr-2"></span>
              About Me
            </h2>
            <div class="dark:bg-white/5 bg-black/5 p-6 rounded-lg space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div class="space-y-2">
                  <p class="text-sm flex items-center space-x-2">
                    <span>🎂</span>
                    <span>25th of July 1992 (age 32)</span>
                  </p>
                  <p class="text-sm flex items-center space-x-2">
                    <span>🎓</span>
                    <span>Master's Degree in Computer Science (2016)</span>
                  </p>
                  <p class="text-sm flex items-center space-x-2">
                    <span>👨‍💻</span>
                    <span>12 years of experience (since April 2013)</span>
                  </p>
                </div>
                <div class="space-y-2">
                  <p class="text-sm flex items-center space-x-2">
                    <span>🌟</span>
                    <span>Husband and father of two</span>
                  </p>
                  <p class="text-sm flex items-center space-x-2">
                    <span>⚽</span>
                    <span>Love playing football</span>
                  </p>
                  <p class="text-sm flex items-center space-x-2">
                    <span>🔸</span>
                    <span>Pro-Bitcoin since 2017</span>
                  </p>
                </div>
              </div>
              <p class="text-sm dark:text-white/80 text-black/80">
                Doing what I really love - building, exploring and learning how to use technology and software to make this world at least little better than it was. Blockchain and equal opportunities enthusiast, advocating for meritocracy and numbers, but often making decisions by heart.
              </p>
              <p class="text-sm dark:text-white/80 text-black/80">
                As a person, I'm calm, focused on personal growth, learning, and exploring new possibilities. Inspiring future generations so they want to help others and be the best versions of themselves is my definition of success.
              </p>
              <div class="pt-4 border-t border-white/10">
                <p class="text-sm dark:text-white/60 text-black/60">
                  Currently reading <span class="italic">Meditations by Marcus Aurelius</span> • 
                  Investing in Bitcoin, S&P 500, Real Estate • 
                  Using Todoist, Toggl Track, Obsidian, and Cursor
                </p>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div class="mb-12">
            <h2 class="text-xl font-medium tracking-tight mb-6 flex items-center">
              <span class="w-1.5 h-1.5 bg-btc-orange rounded-full mr-2"></span>
              Technical Expertise
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="dark:bg-white/5 bg-black/5 p-6 rounded-lg">
                <h3 class="text-btc-orange font-medium mb-4">Top Skills</h3>
                <div class="space-y-3">
                  <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm">Web3 & Blockchain</span>
                      <span class="text-sm text-btc-orange">Expert</span>
                    </div>
                    <div class="h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                      <div class="h-full bg-btc-orange w-[95%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm">Application Architecture</span>
                      <span class="text-sm text-btc-orange">Expert</span>
                    </div>
                    <div class="h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                      <div class="h-full bg-btc-orange w-[95%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm">AWS</span>
                      <span class="text-sm text-btc-orange">Expert</span>
                    </div>
                    <div class="h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                      <div class="h-full bg-btc-orange w-[95%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm">TypeScript</span>
                      <span class="text-sm text-btc-orange">Expert</span>
                    </div>
                    <div class="h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                      <div class="h-full bg-btc-orange w-[95%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm">PostgreSQL</span>
                      <span class="text-sm text-btc-orange">Expert</span>
                    </div>
                    <div class="h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                      <div class="h-full bg-btc-orange w-[95%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="dark:bg-white/5 bg-black/5 p-6 rounded-lg">
                <h3 class="text-btc-orange font-medium mb-4">Tech Stack Highlights</h3>
                <div class="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <h4 class="font-medium mb-2">Infrastructure</h4>
                    <ul class="space-y-1 dark:text-white/60 text-black/60">
                      <li>AWS (CDK, Lambda, ECS)</li>
                      <li>Docker & Kubernetes</li>
                      <li>Vercel & Deno Deploy</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-medium mb-2">Backend</h4>
                    <ul class="space-y-1 dark:text-white/60 text-black/60">
                      <li>Node.js & Express</li>
                      <li>Next.js & Nest.js</li>
                      <li>GraphQL & REST</li>
                    </ul>
                  </div>
                  <div class="mt-4">
                    <h4 class="font-medium mb-2">Data</h4>
                    <ul class="space-y-1 dark:text-white/60 text-black/60">
                      <li>PostgreSQL & MongoDB</li>
                      <li>Redis & Elasticsearch</li>
                      <li>Kafka & MQTT</li>
                    </ul>
                  </div>
                  <div class="mt-4">
                    <h4 class="font-medium mb-2">Web3</h4>
                    <ul class="space-y-1 dark:text-white/60 text-black/60">
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
          <div class="mb-12">
            <h2 class="text-xl font-medium tracking-tight mb-6 flex items-center">
              <span class="w-1.5 h-1.5 bg-btc-orange rounded-full mr-2"></span>
              Professional Experience
            </h2>
            <div class="space-y-6">
              {/* <div class="dark:bg-white/5 bg-black/5 p-6 rounded-lg">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-btc-orange font-medium">Lead Backend Engineer</h3>
                    <p class="text-sm dark:text-white/60 text-black/60">CryptoToday</p>
                  </div>
                  <span class="text-sm dark:text-white/60 text-black/60">Feb 2024 - Present</span>
                </div>
                <ul class="list-disc list-inside space-y-2 text-sm dark:text-white/80 text-black/80">
                  <li>Building a decentralised version of CoinMarketCap with fair launch</li>
                  <li>Defined architecture from scratch (AWS CDK, RDS, ECS, CloudFront, Express.js, Next.js, PostgreSQL, MongoDB, Redis, BullMQ)</li>
                  <li>Created voting engine with BullMQ and smart contract integration</li>
                  <li>Implemented Telegram Bot and Mini App using Ton Connect</li>
                  <li class="list-item pl-0">⭐ Set up architecture from scratch, optimised Telegram Bot for scale using Redis</li>
                </ul>
              </div> */}

              <div class="dark:bg-white/5 bg-black/5 p-6 rounded-lg">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-btc-orange font-medium">Software Engineer</h3>
                    <p class="text-sm dark:text-white/60 text-black/60">ReneVerse.io</p>
                  </div>
                  <span class="text-sm dark:text-white/60 text-black/60">Mar 2023 - Present</span>
                </div>
                <ul class="list-disc list-inside space-y-2 text-sm dark:text-white/80 text-black/80">
                  <li>Built interoperable assets standard for gaming assets</li>
                  <li>Created tooling for game developers and gamers (automatic wallet creation, minting assets)</li>
                  <li>Developed immersive brand placement in games with Unity and Unreal Engine SDK</li>
                  <li>Created NFT drop on Blast</li>
                  <li class="list-item pl-0">⭐ Scaled system to handle 1.7B ad impressions, unified multiple repos into monorepo</li>
                </ul>
              </div>

              <div class="dark:bg-white/5 bg-black/5 p-6 rounded-lg">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-btc-orange font-medium">Software Engineer</h3>
                    <p class="text-sm dark:text-white/60 text-black/60">Povio</p>
                  </div>
                  <span class="text-sm dark:text-white/60 text-black/60">Nov 2021 - Mar 2023</span>
                </div>
                <ul class="list-disc list-inside space-y-2 text-sm dark:text-white/80 text-black/80">
                  <li>Worked on clinical trials project for German company Clariness</li>
                  <li>Tech stack: AWS, Terraform, Docker, GitLab CI, Node.js, Express.js, NestJS, TypeORM, PostgreSQL</li>
                  <li>Implemented Twilio API for direct call agent integration</li>
                  <li class="list-item pl-0">⭐ Fixed critical timezone bug affecting patient appointment times</li>
                </ul>
              </div>

              <div class="dark:bg-white/5 bg-black/5 p-6 rounded-lg">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-btc-orange font-medium">Backend Engineer</h3>
                    <p class="text-sm dark:text-white/60 text-black/60">Rimac Automobili</p>
                  </div>
                  <span class="text-sm dark:text-white/60 text-black/60">Oct 2020 - Nov 2021</span>
                </div>
                <ul class="list-disc list-inside space-y-2 text-sm dark:text-white/80 text-black/80">
                  <li>Worked in M2M team on Telemetry API and OTA updates system</li>
                  <li>Tech stack: TypeScript, GraphQL (Apollo Federation), PostgreSQL, Kafka, HiveMQ, AWS</li>
                  <li>Conducted technical interviews and led developer hiring</li>
                  <li class="list-item pl-0">⭐ Created OTA updates system for the world's fastest homologated car</li>
                </ul>
              </div>

              <div class="dark:bg-white/5 bg-black/5 p-6 rounded-lg">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-btc-orange font-medium">Software Engineer</h3>
                    <p class="text-sm dark:text-white/60 text-black/60">Profico</p>
                  </div>
                  <span class="text-sm dark:text-white/60 text-black/60">Aug 2018 - Oct 2020</span>
                </div>
                <ul class="list-disc list-inside space-y-2 text-sm dark:text-white/80 text-black/80">
                  <li>Led development standards meetings and collaborated with CEO</li>
                  <li>Built large-scale web applications for Norwegian media company Hegnar</li>
                  <li>Created Real Estate market module integrating 4 different agency APIs</li>
                  <li class="list-item pl-0">⭐ Led definition of company-wide development standards</li>
                </ul>
              </div>

              <div class="dark:bg-white/5 bg-black/5 p-6 rounded-lg">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-btc-orange font-medium">Software Engineer</h3>
                    <p class="text-sm dark:text-white/60 text-black/60">Ericsson</p>
                  </div>
                  <span class="text-sm dark:text-white/60 text-black/60">Feb 2015 - Aug 2018</span>
                </div>
                <ul class="list-disc list-inside space-y-2 text-sm dark:text-white/80 text-black/80">
                  <li>Developed internal tools: Nodebook (Symfony), Atlas (data analysis), AAT (testing)</li>
                  <li>Improved performance by migrating from Groovy & Grails to Node.js</li>
                  <li>Created framework-agnostic schema language for testing tools</li>
                  <li class="list-item pl-0">⭐ Optimized internal tools, promoted to senior engineer, presented to SoftBank</li>
                </ul>
              </div>

              <div class="dark:bg-white/5 bg-black/5 p-6 rounded-lg">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-btc-orange font-medium">Student Software Developer</h3>
                    <p class="text-sm dark:text-white/60 text-black/60">Various Projects</p>
                  </div>
                  <span class="text-sm dark:text-white/60 text-black/60">Apr 2013 - July 2016</span>
                </div>
                <ul class="list-disc list-inside space-y-2 text-sm dark:text-white/80 text-black/80">
                  <li>Tracked 3000+ hours on various projects while studying</li>
                  <li>Worked with Joomla, WordPress, Magento, custom PHP + jQuery</li>
                  <li>Managed ad campaigns, SEO optimization, and server maintenance</li>
                  <li class="list-item pl-0">⭐ Balanced work and studies, graduating with multiple job offers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div>
            <h2 class="text-xl font-medium tracking-tight mb-6 flex items-center">
              <span class="w-1.5 h-1.5 bg-btc-orange rounded-full mr-2"></span>
              Education
            </h2>
            <div class="space-y-6">
              <div class="dark:bg-white/5 bg-black/5 p-6 rounded-lg">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-btc-orange font-medium">Master's Degree, Computer Science</h3>
                    <p class="text-sm dark:text-white/60 text-black/60">FESB - Faculty of Electrical Engineering, Mechanical Engineering and Naval Architecture</p>
                  </div>
                  <span class="text-sm dark:text-white/60 text-black/60">2014 - 2016</span>
                </div>
                <ul class="list-disc list-inside space-y-2 text-sm dark:text-white/80 text-black/80">
                  <li>Master's thesis @ Universidad de Las Palmas de Gran Canaria (Erasmus scholarship)</li>
                  <li>Student Teaching Assistant for Introduction to Distributed Information Systems</li>
                </ul>
              </div>

              <div class="dark:bg-white/5 bg-black/5 p-6 rounded-lg">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-btc-orange font-medium">Bachelor's Degree, Computer Science</h3>
                    <p class="text-sm dark:text-white/60 text-black/60">FESB - Faculty of Electrical Engineering, Mechanical Engineering and Naval Architecture</p>
                  </div>
                  <span class="text-sm dark:text-white/60 text-black/60">2011 - 2014</span>
                </div>
              </div>

              <div class="dark:bg-white/5 bg-black/5 p-6 rounded-lg">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-btc-orange font-medium">Electronics Technician</h3>
                    <p class="text-sm dark:text-white/60 text-black/60">Electrotechnical School Split</p>
                  </div>
                  <span class="text-sm dark:text-white/60 text-black/60">2007 - 2011</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 