/// <reference lib="deno.unstable" />
import { Handlers } from "$fresh/server.ts";
import { getValue, setValue } from "../../utils/store.ts";

// Check if we're running on Deno Deploy
const isDenoDeployment = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;

async function getReleaseInfo() {
  const hash = Deno.env.get("RELEASE_COMMIT_HASH");
  const timestamp = Deno.env.get("RELEASE_COMMIT_TIMESTAMP");
  if (hash && timestamp) return { hash, timestamp };

  try {
    const raw = await Deno.readTextFile(".release.json");
    const parsed = JSON.parse(raw);
    if (parsed?.hash && parsed?.timestamp) {
      return { hash: parsed.hash, timestamp: parsed.timestamp };
    }
  } catch {
    // Older local/dev releases may not have a release metadata file.
  }

  return null;
}

export const handler: Handlers = {
  async POST(req) {
    // Only allow updates if we have KV access
    if (!Deno.env.get("KV_ACCESS_TOKEN")) {
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

      await setValue(["commit_hash"], { hash, timestamp });

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
      const releaseInfo = await getReleaseInfo();
      if (releaseInfo) {
        return new Response(JSON.stringify(releaseInfo), {
          headers: { "Content-Type": "application/json" },
        });
      }

      // If on Deno Deploy, only use KV
      if (isDenoDeployment) {
        if (!Deno.env.get("KV_ACCESS_TOKEN")) {
          return new Response(JSON.stringify(null), {
            headers: { "Content-Type": "application/json" },
          });
        }

        const result = await getValue(["commit_hash"]);
        return new Response(JSON.stringify(result || null), {
          headers: { "Content-Type": "application/json" },
        });
      }

      // If not on Deno Deploy, use git commands
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

        return new Response(JSON.stringify({ hash, timestamp }), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error("Failed to get git info:", error);
        return new Response(JSON.stringify(null), {
          headers: { "Content-Type": "application/json" },
        });
      }
    } catch (error) {
      console.error("Failed to get commit info:", error);
      return new Response(JSON.stringify(null), {
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
