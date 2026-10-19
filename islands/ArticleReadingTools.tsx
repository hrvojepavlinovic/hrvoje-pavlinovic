import { useEffect, useState } from "preact/hooks";
import { createPortal } from "preact/compat";
import CopyButton from "../components/CopyButton.tsx";
import ArticleShareControls from "../components/ArticleShareControls.tsx";
import { articleUrl } from "../utils/articleSharing.ts";
import {
  articleReadingProgress,
  ArticleSection,
} from "../utils/articleOutline.ts";

interface Props {
  sections: ArticleSection[];
  title: string;
  slug: string;
}

export default function ArticleReadingTools({ sections, title, slug }: Props) {
  const [progress, setProgress] = useState<number | null>(null);
  const [active, setActive] = useState("");
  const [readingStarted, setReadingStarted] = useState(false);
  const [header, setHeader] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const body = document.getElementById("article-body");
    if (!body) return;
    const siteHeader = document.querySelector<HTMLElement>(".site-header");
    setHeader(siteHeader);
    const headings = sections.map((section) =>
      document.getElementById(section.id)
    );
    let frame = 0;
    const update = () => {
      frame = 0;
      const offset = (siteHeader?.getBoundingClientRect().bottom ?? 80) + 32;
      const bounds = body.getBoundingClientRect();
      setReadingStarted(bounds.top <= offset);
      setProgress(
        articleReadingProgress(
          bounds.top,
          bounds.height,
          globalThis.innerHeight,
          offset,
        ),
      );
      let current = "";
      for (const heading of headings) {
        if (heading && heading.getBoundingClientRect().top <= offset + 24) {
          current = heading.id;
        }
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(body);
    if (siteHeader) observer.observe(siteHeader);
    globalThis.addEventListener("scroll", schedule, { passive: true });
    globalThis.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      globalThis.removeEventListener("scroll", schedule);
      globalThis.removeEventListener("resize", schedule);
    };
  }, [sections]);

  const links = () => (
    <ol class="article-section-list">
      {sections.map((section) => (
        <li
          class={section.level === 3 ? "article-subsection" : undefined}
          key={section.id}
        >
          <a
            href={`#${encodeURIComponent(section.id)}`}
            aria-current={active === section.id ? "location" : undefined}
          >
            {section.title}
          </a>
          <CopyButton
            text={articleUrl(slug, section.id)}
            label={`Copy link to ${section.title}`}
            iconOnly
          />
        </li>
      ))}
    </ol>
  );

  return (
    <div class="article-reading-tools">
      {progress !== null && (
        <div class="article-progress">
          <div class="article-progress-label">
            <span>Through this note</span>
            <span>{progress}%</span>
          </div>
          <progress
            aria-label="Article reading progress"
            value={progress}
            max={100}
          />
        </div>
      )}
      {sections.length > 0 && (
        <nav class="article-contents" aria-label="Article sections">
          <h2>In this note</h2>
          {links()}
        </nav>
      )}
      <div class="article-rail-share">
        <h2>Share this note</h2>
        <ArticleShareControls
          title={title}
          url={articleUrl(slug)}
          markdownPath={`/blog/${slug}.md`}
        />
      </div>
      {header && readingStarted && progress !== null && createPortal(
        <div class="article-mobile-progress">
          <div class="article-mobile-progress-label">
            <span>Reading</span>
            <span>{progress}%</span>
          </div>
          <progress
            aria-label="Article reading progress"
            value={progress}
            max={100}
          />
        </div>,
        header,
      )}
    </div>
  );
}
