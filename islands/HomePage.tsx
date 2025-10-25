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

  return (
    <div class="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-100">
      <section class="max-w-5xl mx-auto flex min-h-screen flex-col justify-center px-6 py-24 md:py-32">
        <div class="space-y-8">
          <div class="space-y-1">
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
        </div>
      </section>
    </div>
  );
}
