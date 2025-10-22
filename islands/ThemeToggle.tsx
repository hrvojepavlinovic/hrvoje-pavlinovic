import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

function getInitialTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  return "dark"; // Default to dark, will be updated in useEffect
}

export default function ThemeToggle() {
  const theme = useSignal<"dark" | "light">(getInitialTheme());

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      theme.value = savedTheme;
    } else {
      const isDark =
        globalThis.matchMedia("(prefers-color-scheme: dark)").matches;
      theme.value = isDark ? "dark" : "light";
    }

    if (theme.value === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        const newTheme = theme.value === "dark" ? "light" : "dark";
        theme.value = newTheme;
        document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", newTheme);
      }}
      class="inline-flex items-center justify-center rounded-md w-9 h-9 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:border-white/10 border-black/10 dark:bg-black/50 bg-white/50 dark:hover:bg-white/5 hover:bg-black/5 backdrop-blur-sm shadow-sm dark:shadow-white/5 shadow-black/5"
      aria-label={`Switch to ${theme.value === "dark" ? "light" : "dark"} mode`}
    >
      {theme.value === "dark"
        ? (
          // Sun icon for switching to light mode
          <svg
            class="h-4 w-4 rotate-0 scale-100 transition-all"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="m12 2 0 2" />
            <path d="m12 20 0 2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="m2 12 2 0" />
            <path d="m20 12 2 0" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        )
        : (
          // Moon icon for switching to dark mode
          <svg
            class="h-4 w-4 rotate-0 scale-100 transition-all"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        )}
    </button>
  );
}
