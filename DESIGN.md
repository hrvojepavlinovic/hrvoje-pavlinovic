# Personal site design

## Current task scope

The homepage refinement approved on 16 October 2026 keeps the existing neutral
surfaces, warm orange identity, portrait and dark/light themes. This is an
extension of the incumbent site, not a replacement of its brand.

## Homepage direction

- A personal introduction, selected work, all six original recommendations,
  selected writing, a small personal section and a direct contact close.
- Source Sans 3, self-hosted, gives the homepage a readable body/display voice.
  Existing monospace remains for dates, small data labels and the shared chrome.
- Open sections and thin rules instead of repeated filled cards. Content adapts
  to its natural length; quotations are never cropped or rotated in a carousel.
- Primary action: contact by email. Secondary: CV and selected work.
- Existing orange becomes a darker text accent on light surfaces for contrast.
- Typography and spacing must work with the real quotations at mobile widths,
  without horizontal overflow, hidden text or a dependency on entrance effects.

## Projects direction

- Active products use open rows with a short introduction, personal
  contribution, technical stack and current screenshots. Desktop keeps copy left
  and image right; mobile stacks the image above the copy.
- HILLS Lab is presented as the four-person studio, separately from products.
  Earlier experiments are explicitly archived, without a live-site invitation.
- Case studies share the homepage's Source Sans 3 and orange accent. Product
  workflows, contribution, architecture and engineering choices use open
  sections rather than card grids. Each product has its own workflow heading.
- Screenshots have explicit dimensions and descriptive alternatives. Content and
  navigation remain usable in server-rendered HTML without entrance effects.

## About and CV

About and CV now share Source Sans 3 and the homepage's neutral/orange palette.
About uses a personal introduction with the existing portrait, short work and
career sections, and everyday interests. Personal Memoato data is available in a
native disclosure with its retrieval date, rather than leading the page.

CV puts experience before skills. Roles use a date column and readable text,
with plain technology lists instead of chips. The professional summary is always
visible and uses the full content width. Every original recommendation remains
visible in full, with attribution and source links. Regular and ATS PDF
downloads are directly available; both still use the canonical CV JSON and
existing generators.

## Blog

The blog follows the same Source Sans 3, neutral surfaces and orange accent.
Three existing featured notes lead an open layout; the remaining notes use
chronological rows with absolute dates. Native GET search covers titles,
descriptions and tags, with a clear empty state and no JavaScript dependency.

Articles use a bounded reading measure, proportional body text, visible list
markers and quieter metadata. Code and wide tables scroll within their own
containers on mobile. All authored HTML and existing Markdown endpoints remain
unchanged. Like, copy-link and share actions have visible text labels.

Route-specific styles use versioned filenames so a deployment cannot pair new
HTML with an older cached stylesheet.

## Remaining routes

The existing system remains authoritative until the corresponding queued task.
CV recommendations continue reading from the same canonical JSON. Authored blog
text is preserved. Global navigation, accessibility and OG work have their own
later QA steps.
