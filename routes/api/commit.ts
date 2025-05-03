/// <reference lib="deno.unstable" />
import { Handlers } from "$fresh/server.ts";

// Only try to open KV if we have the required token
const kv = Deno.env.get("DENO_KV_ACCESS_TOKEN") ? await Deno.openKv() : null;

export const handler: Handlers = {
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

      // Fallback to git command
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