import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET() {
    const nostrKey = "npub1wuggzc7p6md8x3yyzzmjrr50ff7unpmmakf29gkgrq67xnsyxfnq3s03c0"
    const nostrKeys = {
      "hrvoje": nostrKey,
      "sats": nostrKey
    };
    
    const response = {
      names: nostrKeys
    };
    
    return new Response(JSON.stringify(response), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  },
}; 