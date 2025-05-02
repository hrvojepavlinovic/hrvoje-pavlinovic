export default function Home() {
  return (
    <div class="flex flex-col items-center justify-center min-h-screen p-4">
      <img 
        src="/pfp.png" 
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
      </div>
    </div>
  );
}
