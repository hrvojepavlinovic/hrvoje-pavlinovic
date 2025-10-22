import { getStats } from "./kv.ts";

async function checkStats() {
  try {
    console.log("Checking current stats...");
    const stats = await getStats();

    console.log("\n📊 Page View Counters:");
    const pageViews = Object.entries(stats.pageViews);
    if (pageViews.length === 0) {
      console.log("  No page view counters found");
    } else {
      pageViews.forEach(([page, count]) => {
        console.log(`  ${page}: ${count}`);
      });
    }

    console.log("\n🖱️  Click Counters:");
    const clicks = Object.entries(stats.clicks);
    if (clicks.length === 0) {
      console.log("  No click counters found");
    } else {
      clicks.forEach(([clickKey, count]) => {
        console.log(`  ${clickKey}: ${count}`);
      });
    }

    console.log("\n📈 Summary:");
    console.log(`  Total page types tracked: ${pageViews.length}`);
    console.log(`  Total click types tracked: ${clicks.length}`);
    console.log(`  Recent click events stored: ${stats.recentClicks.length}`);

    const totalPageViews = Object.values(stats.pageViews).reduce(
      (a, b) => a + b,
      0,
    );
    const totalClicks = Object.values(stats.clicks).reduce((a, b) => a + b, 0);
    console.log(`  Total page views: ${totalPageViews}`);
    console.log(`  Total clicks: ${totalClicks}`);
  } catch (error) {
    console.error("Error checking stats:", error);
  }
}

if (import.meta.main) {
  checkStats().then(() => {
    console.log("\n✅ Stats check complete");
    Deno.exit(0);
  });
}
