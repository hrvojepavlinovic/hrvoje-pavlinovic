import { useState, useEffect } from "preact/hooks";
import { trackEvent } from "../utils/track.ts";

interface ILikeButtonProps {
  projectId: string;
}

export default function LikeButton({ projectId }: ILikeButtonProps) {
  const [likes, setLikes] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch initial likes count
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch(`/api/likes?project=${encodeURIComponent(projectId)}`);
        if (response.ok) {
          const data = await response.json();
          setLikes(data.likes);
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [projectId]);

  const handleLike = async () => {
    if (isLoading) return;

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId }),
      });

      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes);

        // Track the like action
        trackEvent({
          type: "click",
          clickType: "like",
          target: projectId
        });
      }
    } catch (error) {
      console.error("Error liking project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLike}
      disabled={isLoading}
      class={`
        flex items-center gap-1 px-2 py-1 rounded-md text-sm font-medium
        transition-all duration-200 ease-in-out
        text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 
        hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer
        ${isLoading ? 'opacity-50 cursor-wait' : ''}
      `}
      title="Like this project"
    >
      <svg 
        class="w-4 h-4 transition-all duration-200 stroke-current stroke-2"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span class="tabular-nums">
        {likes}
      </span>
    </button>
  );
} 