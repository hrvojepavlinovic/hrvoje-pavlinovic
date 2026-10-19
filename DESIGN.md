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
Section headings use small accent-colored uppercase text to distinguish them
from article titles. Article metadata includes the existing total view count.

Articles use a bounded reading measure, proportional body text, visible list
markers and quieter metadata. Code and wide tables scroll within their own
containers on mobile. All authored HTML and existing Markdown endpoints remain
unchanged. Like, copy-link and share actions have visible text labels.

Route-specific styles use versioned filenames so a deployment cannot pair new
HTML with an older cached stylesheet.

## Shared navigation and sharing

The mobile menu uses a native modal dialog for keyboard focus containment,
Escape dismissal and focus return. It closes when switching to desktop width. A
skip link leads to the main landmark; active route links are marked in SSR.
Without JavaScript, mobile navigation remains available as ordinary links.
Chrome buttons have 44px targets and focus indicators use the accessible darker
orange in light mode. Theme initialization and switching also work when browser
storage is unavailable.

Versioned 1200×630 PNG social images share the approved dark canvas, Source Sans
3 and warm orange. Main pages have distinct previews; project previews include
their existing screenshots where available. Article-specific covers stay intact,
with the new blog image replacing the old generic fallback. The generator lives
in `scripts/generate-social-images.mjs`; it uses the existing portrait and
product assets and the same OFL font. Image metadata is shared across routes.

CV recommendations continue reading from the canonical JSON. Authored blog text
is preserved.

## Article reading tools — 19 October 2026

Articles have a sticky contents rail on the right at desktop widths. On smaller
screens the same links remain openly visible before the article; avoid dropdowns
and disclosure triangles for ordinary content. Use two columns only when width
permits. The current section uses the existing orange and an underline, without
copying another author's visual motifs or typography.

Stable h2/h3 anchors are added to rendered HTML only; the authored source and
Markdown exports stay intact. Section links work without JavaScript. Reading
progress appears only when measured in the browser, reaches completion when the
article's end is visible, and, once the article body reaches the reading line,
uses a fixed progress strip below mobile navigation with a visible percentage.
This strip lives in the header layer so it cannot be obscured by it. Mobile
pages and navigation use the full viewport width without decorative side
borders. The shared dark palette uses a cool charcoal canvas (#191d21) and
lighter muted text, retaining the existing light theme and orange identity.

## Sharing and article previews — 19 October 2026

Sharing uses ordinary X, LinkedIn and email links. Desktop repeats these in the
reading rail; mobile keeps the full controls below the article. Each contents
entry offers a quiet copy-section-link action, visible on touch screens and on
hover or keyboard focus for pointer users. Keep the approved mobile progress
strip unchanged. No dropdowns or copied reference motifs.

Copy link and Copy Markdown enhance the static links after hydration. Markdown
copies the complete existing export, starting the asynchronous clipboard write
inside the click for Safari. Clipboard rejection exposes selectable text; a
failed Markdown fetch offers the existing export link and retry. Likes keep the
existing endpoint and counts, with loading and error feedback.

Generic article previews have original 1200×630 charcoal/orange title cards,
content-hashed filenames and a generated manifest. Five authored covers retain
their URLs, now with measured dimensions and MIME types. A new or retitled note
uses the valid shared fallback until its title card is generated. Regenerate
with `deno run -A scripts/generate-article-social-images.mjs` after publishing
or retitling; generation checks the actual rendered width of every title line.
