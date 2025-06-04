import { kv } from "./kv_db.ts";

export interface PageView {
  page: string;
  timestamp: number;
  userAgent?: string;
}

export interface ClickEvent {
  type: "menu" | "link";
  target: string;
  timestamp: number;
}

export async function trackPageView(page: string, userAgent?: string) {
  // Store individual event for detailed analytics
  const view: PageView = {
    page,
    timestamp: Date.now(),
    userAgent,
  };
  
  const eventKey = ["page_views", view.timestamp, Math.random().toString(36)];
  const counterKey = ["counters", "page_views", page];
  
  // Atomic operation: store event and increment counter
  const currentCount = await kv.get<number>(counterKey);
  const result = await kv.atomic()
    .check(currentCount)
    .set(eventKey, view)
    .set(counterKey, (currentCount.value || 0) + 1)
    .commit();
    
  if (!result.ok) {
    // Fallback: try again with fresh count
    const freshCount = await kv.get<number>(counterKey);
    await kv.atomic()
      .check(freshCount)
      .set(eventKey, view)
      .set(counterKey, (freshCount.value || 0) + 1)
      .commit();
  }
}

export async function trackClick(type: "menu" | "link", target: string) {
  const click: ClickEvent = {
    type,
    target,
    timestamp: Date.now(),
  };
  
  const eventKey = ["clicks", click.timestamp, Math.random().toString(36)];
  const counterKey = ["counters", "clicks", `${type}:${target}`];
  
  // Atomic operation: store event and increment counter
  const currentCount = await kv.get<number>(counterKey);
  const result = await kv.atomic()
    .check(currentCount)
    .set(eventKey, click)
    .set(counterKey, (currentCount.value || 0) + 1)
    .commit();
    
  if (!result.ok) {
    // Fallback: try again with fresh count
    const freshCount = await kv.get<number>(counterKey);
    await kv.atomic()
      .check(freshCount)
      .set(eventKey, click)
      .set(counterKey, (freshCount.value || 0) + 1)
      .commit();
  }
}

export async function getStats() {
  // Get counters (fast)
  const pageViewCounters: Record<string, number> = {};
  const clickCounters: Record<string, number> = {};

  // Get page view counters
  const pageViewCountersIter = kv.list<number>({ prefix: ["counters", "page_views"] });
  for await (const entry of pageViewCountersIter) {
    const page = entry.key[2] as string;
    pageViewCounters[page] = entry.value;
  }

  // Get click counters
  const clickCountersIter = kv.list<number>({ prefix: ["counters", "clicks"] });
  for await (const entry of clickCountersIter) {
    const clickKey = entry.key[2] as string;
    clickCounters[clickKey] = entry.value;
  }

  // Also get raw events for detailed analytics (limited to recent events)
  const pageViews: PageView[] = [];
  const clicks: ClickEvent[] = [];

  // Get recent page views (last 1000 for performance)
  const pageViewsIter = kv.list<PageView>({ prefix: ["page_views"] }, { limit: 1000, reverse: true });
  for await (const entry of pageViewsIter) {
    pageViews.push(entry.value);
  }

  // Get recent clicks (last 1000 for performance)
  const clicksIter = kv.list<ClickEvent>({ prefix: ["clicks"] }, { limit: 1000, reverse: true });
  for await (const entry of clicksIter) {
    clicks.push(entry.value);
  }

  return {
    pageViews: pageViewCounters,
    clicks: clickCounters,
    rawPageViews: pageViews,
    rawClicks: clicks,
  };
} 