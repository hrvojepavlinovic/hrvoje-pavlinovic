const WORDS_PER_MINUTE = 200;

export function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / WORDS_PER_MINUTE);
}

export function formatTimeAgo(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { unit: "y", seconds: 31536000 },
    { unit: "mo", seconds: 2592000 },
    { unit: "w", seconds: 604800 },
    { unit: "d", seconds: 86400 },
    { unit: "h", seconds: 3600 },
    { unit: "m", seconds: 60 },
    { unit: "s", seconds: 1 },
  ];

  for (const { unit, seconds: secondsInUnit } of intervals) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval}${unit} ago`;
    }
  }

  return "now";
}
