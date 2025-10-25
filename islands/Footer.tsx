import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { formatTimeAgo } from "../utils/blog.ts";

export default function Footer() {
  const commitHash = useSignal<string | null>(null);
  const commitTimestamp = useSignal<string | null>(null);
  const timeSince = useSignal<string>("");
  const error = useSignal<string>("");
  const isLoaded = useSignal(false);

  useEffect(() => {
    let isMounted = true;
    let intervalId: number | undefined;

    const loadCommitInfo = async () => {
      try {
        const response = await fetch("/api/commit");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data?.hash || !data?.timestamp) {
          throw new Error("Missing hash or timestamp in response");
        }

        if (!isMounted) return;

        commitHash.value = data.hash;
        commitTimestamp.value = data.timestamp;
        timeSince.value = formatTimeAgo(data.timestamp);

        intervalId = globalThis.setInterval(() => {
          if (commitTimestamp.value) {
            timeSince.value = formatTimeAgo(commitTimestamp.value);
          }
        }, 60000);
      } catch (err) {
        console.error("Failed to fetch commit info:", err);
        if (!isMounted) return;
        error.value = err instanceof Error ? err.message : String(err);
      } finally {
        setTimeout(() => {
          if (isMounted) {
            isLoaded.value = true;
          }
        }, 120);
      }
    };

    loadCommitInfo();

    return () => {
      isMounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <footer class="mt-20 border-t border-black/10 bg-white/70 backdrop-blur-sm dark:border-white/10 dark:bg-black/70">
      <div
        class={`max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-opacity duration-500 ${
          isLoaded.value ? "opacity-100" : "opacity-0"
        }`}
      >
        <div class="flex flex-col gap-6 text-sm text-black/65 dark:text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex flex-wrap items-center gap-2 sm:gap-3">
            <span class="flex items-center gap-2 text-black/55 dark:text-white/55">
              <span class="relative flex h-2.5 w-2.5">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75">
                </span>
                <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400">
                </span>
              </span>
              Last release
            </span>
            {commitHash.value && commitTimestamp.value && (
              <>
                <a
                  href={`https://github.com/hrvojepavlinovic/hrvoje-pavlinovic/commit/${commitHash.value}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-mono text-black/75 transition hover:text-black/95 dark:text-white/75 dark:hover:text-white"
                >
                  {commitHash.value.substring(0, 7)}
                </a>
                <span class="text-xs text-black/45 dark:text-white/50">
                  {timeSince.value}
                </span>
                <a
                  href="https://github.com/hrvojepavlinovic/hrvoje-pavlinovic"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-1 text-sm font-medium text-black/60 transition hover:text-black/85 dark:text-white/70 dark:hover:text-white"
                >
                  <svg
                    class="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.57.11.77-.24.77-.54v-1.9c-3.14.69-3.8-1.52-3.8-1.52-.52-1.34-1.27-1.7-1.27-1.7-1.04-.72.08-.71.08-.71 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.25 3.32.96.21-.67.54-1.25.96-1.6-2.5-.28-5.12-1.27-5.12-5.64A4.42 4.42 0 0 1 6.4 7.7a4.1 4.1 0 0 1 .11-3s.95-.3 3.1 1.17a10.7 10.7 0 0 1 5.64 0c2.15-1.47 3.1-1.17 3.1-1.17a4.1 4.1 0 0 1 .11 3 4.42 4.42 0 0 1 1.17 3.06c0 4.39-2.63 5.36-5.14 5.64.41.35.77 1.04.77 2.1v3.12c0 .3.2.66.78.54A11.5 11.5 0 0 0 12 .5z" />
                  </svg>
                  Source
                </a>
              </>
            )}

            {!commitHash.value && !error.value && (
              <span class="flex items-center gap-2 text-black/45 dark:text-white/50">
                <span class="h-2.5 w-2.5 rounded-full bg-emerald-300"></span>
                Syncing release…
              </span>
            )}

            {error.value && (
              <span class="flex items-center gap-2 text-red-500 dark:text-red-300">
                <span class="h-2.5 w-2.5 rounded-full bg-red-400"></span>
                {error.value}
              </span>
            )}
          </div>

          <div class="flex flex-wrap items-center gap-4">
            <a
              href="/webstats"
              class="flex items-center gap-2 text-black/60 transition hover:text-black/85 dark:text-white/70 dark:hover:text-white"
            >
              <svg
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M4 19h16" />
                <path d="M6 16l3-7 3 4 3-6 3 9" />
              </svg>
              Web stats
            </a>

            <a
              href="/contact"
              class="flex items-center gap-2 text-black/60 transition hover:text-black/85 dark:text-white/70 dark:hover:text-white"
            >
              <svg
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M4 4h16v16H4z" strokeLinejoin="round" />
                <path d="m4 7 8 6 8-6" strokeLinejoin="round" />
              </svg>
              Contact
            </a>

            <a
              href="https://fresh.deno.dev/"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-black/60 transition hover:text-black/85 dark:text-white/65 dark:hover:text-white"
            >
              Built with
              <span class="h-2.5 w-2.5 rounded-full bg-amber-300"></span>
              Fresh
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
