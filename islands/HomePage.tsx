import { trackEvent } from "../utils/track.ts";
import { renderTemplateWithComponents } from "../utils/contentTokens.tsx";
import { HomeData } from "../types/home.ts";
import { MemoatoPublicStats } from "../utils/memoatoStats.ts";

export interface HomePageProps {
  data: HomeData;
  memoatoStats?: MemoatoPublicStats | null;
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

export default function HomePage({ data, memoatoStats }: HomePageProps) {
  const heroTitle = renderTemplateWithComponents(data.title);
  const heroStat = renderTemplateWithComponents(data.heroStat);
  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
  });
  const integerFormatter = new Intl.NumberFormat("en-US");

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
    </div>
  );
}
