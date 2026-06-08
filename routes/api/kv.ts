import { Handlers } from "$fresh/server.ts";
import { listAll } from "../../utils/store.ts";

// Helper function to safely serialize values including BigInt
function serializeValue(value: unknown): unknown {
  if (typeof value === "bigint") {
    return Number(value);
  }
  if (Array.isArray(value)) {
    return value.map(serializeValue);
  }
  if (value && typeof value === "object") {
    const obj: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      obj[key] = serializeValue(val);
    }
    return obj;
  }
  return value;
}

export const handler: Handlers = {
  async GET(req) {
    try {
      const expectedToken = Deno.env.get("KV_ACCESS_TOKEN");
      const authHeader = req.headers.get("Authorization");
      const token = authHeader?.startsWith("Bearer ")
        ? authHeader.slice(7)
        : null;
      if (!expectedToken || token !== expectedToken) {
        return new Response("Unauthorized", { status: 401 });
      }

      console.log("Fetching KV summary...");

      const results = {
        summary: {
          totalKeys: 0,
          keyPrefixes: {} as Record<string, number>,
        },
        keys: [] as Array<{ key: unknown; value: unknown; keyType: string }>,
      };

      // List all entries in the KV store
      const allEntriesIter = await listAll();
      for (const entry of allEntriesIter) {
        const keyInfo = {
          key: entry.key,
          value: serializeValue(entry.value), // Safely serialize the value
          keyType: Array.isArray(entry.key)
            ? `Array[${entry.key.length}]`
            : typeof entry.key,
        };

        results.keys.push(keyInfo);
        results.summary.totalKeys++;

        // Track key prefixes for summary
        if (Array.isArray(entry.key) && entry.key.length > 0) {
          const prefix = String(entry.key[0]);
          results.summary.keyPrefixes[prefix] =
            (results.summary.keyPrefixes[prefix] || 0) + 1;
        }
      }

      return new Response(JSON.stringify(results, null, 2), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error fetching KV data:", error);
      return new Response(
        JSON.stringify({
          error: (error as Error).message || String(error),
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },
};
