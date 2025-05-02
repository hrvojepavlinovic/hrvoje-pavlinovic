import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <div class="flex flex-col items-center justify-center min-h-screen p-4 pt-24">
      <h1 class="text-5xl md:text-6xl font-mono tracking-tight mb-4 dark:text-white text-black transition-colors duration-1000">
        404
      </h1>
      <p class="dark:text-white/60 text-black/60 text-lg tracking-wide transition-colors duration-1000">
        page not found
      </p>
      <a 
        href="/" 
        class="mt-8 dark:text-white/60 dark:hover:text-white text-black/60 hover:text-black text-base transition-colors duration-1000"
      >
        go back
      </a>
    </div>
  );
}
