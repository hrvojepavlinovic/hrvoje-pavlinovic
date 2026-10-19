import CopyButton from "./CopyButton.tsx";
import { articleShareLinks } from "../utils/articleSharing.ts";

export default function ArticleShareControls({ title, url, markdownPath }: {
  title: string;
  url: string;
  markdownPath: string;
}) {
  const links = articleShareLinks(title, url);
  return (
    <div class="article-share-controls">
      <a
        href={links.x}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
      >
        X
      </a>
      <a
        href={links.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
      >
        LinkedIn
      </a>
      <a href={links.email} aria-label="Share by email">Email</a>
      <CopyButton text={url} label="Copy link" />
      <CopyButton text={url} label="Copy Markdown" sourceUrl={markdownPath} />
    </div>
  );
}
