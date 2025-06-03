import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(req, ctx) {
    const { username } = ctx.params;
    
    // Only allow specific usernames
    if (username !== "hrvoje" && username !== "sats") {
      return new Response("Not found", { status: 404 });
    }
    
    const url = new URL(req.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    
    const lnurlResponse = {
      status: "OK",
      callback: `${baseUrl}/lightning/callback/${username}`,
      minSendable: 1000, // 1 sat minimum
      maxSendable: 100000000000, // 100M sats maximum
      metadata: JSON.stringify([
        ["text/identifier", `${username}@${url.host}`],
        ["text/plain", `Send sats to ${username}`]
      ]),
      commentAllowed: 255,
      tag: "payRequest"
    };
    
    return new Response(JSON.stringify(lnurlResponse), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  },
}; 