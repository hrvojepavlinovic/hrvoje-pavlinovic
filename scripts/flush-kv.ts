#!/usr/bin/env -S deno run -A --unstable-kv

// Script to flush all likes data from KV
const kv = await Deno.openKv();

console.log("🗑️  Flushing production KV...");

// List all entries to see what we're deleting
console.log("📋 Current KV entries:");
const entries = kv.list({ prefix: [] });
const toDelete = [];

for await (const entry of entries) {
  console.log(`   Key: ${JSON.stringify(entry.key)} → Value: ${entry.value}`);
  toDelete.push(entry.key);
}

if (toDelete.length === 0) {
  console.log("✅ KV is already empty!");
  Deno.exit(0);
}

console.log(`\n🔥 Deleting ${toDelete.length} entries...`);

// Delete all entries
const deletePromises = toDelete.map(key => kv.delete(key));
await Promise.all(deletePromises);

console.log("✅ KV flushed successfully!");
console.log("📊 All likes data has been cleared.");

kv.close(); 