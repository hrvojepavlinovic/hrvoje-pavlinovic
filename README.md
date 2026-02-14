# Hrvoje Pavlinovic — Personal Website

[![Website](https://img.shields.io/badge/Website-hrvoje.pavlinovic.com-blue?style=flat-square)](https://hrvoje.pavlinovic.com)
[![X/Twitter](https://img.shields.io/badge/X-@0xHP10-black?style=flat-square)](https://x.com/0xHP10)

> **Senior Backend Engineer.** Scaling interactive commerce systems and building
> performant software. Peak productivity: Family · Software · Fitness 🇭🇷

This repository contains the source code for my personal website and portfolio.
It is engineered for speed, simplicity, and edge-ready performance using modern
web technologies.

## ⚡ Architecture & Tech Stack

The site is built to be lightweight and fast, using Fresh for server-side
rendering and island hydration.

- **[Fresh](https://fresh.deno.dev/)** - Next-gen edge web framework.
- **[Deno](https://deno.land/)** - Modern, secure runtime for TypeScript.
- **[Preact](https://preactjs.com/)** - 3kB React alternative for lightweight UI
  components.
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling.

## 🧱 Content Model

Most copy is JSON-driven.

- Home hero and social links live in `data/home.json` and are rendered by
  `routes/index.tsx` + `islands/HomePage.tsx`.
- About content lives in `data/about.json` and is rendered by `routes/about.tsx`
  - `islands/AboutPage.tsx`.
- Blog index and posts live in `data/blog.json`. Each post stores `fullText` as
  HTML, rendered by `routes/blog/index.tsx` and `routes/blog/[slug].tsx`.
- Projects live in `data/projects.json` and are rendered by
  `routes/projects.tsx`
  - `islands/ProjectsList.tsx`.

Tokenized copy like `{{TILT_URL}}` is resolved via `utils/contentTokens.tsx`.

## 🛠️ Local Development

### Prerequisites

Ensure you have the latest version of
[Deno installed](https://deno.land/manual/getting_started/installation) on your
machine.

### Getting Started

1. Clone the repository:

```bash
git clone https://github.com/hrvoje-pavlinovic/hrvoje-pavlinovic.git
cd hrvoje-pavlinovic
```

2. Start the development server:

```bash
deno task start
```

The server will watch the project directory and hot-reload automatically upon
file changes.

### Verification

```bash
deno task check
deno task build
deno task preview
```

If routes or islands change, regenerate the manifest:

```bash
deno task manifest
```

## 📂 Project Structure

```text
├── /routes       # Page routes and core API endpoints
├── /components   # Reusable, stateless UI components
├── /islands      # Interactive components requiring client-side JS
├── /static       # Public assets (images, fonts, icons)
└── /utils        # Core utility functions and helpers
```

## 📄 License

MIT License

Copyright (c) 2026 Hrvoje Pavlinovic

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
