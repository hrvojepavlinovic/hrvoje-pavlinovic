import { AppProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";

const THEME_SCRIPT = `
(function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', prefersDark);
    localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
  }
})();
`;

export default function App({ Component }: AppProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>hrvoje.pavlinovic</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <script>{THEME_SCRIPT}</script>
      </head>
      <body class="dark:bg-black bg-white dark:text-white/80 text-black/80 min-h-screen overflow-hidden font-mono transition-all duration-1000">
        <Header />
        <Component />
      </body>
    </html>
  );
}
