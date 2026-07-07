export interface Stat {
  value: string;
  label: string;
}

export interface Hero {
  title: string;
  subtitle: string;
}

export interface Profile {
  name: string;
  title: string;
  photo: string;
  phone: string;
  email: string;
  website: string;
  location: string;
  stats: Stat[];
}

export interface ProfessionalSummary {
  description: string;
}

export type TechStack = Record<string, string[]>;

export interface Skills {
  coreExpertise: string[];
  techStack: TechStack;
}

export interface Experience {
  title: string;
  company: string;
  companyUrl?: string;
  period: string;
  achievements: string[];
  technologies?: string[];
  isHighlight: boolean;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string[];
}

export interface Project {
  name: string;
  description: string;
  url: string;
  technologies: string[];
  note?: string;
}

export interface Reference {
  company: string;
  companyUrl: string;
  person: string;
  title: string;
  url: string;
  quote: string;
}

export interface CVData {
  hero: Hero;
  profile: Profile;
  professionalSummary: ProfessionalSummary;
  skills: Skills;
  experience: Experience[];
  personalProjects: Project[];
  _disabledPersonalProjects?: Project[];
  references: Reference[];
  education: Education[];
}
