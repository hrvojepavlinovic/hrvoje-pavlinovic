import { Handlers } from "$fresh/server.ts";
import { trackClick, trackPageView } from "../../utils/kv.ts";

export const handler: Handlers = {
  async POST(req) {
    const data = await req.json();
    const { type, target, page, userAgent } = data;

    if (type === "click") {
      const clickType = data.clickType || "link"; // fallback for compatibility
      await trackClick(clickType as "menu" | "link" | "internal" | "external", target);
    } else if (type === "pageview") {
      await trackPageView(page, userAgent);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  },
}; 