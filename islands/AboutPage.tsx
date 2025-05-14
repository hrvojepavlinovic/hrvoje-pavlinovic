import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export default function AboutPage() {
  const isVisible = useSignal(false);

  useEffect(() => {
    isVisible.value = true;
  }, []);

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>About Hrvoje Pavlinovic | Blockchain Developer & Tech Lead</title>
        <meta name="title" content="About Hrvoje Pavlinovic | Blockchain Developer & Tech Lead" />
        <meta name="description" content="Senior blockchain developer and tech lead with 4+ years of experience in decentralized systems. Specializing in Bitcoin, blockchain technology, and scalable software solutions." />
        <meta name="keywords" content="Hrvoje Pavlinovic, Blockchain Developer, Bitcoin Developer, Tech Lead, Software Engineering, Decentralized Systems, Web3, Football" />
        <meta name="author" content="Hrvoje Pavlinovic" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://hrvoje.pavlinovic.com/about" />
        <meta property="og:title" content="About Hrvoje Pavlinovic | Blockchain Developer & Tech Lead" />
        <meta property="og:description" content="Senior blockchain developer and tech lead with 4+ years of experience in decentralized systems. Specializing in Bitcoin, blockchain technology, and scalable software solutions." />
        <meta property="og:image" content="https://hrvoje.pavlinovic.com/pfptbs.png" />
        <meta property="og:site_name" content="Hrvoje Pavlinovic" />
        <meta property="profile:first_name" content="Hrvoje" />
        <meta property="profile:last_name" content="Pavlinovic" />
        <meta property="profile:username" content="0xhp10" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@0xhp10" />
        <meta name="twitter:creator" content="@0xhp10" />
        <meta name="twitter:title" content="About Hrvoje Pavlinovic | Blockchain Developer & Tech Lead" />
        <meta name="twitter:description" content="Senior blockchain developer and tech lead with 4+ years of experience in decentralized systems. Specializing in Bitcoin, blockchain technology, and scalable software solutions." />
        <meta name="twitter:image" content="https://hrvoje.pavlinovic.com/pfptbs.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://hrvoje.pavlinovic.com/about" />

        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Hrvoje Pavlinovic",
            "alternateName": "0xhp10",
            "description": "Senior blockchain developer and tech lead with 4+ years of experience in decentralized systems.",
            "image": "https://hrvoje.pavlinovic.com/pfptbs.png",
            "url": "https://hrvoje.pavlinovic.com",
            "sameAs": [
              "https://twitter.com/0xhp10",
              "https://github.com/hrvoje-pavlinovic"
            ],
            "jobTitle": "Blockchain Developer & Tech Lead",
            "knowsAbout": [
              "Blockchain Technology",
              "Bitcoin",
              "Software Development",
              "Decentralized Systems",
              "Web3"
            ],
            "worksFor": {
              "@type": "Organization",
              "name": "Independent Contractor"
            }
          })}
        </script>
      </Head>
      
      <div class="dark:bg-black bg-white text-black dark:text-white w-full pt-24 pb-16">
        <div class="max-w-screen-xl mx-auto px-4">
          <div>
            {/* Header with integrated photo */}
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
                <h1 class="text-3xl font-semibold tracking-tight mb-4">Overview</h1>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div class="dark:bg-white/5 bg-black/5 p-4 rounded-lg">
                    <div class="text-btc-orange text-2xl font-medium">12+</div>
                    <div class="dark:text-white/60 text-black/60 text-sm">Years in Software Engineering</div>
                  </div>
                  <div class="dark:bg-white/5 bg-black/5 p-4 rounded-lg">
                    <div class="text-btc-orange text-2xl font-medium">4+</div>
                    <div class="dark:text-white/60 text-black/60 text-sm">Years in Blockchain</div>
                  </div>
                  <div class="dark:bg-white/5 bg-black/5 p-4 rounded-lg">
                    <div class="text-btc-orange text-2xl font-medium">3</div>
                    <div class="dark:text-white/60 text-black/60 text-sm">Core Technologies</div>
                  </div>
                  <div class="dark:bg-white/5 bg-black/5 p-4 rounded-lg">
                    <div class="text-btc-orange text-2xl font-medium">24/7</div>
                    <div class="dark:text-white/60 text-black/60 text-sm">Learning & Growing</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Values Section */}
            <div class="mb-12">
              <h2 class="text-xl font-medium tracking-tight mb-6 flex items-center">
                <span class="w-1.5 h-1.5 bg-btc-orange rounded-full mr-2"></span>
                Core Values
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Family First', desc: 'The foundation of everything I do', value: '100%' },
                  { title: 'Transparency', desc: 'Clear and honest communication', value: '100%' },
                  { title: 'Integrity', desc: 'Unwavering ethical principles', value: '100%' },
                  { title: 'Innovation', desc: 'Pushing boundaries forward', value: '100%' }
                ].map(item => (
                  <div class="dark:bg-white/5 bg-black/5 p-4 rounded-lg flex items-center justify-between">
                    <div>
                      <h3 class="font-medium">{item.title}</h3>
                      <p class="dark:text-white/60 text-black/60 text-sm">{item.desc}</p>
                    </div>
                    <div class="text-btc-orange font-medium">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Focus Areas Section */}
            <div>
              <h2 class="text-xl font-medium tracking-tight mb-6 flex items-center">
                <span class="w-1.5 h-1.5 bg-btc-orange rounded-full mr-2"></span>
                Focus Areas
              </h2>
              <div class="space-y-6">
                <div class="dark:bg-white/5 bg-black/5 p-6 rounded-lg">
                  <div class="flex justify-between items-center mb-2">
                    <h3 class="text-btc-orange font-medium">Blockchain Technology</h3>
                    <span class="text-sm dark:text-white/60 text-black/60">Primary Focus</span>
                  </div>
                  <div class="h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                    <div class="h-full bg-btc-orange w-[85%] rounded-full"></div>
                  </div>
                  <p class="mt-4 dark:text-white/80 text-black/80">Deeply fascinated by decentralized systems and their potential to revolutionize finance and technology. Particularly interested in Bitcoin and its underlying principles.</p>
                </div>

                <div class="dark:bg-white/5 bg-black/5 p-6 rounded-lg">
                  <div class="flex justify-between items-center mb-2">
                    <h3 class="text-btc-orange font-medium">Software Development</h3>
                    <span class="text-sm dark:text-white/60 text-black/60">Core Skill</span>
                  </div>
                  <div class="h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                    <div class="h-full bg-btc-orange w-[90%] rounded-full"></div>
                  </div>
                  <p class="mt-4 dark:text-white/80 text-black/80">Passionate about creating elegant solutions through code. Focused on building scalable, efficient, and user-centric applications.</p>
                </div>

                <div class="dark:bg-white/5 bg-black/5 p-6 rounded-lg">
                  <div class="flex justify-between items-center mb-2">
                    <h3 class="text-btc-orange font-medium">Football</h3>
                    <span class="text-sm dark:text-white/60 text-black/60">Life Balance</span>
                  </div>
                  <div class="h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                    <div class="h-full bg-btc-orange w-[75%] rounded-full"></div>
                  </div>
                  <p class="mt-4 dark:text-white/80 text-black/80">More than just a sport - it's about strategy, teamwork, and the beautiful game that brings people together. And beer.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 