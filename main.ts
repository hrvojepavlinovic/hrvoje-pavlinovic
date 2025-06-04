/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "$std/dotenv/load.ts";

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import config from "./fresh.config.ts";

// TEMPORARY: Flush production KV on startup
const kv = await Deno.openKv();
console.log("🗑️ FLUSHING PRODUCTION KV...");

const entries = kv.list({ prefix: [] });
const toDelete = [];

for await (const entry of entries) {
  console.log(`   Key: ${JSON.stringify(entry.key)} → Value: ${entry.value}`);
  toDelete.push(entry.key);
}

if (toDelete.length > 0) {
  console.log(`🔥 Deleting ${toDelete.length} entries...`);
  const deletePromises = toDelete.map(key => kv.delete(key));
  await Promise.all(deletePromises);
  console.log("✅ Production KV flushed successfully!");
} else {
  console.log("✅ KV was already empty!");
}

kv.close();
// END TEMPORARY FLUSH

await start(manifest, config);
