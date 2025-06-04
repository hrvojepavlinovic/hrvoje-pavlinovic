import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { trackPageView } from "../utils/kv.ts";

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext,
) {
  // Track page view server-side for all GET requests
  if (req.method === "GET") {
    const url = new URL(req.url);
    const userAgent = req.headers.get("user-agent") || undefined;
    
    // Don't track API calls, static assets, specific paths, or blog posts (they have their own tracking)
    if (!url.pathname.startsWith("/api/") && 
        !url.pathname.startsWith("/static/") &&
        !url.pathname.includes(".") && // Skip files like .css, .js, .ico
        !url.pathname.startsWith("/_fresh/") &&
        !url.pathname.startsWith("/blog/")) { // Exclude blog posts - they have their own tracking
      
      // Track asynchronously to not block the response
      trackPageView(url.pathname, userAgent).catch(error => {
        console.error("Failed to track page view:", error);
      });
    }
  }

  return await ctx.next();
} 