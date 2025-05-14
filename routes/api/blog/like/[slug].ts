import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(_req, ctx) {
    const { slug } = ctx.params;
    const kv = await Deno.openKv();
    const key = [`blog:likes:${slug}`];
    
    // Get current likes
    const likesRes = await kv.get<number>(key);
    const currentLikes = likesRes.value || 0;
    
    // Increment likes atomically
    const result = await kv.atomic()
      .check(likesRes)
      .set(key, currentLikes + 1)
      .commit();

    if (!result.ok) {
      return new Response(JSON.stringify({ error: "Failed to increment likes" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ likes: currentLikes + 1 }), {
      headers: { "Content-Type": "application/json" },
    });
  },
}; 