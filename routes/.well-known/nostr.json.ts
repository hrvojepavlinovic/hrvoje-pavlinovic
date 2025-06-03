import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(_req) {
    const nostrData = {
      "names": {
        "sats": "77108163c1d6da73448410b7218e8f4a7dc9877bed92a2a2c81835e34e043266",
        "hrvoje": "77108163c1d6da73448410b7218e8f4a7dc9877bed92a2a2c81835e34e043266"
      }
    };

    return new Response(JSON.stringify(nostrData), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
        "Cache-Control": "public, max-age=3600"
      },
    });
  },
}; 