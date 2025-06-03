import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(_req) {
    const nostrData = {
      "names": {
        "sats": "c3a1041941f1ff1b367c64491b1dd29f3e92f4c95c9d2a1a96c72ed8fcab0e742f",
        "hrvoje": "c3a1041941f1ff1b367c64491b1dd29f3e92f4c95c9d2a1a96c72ed8fcab0e742f"
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