/// <reference lib="deno.unstable" />
import { Handlers } from "$fresh/server.ts";

// Only try to open KV if we have the required token
const kv = Deno.env.get("KV_ACCESS_TOKEN") ? await Deno.openKv() : null;

// Check if we're running on Deno Deploy
const isDenoDeployment = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;

export const handler: Handlers = {
  async POST(req) {
    // Only allow updates if we have KV access
    if (!kv) {
      return new Response("KV store not available", { status: 503 });
    }

    // Verify authorization token
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response("Unauthorized", { status: 401 });
    }
    const token = authHeader.slice(7); // Remove "Bearer " prefix
    if (token !== Deno.env.get("KV_ACCESS_TOKEN")) {
      return new Response("Unauthorized", { status: 401 });
    }

    try {
      const { hash, timestamp } = await req.json();
      if (!hash || !timestamp) {
        return new Response("Hash and timestamp are required", { status: 400 });
      }
      
      // Store the commit info in KV
      await kv.set(["commit_hash"], { hash, timestamp });
      
      return new Response(JSON.stringify({ hash, timestamp }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Failed to update commit info:", error);
      return new Response("Invalid request", { status: 400 });
    }
  },

  async GET(_req) {
    try {
      // If we have KV access, try to get from there first
      if (kv) {
        const result = await kv.get(["commit_hash"]);
        if (result.value) {
          return new Response(JSON.stringify(result.value), {
            headers: { "Content-Type": "application/json" },
          });
        }
      }

      // If we're on Deno Deploy and don't have KV data, return a fallback
      if (isDenoDeployment) {
        return new Response(JSON.stringify({ 
          hash: "HEAD",
          timestamp: new Date().toISOString()
        }), {
          headers: { "Content-Type": "application/json" },
        });
      }

      // Only try git commands in local development
      try {
        const hashProcess = new Deno.Command("git", {
          args: ["rev-parse", "HEAD"],
        });
        const { stdout: hashStdout } = await hashProcess.output();
        const hash = new TextDecoder().decode(hashStdout).trim();

        const timestampProcess = new Deno.Command("git", {
          args: ["log", "-1", "--format=%cI"],
        });
        const { stdout: timestampStdout } = await timestampProcess.output();
        const timestamp = new TextDecoder().decode(timestampStdout).trim();
        
        // Store in KV if available
        if (kv) {
          await kv.set(["commit_hash"], { hash, timestamp });
        }
        
        return new Response(JSON.stringify({ hash, timestamp }), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error("Failed to get git info:", error);
        throw error;
      }
    } catch (error) {
      console.error("Failed to get commit info:", error);
      return new Response(JSON.stringify({ error: "Failed to get commit info" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
}; 