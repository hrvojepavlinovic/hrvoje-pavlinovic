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
  url?: string;
  today: number | null;
  week: number | null;
  month: number | null;
  year: number | null;
}

export interface MemoatoPublicStats {
  generatedAt: string;
  aggregation: string;
  username?: string;
  dashboardUrl?: string;
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

function toNullableNumber(value: unknown): number | null {
  if (value == null) return null;
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function normalizeMemoatoPublicStats(
  value: unknown,
): MemoatoPublicStats | null {
  if (!isMemoatoPublicStats(value)) return null;
  const obj = value as unknown as Record<string, unknown>;
  const rawCategories = Array.isArray(obj.categories) ? obj.categories : [];
  const categories: MemoatoCategory[] = rawCategories.flatMap((category) => {
    if (!category || typeof category !== "object") return [];
    const cat = category as Record<string, unknown>;
    if (typeof cat.slug !== "string" || typeof cat.title !== "string") {
      return [];
    }
    return [{
      slug: cat.slug,
      title: cat.title,
      unit: typeof cat.unit === "string" ? cat.unit : null,
      aggregation: typeof cat.aggregation === "string"
        ? cat.aggregation
        : undefined,
      url: typeof cat.url === "string" ? cat.url : undefined,
      today: toNullableNumber(cat.today),
      week: toNullableNumber(cat.week),
      month: toNullableNumber(cat.month),
      year: toNullableNumber(cat.year),
    }];
  });

  return {
    generatedAt: obj.generatedAt as string,
    aggregation: obj.aggregation as string,
    username: typeof obj.username === "string" ? obj.username : undefined,
    dashboardUrl: typeof obj.dashboardUrl === "string"
      ? obj.dashboardUrl
      : undefined,
    calendar: obj.calendar as MemoatoCalendar,
    categories,
  };
}

export async function getMemoatoPublicStats(
  options: { forceRefresh?: boolean } = {},
): Promise<MemoatoPublicStats | null> {
  const cached = await kv.get<MemoatoPublicStats>(CACHE_KEY);
  const normalizedCached = normalizeMemoatoPublicStats(cached.value);

  if (options.forceRefresh) {
    return await refreshMemoatoPublicStats(normalizedCached);
  }

  if (normalizedCached) return normalizedCached;

  return await refreshMemoatoPublicStats(normalizedCached);
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
    const normalizedData = normalizeMemoatoPublicStats(data);
    if (!normalizedData) {
      console.warn("Memoato stats returned unexpected shape");
      return fallback ?? null;
    }

    await kv.set(CACHE_KEY, normalizedData, { expireIn: CACHE_TTL_MS });
    return normalizedData;
  } catch (error) {
    console.warn("Memoato stats fetch threw an error", error);
    return fallback ?? null;
  } finally {
    clearTimeout(timeoutId);
  }
}
