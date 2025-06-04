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

  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch("/api/stats");
      const data: Stats = await response.json();

      // Process page views
      const pageViewsMap = new Map<string, number>();
      Object.entries(data.pageViews).forEach(([page, count]) => {
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
      <div class="dark:bg-black bg-white text-black dark:text-white w-full min-h-screen pt-32 pb-16">
        <div class="max-w-screen-xl mx-auto px-4">
          <div class="flex items-center justify-center">
            <span class="text-sm dark:text-white/40 text-black/40">Loading stats...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div class="dark:bg-black bg-white text-black dark:text-white w-full min-h-screen pt-32 pb-16">
      <div class="max-w-screen-xl mx-auto px-4">
        <div class="flex items-center justify-between mb-12">
          <h1 class="text-3xl font-semibold">Page Statistics</h1>
          <span class="text-sm dark:text-white/40 text-black/40">
            Last updated: {new Date().toLocaleString()}
          </span>
        </div>

        {/* Page Views */}
        <div class="mb-12">
          <h2 class="text-xl font-medium tracking-tight mb-6 flex items-center">
            <span class="w-1.5 h-1.5 bg-btc-orange rounded-full mr-2"></span>
            <span>Page Views</span>
            <div class="flex items-center gap-2 ml-3">
              <span class="text-sm text-btc-orange font-mono">{totalViews}</span>
              <span class="text-xs dark:text-white/40 text-black/40">total</span>
            </div>
          </h2>
          <div class="space-y-3">
            {sortedPageViews.map(({ page, count }, index) => (
              <div class="dark:bg-white/5 bg-black/5 p-4 rounded-lg">
                <div class="flex justify-between items-center">
                  <div class="flex items-center">
                    <span class="text-sm text-btc-orange font-mono mr-3">{(index + 1).toString().padStart(2, '0')}</span>
                    <span class="text-sm">{page}</span>
                  </div>
                  <div class="flex items-center">
                    <span class="text-sm text-btc-orange font-mono">{count}</span>
                    <span class="text-xs dark:text-white/40 text-black/40 ml-2">views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Click Events */}
        <div>
          <h2 class="text-xl font-medium tracking-tight mb-6 flex items-center">
            <span class="w-1.5 h-1.5 bg-btc-orange rounded-full mr-2"></span>
            <span>Click Events</span>
            <div class="flex items-center gap-2 ml-3">
              <span class="text-sm text-btc-orange font-mono">{totalClicks}</span>
              <span class="text-xs dark:text-white/40 text-black/40">total</span>
            </div>
          </h2>
          <div class="space-y-3">
            {sortedClicks.map(({ target, type, count }, index) => (
              <div class="dark:bg-white/5 bg-black/5 p-4 rounded-lg">
                <div class="flex justify-between items-center">
                  <div class="flex items-center">
                    <span class="text-sm text-btc-orange font-mono mr-3">{(index + 1).toString().padStart(2, '0')}</span>
                    <span class="text-sm">{target}</span>
                    <span class="text-xs dark:text-white/40 text-black/40 ml-2 px-2 py-0.5 rounded-full dark:bg-white/10 bg-black/10">
                      {type}
                    </span>
                  </div>
                  <div class="flex items-center">
                    <span class="text-sm text-btc-orange font-mono">{count}</span>
                    <span class="text-xs dark:text-white/40 text-black/40 ml-2">clicks</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 