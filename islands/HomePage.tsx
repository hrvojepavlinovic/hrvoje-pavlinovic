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

const ctaClasses = {
  primary:
    "group inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-all hover:text-orange-500 dark:text-gray-100",
  secondary:
    "group inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-all hover:text-orange-500 dark:text-gray-300",
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

  const pickStatValue = (category: { [K in MemoatoPeriod]: number | null }) => {
    const orderedPeriods: MemoatoPeriod[] = ["today", "week", "month", "year"];
    for (const period of orderedPeriods) {
      const value = category[period];
      if (value != null && value !== 0) {
        return { period, value };
      }
    }

    return { period: "year" as const, value: category.year ?? 0 };
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
        };
      })()
      : null,
  ].filter(Boolean) as Array<{ label: string; value: string; hint: string }>;

  return (
    <div class="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-100">
      <section class="max-w-5xl mx-auto flex min-h-screen flex-col justify-center px-6 py-24 md:py-32">
        <div class="space-y-8">
          <div class="space-y-4">
            <div class="space-y-2">
              <div class="flex justify-center">
                <img
                  src={data.avatar.src}
                  alt={data.avatar.alt}
                  class="h-12 w-12 rounded-full object-cover ring-1 ring-black/10 dark:ring-white/10 md:h-14 md:w-14"
                  loading="eager"
                />
              </div>
              <h1 class="mx-auto text-center text-[24px] font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-[28px] md:text-[48px]">
                {heroTitle}
              </h1>
              <p class="mx-auto text-center text-[13px] font-semibold text-gray-700 dark:text-gray-200 sm:text-[15px] md:text-lg">
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
                class="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-all hover:border-gray-900 hover:bg-black hover:text-white dark:border-gray-800 dark:text-gray-200 dark:hover:border-gray-100"
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

          <div class="space-y-4 text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-[17px] md:leading-loose">
            {data.heroParagraphs.map((paragraph, index) => (
              <p key={`hero-paragraph-${index}`} class="text-sm">
                {renderTemplateWithComponents(paragraph)}
              </p>
            ))}
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
            {data.ctaLinks.map((cta) => (
              <a
                key={cta.label}
                href={cta.href}
                class={ctaClasses[cta.variant]}
                onClick={() => handleTrackedLink(cta.trackingTarget)}
              >
                {cta.label}
                <svg
                  class="h-4 w-4 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </a>
            ))}
          </div>

          {heroMetrics.length > 0 && (
            <div class="space-y-3 pt-8">
              <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
                {heroMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    class="rounded-2xl border border-gray-200 bg-white/80 p-3 text-center shadow-sm dark:border-gray-800 dark:bg-black/40"
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
                ))}
              </div>

              <p class="text-center text-xs text-gray-500 dark:text-gray-500">
                Live stats shared from{" "}
                <a
                  href="https://memoato.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-semibold text-gray-700 underline decoration-gray-300 underline-offset-4 hover:text-orange-500 dark:text-gray-200 dark:decoration-gray-700"
                  onClick={() => handleTrackedLink("memoato-stats")}
                >
                  memoato.com
                </a>
                {" · "}
                <a
                  href="https://app.memoato.com/u/0xhp10"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-semibold text-gray-700 underline decoration-gray-300 underline-offset-4 hover:text-orange-500 dark:text-gray-200 dark:decoration-gray-700"
                  onClick={() => handleTrackedLink("memoato-profile-stats")}
                >
                  View stats on Memoato
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
