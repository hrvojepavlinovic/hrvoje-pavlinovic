# Repository Guidelines

## Project Structure & Content Flows

- `routes/` hosts Fresh entry points. `routes/index.tsx` and `routes/about.tsx`
  hydrate their islands with JSON payloads from `data/home.json` and
  `data/about.json`; treat these files as the single source of truth for hero,
  biography, and engagement copy.
- `islands/` contains hydrated UI. `HomePage.tsx` renders the intro stack only,
  while `AboutPage.tsx` now covers work, journey, life, and training sections
  that formerly lived on Home and Stats. Keep the data shape in sync with
  `types/home.ts` and `types/about.ts`.
- Shared behaviour belongs in `utils/`. Tokenised content (e.g. `{{TILT_URL}}`)
  is resolved through `utils/contentTokens.tsx` and
  `renderTemplateWithComponents`, which also applies Tailwind classes so design
  tokens compile.
- Reusable visual pieces stay in `components/`; client-only analytics and menu
  logic live in islands such as `Router.tsx` and `MobileMenu.tsx`. Assets remain
  in `static/`.

## Build, Test & Verification Commands

- `deno task start` launches the dev server with file watching across routes,
  islands, components, and static assets.
- `deno task check` runs formatting, linting, and type checking in one shot; run
  it before opening or updating a PR.
- `deno task build` followed by `deno task preview` mirrors the production
  deployment pipeline; use both for final smoke tests.
- `deno task manifest` regenerates `fresh.gen.ts` whenever routes or islands are
  added, renamed, or removed.

## Coding Style & Naming Conventions

- Always format with `deno fmt`; no manual tweaks are needed. Avoid explicit
  `any` types—extend the shared interfaces instead. `react-no-danger` is
  globally disabled, but prefer structured rendering unless you truly need raw
  HTML.
- Use PascalCase for components/islands, camelCase for utilities, and kebab-case
  file names inside `routes/`. Keep Tailwind classes declarative and centred on
  layout/spacing tweaks.
- When introducing new placeholder tokens in JSON, define both the tracking
  metadata and the JSX fragment in the token registry so analytics continue to
  fire.

## Testing & Review Expectations

- Co-locate Deno tests with sources using the `_test.ts` suffix. Write focused
  unit tests for helpers like `renderTemplateWithComponents` and consider
  integration tests for island rendering.
- Document manual QA in PRs (viewport checks for the Home hero and About
  sections, plus any analytics affordances). Attach screenshots for notable UI
  changes and explicitly mention uncovered areas.
- Commits should be small, imperative, and reference related issues. PRs need a
  concise summary, verification steps (`deno task check`, manual QA), and any
  follow-up tasks.

## Workspace Status

- Unstaged: `components/Header.tsx`, `data/home.json`, `fresh.gen.ts`,
  `islands/AboutPage.tsx`, `islands/HomePage.tsx`, `islands/MobileMenu.tsx`,
  `islands/Router.tsx`, `islands/Footer.tsx`, `islands/WebStats.tsx`,
  `routes/_app.tsx`, `routes/_404.tsx`, `routes/about.tsx`,
  `routes/blog/[slug].tsx`, `routes/blog/index.tsx`,
  `routes/branding/x/cover.tsx`, `routes/branding/x/profile.tsx`,
  `routes/contact.tsx`, `routes/cv.tsx`, `routes/projects.tsx`,
  `routes/projects/[id].tsx`, `routes/webstats.tsx`, `types/home.ts`,
  `islands/StatsPage.tsx` (deleted), `routes/stats.tsx` (deleted).
- Untracked: `data/about.json`, `types/about.ts`.
