export async function trackClick(type: string, target: string) {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        target,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error("Failed to track click:", error);
  }
} 