import { useEffect, useState } from "preact/hooks";

interface SortedStats {
  page: string;
  count: number;
}

interface ClickStats {
  target: string;
  type: string;
  count: number;
}

interface Stats {
  pageViews: Record<string, number>;
  clicks: Record<string, number>;
}

export default function WebStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [sortedPageViews, setSortedPageViews] = useState<SortedStats[]>([]);
  const [sortedClicks, setSortedClicks] = useState<ClickStats[]>([]);
  const [totalViews, setTotalViews] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);

  // Function to get type label styling
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'menu':
        return 'text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50';
      case 'name':
        return 'text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50';
      case 'footer':
        return 'text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800/50';
      case 'social':
        return 'text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/30 border border-pink-200 dark:border-pink-800/50';
      case 'project':
        return 'text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800/50';
      case 'link':
        return 'text-cyan-700 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800/50';
      case 'like':
        return 'text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50';
      default:
        return 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700/50';
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch("/api/stats");
      const data: Stats = await response.json();

      // Filter out spam/bot requests
      const spamPatterns = [
        /^wp-/,                     // WordPress paths (wp-admin, wp-content, wp-includes, etc.)
        /^admin/,                   // Admin paths
        /^administrator/,           // Joomla admin
        /^phpmyadmin/,             // PHPMyAdmin
        /^mysql/,                  // MySQL admin
        /^drupal/,                 // Drupal paths
        /^joomla/,                 // Joomla paths
        /^magento/,                // Magento paths
        /^prestashop/,             // PrestaShop paths
        /^opencart/,               // OpenCart paths
        /^typo3/,                  // TYPO3 paths
        /\.php$/,                  // PHP files
        /\.asp$/,                  // ASP files
        /\.jsp$/,                  // JSP files
        /\.cgi$/,                  // CGI files
        /\/\.env$/,                // Environment files
        /\/config\./,              // Config files
        /\/database\./,            // Database files
        /\/backup/,                // Backup paths
        /\/test/,                  // Test paths
        /\/demo/,                  // Demo paths
        /\/tmp/,                   // Temp paths
        /\/cache/,                 // Cache paths
        /\/logs?/,                 // Log paths
        /\/vendor/,                // Vendor paths
        /\/node_modules/,          // Node modules
        /\/\.git/,                 // Git paths
        /\/\.svn/,                 // SVN paths
        /^sitemap/,                // Sitemap requests (usually bots)
        /^robots\.txt$/,           // Robots.txt
        /^favicon\.ico$/,          // Favicon
        /\.(xml|txt|json|yml|yaml)$/, // Config/data files
      ];

      const isSpam = (page: string) => {
        const cleanPage = page.startsWith("/") ? page.slice(1) : page;
        return spamPatterns.some(pattern => pattern.test(cleanPage));
      };

      // Process page views and filter out spam
      const pageViewsMap = new Map<string, number>();
      Object.entries(data.pageViews).forEach(([page, count]) => {
        if (isSpam(page)) return; // Skip spam pages
        
        const formattedPage = page === "/" || !page || page === "undefined" || page === "Ndefined" ? "homepage" : 
          page.startsWith("/") ? page.slice(1) : page;
        pageViewsMap.set(formattedPage, (pageViewsMap.get(formattedPage) || 0) + (count as number));
      });
      
      const processedPageViews = Array.from(pageViewsMap.entries())
        .map(([page, count]) => ({ page, count }))
        .sort((a, b) => b.count - a.count);

      // Process clicks
      const clicksMap = new Map<string, { type: string; count: number }>();
      Object.entries(data.clicks).forEach(([key, count]) => {
        const [type, target] = key.split(":");
        const formattedTarget = type === "menu" ? 
          (target === "/" || target === "undefined" || target === "Ndefined" ? "homepage" : target) :
          type === "name" ? "hrvoje.pavlinovic" :
          target;
        const mapKey = `${formattedTarget}:${type}`;
        const existing = clicksMap.get(mapKey);
        clicksMap.set(mapKey, { 
          type, 
          count: (existing?.count || 0) + (count as number) 
        });
      });

      const processedClicks = Array.from(clicksMap.entries())
        .map(([key, value]) => {
          const [target] = key.split(":");
          return { target, type: value.type, count: value.count };
        })
        .sort((a, b) => {
          if (b.count !== a.count) return b.count - a.count;
          const getWeight = (type: string) => {
            switch (type) {
              case "menu": return 3;
              case "name": return 2;
              case "footer": return 1;
              default: return 0;
            }
          };
          return getWeight(b.type) - getWeight(a.type);
        });

      setStats(data);
      setSortedPageViews(processedPageViews);
      setSortedClicks(processedClicks);
      setTotalViews(processedPageViews.reduce((sum, { count }) => sum + count, 0));
      setTotalClicks(processedClicks.reduce((sum, { count }) => sum + count, 0));
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div class="min-h-screen bg-gradient-to-b from-orange-50/30 via-transparent via-40% to-orange-50/30 dark:from-orange-950/10 dark:via-transparent dark:via-40% dark:to-orange-950/10">
        <div class="pt-32 pb-20 px-6 sm:px-8">
          <div class="max-w-6xl mx-auto">
            <div class="bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-16 shadow-xl text-center">
              <div class="inline-flex items-center gap-3">
                <div class="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <span class="text-gray-600 dark:text-gray-400">Loading analytics...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div class="min-h-screen bg-gradient-to-b from-orange-50/30 via-transparent via-40% to-orange-50/30 dark:from-orange-950/10 dark:via-transparent dark:via-40% dark:to-orange-950/10">
      {/* Hero Section */}
      <div class="pt-32 pb-20 px-6 sm:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center space-y-8">
            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-b from-gray-900 via-gray-900 to-gray-600 dark:from-white dark:via-white dark:to-gray-400 bg-clip-text text-transparent">
              Analytics
            </h1>
            <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
              Real-time insights into website traffic and user interactions
            </p>
            <div class="flex justify-center">
              <span class="text-sm text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
                Last updated: {new Date().toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div class="px-6 sm:px-8 pb-24">
        <div class="max-w-6xl mx-auto space-y-16">
          
          {/* Summary Stats */}
          <div class="bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-8 shadow-xl">
            <div class="grid grid-cols-2 gap-6">
              <div class="text-center">
                <div class="text-4xl lg:text-5xl font-bold text-orange-600 dark:text-orange-400 mb-2">{totalViews.toLocaleString()}</div>
                <div class="text-gray-600 dark:text-gray-400 font-medium">Total Page Views</div>
              </div>
              <div class="text-center">
                <div class="text-4xl lg:text-5xl font-bold text-orange-600 dark:text-orange-400 mb-2">{totalClicks.toLocaleString()}</div>
                <div class="text-gray-600 dark:text-gray-400 font-medium">Total Click Events</div>
              </div>
            </div>
          </div>

          {/* Page Views */}
          <div class="bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-8 shadow-xl">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Page Views
              </h2>
              <div class="ml-auto flex items-center gap-2">
                <span class="text-lg font-bold text-orange-600 dark:text-orange-400 font-mono">{totalViews}</span>
                <span class="text-sm text-gray-500 dark:text-gray-500">total</span>
              </div>
            </div>
            <div class="space-y-4">
              {sortedPageViews.map(({ page, count }, index) => (
                <div key={`${page}-${index}`} class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-200 dark:hover:border-orange-800/50 transition-all duration-300">
                  <div class="flex justify-between items-center">
                    <div class="flex items-center gap-4">
                      <span class="text-sm font-bold text-orange-600 dark:text-orange-400 font-mono bg-orange-50 dark:bg-orange-950/30 px-2 py-1 rounded-lg min-w-[2.5rem] text-center">
                        #{(index + 1).toString().padStart(2, '0')}
                      </span>
                      <span class="font-medium text-gray-900 dark:text-white">{page}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-lg font-bold text-orange-600 dark:text-orange-400 font-mono">{count}</span>
                      <span class="text-sm text-gray-500 dark:text-gray-500">views</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Click Events */}
          <div class="bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-8 shadow-xl">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Click Events
              </h2>
              <div class="ml-auto flex items-center gap-2">
                <span class="text-lg font-bold text-orange-600 dark:text-orange-400 font-mono">{totalClicks}</span>
                <span class="text-sm text-gray-500 dark:text-gray-500">total</span>
              </div>
            </div>
            <div class="space-y-4">
              {sortedClicks.map(({ target, type, count }, index) => (
                <div key={`${target}-${type}-${index}`} class="bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-200 dark:hover:border-orange-800/50 transition-all duration-300">
                  <div class="flex justify-between items-center">
                    <div class="flex items-center gap-4">
                      <span class="text-sm font-bold text-orange-600 dark:text-orange-400 font-mono bg-orange-50 dark:bg-orange-950/30 px-2 py-1 rounded-lg min-w-[2.5rem] text-center">
                        #{(index + 1).toString().padStart(2, '0')}
                      </span>
                      <div class="flex items-center gap-3">
                        <span class="font-medium text-gray-900 dark:text-white">{target}</span>
                        <span class={`text-xs font-medium px-2 py-1 rounded-full ${getTypeStyles(type)}`}>
                          {type}
                        </span>
                      </div>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-lg font-bold text-orange-600 dark:text-orange-400 font-mono">{count}</span>
                      <span class="text-sm text-gray-500 dark:text-gray-500">clicks</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 