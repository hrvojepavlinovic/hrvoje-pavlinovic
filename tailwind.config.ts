import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "btc-orange": "#f7931a",
      },
      fontFamily: {
        mono: ["Space Mono", "monospace"],
      },
    },
  },
} satisfies Config;
