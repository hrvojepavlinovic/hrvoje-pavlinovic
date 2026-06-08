import { Handlers } from "$fresh/server.ts";
import { incrementValue } from "../../../../utils/store.ts";

export const handler: Handlers = {
  async POST(_req, ctx) {
    const { slug } = ctx.params;
    const key = [`blog:likes:${slug}`];
    try {
      const likes = await incrementValue(key);
      return new Response(JSON.stringify({ likes }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (_error) {
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
