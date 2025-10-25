import { trackEvent } from "../utils/track.ts";
import { AboutData, TrainingProgress, TrainingStat } from "../types/about.ts";

interface AboutPageProps {
  data: AboutData;
}

function StatCard({ label, value, hint }: TrainingStat) {
  return (
    <div class="space-y-2 rounded-2xl border border-gray-200 bg-white/80 p-6 dark:border-gray-800 dark:bg-black/40">
      <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </p>
      <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        {value}
      </p>
      {hint && (
        <p class="text-xs text-gray-500 dark:text-gray-500">
          {hint}
        </p>
      )}
    </div>
  );
}

function ProgressCard({ label, current, goal, unit }: TrainingProgress) {
  const percentage = Math.min(100, Math.round((current / goal) * 100));

  return (
    <div class="space-y-3 rounded-2xl border border-gray-200 bg-white/80 p-6 dark:border-gray-800 dark:bg-black/40">
      <div class="flex items-baseline justify-between gap-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {label}
          </p>
          <p class="text-sm text-gray-700 dark:text-gray-300">
            {current.toLocaleString()} {unit}
          </p>
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-500">
          Target {goal.toLocaleString()} {unit}
        </p>
      </div>
      <div class="h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <div
          class="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 transition-all"
          style={`width: ${percentage}%`}
        />
      </div>
    </div>
  );
}

export default function AboutPage({ data }: AboutPageProps) {
  return (
    <div class="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-100">
      <section class="max-w-4xl mx-auto px-6 pt-32 pb-16 space-y-6 md:pt-40">
        <p class="text-sm font-semibold uppercase tracking-wide text-orange-500">
          {data.pageTitle}
        </p>
        <h1 class="text-[32px] font-semibold leading-tight text-gray-900 dark:text-gray-100 md:text-[44px]">
          {data.intro.heading}
        </h1>
        <p class="text-base text-gray-600 dark:text-gray-300 md:text-lg">
          {data.intro.summary}
        </p>
        <div class="space-y-4 text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-[17px] md:leading-loose">
          {data.intro.paragraphs.map((paragraph, index) => (
            <p key={`intro-paragraph-${index}`}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section class="border-t border-gray-100 dark:border-gray-900">
        <div class="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-10">
          <div class="space-y-3">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {data.work.heading}
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400 md:text-base">
              {data.work.description}
            </p>
          </div>

          <div class="grid gap-6 md:grid-cols-3">
            {data.work.capabilityAreas.map((area) => (
              <div
                key={area.title}
                class="group flex h-full flex-col gap-4 rounded-2xl border border-gray-100 bg-white/60 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-gray-300 hover:bg-white dark:border-gray-800 dark:bg-black/40 dark:hover:border-gray-600 dark:hover:bg-black"
              >
                <div class="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-orange-500">
                  <span class="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  {area.title}
                </div>
                <p class="text-sm text-gray-600 transition-colors group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-100">
                  {area.intro}
                </p>
                <ul class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  {area.points.map((point, pointIndex) => (
                    <li
                      key={`${area.title}-${pointIndex}`}
                      class="flex items-start gap-3"
                    >
                      <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-300 transition-colors group-hover:bg-orange-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div class="space-y-4">
            <div class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Recent partnerships
              </h3>
              <a
                href="/projects"
                class="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-all hover:text-orange-500 dark:text-gray-300"
                onClick={() =>
                  trackEvent({
                    type: "click",
                    clickType: "link",
                    target: "projects-from-about",
                  })}
              >
                See more work
                <svg
                  class="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
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
            </div>

            <div class="grid gap-6 md:grid-cols-2">
              {data.work.highlightedWork.map((work) => (
                <a
                  key={work.name}
                  href={work.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white/60 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-gray-300 hover:bg-white dark:border-gray-800 dark:bg-black/40 dark:hover:border-gray-600 dark:hover:bg-black"
                  onClick={() =>
                    trackEvent({
                      type: "click",
                      clickType: "link",
                      target: work.trackingTarget ?? work.name.toLowerCase(),
                    })}
                >
                  <div class="space-y-3">
                    <div class="flex items-center justify-between gap-4">
                      <h4 class="text-base font-semibold text-gray-900 dark:text-gray-100">
                        {work.name}
                      </h4>
                      {work.status && (
                        <span class="rounded-full border border-orange-200 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-orange-500 dark:border-orange-900/60">
                          {work.status}
                        </span>
                      )}
                    </div>
                    <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {work.summary}
                    </p>
                  </div>
                  <span class="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors group-hover:text-orange-500 dark:text-gray-300">
                    Visit
                    <svg
                      class="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
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
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section class="border-t border-gray-100 dark:border-gray-900">
        <div class="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-8">
          <div class="space-y-3">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {data.journey.heading}
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400 md:text-base">
              {data.journey.summary}
            </p>
          </div>

          <div class="space-y-6">
            {data.journey.stops.map((stop) => (
              <div
                key={stop.period}
                class="rounded-2xl border border-gray-100 bg-white/70 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-gray-300 hover:bg-white dark:border-gray-800 dark:bg-black/40 dark:hover:border-gray-600 dark:hover:bg-black"
              >
                <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {stop.period}
                </p>
                <h3 class="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {stop.headline}
                </h3>
                <p class="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {stop.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="border-t border-gray-100 dark:border-gray-900">
        <div class="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-10">
          <div class="space-y-3">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {data.life.heading}
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400 md:text-base">
              {data.life.summary}
            </p>
          </div>

          <div class="grid gap-6 md:grid-cols-3">
            {data.life.focusAreas.map((area) => (
              <div
                key={area.title}
                class="flex h-full flex-col gap-3 rounded-2xl border border-gray-100 bg-white/60 p-6 shadow-sm dark:border-gray-800 dark:bg-black/40"
              >
                <div class="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-orange-500">
                  <span class="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  {area.title}
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="border-t border-gray-100 dark:border-gray-900">
        <div class="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-10">
          <div class="space-y-3">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {data.training.heading}
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400 md:text-base">
              {data.training.summary}
            </p>
          </div>

          <div class="grid gap-6 md:grid-cols-3">
            {data.training.stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          <div class="grid gap-6 md:grid-cols-3">
            {data.training.progress.map((item) => (
              <ProgressCard key={item.label} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section class="border-t border-gray-100 dark:border-gray-900">
        <div class="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {data.principles.heading}
          </h2>
          <ul class="space-y-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300 md:text-base md:leading-relaxed">
            {data.principles.items.map((principle, index) => (
              <li key={`principle-${index}`} class="flex items-start gap-3">
                <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-400" />
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
