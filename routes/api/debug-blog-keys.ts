import { Handlers } from "$fresh/server.ts";
import { kv } from "../../utils/kv_db.ts";

export const handler: Handlers = {
  async GET() {
    try {
      console.log("Debugging blog keys...");
      
      // Check what keys exist with different prefixes
      const results = {
        blogViewsKeys: [] as Array<{ key: unknown; value: unknown }>,
        allBlogKeys: [] as Array<{ key: unknown; value: unknown }>,
      };
      
      // Try the current approach
      const blogViewsIter = kv.list({ prefix: ["blog:views:"] });
      for await (const entry of blogViewsIter) {
        results.blogViewsKeys.push({
          key: entry.key,
          value: entry.value
        });
      }
      
      // Try a broader search
      const allBlogIter = kv.list({ prefix: ["blog"] });
      for await (const entry of allBlogIter) {
        results.allBlogKeys.push({
          key: entry.key,
          value: entry.value
        });
      }
      
      console.log("Blog keys found:", results);
      
      return new Response(JSON.stringify(results, null, 2), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error debugging blog keys:", error);
      return new Response(JSON.stringify({ error: (error as Error).message || String(error) }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
}; 