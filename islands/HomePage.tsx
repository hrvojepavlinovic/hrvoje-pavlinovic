import { trackEvent } from "../utils/track.ts";

const socialLinks = [
  {
    label: "X (Twitter)",
    href: "https://x.com/0xhp10",
    icon:
      "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hpavlino",
    icon:
      "M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z",
  },
  {
    label: "GitHub",
    href: "https://github.com/hrvojepavlinovic",
    icon:
      "M12 .5a11.5 11.5 0 00-3.64 22.42c.57.11.77-.24.77-.54v-1.9c-3.14.69-3.8-1.52-3.8-1.52-.52-1.34-1.27-1.7-1.27-1.7-1.04-.72.08-.71.08-.71 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.25 3.32.96a2.4 2.4 0 01.71-1.51c-2.5-.28-5.12-1.27-5.12-5.64A4.42 4.42 0 016.4 7.7a4.1 4.1 0 01.11-3s.95-.3 3.1 1.17a10.7 10.7 0 015.64 0c2.15-1.47 3.1-1.17 3.1-1.17a4.1 4.1 0 01.11 3 4.42 4.42 0 011.17 3.06c0 4.39-2.63 5.36-5.14 5.64.41.35.77 1.04.77 2.1v3.12c0 .3.2.66.78.54A11.5 11.5 0 0012 .5z",
  },
  {
    label: "Email",
    href: "mailto:hrvoje@pavlinovic.com",
    icon:
      "M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67zM22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z",
  },
];

const highlightedWork = [
  {
    name: "Tilt",
    summary:
      "Building and scaling backend systems powering Tilt's interactive commerce platform—from livestream auctions to payments and personalization—while shaping API design, reliability, and engineering best practices across the team.",
    href: "https://tilt.app",
    status: "Current role",
  },
  {
    name: "ReneVerse",
    summary:
      "Architected event-driven infrastructure for interoperable blockchain gaming assets, scaling to billions of ad impressions while maintaining strict uptime targets.",
    href: "https://reneverse.io",
    status: "Recent engagement",
  },
];

const capabilityAreas = [
  {
    title: "Commerce systems that scale",
    intro:
      "12+ years shipping production backends across AI, Bitcoin, Web3, automotive, health care, and commerce.",
    points: [
      "Design end-to-end flows for livestreams, auctions, fulfilment, and payouts that feel instant for the teams running them.",
      "Scaled ad tech pipelines past 1.7B impressions while tightening performance and reliability guardrails.",
    ],
  },
  {
    title: "Delivery with guardrails",
    intro:
      "Keep teams close to customers by pairing architecture calls with the day-to-day execution that makes them real.",
    points: [
      "Bundle observability, performance, and developer ergonomics so shipping stays confident without trading off uptime.",
    ],
  },
  {
    title: "Founder-aligned partnership",
    intro:
      "Partner with founders from first build through compounding hypergrowth.",
    points: [
      "Embed with leads to translate business pressure into lean roadmaps and crisp engineering execution.",
      "Comfortable weaving legacy stacks and third-party integrations into modern surfaces without slowing velocity.",
    ],
  },
];

const handleTrackedLink = (target: string) => {
  trackEvent({ type: "click", clickType: "link", target });
};

export default function HomePage() {
  return (
    <div class="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <section class="max-w-5xl mx-auto flex min-h-screen flex-col justify-center px-6 py-24 md:py-32">
        <div class="space-y-10">
          <div class="flex items-center gap-4 md:gap-5">
            <img
              src="/pfptbs.png"
              alt="Hrvoje Pavlinovic"
              class="h-12 w-12 rounded-full object-cover md:h-[52px] md:w-[52px]"
              loading="eager"
            />
            <h1 class="text-[32px] font-semibold leading-tight text-gray-900 dark:text-gray-100 md:text-[44px]">
              Hrvoje Pavlinovic
            </h1>
          </div>

          <p class="text-base text-gray-600 dark:text-gray-300 md:text-lg">
            Senior backend engineer scaling interactive commerce at{" "}
            <a
              href="https://tilt.app"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center gap-1 text-gray-900 underline decoration-gray-300 underline-offset-4 transition-colors hover:text-orange-500 dark:text-gray-100"
              onClick={() => handleTrackedLink("tilt")}
            >
              Tilt
              <svg
                class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M7 17L17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </a>
          </p>

          <div class="flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:")
                  ? undefined
                  : "_blank"}
                rel={link.href.startsWith("mailto:")
                  ? undefined
                  : "noopener noreferrer"}
                class="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-all hover:-translate-y-0.5 hover:border-gray-900 hover:bg-gray-900 hover:text-white dark:border-gray-800 dark:text-gray-200 dark:hover:border-gray-100"
                onClick={() => handleTrackedLink(link.label.toLowerCase())}
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d={link.icon} />
                </svg>
                <span class="sr-only">{link.label}</span>
              </a>
            ))}
          </div>

          <div class="space-y-4 text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-[17px] md:leading-loose">
            <p>
              Two kids and a beatiful wife keep me moving. Busy schedule, quick workout sessions, occasional football game, which I adore. Recently more into padel and cycling because my knees can't take serious football anymore.</p>
            <p>
              I like building performant and making complex things simple, currently looking after Tilt's backend by day and explore whatever new tech sparks a thought once the house is quiet.
            </p>
            <p>
              12+ years learning my way through AI, Bitcoin, Web3, automotive, health care, and commerce. I've helped teams ship serverless systems, scale pipelines past 1.7B impressions, and more. Still curious, still improving.
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <a
              href="/cv"
              class="group inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-all hover:text-orange-500 dark:text-gray-100"
              onClick={() => handleTrackedLink("resume")}
            >
              Resume
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
            <a
              href="/projects"
              class="group inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-all hover:text-orange-500 dark:text-gray-300"
              onClick={() => handleTrackedLink("projects")}
            >
              Personal Projects
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
          </div>
        </div>
      </section>

      <section class="border-t border-gray-100 dark:border-gray-800">
        <div class="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-10">
          <div class="space-y-3">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              How I help teams
            </h2>
            <p class="max-w-3xl text-sm text-gray-600 dark:text-gray-400">
              Systems work best when they disappear into the background. Here's how I keep them simple, sturdy, and aligned with the people using them.
            </p>
          </div>

          <div class="grid gap-6 md:grid-cols-3">
            {capabilityAreas.map((area) => (
              <div
                key={area.title}
                class="group flex h-full flex-col gap-4 rounded-2xl border border-gray-100 bg-white/60 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-gray-300 hover:bg-white dark:border-gray-800 dark:bg-gray-900/40 dark:hover:border-gray-600 dark:hover:bg-gray-900"
              >
                <div class="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-orange-500">
                  <span class="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  {area.title}
                </div>
                <p class="text-sm text-gray-600 transition-colors group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-100">
                  {area.intro}
                </p>
                <ul class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  {area.points.map((point) => (
                    <li key={point} class="flex items-start gap-3">
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
              Recent engagements
            </h2>
            <a
              href="/projects"
              class="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-all hover:text-orange-500 dark:text-gray-300"
              onClick={() => handleTrackedLink("projects-secondary")}
            >
              See additional work
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
            {highlightedWork.map((work) => (
              <a
                key={work.name}
                href={work.href}
                class="group block rounded-lg border border-gray-100 p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-gray-300 hover:bg-white/80 dark:border-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-900"
                onClick={() => handleTrackedLink(work.name.toLowerCase())}
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
