import { ComponentChild } from "preact";
import { trackEvent } from "./track.ts";

export type TokenReplacement = ComponentChild | (() => ComponentChild);

interface TokenDefinition {
  render: TokenReplacement;
}

const heroLinkClasses =
  "group inline-flex items-center gap-1 text-gray-900 underline decoration-gray-300 underline-offset-4 transition-colors hover:text-orange-500 dark:text-gray-100";

function trackedExternalLink(
  href: string,
  label: string,
  trackingTarget: string,
): ComponentChild {
  return (
    <a
      key={trackingTarget}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      class={heroLinkClasses}
      onClick={() =>
        trackEvent({
          type: "click",
          clickType: "link",
          target: trackingTarget,
        })}
    >
      {label}
      <svg
        class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M7 17L17 7" />
        <path d="M8 7h9v9" />
      </svg>
    </a>
  );
}

export const contentTokenRegistry: Record<string, TokenDefinition> = {
  TILT_URL: {
    render: () => trackedExternalLink("https://tilt.app", "Tilt", "tilt"),
  },
};

/**
 * Replaces placeholder tokens (e.g., {{TOKEN}}) in copy with JSX fragments.
 */
export function renderTemplateWithComponents(
  template: string,
  overrides: Record<string, TokenReplacement> = {},
): ComponentChild[] {
  const nodes: ComponentChild[] = [];
  const tokenRegex = /{{\s*([^{}]+?)\s*}}/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const replacements = Object.fromEntries(
    Object.entries(contentTokenRegistry).map(([key, def]) => [
      key,
      def.render,
    ]),
  );

  for (const [key, value] of Object.entries(overrides)) {
    replacements[key] = value;
  }

  while ((match = tokenRegex.exec(template)) !== null) {
    const [fullMatch, rawKey] = match;
    const start = match.index;

    if (start > lastIndex) {
      nodes.push(template.slice(lastIndex, start));
    }

    const key = rawKey.trim();
    const replacement = replacements[key];

    if (replacement) {
      nodes.push(
        typeof replacement === "function" ? replacement() : replacement,
      );
    } else {
      nodes.push(fullMatch);
    }

    lastIndex = start + fullMatch.length;
  }

  if (lastIndex < template.length) {
    nodes.push(template.slice(lastIndex));
  }

  if (!nodes.length) {
    nodes.push(template);
  }

  return nodes;
}
