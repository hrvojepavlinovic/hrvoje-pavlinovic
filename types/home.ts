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

export interface HighlightedWorkItem {
  name: string;
  summary: string;
  href: string;
  status?: string;
  trackingTarget?: string;
}

export interface CapabilityArea {
  title: string;
  intro: string;
  points: string[];
}

export interface HomeSections {
  capabilities: {
    heading: string;
    description: string;
  };
  engagements: {
    heading: string;
    secondaryCta: {
      label: string;
      href: string;
      trackingTarget: string;
    };
  };
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
  sections: HomeSections;
  highlightedWork: HighlightedWorkItem[];
  capabilityAreas: CapabilityArea[];
}
