import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const { username } = ctx.params;
    const url = new URL(req.url);
    
    // Only allow specific usernames
    if (username !== "hrvoje" && username !== "sats") {
      return new Response("Not found", { status: 404 });
    }
    
    // Get query parameters
    const amount = url.searchParams.get("amount");
    const comment = url.searchParams.get("comment") || "";
    
    if (!amount) {
      return new Response(JSON.stringify({
        status: "ERROR",
        reason: "Amount parameter is required"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    const amountMsat = parseInt(amount);
    if (isNaN(amountMsat) || amountMsat < 1000 || amountMsat > 100000000000) {
      return new Response(JSON.stringify({
        status: "ERROR",
        reason: "Invalid amount"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    try {
      // First, resolve the Lightning address to get the callback URL
      const lightningAddress = "0xhp10@getalby.com";
      const [localPart, domain] = lightningAddress.split("@");
      
      // Query the Lightning address well-known endpoint
      const wellKnownUrl = `https://${domain}/.well-known/lnurlp/${localPart}`;
      const wellKnownResponse = await fetch(wellKnownUrl);
      
      if (!wellKnownResponse.ok) {
        throw new Error("Failed to resolve Lightning address");
      }
      
      const lnurlData = await wellKnownResponse.json();
      
      if (!lnurlData.callback) {
        throw new Error("No callback URL found in Lightning address response");
      }
      
      // Now proxy the request to the actual callback
      const callbackUrl = new URL(lnurlData.callback);
      callbackUrl.searchParams.set("amount", amount);
      if (comment) {
        callbackUrl.searchParams.set("comment", comment);
      }
      
      const callbackResponse = await fetch(callbackUrl.toString());
      
      if (!callbackResponse.ok) {
        throw new Error("Callback request failed");
      }
      
      const invoiceData = await callbackResponse.json();
      
      return new Response(JSON.stringify(invoiceData), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
      
    } catch (error) {
      console.error("Lightning callback error:", error);
      
      return new Response(JSON.stringify({
        status: "ERROR",
        reason: "Failed to process Lightning payment request"
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }
  },
}; 