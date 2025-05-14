export async function trackEvent(data: {
  type: "click" | "pageview";
  clickType?: "menu" | "link";
  target?: string;
  page?: string;
  userAgent?: string;
}) {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Failed to track event:", error);
  }
} 