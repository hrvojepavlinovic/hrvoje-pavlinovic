#!/usr/bin/env -S deno run -A

type KvPart = string | number | boolean;
type KvKey = KvPart[];

interface ExportEntry {
  key: KvKey;
  value: unknown;
  keyType?: string;
}

interface KvExport {
  summary?: {
    totalKeys?: number;
    keyPrefixes?: Record<string, number>;
  };
  keys: ExportEntry[];
}

interface ClickEvent {
  type: "menu" | "link" | "internal" | "external";
  target: string;
  timestamp: number;
}

interface Options {
  url?: string;
  file?: string;
  dryRun: boolean;
  flush: boolean;
  clickLimit: number;
}

function usage() {
  console.log(`Usage:
  REDIS_URL=redis://127.0.0.1:6379 deno run -A scripts/migrate-kv-to-redis.ts --url https://old-site/api/kv
  REDIS_SOCKET=/run/redis/redis-server.sock deno run -A scripts/migrate-kv-to-redis.ts --file kv-export.json --flush

Options:
  --url <url>       Deno KV export endpoint. Defaults to KV_EXPORT_URL.
  --file <path>     Local JSON export file. Defaults to KV_EXPORT_FILE.
  --dry-run         Read and summarize without writing.
  --flush           Delete existing configured store entries before import.
  --click-limit N   Max old click events to keep. Defaults to MAX_RECENT_CLICKS or 1000.`);
}

function parseArgs(args: string[]): Options {
  const options: Options = {
    url: Deno.env.get("KV_EXPORT_URL") || undefined,
    file: Deno.env.get("KV_EXPORT_FILE") || undefined,
    dryRun: false,
    flush: false,
    clickLimit: Number(Deno.env.get("MAX_RECENT_CLICKS") || "1000"),
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--help" || arg === "-h") {
      usage();
      Deno.exit(0);
    }
    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }
    if (arg === "--flush") {
      options.flush = true;
      continue;
    }
    if (arg === "--url") {
      options.url = args[++i];
      continue;
    }
    if (arg === "--file") {
      options.file = args[++i];
      continue;
    }
    if (arg === "--click-limit") {
      options.clickLimit = Number(args[++i]);
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  if (!options.url && !options.file) {
    throw new Error("Provide --url/--file or KV_EXPORT_URL/KV_EXPORT_FILE.");
  }
  if (!Number.isFinite(options.clickLimit) || options.clickLimit < 0) {
    throw new Error("--click-limit must be a non-negative number.");
  }
  return options;
}

async function loadExport(options: Options): Promise<KvExport> {
  if (options.file) {
    return JSON.parse(await Deno.readTextFile(options.file)) as KvExport;
  }

  const response = await fetch(options.url!);
  if (!response.ok) {
    throw new Error(
      `Export fetch failed: ${response.status} ${response.statusText}`,
    );
  }
  return await response.json() as KvExport;
}

function normalizeValue(key: KvKey, value: unknown): unknown {
  if (
    value && typeof value === "object" && !Array.isArray(value) &&
    Object.keys(value).length === 1 && "value" in value &&
    typeof value.value === "number"
  ) {
    return value.value;
  }

  if (typeof value === "bigint") return Number(value);

  const first = String(key[0] ?? "");
  if (
    first === "page_views" || first === "click_counts" ||
    first.startsWith("blog:likes:") || first.startsWith("blog:views:")
  ) {
    return Number(value || 0);
  }

  return value;
}

function isClickEntry(
  entry: ExportEntry,
): entry is ExportEntry & { value: ClickEvent } {
  return entry.key[0] === "clicks" &&
    entry.value !== null &&
    typeof entry.value === "object" &&
    "timestamp" in entry.value &&
    "target" in entry.value &&
    "type" in entry.value;
}

function summarize(entries: ExportEntry[], keptClicks: number) {
  const prefixes: Record<string, number> = {};
  for (const entry of entries) {
    const prefix = String(entry.key[0] ?? "");
    prefixes[prefix] = (prefixes[prefix] || 0) + 1;
  }

  console.log("Export summary:");
  console.log(`  total entries: ${entries.length}`);
  console.log(`  old click entries found: ${prefixes.clicks || 0}`);
  console.log(`  old click entries kept: ${keptClicks}`);
  console.log("  prefixes:");
  for (const [prefix, count] of Object.entries(prefixes).sort()) {
    console.log(`    ${prefix}: ${count}`);
  }
}

const options = parseArgs(Deno.args);
const exportData = await loadExport(options);
const entries = exportData.keys || [];

const clickEntries = entries
  .filter(isClickEntry)
  .sort((a, b) => Number(a.value.timestamp) - Number(b.value.timestamp))
  .slice(-options.clickLimit);

summarize(entries, clickEntries.length);

if (options.dryRun) {
  console.log("Dry run complete. No Redis writes performed.");
  Deno.exit(0);
}

if (!Deno.env.get("REDIS_URL") && !Deno.env.get("REDIS_SOCKET")) {
  throw new Error("Refusing to import without REDIS_URL or REDIS_SOCKET.");
}

Deno.env.set("MAX_RECENT_CLICKS", String(options.clickLimit));
const { flushStore, recordRecentClick, setValue } = await import(
  "../utils/store.ts"
);

if (options.flush) {
  const result = await flushStore();
  console.log(`Flushed existing store entries: ${result.deletedCount}`);
}

let written = 0;
let skippedClicks = 0;

for (const entry of entries) {
  if (entry.key[0] === "clicks") {
    skippedClicks++;
    continue;
  }
  await setValue(entry.key, normalizeValue(entry.key, entry.value));
  written++;
}

for (const entry of clickEntries) {
  await recordRecentClick(entry.value);
}

console.log("Import complete:");
console.log(`  KV entries written: ${written}`);
console.log(`  old click KV entries skipped: ${skippedClicks}`);
console.log(`  recent clicks imported: ${clickEntries.length}`);
Deno.exit(0);
