import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { formatTimeAgo } from "../utils/blog.ts";

export default function Footer() {
  const commitHash = useSignal<string | null>(null);
  const commitTime = useSignal<string | null>(null);
  const timeSince = useSignal<string>("");
  const error = useSignal<string>("");
  const isLoaded = useSignal(false);

  useEffect(() => {
    fetch("/api/commit")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }

        if (data.hash && data.timestamp) {
          commitHash.value = data.hash;
          commitTime.value = data.timestamp;
          timeSince.value = formatTimeAgo(data.timestamp);
          const interval = setInterval(() => {
            timeSince.value = formatTimeAgo(data.timestamp);
          }, 60000);
          return () => clearInterval(interval);
        } else {
          throw new Error("Missing hash or timestamp in response");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch commit info:", error);
        error.value = error.message;
      })
      .finally(() => {
        setTimeout(() => {
          isLoaded.value = true;
        }, 100);
      });
  }, []);

  return (
    <footer
      class="border-transparent pt-10"
      style={{
        backgroundImage:
          "linear-gradient(to top, var(--theme-background-opaque) 40%, transparent 100%)",
      }}
    >
      <div class="max-w-screen-xl mx-auto px-4 py-4">
        <div
          class={`flex items-center justify-center gap-2 sm:gap-4 transition-opacity duration-300 ${
            isLoaded.value ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Main Links Section */}
          <div class="flex items-center gap-1 sm:gap-2">
            <a
              href="https://github.com/hrvojepavlinovic/hrvoje-pavlinovic"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center px-2 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground dark:text-white/60 text-black/60 dark:hover:bg-white/5 hover:bg-black/5 dark:hover:text-white/80 hover:text-black/80"
              title="View source code"
            >
              <svg
                class="w-3 h-3 mr-1 sm:mr-1.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span class="hidden md:inline">source</span>
            </a>

            <a
              href="/webstats"
              class="inline-flex items-center justify-center px-2 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground dark:text-white/60 text-black/60 dark:hover:bg-white/5 hover:bg-black/5 dark:hover:text-white/80 hover:text-black/80"
              title="View page statistics"
            >
              <svg
                class="w-3 h-3 mr-1 sm:mr-1.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
              <span class="hidden md:inline">stats</span>
            </a>
          </div>

          {/* Git Info Section */}
          {commitHash.value && (
            <div class="flex items-center gap-1 sm:gap-2">
              <div class="w-px h-3 sm:h-4 dark:bg-white/10 bg-black/10"></div>

              <div class="flex items-center gap-1 sm:gap-2 text-xs">
                <a
                  href={`https://github.com/hrvojepavlinovic/hrvoje-pavlinovic/commit/${commitHash.value}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center px-1 sm:px-2 py-1 rounded text-xs font-mono transition-colors dark:text-white/50 text-black/50 dark:hover:text-white/70 hover:text-black/70 dark:hover:bg-white/5 hover:bg-black/5"
                  title={`Commit: ${commitHash.value}`}
                >
                  <svg
                    class="w-3 h-3 mr-0.5 sm:mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {commitHash.value.substring(0, 7)}
                </a>

                <span class="dark:text-white/40 text-black/40 font-mono hidden md:inline">
                  {timeSince.value}
                </span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error.value && (
            <div class="flex items-center">
              <div class="w-px h-3 sm:h-4 dark:bg-red-500/20 bg-red-500/20">
              </div>
              <span class="inline-flex items-center px-1 sm:px-2 py-1 rounded-md text-xs font-medium dark:text-red-400/70 text-red-500/70 dark:bg-red-500/10 bg-red-500/10">
                <svg
                  class="w-3 h-3 mr-0.5 sm:mr-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span class="hidden md:inline">{error.value}</span>
              </span>
            </div>
          )}

          {/* Build Info */}
          <div class="flex items-center gap-1 sm:gap-2">
            <div class="w-px h-3 sm:h-4 dark:bg-white/10 bg-black/10"></div>
            <a
              href="https://fresh.deno.dev/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-1 sm:px-2 py-1 rounded text-xs font-mono transition-colors dark:text-white/40 text-black/40 dark:hover:text-white/60 hover:text-black/60 dark:hover:bg-white/5 hover:bg-black/5"
              title="Built with Fresh"
            >
              <svg
                class="w-3 h-3 mr-0.5 sm:mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              fresh
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
