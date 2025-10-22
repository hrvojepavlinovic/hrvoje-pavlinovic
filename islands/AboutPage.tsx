const todayFocus = [
  {
    title: "Where I spend my days",
    description:
      "Croatia-based and working remotely with teams like Tilt, ReneVerse, and CryptoToday. I keep backends steady, evolve event-driven services, and make sure the experience feels quick for the people running the shows.",
  },
  {
    title: "Family and fitness",
    description:
      "Two kids, school runs, and the occasional Sunday football game keep me honest. Early workouts and evening walks balance the screen time.",
  },
  {
    title: "Always learning",
    description:
      "I stay close to new tooling—serverless patterns, observability stacks, bitcoin protocols—and share the useful bits with the teams I work with.",
  },
];

const journey = [
  {
    period: "2013 → 2016",
    summary:
      "Collected 3,000+ hours of hands-on work while finishing my computer science degree—shipping early-stage web and mobile projects, picking up production habits, and learning how to keep commitments to real users.",
  },
  {
    period: "2016 → 2021",
    summary:
      "On-site engineering roles with Ericsson, Profico, and Rimac. Led distributed systems work, integrated legacy stacks, and helped teams adopt safer delivery practices across automotive and telco projects.",
  },
  {
    period: "2021 → today",
    summary:
      "Remote B2B engagements with Povio, ReneVerse, CryptoToday, and Tilt. Scaled ReneVerse's ad infrastructure past 1.7B monthly impressions, shaped bitcoin-first products, and now guide Tilt's interactive commerce backend.",
  },
];

const principles = [
  "Build things that feel effortless for the people using them.",
  "Ship with context: architecture decisions are only as good as the daily execution that follows.",
  "Leave teams better than I found them by documenting, mentoring, and setting healthy defaults.",
];

export default function AboutPage() {
  return (
    <div class="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-100">
      <section class="max-w-4xl mx-auto flex min-h-screen flex-col justify-center px-6 py-24 md:py-32">
        <div class="space-y-10">
          <div class="flex items-center gap-4 md:gap-5">
            <img
              src="/pfptbs.png"
              alt="Hrvoje Pavlinovic"
              class="h-12 w-12 rounded-full object-cover md:h-[52px] md:w-[52px]"
              loading="eager"
            />
            <div>
              <h1 class="text-[32px] font-semibold leading-tight text-gray-900 dark:text-gray-100 md:text-[44px]">
                About Hrvoje
              </h1>
              <p class="text-sm text-gray-600 dark:text-gray-400 md:text-base">
                Croatia-based senior backend engineer, dad of two, always
                learning.
              </p>
            </div>
          </div>

          <div class="space-y-4 text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-[17px] md:leading-loose">
            <p>
              I'm a builder at heart. I like when systems do their job quietly
              and let people focus on the work that matters. Family life keeps
              me grounded; shipping production software keeps me curious.
            </p>
            <p>
              Most days you'll find me refining backend services, pairing with
              teams, or running small experiments with new tooling. Evenings are
              for family, recovery, and the occasional replay of the weekend
              match.
            </p>
          </div>
        </div>
      </section>

      <section class="border-t border-gray-100 dark:border-gray-800">
        <div class="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-12">
          <div class="space-y-3">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              What currently matters
            </h2>
            <p class="max-w-3xl text-sm text-gray-600 dark:text-gray-400">
              A snapshot of where my attention goes today and how I keep growing
              alongside the teams I support.
            </p>
          </div>

          <div class="grid gap-6 md:grid-cols-3">
            {todayFocus.map((item) => (
              <div
                key={item.title}
                class="group flex h-full flex-col gap-4 rounded-2xl border border-gray-100 bg-white/60 p-6 shadow-sm transition-all hover:border-gray-300 hover:bg-white dark:border-gray-800 dark:bg-black/40 dark:hover:border-gray-600 dark:hover:bg-black"
              >
                <div class="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-orange-500">
                  <span class="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  {item.title}
                </div>
                <p class="text-sm text-gray-600 transition-colors group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-100">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="border-t border-gray-100 dark:border-gray-800">
        <div class="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-12">
          <div class="space-y-3">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Path so far
            </h2>
            <p class="max-w-3xl text-sm text-gray-600 dark:text-gray-400">
              A quick tour through the work that's shaped how I build today.
            </p>
          </div>

          <div class="space-y-6">
            {journey.map((entry) => (
              <div
                key={entry.period}
                class="group rounded-2xl border border-gray-100 bg-white/60 p-6 shadow-sm transition-all hover:border-gray-300 hover:bg-white dark:border-gray-800 dark:bg-black/40 dark:hover:border-gray-600 dark:hover:bg-black"
              >
                <div class="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-orange-500">
                  <span class="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  {entry.period}
                </div>
                <p class="mt-3 text-sm text-gray-600 transition-colors group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-100">
                  {entry.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="border-t border-gray-100 dark:border-gray-800">
        <div class="max-w-5xl mx-auto px-6 py-12 pb-24 md:py-16 md:pb-28 space-y-8">
          <div class="space-y-3">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              How I like to work
            </h2>
            <p class="max-w-3xl text-sm text-gray-600 dark:text-gray-400">
              A few reminders I keep close, whether I'm pairing with founders or
              mentoring a team.
            </p>
          </div>

          <ul class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            {principles.map((principle) => (
              <li
                key={principle}
                class="group flex items-start gap-3 rounded-2xl border border-transparent px-4 py-3 transition-all hover:border-gray-200 hover:bg-white/70 hover:text-gray-900 dark:hover:border-gray-700 dark:hover:bg-black dark:hover:text-gray-100"
              >
                <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-300 transition-colors group-hover:bg-orange-400" />
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
