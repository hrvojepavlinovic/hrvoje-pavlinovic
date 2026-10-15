# Hrvoje Pavlinovic — personal website

<!-- impeccable:product-schema 1 -->

## Platform

web

## Product Purpose

A personal engineering portfolio, CV, project hub and publishing site for Hrvoje
Pavlinovic. It presents his professional work and recommendations alongside his
own products, writing and personal interests.

## Users

Professional collaborators evaluating Hrvoje's experience, and readers of his
writing. Hiring and client evaluation are the working audience inferred from the
existing CV and homepage; no availability or employment change is asserted.

## Capabilities and Constraints

- Existing Fresh 1 / Preact / Deno application with JSON-driven content.
- Preserve routes, CV PDF/ATS exports, article text, tracking and integrations.
- User approved the five-step revamp on 16 October 2026. Implement one task,
  deploy, request user QA, then wait for approval before the next task.
- Mobile quality is required. Work directly in this task without delegation.
- English remains the language of the personal site.

## Evidence on Hand

- `data/home.json`, `data/about.json`, `data/projects.json` and `data/cv.json`
  contain the existing professional and product content.
- Six recommendations in `data/cv.json`: Ericsson Nikola Tesla, Profico, Rimac
  Automobili, Povio, ReneVerse and Tilt. The user requires recommendations on
  the homepage. Preserve every quotation in full, word for word, with
  attribution.
- Existing portrait assets in `static/` belong to this site.
- Existing public product screenshots from the HILLS Lab repository may be
  reused.
- Public Memoato aggregates and the dated Codex usage snapshot already appear on
  the website; preserve their dates and distinguish stale snapshots from live
  data.

## Product Principles

- Show actual work and original recommendations before ancillary statistics.
- Describe personal contributions without inventing outcomes or benchmarks.
- Keep the personal site distinct from the HILLS Lab company website.
- Preserve authored writing and publicly supplied facts.
