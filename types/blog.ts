interface SEO {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  image: string;
  twitterCard: string;
  twitterCreator: string;
}

export interface BlogArticle {
  id: number;
  title: string;
  author: string;
  tags: string[];
  shortDescription: string;
  fullText: string;
  slug: string;
  createdAt: string;
  views?: number;
  seo: SEO;
}

export interface BlogStore {
  articles: BlogArticle[];
  lastId: number;
}
