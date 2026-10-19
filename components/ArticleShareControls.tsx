import ArticleActionIcon from "./ArticleActionIcon.tsx";
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
        <ArticleActionIcon action="x" />
        <span>Share on X</span>
      </a>
      <a
        href={links.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
      >
        <ArticleActionIcon action="linkedin" />
        <span>Share on LinkedIn</span>
      </a>
      <a href={links.email}>
        <ArticleActionIcon action="email" />
        <span>Send by email</span>
      </a>
      <CopyButton text={url} label="Copy link" icon="link" />
      <CopyButton
        text={url}
        label="Copy Markdown"
        sourceUrl={markdownPath}
        icon="copy"
      />
      <noscript>
        <a href={markdownPath}>Open Markdown</a>
      </noscript>
    </div>
  );
}
