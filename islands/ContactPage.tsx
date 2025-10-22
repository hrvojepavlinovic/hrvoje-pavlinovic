import { trackEvent } from "../utils/track.ts";

const CONTACT_LINKS = [
  {
    label: "Email",
    href: "mailto:hrvoje@pavlinovic.com",
    hint: "Direct notes land in my inbox",
    icon: "email",
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/0xhp10",
    hint: "Fast takes, shipping updates, occasional memes",
    icon: "x",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/hpavlino",
    hint: "Professional context and longer-form exchanges",
    icon: "linkedin",
  },
  {
    label: "Telegram",
    href: "https://t.me/Oxhp10",
    hint: "Quick coordination, crypto chat, async voice notes",
    icon: "telegram",
  },
  {
    label: "GitHub",
    href: "https://github.com/hrvojepavlinovic",
    hint: "Code, experiments, and changelogs",
    icon: "github",
  },
];

function LinkIcon({ type }: { type: string }) {
  switch (type) {
    case "email":
      return (
        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
        </svg>
      );
    case "x":
      return (
        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
        </svg>
      );
    case "telegram":
      return (
        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.72 13.23l-.36 5.12c.51 0 .73-.22 1-.5l2.4-2.29 4.98 3.64c.91.5 1.56.24 1.8-.84l3.26-15.27.01-.01c.29-1.37-.45-1.9-1.33-1.56L1.57 9.48c-1.31.51-1.29 1.23-.22 1.56l5.02 1.56L18.52 5.7c.55-.35 1.05-.16.64.24" />
        </svg>
      );
    case "github":
      return (
        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .5a11.5 11.5 0 00-3.64 22.42c.57.11.77-.24.77-.54v-1.9c-3.14.69-3.8-1.52-3.8-1.52-.52-1.34-1.27-1.7-1.27-1.7-1.04-.72.08-.71.08-.71 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.25 3.32.96a2.4 2.4 0 01.71-1.51c-2.5-.28-5.12-1.27-5.12-5.64A4.42 4.42 0 016.4 7.7a4.1 4.1 0 01.11-3s.95-.3 3.1 1.17a10.7 10.7 0 015.64 0c2.15-1.47 3.1-1.17 3.1-1.17a4.1 4.1 0 01.11 3 4.42 4.42 0 011.17 3.06c0 4.39-2.63 5.36-5.14 5.64.41.35.77 1.04.77 2.1v3.12c0 .3.2.66.78.54A11.5 11.5 0 0012 .5z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ContactPage() {
  return (
    <div class="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-100">
      <section class="max-w-5xl mx-auto flex min-h-screen flex-col justify-center px-6 py-24 md:py-32">
        <div class="space-y-8">
          <div class="flex items-center gap-4 md:gap-5">
            <img
              src="/pfptbs.png"
              alt="Hrvoje Pavlinovic"
              class="h-12 w-12 rounded-full object-cover md:h-[52px] md:w-[52px]"
              loading="eager"
            />
            <div>
              <h1 class="text-[32px] font-semibold leading-tight text-gray-900 dark:text-gray-100 md:text-[44px]">
                Let’s talk
              </h1>
              <p class="text-sm text-gray-600 dark:text-gray-400 md:text-base">
                Founder-to-founder conversations, technical deep dives, and lean
                delivery engagements.
              </p>
            </div>
          </div>

          <p class="max-w-3xl text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-[17px] md:leading-loose">
            I reply fastest when there’s context. Share the problem, timelines,
            constraints, and what success looks like. I’ll confirm availability
            or suggest a better fit.
          </p>

          <div class="flex flex-wrap items-center gap-3 pt-2">
            {CONTACT_LINKS.map((link) => (
              <a
                key={`${link.label}-hero`}
                href={link.href}
                onClick={() =>
                  trackEvent({
                    type: "click",
                    clickType: "link",
                    target: link.label.toLowerCase(),
                  })}
                class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:border-gray-900 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-100"
                aria-label={link.label}
              >
                <LinkIcon type={link.icon} />
                <span class="sr-only">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section class="border-t border-gray-100 dark:border-gray-800">
        <div class="max-w-5xl mx-auto px-6 py-12 pb-24 md:py-16 md:pb-28">
          <div class="grid gap-6 md:grid-cols-2">
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() =>
                  trackEvent({
                    type: "click",
                    clickType: "link",
                    target: link.label.toLowerCase(),
                  })}
                class="rounded-2xl border border-gray-200 bg-white/80 p-6 transition-colors hover:border-gray-300 dark:border-gray-800 dark:bg-black/40 dark:hover:border-gray-600"
              >
                <div class="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                    <LinkIcon type={link.icon} />
                  </div>
                  <span class="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {link.label}
                  </span>
                </div>
                <p class="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  {link.hint}
                </p>
                <p class="mt-2 text-xs text-gray-500 dark:text-gray-500">
                  {link.href.startsWith("mailto:")
                    ? link.href.replace(/^mailto:/, "")
                    : link.href}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
