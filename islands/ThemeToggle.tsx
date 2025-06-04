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
      const isDark = globalThis.matchMedia("(prefers-color-scheme: dark)").matches;
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
      class="dark:text-white/60 text-black/60 dark:hover:text-white hover:text-black text-base px-5 py-7 inline-block w-[70px] text-center"
      aria-label="Toggle theme"
    >
      {theme.value === "dark" ? "light" : "dark"}
    </button>
  );
} 