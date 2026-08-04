import {
  AIToolUsageDay,
  AIUsagePeriod,
  AIUsageSnapshot,
  AIUsageSummary,
} from "../types/aiUsage.ts";

const DAY_MS = 24 * 60 * 60 * 1000;

const emptyPeriod = (label: string): AIUsagePeriod => ({
  label,
  inputTokens: 0,
  cachedInputTokens: 0,
  outputTokens: 0,
  reasoningOutputTokens: 0,
  totalTokens: 0,
  requests: 0,
});

export function formatDateInTimeZone(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${value("year")}-${value("month")}-${value("day")}`;
}

function aggregateDays(
  days: AIToolUsageDay[],
  label: string,
  today: string,
  windowDays: number | null,
): AIUsagePeriod {
  const result = emptyPeriod(label);
  const todayIndex = Date.parse(`${today}T00:00:00Z`) / DAY_MS;

  for (const day of days) {
    const dayIndex = Date.parse(`${day.date}T00:00:00Z`) / DAY_MS;
    const age = todayIndex - dayIndex;
    if (age < 0 || (windowDays !== null && age >= windowDays)) continue;

    result.inputTokens += day.inputTokens;
    result.cachedInputTokens += day.cachedInputTokens;
    result.outputTokens += day.outputTokens;
    result.reasoningOutputTokens += day.reasoningOutputTokens;
    result.totalTokens += day.totalTokens;
    result.requests += day.requests;
  }

  return result;
}

export function summarizeAIUsage(
  snapshot: AIUsageSnapshot,
  now = new Date(),
): AIUsageSummary {
  const today = formatDateInTimeZone(now, snapshot.timezone);
  const source = snapshot.sources[0] ?? {
    tool: "AI",
    quality: "reported" as const,
  };

  return {
    generatedAt: snapshot.generatedAt,
    sourceLabel: snapshot.sources.map((item) => item.tool).join(" + ") || "AI",
    quality: source.quality,
    periods: [
      aggregateDays(snapshot.days, "Today", today, 1),
      aggregateDays(snapshot.days, "7 days", today, 7),
      aggregateDays(snapshot.days, "30 days", today, 30),
      aggregateDays(snapshot.days, "All time", today, null),
    ],
  };
}
