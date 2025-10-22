import { trackEvent } from "../utils/track.ts";
import { renderTemplateWithComponents } from "../utils/contentTokens.tsx";
import { HomeData } from "../types/home.ts";

export interface HomePageProps {
  data: HomeData;
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

export default function HomePage({ data }: HomePageProps) {
  const heroTitle = renderTemplateWithComponents(data.title);
  const { sections } = data;
  const capabilitiesSection = sections.capabilities;
  const engagementsSection = sections.engagements;

  return (
    <div class="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-100">
      <section class="max-w-5xl mx-auto flex min-h-screen flex-col justify-center px-6 py-24 md:py-32">
        <div class="space-y-8">
          <div class="space-y-3">
            <div class="flex flex-col items-center gap-3 md:flex-row md:items-center md:justify-center md:gap-5">
              <img
                src={data.avatar.src}
                alt={data.avatar.alt}
                class="h-12 w-12 rounded-full object-cover md:h-[52px] md:w-[52px]"
                loading="eager"
              />
              <h1 class="text-center text-[32px] font-semibold leading-tight text-gray-900 dark:text-gray-100 md:text-[44px]">
                {data.name}
              </h1>
            </div>

            <p class="text-center text-base text-gray-600 dark:text-gray-300 md:text-lg">
              {heroTitle}
            </p>
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

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
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
        </div>
      </section>

      <section class="border-t border-gray-100 dark:border-gray-800">
        <div class="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-10">
          <div class="space-y-3">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {capabilitiesSection.heading}
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {capabilitiesSection.description}
            </p>
          </div>

          <div class="grid gap-6 md:grid-cols-3">
            {data.capabilityAreas.map((area) => (
              <div
                key={area.title}
                class="group flex h-full flex-col gap-4 rounded-2xl cursor-default border border-gray-100 bg-white/60 p-6 shadow-sm transition-all hover:border-gray-300 hover:bg-white dark:border-gray-800 dark:bg-black/40 dark:hover:border-gray-600 dark:hover:bg-black"
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
        </div>
      </section>

      <section class="border-t border-gray-100 dark:border-gray-800">
        <div class="max-w-5xl mx-auto px-6 py-12 pb-20 md:py-16 md:pb-24">
          <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {engagementsSection.heading}
            </h2>
            <a
              href={engagementsSection.secondaryCta.href}
              class="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-all hover:text-orange-500 dark:text-gray-300"
              onClick={() =>
                handleTrackedLink(
                  engagementsSection.secondaryCta.trackingTarget,
                )}
            >
              {engagementsSection.secondaryCta.label}
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

          <div class="mt-8 space-y-6">
            {data.highlightedWork.map((work) => (
              <a
                key={work.name}
                href={work.href}
                class="group block rounded-lg border border-gray-100 p-5 text-left shadow-sm transition-all hover:border-gray-300 hover:bg-white/80 dark:border-gray-800 dark:hover:border-gray-600 dark:hover:bg-black"
                onClick={() =>
                  handleTrackedLink(
                    work.trackingTarget ?? work.name.toLowerCase(),
                  )}
              >
                <div class="flex items-baseline justify-between gap-6">
                  <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100">
                    {work.name}
                  </h3>
                  {work.status && (
                    <span class="rounded-full border border-orange-200 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-orange-500 dark:border-orange-900/60">
                      {work.status}
                    </span>
                  )}
                </div>
                <p class="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {work.summary}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
