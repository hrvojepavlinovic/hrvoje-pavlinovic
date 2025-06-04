import { kv } from "./kv_db.ts";

interface PageView {
  page: string;
  timestamp: number;
  userAgent?: string;
}

interface ClickEvent {
  type: "menu" | "link";
  target: string;
  timestamp: number;
}

export async function migrateStats() {
  console.log("Starting stats migration...");
  
  // Get all existing page views
  const pageViews: PageView[] = [];
  const pageViewsIter = kv.list<PageView>({ prefix: ["page_views"] });
  for await (const entry of pageViewsIter) {
    pageViews.push(entry.value);
  }
  
  // Get all existing clicks
  const clicks: ClickEvent[] = [];
  const clicksIter = kv.list<ClickEvent>({ prefix: ["clicks"] });
  for await (const entry of clicksIter) {
    clicks.push(entry.value);
  }
  
  console.log(`Found ${pageViews.length} page views and ${clicks.length} clicks`);
  
  // Count page views
  const pageViewCounts: Record<string, number> = {};
  pageViews.forEach(view => {
    pageViewCounts[view.page] = (pageViewCounts[view.page] || 0) + 1;
  });
  
  // Count clicks
  const clickCounts: Record<string, number> = {};
  clicks.forEach(click => {
    const key = `${click.type}:${click.target}`;
    clickCounts[key] = (clickCounts[key] || 0) + 1;
  });
  
  // Set counters
  const operations = [];
  
  // Set page view counters
  for (const [page, count] of Object.entries(pageViewCounts)) {
    const counterKey = ["counters", "page_views", page];
    operations.push(kv.set(counterKey, count));
  }
  
  // Set click counters  
  for (const [clickKey, count] of Object.entries(clickCounts)) {
    const counterKey = ["counters", "clicks", clickKey];
    operations.push(kv.set(counterKey, count));
  }
  
  // Execute all operations
  await Promise.all(operations);
  
  console.log(`Migration complete! Set ${Object.keys(pageViewCounts).length} page view counters and ${Object.keys(clickCounts).length} click counters`);
  
  return {
    pageViewCounters: Object.keys(pageViewCounts).length,
    clickCounters: Object.keys(clickCounts).length,
    totalPageViews: Object.values(pageViewCounts).reduce((a, b) => a + b, 0),
    totalClicks: Object.values(clickCounts).reduce((a, b) => a + b, 0)
  };
}

// Run migration if this file is executed directly
if (import.meta.main) {
  console.log("Running stats migration...");
  migrateStats().then(result => {
    console.log("Migration result:", result);
  }).catch(error => {
    console.error("Migration failed:", error);
  });
} 