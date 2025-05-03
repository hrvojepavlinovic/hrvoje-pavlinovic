interface ComingSoonProps {
  pageName?: string;
}

export default function ComingSoon({ pageName = "" }: ComingSoonProps) {
  return (
    <div class="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 class="dark:text-white/60 text-black/60 text-2xl tracking-wide transition-colors duration-1000">
        {pageName} coming soon
      </h1>
      <a 
        href="/" 
        class="mt-8 dark:text-white/40 text-black/40 hover:text-btc-orange text-base"
        data-internal="true"
      >
        go back
      </a>
    </div>
  );
} 