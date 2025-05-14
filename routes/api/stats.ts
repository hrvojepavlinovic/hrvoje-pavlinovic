import { HandlerContext } from "$fresh/server.ts";
import { getStats } from "$utils/kv.ts";

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const stats = await getStats();
  return new Response(JSON.stringify(stats), {
    headers: { "Content-Type": "application/json" },
  });
}; 