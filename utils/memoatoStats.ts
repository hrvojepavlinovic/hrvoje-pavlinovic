import { kv } from "./kv_db.ts";

export interface MemoatoCalendarRange {
  from: string;
  to: string;
}

export interface MemoatoCalendar {
  today: MemoatoCalendarRange;
  week: MemoatoCalendarRange;
  month: MemoatoCalendarRange;
  year: MemoatoCalendarRange;
}

export interface MemoatoCategory {
  slug: string;
  title: string;
  unit: string | null;
  aggregation?: string;
  today: number | null;
  week: number | null;
  month: number | null;
  year: number | null;
}

export interface MemoatoPublicStats {
  generatedAt: string;
  aggregation: string;
  calendar: MemoatoCalendar;
  categories: MemoatoCategory[];
}

const MEMOATO_PUBLIC_STATS_URL =
  "https://api.memoato.com/public/stats/8AdNcaiVxGJtMBk1MWcbrUz-SV-cs0OUJEIGcdhHlwY";

const CACHE_KEY = ["memoato", "public_stats", "v2"];
const CACHE_TTL_MS = 10 * 60 * 1000;
const MEMOATO_FETCH_TIMEOUT_MS = 800;

function isMemoatoPublicStats(value: unknown): value is MemoatoPublicStats {
  if (!value || typeof value !== "object") return false;
  const obj = value as Record<string, unknown>;
  return typeof obj.generatedAt === "string" &&
    typeof obj.aggregation === "string" &&
    typeof obj.calendar === "object" &&
    Array.isArray(obj.categories);
}

export async function getMemoatoPublicStats(
  options: { forceRefresh?: boolean } = {},
): Promise<MemoatoPublicStats | null> {
  const cached = await kv.get<MemoatoPublicStats>(CACHE_KEY);

  if (options.forceRefresh) {
    return await refreshMemoatoPublicStats(cached.value);
  }

  if (cached.value) return cached.value;

  return await refreshMemoatoPublicStats(cached.value);
}

export async function refreshMemoatoPublicStats(
  fallback?: MemoatoPublicStats | null,
): Promise<MemoatoPublicStats | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, MEMOATO_FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(MEMOATO_PUBLIC_STATS_URL, {
      headers: {
        "Accept": "application/json",
        "User-Agent": "hrvoje.pavlinovic.com",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      console.warn(
        `Memoato stats fetch failed: ${response.status} ${response.statusText}`,
      );
      return fallback ?? null;
    }

    const data = await response.json();
    if (!isMemoatoPublicStats(data)) {
      console.warn("Memoato stats returned unexpected shape");
      return fallback ?? null;
    }

    await kv.set(CACHE_KEY, data, { expireIn: CACHE_TTL_MS });
    return data;
  } catch (error) {
    console.warn("Memoato stats fetch threw an error", error);
    return fallback ?? null;
  } finally {
    clearTimeout(timeoutId);
  }
}
