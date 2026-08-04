export interface AIToolUsageDay {
  date: string;
  tool: string;
  inputTokens: number;
  cachedInputTokens: number;
  cacheWriteInputTokens: number;
  outputTokens: number;
  reasoningOutputTokens: number;
  totalTokens: number;
  requests: number;
}

export interface AIUsageSource {
  tool: string;
  quality: "exact" | "reported" | "estimated";
  firstDate: string | null;
  lastDate: string | null;
  sessions: number;
}

export interface AIUsageSnapshot {
  generatedAt: string;
  timezone: string;
  sources: AIUsageSource[];
  days: AIToolUsageDay[];
}

export interface AIUsagePeriod {
  label: string;
  inputTokens: number;
  cachedInputTokens: number;
  outputTokens: number;
  reasoningOutputTokens: number;
  totalTokens: number;
  requests: number;
}

export interface AIUsageSummary {
  generatedAt: string;
  sourceLabel: string;
  quality: AIUsageSource["quality"];
  periods: AIUsagePeriod[];
}
