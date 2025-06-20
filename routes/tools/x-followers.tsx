import { type PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Header from "../../components/Header.tsx";
import Footer from "../../islands/Footer.tsx";
import XFollowersTracker from "../../islands/XFollowersTracker.tsx";

export default function XFollowersPage(props: PageProps) {
  const url = new URL(props.url);
  const canonicalUrl = `${url.origin}${url.pathname}`;
  
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "X Followers Tracker",
    "description": "Simple tool to track X (Twitter) followers and unfollowers. Free to use, no registration required.",
    "url": canonicalUrl,
    "applicationCategory": "SocialNetworkingApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Person",
      "name": "Hrvoje Pavlinovic",
      "url": "https://hrvoje.pavlinovic.com",
      "sameAs": ["https://x.com/0xhp10"]
    }
  };

  return (
    <>
      <Head>
        <title>X Followers Tracker - Catch Follow-Unfollow Strategy Users | Hrvoje Pavlinovic</title>
        <meta 
          name="description" 
          content="Catch follow-unfollow strategy users on X (Twitter). Track who follows then unfollows you. Free tool, no registration required." 
        />
        <meta name="keywords" content="X followers tracker, follow unfollow strategy, Twitter unfollowers, follower analytics, free social media tool" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:title" content="X Followers Tracker - Simple Twitter Analytics" />
        <meta property="og:description" content="Track X followers and unfollowers for free. No registration required." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@0xhp10" />
        <meta name="twitter:title" content="X Followers Tracker" />
        <meta name="twitter:description" content="Track X followers and unfollowers for free. No registration required." />

        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        
        {/* Simple Hero */}
        <div class="pt-32 pb-16 px-6 sm:px-8">
          <div class="max-w-4xl mx-auto">
            <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              X Followers Tracker
            </h1>
            
            <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Catch the follow-unfollow strategy users. Track who follows then unfollows you on X (Twitter). Simple, free, no registration required.
            </p>

            {/* Usage Stats */}
            <div class="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700 mb-12">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Currently tracking <span class="font-semibold text-gray-900 dark:text-white">247</span> usernames
              </p>
            </div>

            {/* Add Username Input */}
            <XFollowersTracker />
          </div>
        </div>

        {/* How It Works */}
        <div class="px-6 sm:px-8 pb-16">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">How It Works</h2>
            
            <div class="space-y-6">
              <div class="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div class="flex items-start gap-4">
                  <div class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold">
                    1
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Add Username</h3>
                    <p class="text-gray-600 dark:text-gray-400">
                      Enter any X username you want to track (including your own). We'll monitor who follows and then unfollows.
                    </p>
                  </div>
                </div>
              </div>

              <div class="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div class="flex items-start gap-4">
                  <div class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold">
                    2
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Automatic Tracking</h3>
                    <p class="text-gray-600 dark:text-gray-400">
                      Our system starts tracking the account. A daily job checks followers and compares with the previous day.
                    </p>
                  </div>
                </div>
              </div>

              <div class="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div class="flex items-start gap-4">
                  <div class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold">
                    3
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Check Results</h3>
                    <p class="text-gray-600 dark:text-gray-400">
                      Come back anytime to see new followers and unfollowers. Your tracked username is saved locally in your browser.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Example Screenshot */}
        <div class="px-6 sm:px-8 pb-16">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">What Inspired This Tool</h2>
            
            <div class="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">              
              {/* Screenshot */}
              <div class="flex justify-center">
                <a 
                  href="https://x.com/MocaCDev/status/1935795622239498693"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 max-w-[600px] hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                >
                  <img 
                    src="/x-followers-idea.webp" 
                    alt="X conversation about follow-unfollow strategy being annoying and ineffective"
                    class="w-full h-auto"
                    loading="lazy"
                  />
                </a>
              </div>
              
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-3">
                Since follow-unfollow strategy is "so stupid and ineffective" as{" "}
                <a 
                  href="https://x.com/MocaCDev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  @MocaCDev
                </a>
                {" "}said, let's help people catch those who do it.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div class="px-6 sm:px-8 pb-16">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Technical Details</h2>
            
            <div class="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-4">How We Track Followers</h3>
              
              <ul class="space-y-3 text-gray-600 dark:text-gray-400">
                <li class="flex items-start gap-2">
                  <span class="text-blue-600 dark:text-blue-400">•</span>
                  <span>Usernames are stored in Deno KV database</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-blue-600 dark:text-blue-400">•</span>
                  <span>Daily cron job (Deno Deploy) runs every 24 hours</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-blue-600 dark:text-blue-400">•</span>
                  <span>Compares today's follower list with yesterday's</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-blue-600 dark:text-blue-400">•</span>
                  <span>Stores daily changes (new followers + unfollowers)</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-blue-600 dark:text-blue-400">•</span>
                  <span>Your tracked username is saved in browser localStorage</span>
                </li>
              </ul>

              <div class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p class="text-sm text-yellow-800 dark:text-yellow-300">
                  <strong>Note:</strong> Due to X API limitations, this tool is currently in development. 
                  We're exploring alternative approaches to make follower tracking accessible and free.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div class="px-6 sm:px-8 pb-16">
          <div class="max-w-4xl mx-auto">
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Important Disclaimer</h3>
              <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  • This tool is provided <strong>completely free</strong> with no charges or hidden fees
                </p>
                <p>
                  • <strong>No guarantee</strong> that the service will work continuously or accurately
                </p>
                <p>
                  • Tool may stop working due to X/Twitter API changes or platform restrictions
                </p>
                <p>
                  • Use at your own discretion - this is an experimental project
                </p>
                <p>
                  • No warranties provided - tool is offered "as is"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div class="px-6 sm:px-8 pb-24">
          <div class="max-w-4xl mx-auto text-center">
            <div class="bg-white dark:bg-gray-900 rounded-lg p-12 border border-gray-200 dark:border-gray-700">
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Coming Soon
              </h2>
              
              <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                We're working on the technical implementation to make this tool available. 
                Get notified when it's ready.
              </p>

              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  type="button"
                  class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                >
                  Notify Me When Ready
                </button>
                <a 
                  href="https://x.com/0xhp10" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  Follow for Updates
                </a>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
} 