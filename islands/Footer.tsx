import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

function getTimeSince(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
    }
  }

  return 'just now';
}

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
          timeSince.value = getTimeSince(data.timestamp);
          // Update time every minute
          const interval = setInterval(() => {
            timeSince.value = getTimeSince(data.timestamp);
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
        // Add a small delay to ensure smooth transition
        setTimeout(() => {
          isLoaded.value = true;
        }, 100);
      });
  }, []);

  return (
    <footer class="fixed bottom-0 left-0 right-0 flex justify-center p-4">
      <div class={`flex items-center gap-3 text-sm font-mono opacity-0 transition-opacity duration-1000 ${isLoaded.value ? 'opacity-100' : ''}`}>
        <a 
          href="https://github.com/hrvojepavlinovic/hrvoje-pavlinovic"
          target="_blank"
          rel="noopener noreferrer"
          class="dark:text-white/20 text-black/20 hover:text-btc-orange dark:hover:text-btc-orange transition-all duration-300"
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
              class="dark:text-white/20 text-black/20 hover:text-btc-orange dark:hover:text-btc-orange transition-all duration-300"
            >
              {commitHash.value.substring(0, 7)}
            </a>
            <span class="dark:text-white/10 text-black/10">·</span>
            <span class="dark:text-white/20 text-black/20 transition-all duration-300">
              {timeSince.value}
            </span>
          </>
        )}
        {error.value && (
          <span class="dark:text-red-500/20 text-red-500/20 transition-all duration-300">
            {error.value}
          </span>
        )}
      </div>
    </footer>
  );
} 