import { Handlers } from "$fresh/server.ts";
import { migrateStats } from "../../utils/migrate-stats.ts";

export const handler: Handlers = {
  async POST(req) {
    // Check authorization
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response("Unauthorized", { status: 401 });
    }
    
    const token = authHeader.slice(7);
    const expectedToken = Deno.env.get("MIGRATION_TOKEN") || Deno.env.get("KV_ACCESS_TOKEN");
    
    if (!expectedToken || token !== expectedToken) {
      return new Response("Unauthorized", { status: 401 });
    }

    try {
      console.log("Starting migration via API...");
      const result = await migrateStats();
      console.log("Migration completed:", result);
      
      return new Response(JSON.stringify({
        success: true,
        result
      }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Migration failed:", error);
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : String(error)
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
}; 