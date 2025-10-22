import { HandlerContext } from "$fresh/server.ts";

const kv = await Deno.openKv();

export const handler = {
  async GET(req: Request, _ctx: HandlerContext) {
    try {
      const url = new URL(req.url);
      const projectId = url.searchParams.get("project");

      if (!projectId) {
        return new Response(JSON.stringify({ error: "Project ID required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const result = await kv.get([projectId]);
      // Convert BigInt to number for JSON serialization
      const likes = result.value ? Number(result.value) : 0;

      return new Response(JSON.stringify({ likes }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error fetching likes:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch likes" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },

  async POST(req: Request, _ctx: HandlerContext) {
    try {
      const { projectId } = await req.json();

      if (!projectId) {
        return new Response(JSON.stringify({ error: "Project ID required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Increment the likes count atomically
      const result = await kv.atomic()
        .sum([projectId], 1n)
        .commit();

      if (!result.ok) {
        throw new Error("Failed to increment likes");
      }

      // Get the updated count and convert BigInt to number
      const updatedResult = await kv.get([projectId]);
      const likes = updatedResult.value ? Number(updatedResult.value) : 1;

      return new Response(JSON.stringify({ likes }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error incrementing likes:", error);
      return new Response(
        JSON.stringify({ error: "Failed to increment likes" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },
};
