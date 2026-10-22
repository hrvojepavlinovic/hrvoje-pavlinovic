import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { formatTimeAgo } from "../utils/blog.ts";

const SOURCE_URL = "https://github.com/hrvojepavlinovic/hrvoje-pavlinovic";

interface Release {
  hash: string;
  timestamp: string;
}

function ExternalArrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

export default function Footer() {
  const release = useSignal<Release | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    async function loadRelease() {
      try {
        const response = await fetch("/api/commit", {
          signal: controller.signal,
        });
        if (!response.ok) return;
        const data = await response.json();
        if (
          typeof data?.hash === "string" &&
          /^[a-f0-9]{7,40}$/i.test(data.hash) &&
          typeof data?.timestamp === "string" &&
          Number.isFinite(Date.parse(data.timestamp)) &&
          !controller.signal.aborted
        ) {
          release.value = { hash: data.hash, timestamp: data.timestamp };
        }
      } catch {
        // Keep the permanent release-history link when metadata is unavailable.
      } finally {
        clearTimeout(timeout);
      }
    }

    loadRelease();
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return (
    <footer class="site-footer">
      <div class="footer-inner">
        <a class="footer-name" href="/">
          Hrvoje Pavlinovic<span>.</span>
        </a>

        <nav class="footer-links" aria-label="Site information">
          <a href="/webstats">Web stats</a>
          <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer">
            Source code <ExternalArrow />
          </a>
          <a
            href="https://fresh.deno.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Built with Fresh <ExternalArrow />
          </a>
        </nav>

        <div class="footer-release">
          {release.value
            ? (
              <>
                <a
                  href={`${SOURCE_URL}/commit/${release.value.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Last release ${release.value.hash.slice(0, 7)}`}
                >
                  Last release <span>{release.value.hash.slice(0, 7)}</span>
                </a>
                <time
                  dateTime={release.value.timestamp}
                  title={new Date(release.value.timestamp).toUTCString()}
                >
                  {formatTimeAgo(release.value.timestamp)}
                </time>
              </>
            )
            : (
              <a
                href={`${SOURCE_URL}/commits/main/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Release history <ExternalArrow />
              </a>
            )}
        </div>
      </div>
    </footer>
  );
}
