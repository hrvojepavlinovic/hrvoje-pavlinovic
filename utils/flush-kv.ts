import { flushStore, listAll } from "./store.ts";

export async function flushKV() {
  console.log("Flushing configured store...");
  const result = await flushStore();
  console.log(`Store flushed. Deleted ${result.deletedCount} KV entries.`);
  return result;
}

// Run flush if this file is executed directly
if (import.meta.main) {
  const entries = await listAll();
  console.log(`FLUSHING STORE - THIS WILL DELETE ${entries.length} ENTRIES!`);
  console.log("Press Ctrl+C to cancel, or wait 3 seconds to proceed...");

  // Give user a chance to cancel
  await new Promise((resolve) => setTimeout(resolve, 3000));

  flushKV().then((result) => {
    console.log("Flush result:", result);
  }).catch((error) => {
    console.error("Flush failed:", error);
  });
}
