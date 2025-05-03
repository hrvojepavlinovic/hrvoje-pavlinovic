/// <reference lib="deno.unstable" />
import { Handlers } from "$fresh/server.ts";

const accessToken = Deno.env.get("DENO_KV_ACCESS_TOKEN");

if (!accessToken) {
  throw new Error("DENO_KV_ACCESS_TOKEN environment variable is required");
}

// Use the full URL when not in Deno Deploy
const kv = await Deno.openKv(
  Deno.env.get("DENO_KV_URL") ? 
    undefined : // In Deno Deploy, use default connection
    Deno.env.get("DENO_KV_URL")
);

export const handler: Handlers = {
  async POST(req) {
    // Verify authorization token
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response("Unauthorized", { status: 401 });
    }
    const token = authHeader.slice(7); // Remove "Bearer " prefix
    if (token !== accessToken) {
      return new Response("Unauthorized", { status: 401 });
    }

    try {
      const { hash } = await req.json();
      if (!hash) {
        return new Response("Hash is required", { status: 400 });
      }
      
      // Store the hash and current timestamp in KV
      const timestamp = new Date().toISOString();
      await kv.set(["commit_hash"], { hash, timestamp });
      
      return new Response(JSON.stringify({ hash, timestamp }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Failed to update commit hash:", error);
      return new Response("Invalid request", { status: 400 });
    }
  },
  
  async GET(_req) {
    try {
      // Use git command for local development
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
      
      return new Response(JSON.stringify({ hash, timestamp }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Failed to get commit info:", error);
      return new Response(JSON.stringify({ error: "Failed to get commit info" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
}; 