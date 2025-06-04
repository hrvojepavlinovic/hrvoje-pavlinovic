import { kv } from "./kv_db.ts";

export async function flushKV() {
  console.log("Flushing KV store...");
  
  let deletedCount = 0;
  
  // Get all entries and delete them
  const allEntries = kv.list({ prefix: [] });
  
  for await (const entry of allEntries) {
    await kv.delete(entry.key);
    deletedCount++;
    
    // Log progress every 50 deletions
    if (deletedCount % 50 === 0) {
      console.log(`Deleted ${deletedCount} entries...`);
    }
  }
  
  console.log(`✅ KV store flushed! Deleted ${deletedCount} total entries.`);
  return { deletedCount };
}

// Run flush if this file is executed directly
if (import.meta.main) {
  console.log("🔥 FLUSHING KV STORE - THIS WILL DELETE ALL DATA!");
  console.log("Press Ctrl+C to cancel, or wait 3 seconds to proceed...");
  
  // Give user a chance to cancel
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  flushKV().then(result => {
    console.log("Flush result:", result);
  }).catch(error => {
    console.error("Flush failed:", error);
  });
} 