export interface SocialLink {
  label: string;
  href: string;
  icon: string;
  trackingTarget?: string;
}

export type CtaVariant = "primary" | "secondary";

export interface CtaLink {
  label: string;
  href: string;
  trackingTarget: string;
  variant: CtaVariant;
}

export interface HomeData {
  name: string;
  title: string;
  avatar: {
    src: string;
    alt: string;
  };
  heroParagraphs: string[];
  socialLinks: SocialLink[];
  ctaLinks: CtaLink[];
}
