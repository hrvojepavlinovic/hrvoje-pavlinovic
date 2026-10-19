const SITE_URL = "https://hrvoje.pavlinovic.com";

export function articleUrl(slug: string, sectionId?: string): string {
  const url = new URL(`/blog/${encodeURIComponent(slug)}`, SITE_URL);
  if (sectionId) url.hash = encodeURIComponent(sectionId);
  return url.href;
}

export function articleShareLinks(title: string, url: string) {
  return {
    x: `https://x.com/intent/tweet?${new URLSearchParams({
      text: title,
      url,
    })}`,
    linkedin:
      `https://www.linkedin.com/sharing/share-offsite/?${new URLSearchParams({
        url,
      })}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${
      encodeURIComponent(url)
    }`,
  };
}
