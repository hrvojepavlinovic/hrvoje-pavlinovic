import {
  getRecentClicks,
  getValue,
  incrementValue,
  listPrefix,
  recordRecentClick,
} from "./store.ts";
import blogData from "../data/blog.json" with { type: "json" };

export interface ClickEvent {
  type: "menu" | "link" | "internal" | "external";
  target: string;
  timestamp: number;
}

export async function trackPageView(page: string, _userAgent?: string) {
  // Filter out spam/bot requests
  const spamPatterns = [
    /^\/wp-/, // WordPress paths (wp-admin, wp-content, wp-includes, etc.)
    /^\/admin/, // Admin paths
    /^\/administrator/, // Joomla admin
    /^\/phpmyadmin/, // PHPMyAdmin
    /^\/mysql/, // MySQL admin
    /^\/drupal/, // Drupal paths
    /^\/joomla/, // Joomla paths
    /^\/magento/, // Magento paths
    /^\/prestashop/, // PrestaShop paths
    /^\/opencart/, // OpenCart paths
    /^\/typo3/, // TYPO3 paths
    /\.php$/, // PHP files
    /\.asp$/, // ASP files
    /\.jsp$/, // JSP files
    /\.cgi$/, // CGI files
    /\/\.env$/, // Environment files
    /\/config\./, // Config files
    /\/database\./, // Database files
    /\/backup/, // Backup paths
    /\/test/, // Test paths
    /\/demo/, // Demo paths
    /\/tmp/, // Temp paths
    /\/cache/, // Cache paths
    /\/logs?/, // Log paths
    /\/vendor/, // Vendor paths
    /\/node_modules/, // Node modules
    /\/\.git/, // Git paths
    /\/\.svn/, // SVN paths
    /^\/sitemap/, // Sitemap requests (usually bots)
    /^\/robots\.txt$/, // Robots.txt (legitimate but don't need to track)
    /^\/favicon\.ico$/, // Favicon (don't track)
    /\.(xml|txt|json|yml|yaml)$/, // Config/data files
  ];

  // Check if the page matches any spam pattern
  const isSpam = spamPatterns.some((pattern) => pattern.test(page));
  if (isSpam) {
    return; // Don't track spam requests
  }

  const counterKey = ["page_views", page];

  try {
    await incrementValue(counterKey);
  } catch (error) {
    console.error("Error tracking page view:", error);
  }
}

export async function trackClick(
  type: "menu" | "link" | "internal" | "external",
  target: string,
) {
  const click: ClickEvent = {
    type,
    target,
    timestamp: Date.now(),
  };

  const counterKey = ["click_counts", `${type}:${target}`];

  try {
    await Promise.all([
      incrementValue(counterKey),
      recordRecentClick(click),
    ]);
  } catch (error) {
    console.error("Error tracking click:", error);
  }
}

export async function getStats() {
  const pageViewCounters: Record<string, number> = {};
  const clickCounters: Record<string, number> = {};

  // Get page view counters
  const pageViewCountersIter = await listPrefix<number>(["page_views"]);
  for (const entry of pageViewCountersIter) {
    const page = entry.key[1] as string;
    pageViewCounters[page] = entry.value;
  }

  // Get blog article view counters (format: ["blog:views:slug"])
  for (const article of blogData.articles) {
    const blogKey = [`blog:views:${article.slug}`];
    const blogEntry = await getValue<number>(blogKey);
    if (blogEntry !== null) {
      const blogPath = `/blog/${article.slug}`;
      pageViewCounters[blogPath] = blogEntry;
    }
  }

  // Get click counters
  const clickCountersIter = await listPrefix<number>(["click_counts"]);
  for (const entry of clickCountersIter) {
    const clickKey = entry.key[1] as string;
    clickCounters[clickKey] = entry.value;
  }

  // Also get recent click events for detailed analytics (last 100)
  const recentClicks = await getRecentClicks(100);

  return {
    pageViews: pageViewCounters,
    clicks: clickCounters,
    recentClicks: recentClicks,
  };
}
