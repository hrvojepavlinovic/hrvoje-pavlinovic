import { Handlers } from "$fresh/server.ts";
import { kv } from "../../utils/kv_db.ts";

export const handler: Handlers = {
  async GET() {
    try {
      console.log("Fetching KV summary...");
      
      const results = {
        summary: {
          totalKeys: 0,
          keyPrefixes: {} as Record<string, number>
        },
        keys: [] as Array<{ key: unknown; value: unknown; keyType: string }>
      };
      
      // List all entries in the KV store
      const allEntriesIter = kv.list({ prefix: [] });
      for await (const entry of allEntriesIter) {
        const keyInfo = {
          key: entry.key,
          value: entry.value,
          keyType: Array.isArray(entry.key) ? `Array[${entry.key.length}]` : typeof entry.key
        };
        
        results.keys.push(keyInfo);
        results.summary.totalKeys++;
        
        // Track key prefixes for summary
        if (Array.isArray(entry.key) && entry.key.length > 0) {
          const prefix = String(entry.key[0]);
          results.summary.keyPrefixes[prefix] = (results.summary.keyPrefixes[prefix] || 0) + 1;
        }
      }
      
      console.log(`Found ${results.summary.totalKeys} total KV entries`);
      console.log("Key prefixes:", results.summary.keyPrefixes);
      
      return new Response(JSON.stringify(results, null, 2), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error fetching KV data:", error);
      return new Response(JSON.stringify({ 
        error: (error as Error).message || String(error) 
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
}; 