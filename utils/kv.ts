import { kv } from "./kv_db.ts";
import blogData from "../data/blog.json" with { type: "json" };

export interface ClickEvent {
  type: "menu" | "link" | "internal" | "external";
  target: string;
  timestamp: number;
}

export async function trackPageView(page: string, _userAgent?: string) {
  // Filter out spam/bot requests
  const spamPatterns = [
    /^\/wp-/,                    // WordPress paths (wp-admin, wp-content, wp-includes, etc.)
    /^\/admin/,                  // Admin paths
    /^\/administrator/,          // Joomla admin
    /^\/phpmyadmin/,            // PHPMyAdmin
    /^\/mysql/,                 // MySQL admin
    /^\/drupal/,                // Drupal paths
    /^\/joomla/,                // Joomla paths
    /^\/magento/,               // Magento paths
    /^\/prestashop/,            // PrestaShop paths
    /^\/opencart/,              // OpenCart paths
    /^\/typo3/,                 // TYPO3 paths
    /\.php$/,                   // PHP files
    /\.asp$/,                   // ASP files
    /\.jsp$/,                   // JSP files
    /\.cgi$/,                   // CGI files
    /\/\.env$/,                 // Environment files
    /\/config\./,               // Config files
    /\/database\./,             // Database files
    /\/backup/,                 // Backup paths
    /\/test/,                   // Test paths
    /\/demo/,                   // Demo paths
    /\/tmp/,                    // Temp paths
    /\/cache/,                  // Cache paths
    /\/logs?/,                  // Log paths
    /\/vendor/,                 // Vendor paths
    /\/node_modules/,           // Node modules
    /\/\.git/,                  // Git paths
    /\/\.svn/,                  // SVN paths
    /^\/sitemap/,               // Sitemap requests (usually bots)
    /^\/robots\.txt$/,          // Robots.txt (legitimate but don't need to track)
    /^\/favicon\.ico$/,         // Favicon (don't track)
    /\.(xml|txt|json|yml|yaml)$/, // Config/data files
  ];

  // Check if the page matches any spam pattern
  const isSpam = spamPatterns.some(pattern => pattern.test(page));
  if (isSpam) {
    return; // Don't track spam requests
  }

  const counterKey = ["page_views", page];
  
  // Atomic increment with retry logic
  let attempts = 0;
  const maxAttempts = 5;
  
  while (attempts < maxAttempts) {
    try {
      const currentCount = await kv.get<number>(counterKey);
      const result = await kv.atomic()
        .check(currentCount)
        .set(counterKey, (currentCount.value || 0) + 1)
        .commit();
        
      if (result.ok) {
        return; // Success
      }
      
      attempts++;
      // Add jitter to prevent thundering herd
      if (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 50 + 10));
      }
    } catch (error) {
      console.error("Error tracking page view:", error);
      attempts++;
      if (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 50));
      }
    }
  }
  
  console.error(`Failed to track page view after ${maxAttempts} attempts`);
}

export async function trackClick(type: "menu" | "link" | "internal" | "external", target: string) {
  const click: ClickEvent = {
    type,
    target,
    timestamp: Date.now(),
  };
  
  // Store individual click events (for analytics)
  const eventKey = ["clicks", click.timestamp, Math.random().toString(36)];
  
  // Also store aggregated counter
  const counterKey = ["click_counts", `${type}:${target}`];
  
  // Atomic operation with retry logic
  let attempts = 0;
  const maxAttempts = 5;
  
  while (attempts < maxAttempts) {
    try {
      const currentCount = await kv.get<number>(counterKey);
      const result = await kv.atomic()
        .check(currentCount)
        .set(eventKey, click)
        .set(counterKey, (currentCount.value || 0) + 1)
        .commit();
        
      if (result.ok) {
        return; // Success
      }
      
      attempts++;
      // Add jitter to prevent thundering herd
      if (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 50 + 10));
      }
    } catch (error) {
      console.error("Error tracking click:", error);
      attempts++;
      if (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 50));
      }
    }
  }
  
  console.error(`Failed to track click after ${maxAttempts} attempts`);
}

export async function getStats() {
  const pageViewCounters: Record<string, number> = {};
  const clickCounters: Record<string, number> = {};

  // Get page view counters
  const pageViewCountersIter = kv.list<number>({ prefix: ["page_views"] });
  for await (const entry of pageViewCountersIter) {
    const page = entry.key[1] as string;
    pageViewCounters[page] = entry.value;
  }

  // Get blog article view counters (format: ["blog:views:slug"])
  for (const article of blogData.articles) {
    const blogKey = [`blog:views:${article.slug}`];
    const blogEntry = await kv.get<number>(blogKey);
    if (blogEntry.value !== null) {
      const blogPath = `/blog/${article.slug}`;
      pageViewCounters[blogPath] = blogEntry.value;
    }
  }

  // Get click counters
  const clickCountersIter = kv.list<number>({ prefix: ["click_counts"] });
  for await (const entry of clickCountersIter) {
    const clickKey = entry.key[1] as string;
    clickCounters[clickKey] = entry.value;
  }

  // Also get recent click events for detailed analytics (last 100)
  const recentClicks: ClickEvent[] = [];
  const clicksIter = kv.list<ClickEvent>({ prefix: ["clicks"] }, { limit: 100, reverse: true });
  for await (const entry of clicksIter) {
    recentClicks.push(entry.value);
  }

  return {
    pageViews: pageViewCounters,
    clicks: clickCounters,
    recentClicks: recentClicks,
  };
} 