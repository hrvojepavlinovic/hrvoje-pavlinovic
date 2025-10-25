export interface CapabilityArea {
  title: string;
  intro: string;
  points: string[];
}

export interface HighlightedWorkItem {
  name: string;
  summary: string;
  href: string;
  status?: string;
  trackingTarget?: string;
}

export interface AboutIntro {
  heading: string;
  summary: string;
  paragraphs: string[];
}

export interface AboutWork {
  heading: string;
  description: string;
  capabilityAreas: CapabilityArea[];
  highlightedWork: HighlightedWorkItem[];
}

export interface JourneyStop {
  period: string;
  headline: string;
  summary: string;
}

export interface AboutJourney {
  heading: string;
  summary: string;
  stops: JourneyStop[];
}

export interface FocusArea {
  title: string;
  description: string;
}

export interface AboutLife {
  heading: string;
  summary: string;
  focusAreas: FocusArea[];
}

export interface AboutPrinciples {
  heading: string;
  items: string[];
}

export interface TrainingStat {
  label: string;
  value: string;
  hint?: string;
}

export interface TrainingProgress {
  label: string;
  current: number;
  goal: number;
  unit: string;
}

export interface AboutTraining {
  heading: string;
  summary: string;
  stats: TrainingStat[];
  progress: TrainingProgress[];
}

export interface AboutData {
  pageTitle: string;
  intro: AboutIntro;
  work: AboutWork;
  journey: AboutJourney;
  life: AboutLife;
  principles: AboutPrinciples;
  training: AboutTraining;
}
