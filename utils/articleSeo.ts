import manifest from "../data/article-social-images.json" with { type: "json" };
import { socialImageUrl } from "../components/SocialImage.tsx";

interface ArticleImageInput {
  slug: string;
  title: string;
  seo: { image: string };
}

export interface ArticleSocialImage {
  src: string;
  width?: number;
  height?: number;
  mimeType?: string;
}

export function articleSocialImage(
  article: ArticleImageInput,
): ArticleSocialImage {
  const images: Record<
    string,
    ArticleSocialImage & { title: string; source: string }
  > = manifest;
  const image = images[article.slug];
  if (image?.title === article.title && image.source === article.seo.image) {
    return image;
  }
  // A newly published or retitled article still gets a valid image until generation.
  if (article.seo.image && !article.seo.image.endsWith("/blog.png")) {
    return {
      src: new URL(article.seo.image, "https://hrvoje.pavlinovic.com").href,
    };
  }
  return {
    src: socialImageUrl("blog"),
    width: 1200,
    height: 630,
    mimeType: "image/png",
  };
}
