import { useEffect } from "preact/hooks";
import { trackEvent } from "../utils/track.ts";

interface ProjectPageTrackerProps {
  projectId: string;
}

export default function ProjectPageTracker({ projectId }: ProjectPageTrackerProps) {
  useEffect(() => {
    trackEvent({
      type: "pageview",
      page: `/projects/${projectId}`
    });
  }, [projectId]);

  return null; // This component doesn't render anything
} 