import { type PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Header from "../components/Header.tsx";
import Footer from "../islands/Footer.tsx";

interface IToolListItemProps {
  title: string;
  description: string;
  href: string;
  icon: string;
  comingSoon?: boolean;
  featured?: boolean;
}

function ToolListItem({ title, description, href, icon, comingSoon = false, featured = false }: IToolListItemProps) {
  return (
    <div class={`flex items-center gap-6 p-6 bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.08] rounded-xl shadow-lg ${featured ? "ring-1 ring-orange-500/20 dark:ring-orange-400/20" : ""}`}>
      {/* Icon */}
      <div class="flex-shrink-0">
        <div class="w-12 h-12 rounded-lg bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center text-orange-600 dark:text-orange-400 text-2xl">
          {icon}
        </div>
      </div>
      
      {/* Name and Description */}
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-3 mb-2">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          {featured && (
            <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800/50">
              Featured
            </span>
          )}
          {comingSoon && (
            <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800/30 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700/50">
              Coming Soon
            </span>
          )}
        </div>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
      
      {/* Button */}
      <div class="flex-shrink-0">
        {comingSoon ? (
          <button 
            disabled
            class="px-4 py-2 bg-gray-100 dark:bg-gray-800/50 text-gray-400 dark:text-gray-500 font-medium rounded-lg cursor-not-allowed border border-gray-200 dark:border-gray-700/50"
          >
            Soon
          </button>
        ) : (
          <a 
            href={href}
            class="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg border border-orange-600 hover:border-orange-700"
          >
            Launch
          </a>
        )}
      </div>
    </div>
  );
}

export default function ToolsPage(props: PageProps) {
  const url = new URL(props.url);
  const canonicalUrl = `${url.origin}${url.pathname}`;
  
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Developer Tools by Hrvoje Pavlinovic",
    "description": "Collection of free utilities for developers and creators including X followers tracker, markdown to PDF converter, and QR code generator.",
    "url": canonicalUrl,
    "applicationCategory": "DeveloperApplication",
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
      "sameAs": [
        "https://x.com/0xhp10",
        "https://github.com/hrvojepavlinovic"
      ]
    },
    "featureList": [
      "X (Twitter) Followers Tracker",
      "Markdown to PDF Converter", 
      "QR Code Generator"
    ]
  };

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Developer Tools - Free Utilities for Creators | Hrvoje Pavlinovic</title>
        <meta 
          name="description" 
          content="Free developer tools and utilities for creators. Track X followers, convert markdown to PDF, generate QR codes. Built by Hrvoje Pavlinovic." 
        />
        <meta name="keywords" content="developer tools, X followers tracker, Twitter analytics, markdown to PDF, QR code generator, free utilities, web tools" />
        <meta name="author" content="Hrvoje Pavlinovic" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Developer Tools - Free Utilities for Creators" />
        <meta 
          property="og:description" 
          content="Free developer tools and utilities for creators. Track X followers, convert markdown to PDF, generate QR codes." 
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Hrvoje Pavlinovic" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content={`${url.origin}/static/tools-og.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Developer Tools by Hrvoje Pavlinovic" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@0xhp10" />
        <meta name="twitter:site" content="@0xhp10" />
        <meta name="twitter:title" content="Developer Tools - Free Utilities for Creators" />
        <meta 
          name="twitter:description" 
          content="Free developer tools and utilities for creators. Track X followers, convert markdown to PDF, generate QR codes." 
        />
        <meta name="twitter:image" content={`${url.origin}/static/tools-og.png`} />

        {/* Additional SEO */}
        <meta name="theme-color" content="#ea580c" />
        <meta name="msapplication-TileColor" content="#ea580c" />
        
        {/* Structured Data */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Preload critical resources */}
        <link rel="preload" href="/static/styles.css" as="style" />
      </Head>

      <div class="min-h-screen bg-gradient-to-b from-orange-50/30 via-transparent via-40% to-orange-50/30 dark:from-orange-950/10 dark:via-transparent dark:via-40% dark:to-orange-950/10">
        <Header />
        
        {/* Hero Section */}
        <div class="pt-32 pb-16 px-6 sm:px-8">
          <div class="max-w-4xl mx-auto text-center">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 font-medium mb-8 border border-orange-200 dark:border-orange-800/50">
              <span class="text-lg">🛠️</span>
              <span>Digital Arsenal</span>
            </div>
            
            <h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
              <span class="text-orange-600 dark:text-orange-400">Amplify</span> Your Workflow
            </h1>
            
            <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
              Collection of free utilities for developers and creators
            </p>
          </div>
        </div>

        {/* Tools List */}
        <div class="px-6 sm:px-8 pb-24">
          <div class="max-w-4xl mx-auto">
            <div class="space-y-4">
              
              <ToolListItem
                title="X Followers Tracker"
                description="Monitor your X followers in real-time."
                href="/tools/x-followers"
                icon="𝕏"
                featured
              />
              
              <ToolListItem
                title="Markdown to PDF"
                description="Transform your markdown documents into PDFs."
                href="/tools/markdown-pdf"
                icon="📄"
                comingSoon
              />
              
              <ToolListItem
                title="QR Code Generator"
                description="Generate QR codes for any content."
                href="/tools/qr-generator"
                icon="📱"
                comingSoon
              />
              
            </div>

            {/* Call to Action */}
            <div class="mt-20 text-center">
              <div class="bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-12 shadow-xl">
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  More Tools Coming Soon
                </h2>
                <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                  Got ideas for tools you'd love to see? Hit me up on X. Building the next generation of web utilities, 
                  one commit at a time.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="https://x.com/0xhp10" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl border border-orange-600 hover:border-orange-700 shadow-lg hover:shadow-xl"
                  >
                    <span>𝕏</span>
                    Follow for Updates
                  </a>
                  <a 
                    href="/contact" 
                    class="inline-flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-gray-900 dark:text-white font-medium rounded-xl transition-colors border border-gray-200 dark:border-white/20 shadow-lg hover:shadow-xl"
                  >
                    <span>💬</span>
                    Suggest a Tool
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
} 