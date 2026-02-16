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

const SPAM_PATTERNS = [
  /^wp-/,
  /^admin/,
  /^administrator/,
  /^phpmyadmin/,
  /^mysql/,
  /^drupal/,
  /^joomla/,
  /^magento/,
  /^prestashop/,
  /^opencart/,
  /^typo3/,
  /\.php$/,
  /\.asp$/,
  /\.jsp$/,
  /\.cgi$/,
  /\.env$/,
  /config\./,
  /database\./,
  /backup/,
  /test/,
  /demo/,
  /tmp/,
  /cache/,
  /logs?/,
  /vendor/,
  /node_modules/,
  /\.git/,
  /\.svn/,
  /^sitemap/,
  /^robots\.txt$/,
  /^favicon\.ico$/,
  /\.(xml|txt|json|yml|yaml)$/,
];

const BOT_PATTERNS = [
  /\/b\/home\//i,
  /\/www\//i,
  /\bwp-login\b/i,
];

const KNOWN_PAGE_PREFIXES = [
  "about",
  "blog",
  "contact",
  "cv",
  "greet",
  "homepage",
  "projects",
  "webstats",
];

const MUTE_KEYWORDS = ["cover", "branding", "lightning"];

const TYPE_BADGE: Record<string, string> = {
  menu:
    "border-blue-200 bg-blue-100 text-blue-700 dark:border-blue-800/50 dark:bg-blue-900/30 dark:text-blue-200",
  name:
    "border-green-200 bg-green-100 text-green-700 dark:border-green-800/50 dark:bg-green-900/30 dark:text-green-200",
  footer:
    "border-purple-200 bg-purple-100 text-purple-700 dark:border-purple-800/50 dark:bg-purple-900/30 dark:text-purple-200",
  social:
    "border-pink-200 bg-pink-100 text-pink-700 dark:border-pink-800/50 dark:bg-pink-900/30 dark:text-pink-200",
  project:
    "border-indigo-200 bg-indigo-100 text-indigo-700 dark:border-indigo-800/50 dark:bg-indigo-900/30 dark:text-indigo-200",
  link:
    "border-cyan-200 bg-cyan-100 text-cyan-700 dark:border-cyan-800/50 dark:bg-cyan-900/30 dark:text-cyan-200",
  like:
    "border-red-200 bg-red-100 text-red-700 dark:border-red-800/50 dark:bg-red-900/30 dark:text-red-200",
};

const formatTarget = (type: string, target: string) => {
  if (type === "menu") {
    if (
      !target || target === "/" || target === "undefined" ||
      target === "Ndefined"
    ) {
      return "homepage";
    }
    return target.replace(/^\//, "");
  }
  if (type === "name") {
    return "hrvoje.pavlinovic";
  }
  return target;
};

const isSpam = (page: string) => {
  const clean = page.startsWith("/") ? page.slice(1) : page;
  return SPAM_PATTERNS.some((pattern) => pattern.test(clean));
};

const formatPageName = (page: string) => {
  if (!page || page === "/") return "homepage";

  const normalized = page.replace(/^\/+/, "");
  if (!normalized) return "homepage";

  if (BOT_PATTERNS.some((pattern) => pattern.test(normalized))) {
    return "bots sniffing";
  }

  const matchesKnownPrefix = KNOWN_PAGE_PREFIXES.some((prefix) => {
    if (prefix === "homepage") return false;
    if (normalized === prefix) return true;
    return normalized.startsWith(`${prefix}/`);
  });

  if (matchesKnownPrefix) return normalized;

  return "bots sniffing";
};

export default function WebStatsPage() {
  const [loading, setLoading] = useState(true);
  const [pageViews, setPageViews] = useState<SortedStats[]>([]);
  const [blogStats, setBlogStats] = useState<SortedStats[]>([]);
  const [clicks, setClicks] = useState<ClickStats[]>([]);
  const [totalViews, setTotalViews] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [updatedAt, setUpdatedAt] = useState<string>(
    new Date().toLocaleString(),
  );

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats");
        const data: Stats = await response.json();

        const viewsMap = new Map<string, number>();
        Object.entries(data.pageViews).forEach(([page, count]) => {
          if (isSpam(page)) return;
          if (
            MUTE_KEYWORDS.some((keyword) =>
              page === `/${keyword}` || page.startsWith(`/${keyword}/`)
            )
          ) {
            return;
          }
          const formatted = formatPageName(page);
          viewsMap.set(formatted, (viewsMap.get(formatted) || 0) + count);
        });
        const sortedViews = Array.from(viewsMap.entries())
          .map(([page, count]) => ({ page, count }))
          .sort((a, b) => b.count - a.count);

        const blogViews = sortedViews.filter((item) =>
          item.page === "blog" || item.page.startsWith("blog/")
        );

        const clicksMap = new Map<string, { type: string; count: number }>();
        Object.entries(data.clicks).forEach(([key, count]) => {
          const [type, target = "unknown"] = key.split(":");
          const formatted = formatTarget(type, target);
          const mapKey = `${formatted}:${type}`;
          const existing = clicksMap.get(mapKey);
          clicksMap.set(mapKey, {
            type,
            count: (existing?.count || 0) + count,
          });
        });
        const sortedClicks = Array.from(clicksMap.entries())
          .map(([key, value]) => {
            const [target] = key.split(":");
            return { target, type: value.type, count: value.count };
          })
          .sort((a, b) => {
            if (b.count !== a.count) return b.count - a.count;
            const weight = (type: string) => {
              switch (type) {
                case "menu":
                  return 3;
                case "name":
                  return 2;
                case "footer":
                  return 1;
                default:
                  return 0;
              }
            };
            return weight(b.type) - weight(a.type);
          });

        setPageViews(sortedViews);
        setBlogStats(blogViews);
        setClicks(sortedClicks);
        setTotalViews(sortedViews.reduce((sum, item) => sum + item.count, 0));
        setTotalClicks(sortedClicks.reduce((sum, item) => sum + item.count, 0));
        setUpdatedAt(new Date().toLocaleString());
      } catch (error) {
        console.error("Failed to load stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div class="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-100">
        <section class="max-w-4xl mx-auto flex min-h-screen flex-col justify-center px-6 py-24 md:py-32">
          <div class="space-y-6 text-center">
            <div class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700">
              <div class="h-4 w-4 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Loading analytics…
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div class="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-100">
      <section class="max-w-5xl mx-auto px-6 pt-28 pb-24 md:pt-32 md:pb-28 space-y-10">
        <span class="inline-flex text-xs text-gray-500 dark:text-gray-500">
          Last updated: {updatedAt}
        </span>

        <div class="grid gap-6 md:grid-cols-2">
          <div class="rounded-2xl border border-gray-200 bg-white/80 p-6 text-center dark:border-gray-800 dark:bg-black/40">
            <p class="text-3xl font-semibold text-orange-600 dark:text-orange-400">
              {totalViews.toLocaleString()}
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Total page views
            </p>
          </div>
          <div class="rounded-2xl border border-gray-200 bg-white/80 p-6 text-center dark:border-gray-800 dark:bg-black/40">
            <p class="text-3xl font-semibold text-orange-600 dark:text-orange-400">
              {totalClicks.toLocaleString()}
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Total tracked clicks
            </p>
          </div>
        </div>

        <div class="space-y-6">
          <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Top pages
          </h2>
          <div class="space-y-4">
            {pageViews.map((item) => (
              <div
                key={item.page}
                class="flex items-center justify-between rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm dark:border-gray-800 dark:bg-black/40"
              >
                <span class="text-gray-700 dark:text-gray-300">
                  {item.page}
                </span>
                <span class="font-semibold text-orange-600 dark:text-orange-400">
                  {item.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {blogStats.length > 0 && (
          <div class="space-y-6">
            <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Blog performance
            </h2>
            <div class="space-y-4">
              {blogStats.map((item) => (
                <div
                  key={item.page}
                  class="flex items-center justify-between rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm dark:border-gray-800 dark:bg-black/40"
                >
                  <span class="text-gray-700 dark:text-gray-300">
                    {item.page}
                  </span>
                  <span class="font-semibold text-orange-600 dark:text-orange-400">
                    {item.count.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div class="space-y-6">
          <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Interactions
          </h2>
          <div class="space-y-4">
            {clicks.map((item) => (
              <div
                key={`${item.target}-${item.type}`}
                class="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm dark:border-gray-800 dark:bg-black/40"
              >
                <div class="flex items-center gap-3">
                  <span
                    class={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                      TYPE_BADGE[item.type] || TYPE_BADGE.link
                    }`}
                  >
                    {item.type}
                  </span>
                  <span class="text-gray-700 dark:text-gray-300">
                    {item.target}
                  </span>
                </div>
                <span class="font-semibold text-orange-600 dark:text-orange-400">
                  {item.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
