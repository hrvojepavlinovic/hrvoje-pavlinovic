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
  const view: PageView = {
    page,
    timestamp: Date.now(),
    userAgent,
  };
  
  const key = ["page_views", view.timestamp];
  await kv.set(key, view);
}

export async function trackClick(type: "menu" | "link", target: string) {
  const click: ClickEvent = {
    type,
    target,
    timestamp: Date.now(),
  };
  
  const key = ["clicks", click.timestamp];
  await kv.set(key, click);
}

export async function getStats() {
  const pageViews: PageView[] = [];
  const clicks: ClickEvent[] = [];

  // Get page views
  const pageViewsIter = kv.list<PageView>({ prefix: ["page_views"] });
  for await (const entry of pageViewsIter) {
    pageViews.push(entry.value);
  }

  // Get clicks
  const clicksIter = kv.list<ClickEvent>({ prefix: ["clicks"] });
  for await (const entry of clicksIter) {
    clicks.push(entry.value);
  }

  // Group page views by page
  const pageViewStats = pageViews.reduce((acc, view) => {
    acc[view.page] = (acc[view.page] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Group clicks by type and target
  const clickStats = clicks.reduce((acc, click) => {
    const key = `${click.type}:${click.target}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    pageViews: pageViewStats,
    clicks: clickStats,
    rawPageViews: pageViews,
    rawClicks: clicks,
  };
} 