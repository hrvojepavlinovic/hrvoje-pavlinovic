import { createClient } from "npm:redis@4.7.0";

type KvPart = string | number | boolean;
type KvKey = KvPart[];

export interface KvEntry<T = unknown> {
  key: KvKey;
  value: T;
}

export interface ClickEvent {
  type: "menu" | "link" | "internal" | "external";
  target: string;
  timestamp: number;
}

const KEY_PREFIX = Deno.env.get("REDIS_KEY_PREFIX") || "hrvoje";
const RECENT_CLICKS_KEY = `${KEY_PREFIX}:recent_clicks`;
const MAX_RECENT_CLICKS = Number(Deno.env.get("MAX_RECENT_CLICKS") || "1000");

let redisClient:
  | ReturnType<typeof createClient>
  | null
  | undefined;
let denoKv: Deno.Kv | null | undefined;

function hasRedisConfig() {
  return Boolean(Deno.env.get("REDIS_URL") || Deno.env.get("REDIS_SOCKET"));
}

async function getRedis() {
  if (!hasRedisConfig()) return null;
  if (redisClient) return redisClient;

  redisClient = createClient(
    Deno.env.get("REDIS_SOCKET")
      ? { socket: { path: Deno.env.get("REDIS_SOCKET")! } }
      : { url: Deno.env.get("REDIS_URL")! },
  );
  redisClient.on("error", (error) => {
    console.error("Redis client error:", error);
  });
  await redisClient.connect();
  return redisClient;
}

async function getKv() {
  if (denoKv) return denoKv;
  denoKv = await Deno.openKv();
  return denoKv;
}

function encodePart(part: KvPart): string {
  return encodeURIComponent(String(part));
}

function decodePart(part: string): string {
  return decodeURIComponent(part);
}

function redisKey(key: KvKey): string {
  return `${KEY_PREFIX}:kv:${key.map(encodePart).join(":")}`;
}

function redisPattern(prefix: KvKey): string {
  const encoded = prefix.map(encodePart).join(":");
  return encoded ? `${KEY_PREFIX}:kv:${encoded}:*` : `${KEY_PREFIX}:kv:*`;
}

function decodeRedisKey(key: string): KvKey {
  const raw = key.slice(`${KEY_PREFIX}:kv:`.length);
  return raw.split(":").map(decodePart);
}

function serialize(value: unknown): string {
  return JSON.stringify(value);
}

function deserialize<T>(raw: string | null): T | null {
  if (raw === null) return null;
  return JSON.parse(raw) as T;
}

export async function getValue<T>(key: KvKey): Promise<T | null> {
  const redis = await getRedis();
  if (redis) {
    return deserialize<T>(await redis.get(redisKey(key)));
  }

  const kv = await getKv();
  const result = await kv.get<T>(key);
  return result.value;
}

export async function setValue(
  key: KvKey,
  value: unknown,
  options: { expireIn?: number } = {},
) {
  const redis = await getRedis();
  if (redis) {
    const encoded = redisKey(key);
    const payload = serialize(value);
    if (options.expireIn && options.expireIn > 0) {
      await redis.set(encoded, payload, { PX: options.expireIn });
    } else {
      await redis.set(encoded, payload);
    }
    return;
  }

  const kv = await getKv();
  await kv.set(key, value, options);
}

export async function incrementValue(key: KvKey, amount = 1): Promise<number> {
  const redis = await getRedis();
  if (redis) {
    return await redis.incrBy(redisKey(key), amount);
  }

  const kv = await getKv();
  let attempts = 0;
  while (attempts < 5) {
    const current = await kv.get<number | bigint>(key);
    const currentValue = Number(current.value || 0);
    const result = await kv.atomic()
      .check(current)
      .set(key, currentValue + amount)
      .commit();
    if (result.ok) return currentValue + amount;
    attempts++;
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 50 + 10)
    );
  }
  throw new Error(`Failed to increment ${JSON.stringify(key)}`);
}

export async function listPrefix<T>(
  prefix: KvKey,
  options: { limit?: number; reverse?: boolean } = {},
): Promise<KvEntry<T>[]> {
  const redis = await getRedis();
  if (redis) {
    const entries: KvEntry<T>[] = [];
    for await (
      const key of redis.scanIterator({
        MATCH: redisPattern(prefix),
        COUNT: 100,
      })
    ) {
      const value = deserialize<T>(await redis.get(key));
      if (value !== null) {
        entries.push({ key: decodeRedisKey(key), value });
      }
    }
    entries.sort((a, b) =>
      JSON.stringify(a.key).localeCompare(JSON.stringify(b.key))
    );
    if (options.reverse) entries.reverse();
    return options.limit ? entries.slice(0, options.limit) : entries;
  }

  const kv = await getKv();
  const entries: KvEntry<T>[] = [];
  const iter = kv.list<T>({ prefix }, options);
  for await (const entry of iter) {
    entries.push({ key: entry.key as KvKey, value: entry.value });
  }
  return entries;
}

export async function deleteValue(key: KvKey) {
  const redis = await getRedis();
  if (redis) {
    await redis.del(redisKey(key));
    return;
  }

  const kv = await getKv();
  await kv.delete(key);
}

export async function recordRecentClick(click: ClickEvent) {
  const redis = await getRedis();
  if (redis) {
    await redis
      .multi()
      .lPush(RECENT_CLICKS_KEY, serialize(click))
      .lTrim(RECENT_CLICKS_KEY, 0, MAX_RECENT_CLICKS - 1)
      .exec();
    return;
  }

  await setValue(
    ["clicks", click.timestamp, Math.random().toString(36)],
    click,
  );
}

export async function getRecentClicks(limit = 100): Promise<ClickEvent[]> {
  const redis = await getRedis();
  if (redis) {
    const rows = await redis.lRange(RECENT_CLICKS_KEY, 0, limit - 1);
    return rows.map((row) => JSON.parse(row) as ClickEvent);
  }

  const entries = await listPrefix<ClickEvent>(["clicks"], {
    limit,
    reverse: true,
  });
  return entries.map((entry) => entry.value);
}

export async function listAll(): Promise<KvEntry[]> {
  return await listPrefix([]);
}

export async function flushStore() {
  const entries = await listAll();
  for (const entry of entries) {
    await deleteValue(entry.key);
  }

  const redis = await getRedis();
  if (redis) {
    await redis.del(RECENT_CLICKS_KEY);
  }

  return { deletedCount: entries.length };
}
