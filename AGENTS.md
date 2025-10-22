# Repository Guidelines

## Project Structure & Module Organization

- `routes/` holds Fresh page routes and API handlers; each `.tsx` file maps
  directly to an endpoint (e.g., `routes/projects.tsx`).
- `islands/` contains interactive Preact components hydrated on the client; pair
  them with server-rendered shells in `routes/`.
- `components/` stores shared presentational pieces; prefer stateless functions
  and keep data fetching in routes.
- Assets live in `static/`; anything placed here is served verbatim at the site
  root.
- Shared types and helpers live in `types/` and `utils/`; check `utils/track.ts`
  for analytics patterns before adding new tracking events.

## Build, Test & Development Commands

- `deno task start` launches the local dev server with file watching (`static/`,
  `routes/`, `islands/`, `components/`).
- `deno task build` generates the production bundle; run before deploying to
  Deno Deploy.
- `deno task preview` serves the built output for a final smoke test.
- `deno task check` runs `deno fmt --check`, `deno lint`, and type-checks all
  `.ts/.tsx` files; use it in CI or before opening a PR.
- `deno task manifest` regenerates the Fresh route manifest when adding or
  renaming pages.

## Coding Style & Naming Conventions

- Format with `deno fmt`; keep two-space indentation and trailing commas where
  the formatter adds them.
- Follow the Fresh lint configs (`deno lint` with `fresh` + `recommended`
  rules); resolve warnings rather than silencing them.
- Name components and islands in PascalCase (`HeroSection.tsx`), routes in
  lowercase kebab or descriptive filenames (`about.tsx`), and utilities in
  camelCase.
- Centralize styling in Tailwind classes; extend tokens in `tailwind.config.ts`
  instead of inlining hex values repeatedly.

## Testing Guidelines

- Deno’s built-in test runner is available even though no suites exist yet;
  place new specs alongside source files as `<name>_test.ts`.
- Prefer integration-style tests for route handlers and pure unit tests for
  helpers in `utils/`.
- Run `deno test` locally; integrate it into `deno task check` if coverage
  grows.
- For visual changes, capture before/after screenshots when relevant to ease
  review.

## Commit & Pull Request Guidelines

- Keep commits focused with short, lowercase summaries (see `git log` examples
  like "complete revamp").
- Reference issues in the body when applicable and describe user-facing impacts
  in imperative mood.
- PRs should include a purpose-oriented description, testing notes (commands
  run, screenshots), and call out any follow-up tasks.
- Request review once `deno task check` passes and the preview server has been
  smoke-tested.
