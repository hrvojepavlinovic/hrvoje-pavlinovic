export default function HomePage() {
  return (
    <div class="flex flex-col items-center justify-center min-h-screen p-4">
      <img 
        src="/pfptbs.png" 
        alt="Hrvoje Pavlinovic"
        class="w-64 h-64 rounded-full mb-8 transition-all duration-1000"
      />
      <p class="dark:text-white/60 text-black/60 text-lg tracking-wide transition-colors duration-1000 mb-8">
        Software Engineer
      </p>
      <div class="flex gap-6">
        <a 
          href="https://twitter.com/hrvoje_eth" 
          target="_blank" 
          rel="noopener noreferrer"
          class="dark:text-white/60 dark:hover:text-[#F7931A] text-black/60 hover:text-[#F7931A]"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a 
          href="https://www.linkedin.com/in/hrvojepavlinovic" 
          target="_blank" 
          rel="noopener noreferrer"
          class="dark:text-white/60 dark:hover:text-[#F7931A] text-black/60 hover:text-[#F7931A]"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
          </svg>
        </a>
        <a 
          href="mailto:hrvoje@pavlinovic.com"
          class="dark:text-white/60 dark:hover:text-[#F7931A] text-black/60 hover:text-[#F7931A]"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
            <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
          </svg>
        </a>
        <a 
          href="https://t.me/Oxhp10"
          target="_blank" 
          rel="noopener noreferrer"
          class="dark:text-white/60 dark:hover:text-[#F7931A] text-black/60 hover:text-[#F7931A]"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
        </a>
      </div>
    </div>
  );
} 