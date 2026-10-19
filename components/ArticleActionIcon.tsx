import SocialIcon from "./SocialIcon.tsx";

export type ArticleAction =
  | "x"
  | "linkedin"
  | "email"
  | "link"
  | "copy"
  | "check";

/** Small, consistent action glyphs; brand marks retain their recognizable shape. */
export default function ArticleActionIcon(
  { action }: { action: ArticleAction },
) {
  if (action === "x" || action === "linkedin") {
    return <SocialIcon type={action} className="article-action-icon" />;
  }
  const paths: Record<Exclude<ArticleAction, "x" | "linkedin">, string> = {
    email: "M3 5h18v14H3V5Zm0 1 9 7 9-7",
    link:
      "M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-2 2m3 6a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l2-2",
    copy: "M9 9h12v12H9V9ZM5 15H3V3h12v2",
    check: "m5 12 4 4L19 6",
  };
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d={paths[action]} />
    </svg>
  );
}
