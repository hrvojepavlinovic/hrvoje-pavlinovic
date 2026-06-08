import { HandlerContext } from "$fresh/server.ts";
import { getValue, incrementValue } from "../../utils/store.ts";

function toCount(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "bigint") return Number(value);
  if (
    value && typeof value === "object" && "value" in value &&
    typeof value.value === "number"
  ) {
    return value.value;
  }
  return 0;
}

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

      const result = await getValue([projectId]);
      const likes = toCount(result);

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

      const likes = await incrementValue([projectId]);

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
