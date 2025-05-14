import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { BlogArticle } from "../types/blog.ts";

interface SocialActionsProps {
  slug: string;
  initialLikes: number;
  title: string;
  seo: BlogArticle["seo"];
}

export default function SocialActions({ slug, initialLikes, title, seo }: SocialActionsProps) {
  const likes = useSignal(initialLikes);
  const showCopied = useSignal(false);

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/blog/like/${slug}`, {
        method: "POST",
      });
      if (response.ok) {
        const data = await response.json();
        likes.value = data.likes;
      }
    } catch (error) {
      console.error("Failed to like article:", error);
    }
  };

  const handleCopyLink = async () => {
    if (typeof globalThis === "undefined" || !globalThis.navigator?.clipboard) {
      console.error("Clipboard API not available");
      return;
    }

    try {
      await globalThis.navigator.clipboard.writeText(`https://pavlinovic.com/blog/${slug}`);
      showCopied.value = true;
      setTimeout(() => {
        showCopied.value = false;
      }, 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  const handleShareToX = () => {
    if (typeof globalThis === "undefined") {
      console.error("globalThis not available");
      return;
    }

    const text = encodeURIComponent(`${seo.title}\n\n${seo.description}`);
    const url = encodeURIComponent(`https://pavlinovic.com/blog/${slug}`);
    const hashtags = encodeURIComponent(seo.keywords.slice(0, 3).join(","));
    const via = seo.twitterCreator.replace("@", "");

    globalThis.open(
      `https://x.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtags}&via=${via}`,
      "_blank"
    );
  };

  return (
    <div class="flex items-center gap-6">
      <button
        type="button"
        onClick={handleLike}
        class="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-btc-orange dark:hover:text-btc-orange"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
        <span>{likes.value}</span>
      </button>

      <button
        type="button"
        onClick={handleCopyLink}
        class="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-btc-orange dark:hover:text-btc-orange"
        title="Copy link"
      >
        {showCopied.value ? (
          <span class="text-btc-orange">Copied!</span>
        ) : (
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
          </svg>
        )}
      </button>

      <button
        type="button"
        onClick={handleShareToX}
        class="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-btc-orange dark:hover:text-btc-orange"
        title="Share on X"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </button>
    </div>
  );
} 