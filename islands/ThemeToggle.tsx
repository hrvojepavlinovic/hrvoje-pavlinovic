import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export default function ThemeToggle() {
  const isDark = useSignal(true);

  // Handle all DOM operations in useEffect
  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      isDark.value = savedTheme === "dark";
    } else {
      isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    // Initial theme setup
    if (isDark.value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Watch for changes
    const unsubscribe = isDark.subscribe((dark) => {
      if (dark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("theme", dark ? "dark" : "light");
    });

    return () => {
      unsubscribe();
    };
  }, []); // Empty deps array means this runs once on mount

  return (
    <button
      onClick={() => isDark.value = !isDark.value}
      class="dark:text-white/60 dark:hover:text-white text-black/60 hover:text-black text-base px-5 py-5 inline-block transition-colors duration-1000 w-[70px] text-center"
      aria-label={`Switch to ${isDark.value ? 'light' : 'dark'} mode`}
    >
      {isDark.value ? "light" : "dark"}
    </button>
  );
} 