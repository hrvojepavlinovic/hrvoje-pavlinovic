export async function trackEvent(data: {
  type: "click" | "pageview";
  clickType?: "menu" | "link" | "like";
  target?: string;
  page?: string;
  userAgent?: string;
}) {
  if (typeof globalThis === "undefined" || !globalThis.navigator) return;
  
  const payload = JSON.stringify(data);
  
  // Try sendBeacon first (more reliable)
  if (globalThis.navigator.sendBeacon) {
    const blob = new Blob([payload], { type: 'application/json' });
    if (globalThis.navigator.sendBeacon('/api/track', blob)) {
      return; // Success
    }
  }
  
  // Fallback to fetch with retry logic
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await fetch("/api/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
        keepalive: true
      });
      return; // Success
    } catch (error) {
      if (attempt === 2) {
        console.error("Failed to track event after 3 attempts:", error);
      } else {
        // Wait before retry with jitter
        await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 50));
      }
    }
  }
} 