import { useEffect, useState } from "preact/hooks";
import {
  articleReadingProgress,
  ArticleSection,
} from "../utils/articleOutline.ts";

interface Props {
  sections: ArticleSection[];
}

export default function ArticleReadingTools({ sections }: Props) {
  const [progress, setProgress] = useState<number | null>(null);
  const [active, setActive] = useState("");

  useEffect(() => {
    const body = document.getElementById("article-body");
    if (!body) return;
    const headings = sections.map((section) =>
      document.getElementById(section.id)
    );
    let frame = 0;
    const update = () => {
      frame = 0;
      const offset =
        (document.querySelector(".site-header")?.getBoundingClientRect()
          .bottom ?? 80) + 32;
      const bounds = body.getBoundingClientRect();
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
    </div>
  );
}
