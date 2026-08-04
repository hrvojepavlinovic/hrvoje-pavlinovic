import { walk } from "$std/fs/walk.ts";
import { basename, join, resolve } from "$std/path/mod.ts";
import { AIToolUsageDay, AIUsageSnapshot } from "../types/aiUsage.ts";
import { formatDateInTimeZone } from "../utils/aiUsage.ts";

const DEFAULT_TIMEZONE = "Europe/Zagreb";

interface TokenUsage {
  input_tokens?: number;
  cached_input_tokens?: number;
  cache_write_input_tokens?: number;
  output_tokens?: number;
  reasoning_output_tokens?: number;
  total_tokens?: number;
}

interface TokenEvent {
  timestamp?: string;
  payload?: {
    type?: string;
    info?: {
      last_token_usage?: TokenUsage;
    };
  };
}

const option = (name: string): string | undefined => {
  const prefix = `--${name}=`;
  return Deno.args.find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
};

const home = Deno.env.get("HOME");
if (!home) throw new Error("HOME is required");

const codexRoot = resolve(option("codex-root") ?? join(home, ".codex"));
const outputPath = resolve(option("output") ?? "data/ai-usage.json");
const timezone = option("timezone") ?? DEFAULT_TIMEZONE;

const sessionIdFromPath = (path: string): string => {
  const match = basename(path).match(
    /([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.jsonl$/i,
  );
  return match?.[1] ?? basename(path);
};

async function collectSessionFiles(): Promise<Map<string, string>> {
  const candidates = new Map<string, { path: string; size: number }>();

  for (const directory of ["sessions", "archived_sessions"]) {
    const root = join(codexRoot, directory);
    try {
      for await (
        const entry of walk(root, {
          includeDirs: false,
          exts: [".jsonl"],
        })
      ) {
        const sessionId = sessionIdFromPath(entry.path);
        const size = (await Deno.stat(entry.path)).size;
        const current = candidates.get(sessionId);
        if (!current || size > current.size) {
          candidates.set(sessionId, { path: entry.path, size });
        }
      }
    } catch (error) {
      if (!(error instanceof Deno.errors.NotFound)) throw error;
    }
  }

  return new Map(
    [...candidates.entries()].map(([sessionId, candidate]) => [
      sessionId,
      candidate.path,
    ]),
  );
}

const numberValue = (value: number | undefined): number =>
  Number.isFinite(value) ? Number(value) : 0;

const accumulators = new Map<string, DayAccumulator>();
const sessionFiles = await collectSessionFiles();
let skippedLines = 0;

async function* streamLines(
  stream: ReadableStream<Uint8Array>,
): AsyncGenerator<string> {
  let buffer = "";
  const decoder = new TextDecoder();
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      yield* lines;
    }
    buffer += decoder.decode();
  } finally {
    reader.releaseLock();
  }
  if (buffer) yield buffer;
}

type DayAccumulator = AIToolUsageDay;

const command = new Deno.Command("rg", {
  args: [
    "--no-filename",
    "--text",
    "--fixed-strings",
    '"type":"token_count"',
    ...sessionFiles.values(),
  ],
  stdout: "piped",
  stderr: "null",
});
const process = command.spawn();

for await (const line of streamLines(process.stdout)) {
  let event: TokenEvent;
  try {
    event = JSON.parse(line) as TokenEvent;
  } catch {
    skippedLines += 1;
    continue;
  }

  if (event.payload?.type !== "token_count" || !event.timestamp) continue;
  const usage = event.payload.info?.last_token_usage;
  if (!usage || numberValue(usage.total_tokens) <= 0) continue;

  const date = formatDateInTimeZone(new Date(event.timestamp), timezone);
  const key = `${date}:codex`;
  const day = accumulators.get(key) ?? {
    date,
    tool: "Codex",
    inputTokens: 0,
    cachedInputTokens: 0,
    cacheWriteInputTokens: 0,
    outputTokens: 0,
    reasoningOutputTokens: 0,
    totalTokens: 0,
    requests: 0,
  };

  day.inputTokens += numberValue(usage.input_tokens);
  day.cachedInputTokens += numberValue(usage.cached_input_tokens);
  day.cacheWriteInputTokens += numberValue(usage.cache_write_input_tokens);
  day.outputTokens += numberValue(usage.output_tokens);
  day.reasoningOutputTokens += numberValue(usage.reasoning_output_tokens);
  day.totalTokens += numberValue(usage.total_tokens);
  day.requests += 1;
  accumulators.set(key, day);
}

const status = await process.status;
if (status.code > 1) {
  throw new Error(`rg failed with exit code ${status.code}`);
}

const days: AIToolUsageDay[] = [...accumulators.values()]
  .sort((a, b) => a.date.localeCompare(b.date));

const snapshot: AIUsageSnapshot = {
  generatedAt: new Date().toISOString(),
  timezone,
  sources: [{
    tool: "Codex",
    quality: "exact",
    firstDate: days[0]?.date ?? null,
    lastDate: days.at(-1)?.date ?? null,
    sessions: sessionFiles.size,
  }],
  days,
};

await Deno.writeTextFile(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(
  `Wrote ${days.length} daily aggregates from ${sessionFiles.size} Codex sessions to ${outputPath}`,
);
if (skippedLines > 0) {
  console.warn(`Skipped ${skippedLines} incomplete JSON lines`);
}
