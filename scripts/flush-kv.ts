#!/usr/bin/env -S deno run -A

import { flushStore, listAll } from "../utils/store.ts";

console.log("Flushing configured store...");

const entries = await listAll();

if (entries.length === 0) {
  console.log("Store is already empty.");
  Deno.exit(0);
}

console.log(`Deleting ${entries.length} entries in 3 seconds. Ctrl+C to stop.`);
await new Promise((resolve) => setTimeout(resolve, 3000));
const result = await flushStore();
console.log(`Store flushed. Deleted ${result.deletedCount} KV entries.`);
