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
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
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
      .catch(error => {
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
      class="fixed bottom-0 left-0 right-0 flex justify-center p-6 z-50"
      style={{ backgroundImage: 'linear-gradient(to top, var(--theme-background-opaque) 50%, transparent 100%)' }}
    >
      <div class={`flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-mono ${isLoaded.value ? 'opacity-100' : 'opacity-0'}`}>
        <a 
          href="https://github.com/hrvojepavlinovic/hrvoje-pavlinovic"
          target="_blank"
          rel="noopener noreferrer"
          class="dark:text-white/20 text-black/20 hover:text-btc-orange dark:hover:text-btc-orange whitespace-nowrap"
        >
          source
        </a>
        {commitHash.value && (
          <>
            <span class="dark:text-white/10 text-black/10">·</span>
            <a 
              href={`https://github.com/hrvojepavlinovic/hrvoje-pavlinovic/commit/${commitHash.value}`}
              target="_blank"
              rel="noopener noreferrer"
              class="dark:text-white/20 text-black/20 hover:text-btc-orange dark:hover:text-btc-orange whitespace-nowrap"
            >
              {commitHash.value.substring(0, 7)}
            </a>
            <span class="dark:text-white/10 text-black/10">·</span>
            <span class="dark:text-white/20 text-black/20 whitespace-nowrap">
              {timeSince.value}
            </span>
          </>
        )}
        {error.value && (
          <span class="dark:text-red-500/20 text-red-500/20 whitespace-nowrap">
            {error.value}
          </span>
        )}
        <span class="dark:text-white/10 text-black/10">·</span>
        <a 
          href="/webstats" 
          class="dark:text-white/20 text-black/20 hover:text-btc-orange dark:hover:text-btc-orange whitespace-nowrap"
          title="View page statistics"
        >
          stats
        </a>
      </div>
    </footer>
  );
} 