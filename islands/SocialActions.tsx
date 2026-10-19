import { useSignal } from "@preact/signals";
import ArticleShareControls from "../components/ArticleShareControls.tsx";
import { articleUrl } from "../utils/articleSharing.ts";

interface SocialActionsProps {
  slug: string;
  initialLikes: number;
  title: string;
}

export default function SocialActions(
  { slug, initialLikes, title }: SocialActionsProps,
) {
  const likes = useSignal(initialLikes);
  const pending = useSignal(false);
  const error = useSignal("");
  const handleLike = async () => {
    if (pending.value) return;
    pending.value = true;
    error.value = "";
    try {
      const response = await fetch(`/api/blog/like/${slug}`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Like unavailable");
      const data = await response.json();
      likes.value = data.likes;
    } catch {
      error.value = "Couldn't save your like. Please try again.";
    } finally {
      pending.value = false;
    }
  };
  return (
    <section
      class="article-sharing"
      id="article-sharing"
      aria-labelledby="article-share-heading"
    >
      <div class="article-sharing-heading">
        <h2 id="article-share-heading">Share this note</h2>
        <button
          type="button"
          onClick={handleLike}
          class="blog-like-action"
          disabled={pending.value}
          aria-busy={pending.value}
        >
          <svg
            aria-hidden="true"
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
          <span>Like · {likes.value}</span>
        </button>
      </div>
      <ArticleShareControls
        title={title}
        url={articleUrl(slug)}
        markdownPath={`/blog/${slug}.md`}
      />
      <p role="status" class="article-like-status">{error.value}</p>
    </section>
  );
}
