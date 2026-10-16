export type ProjectStatus = "early" | "development" | "live" | "sunsetted";

export interface ProjectMedia {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
}

export interface CaseStudyItem {
  label?: string;
  title?: string;
  value?: string;
  text?: string;
}

export interface ProjectCaseStudy {
  eyebrow: string;
  intro: string;
  role: string;
  period: string;
  stage: string;
  founderWork?: {
    title: string;
    intro: string;
    areas: { title: string; text: string }[];
  };
  challenge: string;
  productLoop: string[];
  loopTitle?: string;
  architecture: CaseStudyItem[];
  decisions: CaseStudyItem[];
  delivered: string[];
  next: string;
  nextTitle?: string;
  related: { label: string; href: string }[];
}

export interface Project {
  id: string;
  name: string;
  url?: string;
  description: string;
  highlights?: string[];
  technologies?: string[];
  status: ProjectStatus;
  statusLabel?: string;
  kind?: "product" | "studio" | "experiment";
  contribution?: string;
  featured: boolean;
  likes?: number;
  accent?: string;
  image?: string;
  imageAlt?: string;
  screenshot?: ProjectMedia;
  caseStudy?: ProjectCaseStudy;
}

export interface ProjectsData {
  description: string;
  projects: Project[];
}

export const projectStatus: Record<ProjectStatus, string> = {
  early: "Exploration",
  development: "In development",
  live: "Live",
  sunsetted: "Archived",
};
