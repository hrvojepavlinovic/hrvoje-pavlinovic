import { trackEvent } from "../utils/track.ts";
import { renderTemplateWithComponents } from "../utils/contentTokens.tsx";
import { HomeData } from "../types/home.ts";
import { MemoatoPublicStats } from "../utils/memoatoStats.ts";
import { AIUsageSummary } from "../types/aiUsage.ts";

export interface HomeArticlePreview {
  title: string;
  slug: string;
  shortDescription: string;
  tag: string;
  createdAt: string;
  readingTime: number;
}

export interface HomePageProps {
  data: HomeData;
  memoatoStats?: MemoatoPublicStats | null;
  aiUsage: AIUsageSummary;
  latestArticles: HomeArticlePreview[];
}

const handleTrackedLink = (target: string) => {
  trackEvent({ type: "click", clickType: "link", target });
};

const ctaMeta: Record<string, { iconPaths: string[] }> = {
  about: {
    iconPaths: [
      "M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
      "M4 20a8 8 0 0 1 16 0",
    ],
  },
  resume: {
    iconPaths: [
      "M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z",
      "M14 3v5h5",
    ],
  },
  projects: {
    iconPaths: [
      "M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z",
      "m9 13 2 2-2 2",
      "m15 13-2 2 2 2",
    ],
  },
  blog: {
    iconPaths: [
      "M4 20h4l10-10-4-4L4 16v4Z",
      "m12 6 4 4",
    ],
  },
} as const;

export default function HomePage({
  data,
  memoatoStats,
  aiUsage,
  latestArticles,
}: HomePageProps) {
  const heroTitle = renderTemplateWithComponents(data.title);
  const heroStat = renderTemplateWithComponents(data.heroStat);
  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
  });
  const integerFormatter = new Intl.NumberFormat("en-US");
  const tokenFormatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  });
  const articleDateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "Europe/Zagreb",
  });
  const updatedFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Zagreb",
  });

  const memoatoCategories = memoatoStats?.categories ?? [];
  const findCategory = (slug: string) =>
    memoatoCategories.find((category) => category.slug === slug) ?? null;

  type MemoatoPeriod = "today" | "week" | "month" | "year";
  const periodLabels: Record<MemoatoPeriod, string> = {
    today: "Today",
    week: "This week",
    month: "This month",
    year: "This year",
  };

  const toFiniteNumber = (value: number | null): number | null => {
    if (value == null) return null;
    const parsed = typeof value === "number" ? value : Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  };

  const pickStatValue = (category: { [K in MemoatoPeriod]: number | null }) => {
    const orderedPeriods: MemoatoPeriod[] = ["today", "week", "month", "year"];
    for (const period of orderedPeriods) {
      const value = toFiniteNumber(category[period]);
      if (value != null && value !== 0) {
        return { period, value };
      }
    }

    return {
      period: "year" as const,
      value: toFiniteNumber(category.year) ?? 0,
    };
  };

  const weight = findCategory("weight");
  const activeKcal = findCategory("active-kcal");
  const indoorBike = findCategory("indoor-bike-kcal");
  const pushUps = findCategory("push-ups");
  const pullUps = findCategory("pull-ups");
  const football = findCategory("football");

  const heroMetrics = [
    weight
      ? (() => {
        const picked = pickStatValue(weight);
        return {
          label: "Weight",
          value: `${formatter.format(picked.value)}${
            weight.unit ? ` ${weight.unit}` : ""
          }`,
          hint: periodLabels[picked.period],
          url: weight.url,
          trackingTarget: `memoato-category-${weight.slug}`,
        };
      })()
      : null,
    activeKcal
      ? (() => {
        const picked = pickStatValue(activeKcal);
        return {
          label: activeKcal.title,
          value: `${integerFormatter.format(picked.value)}${
            activeKcal.unit ? ` ${activeKcal.unit}` : ""
          }`,
          hint: periodLabels[picked.period],
          url: activeKcal.url,
          trackingTarget: `memoato-category-${activeKcal.slug}`,
        };
      })()
      : null,
    indoorBike
      ? (() => {
        const picked = pickStatValue(indoorBike);
        return {
          label: indoorBike.title,
          value: `${integerFormatter.format(picked.value)}${
            indoorBike.unit ? ` ${indoorBike.unit}` : ""
          }`,
          hint: periodLabels[picked.period],
          url: indoorBike.url,
          trackingTarget: `memoato-category-${indoorBike.slug}`,
        };
      })()
      : null,
    pushUps
      ? (() => {
        const picked = pickStatValue(pushUps);
        return {
          label: pushUps.title,
          value: integerFormatter.format(picked.value),
          hint: periodLabels[picked.period],
          url: pushUps.url,
          trackingTarget: `memoato-category-${pushUps.slug}`,
        };
      })()
      : null,
    pullUps
      ? (() => {
        const picked = pickStatValue(pullUps);
        return {
          label: pullUps.title,
          value: integerFormatter.format(picked.value),
          hint: periodLabels[picked.period],
          url: pullUps.url,
          trackingTarget: `memoato-category-${pullUps.slug}`,
        };
      })()
      : null,
    football
      ? (() => {
        const picked = pickStatValue(football);
        return {
          label: football.title,
          value: integerFormatter.format(picked.value),
          hint: periodLabels[picked.period],
          url: football.url,
          trackingTarget: `memoato-category-${football.slug}`,
        };
      })()
      : null,
  ].filter(Boolean) as Array<{
    label: string;
    value: string;
    hint: string;
    url?: string;
    trackingTarget?: string;
  }>;

  return (
    <div class="site-canvas">
      <section class="site-hero mx-auto max-w-5xl px-6">
        <div class="space-y-8" data-reveal>
          <div class="space-y-4">
            <div class="hero-identity">
              <div class="avatar-frame" data-gravity>
                <img
                  src={data.avatar.src}
                  alt={data.avatar.alt}
                  class="object-cover"
                  loading="eager"
                />
              </div>
              <h1 class="hero-title mx-auto text-center">
                {heroTitle}
              </h1>
              <p class="mx-auto max-w-3xl text-center text-[13px] font-semibold text-gray-700 [text-wrap:balance] dark:text-gray-200 sm:text-[15px] md:text-base">
                {heroStat}
              </p>
            </div>
          </div>

          <div class="flex flex-wrap justify-center gap-3">
            {data.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:")
                  ? undefined
                  : "noopener noreferrer"}
                class="gravity-button group"
                data-gravity
                onClick={() =>
                  handleTrackedLink(
                    link.trackingTarget ?? link.label.toLowerCase(),
                  )}
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d={link.icon} />
                </svg>
                <span class="sr-only">{link.label}</span>
              </a>
            ))}
          </div>

          <div class="hero-copy-panel space-y-4 text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-[17px] md:leading-loose">
            {data.heroParagraphs.map((paragraph, index) => (
              <p key={`hero-paragraph-${index}`} class="text-sm">
                {renderTemplateWithComponents(paragraph)}
              </p>
            ))}
          </div>

          <div class="grid grid-cols-2 gap-3 sm:hidden">
            {data.ctaLinks.map((cta) => {
              const meta = ctaMeta[cta.trackingTarget] ?? {
                iconPaths: ["M5 12h14", "m13 5 7 7-7 7"],
              };
              return (
                <a
                  key={cta.label}
                  href={cta.href}
                  target={cta.external ? "_blank" : undefined}
                  rel={cta.external ? "noopener noreferrer" : undefined}
                  class="action-button"
                  data-gravity
                  onClick={() => handleTrackedLink(cta.trackingTarget)}
                >
                  <span class="inline-flex h-6 w-6 items-center justify-center text-gray-600 dark:text-gray-300">
                    <svg
                      class="h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      {meta.iconPaths.map((iconPath, index) => (
                        <path
                          key={`${cta.trackingTarget}-${index}`}
                          d={iconPath}
                        />
                      ))}
                    </svg>
                  </span>
                  <span>{cta.label}</span>
                </a>
              );
            })}
          </div>

          {heroMetrics.length > 0 && (
            <div class="space-y-3 pt-8">
              <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
                {heroMetrics.map((metric) =>
                  metric.url
                    ? (
                      <a
                        key={metric.label}
                        href={metric.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="surface-card metric-tile p-3 text-center"
                        data-tilt
                        data-reveal
                        onClick={() =>
                          handleTrackedLink(
                            metric.trackingTarget ?? "memoato-category",
                          )}
                      >
                        <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          {metric.label}
                        </p>
                        <p class="mt-1 text-base font-semibold text-gray-900 dark:text-gray-100 md:text-lg">
                          {metric.value}
                        </p>
                        <p class="mt-1 text-xs text-gray-500 dark:text-gray-500">
                          {metric.hint}
                        </p>
                      </a>
                    )
                    : (
                      <div
                        key={metric.label}
                        class="surface-card metric-tile p-3 text-center"
                        data-reveal
                      >
                        <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          {metric.label}
                        </p>
                        <p class="mt-1 text-base font-semibold text-gray-900 dark:text-gray-100 md:text-lg">
                          {metric.value}
                        </p>
                        <p class="mt-1 text-xs text-gray-500 dark:text-gray-500">
                          {metric.hint}
                        </p>
                      </div>
                    )
                )}
              </div>

              <div class="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-0 text-center text-xs text-gray-500 dark:text-gray-500 sm:flex-row sm:gap-2">
                <p>
                  Live stats from{" "}
                  <a
                    href="https://memoato.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-semibold text-gray-700 underline decoration-gray-300 underline-offset-4 hover:text-orange-500 dark:text-gray-200 dark:decoration-gray-700"
                    onClick={() => handleTrackedLink("memoato-stats")}
                  >
                    memoato.com
                  </a>
                </p>
                <span class="hidden sm:inline" aria-hidden="true">·</span>
                <a
                  href="https://app.memoato.com/u/0xhp10"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-semibold text-gray-700 underline decoration-gray-300 underline-offset-4 hover:text-orange-500 dark:text-gray-200 dark:decoration-gray-700"
                  onClick={() => handleTrackedLink("memoato-profile-stats")}
                >
                  View all stats.
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <section class="section-band">
        <div class="mx-auto max-w-5xl px-6 py-20 md:py-24">
          <header class="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div class="max-w-2xl" data-reveal>
              <p class="eyebrow">AI usage</p>
              <h2 class="mt-4 text-2xl font-semibold text-gray-900 dark:text-gray-100 md:text-3xl">
                I use Codex a lot. Here are the numbers.
              </h2>
              <p class="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                A running count from my local sessions, updated whenever I
                remember.
              </p>
            </div>
            <span class="tag-chip inline-flex w-fit items-center px-3 py-1.5 text-xs font-semibold uppercase">
              {aiUsage.sourceLabel} · {aiUsage.quality}
            </span>
          </header>

          <div class="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {aiUsage.periods.map((period) => (
              <article
                key={period.label}
                class="surface-card metric-tile p-4 md:p-5"
                data-tilt
                data-reveal
              >
                <p class="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                  {period.label}
                </p>
                <p class="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100 md:text-3xl">
                  {tokenFormatter.format(period.totalTokens)}
                </p>
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-500">
                  tokens · {integerFormatter.format(period.requests)} calls
                </p>
                <div class="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-gray-500 dark:text-gray-500">
                  <span>{tokenFormatter.format(period.inputTokens)} input</span>
                  <span>
                    {tokenFormatter.format(period.outputTokens)} output
                  </span>
                </div>
              </article>
            ))}
          </div>

          <p class="mt-4 text-xs text-gray-500 dark:text-gray-500">
            Snapshot updated{" "}
            {updatedFormatter.format(new Date(aiUsage.generatedAt))}
          </p>
        </div>
      </section>

      <section class="section-band">
        <div class="mx-auto max-w-5xl px-6 py-20 md:py-24">
          <header class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div data-reveal>
              <p class="eyebrow">Latest writing</p>
              <h2 class="mt-4 text-2xl font-semibold text-gray-900 dark:text-gray-100 md:text-3xl">
                Notes from the work and life around it.
              </h2>
            </div>
            <a
              href="/blog"
              class="action-button w-fit"
              onClick={() => handleTrackedLink("home-all-blog-posts")}
            >
              <span>All posts</span>
              <svg
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </a>
          </header>

          <div class="mt-8 grid gap-4 md:grid-cols-3">
            {latestArticles.map((article) => (
              <article
                key={article.slug}
                class="surface-card home-article-card"
                data-tilt
                data-reveal
              >
                <a
                  href={`/blog/${article.slug}`}
                  class="group flex h-full flex-col p-5"
                  onClick={() => handleTrackedLink(`home-blog-${article.slug}`)}
                >
                  <div class="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                    <span class="text-orange-700 dark:text-orange-300">
                      {article.tag}
                    </span>
                    <span>·</span>
                    <time dateTime={article.createdAt}>
                      {articleDateFormatter.format(new Date(article.createdAt))}
                    </time>
                  </div>
                  <h3 class="mt-4 text-lg font-semibold leading-snug text-gray-900 dark:text-gray-100">
                    {article.title}
                  </h3>
                  <p class="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {article.shortDescription}
                  </p>
                  <div class="mt-auto flex items-center justify-between pt-6 text-xs font-semibold text-gray-500 dark:text-gray-500">
                    <span>{article.readingTime} min read</span>
                    <svg
                      class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m13 5 7 7-7 7" />
                    </svg>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
