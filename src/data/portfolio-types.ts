export type LinkItem = { label: string; href: string };

export type Profile = {
  name: string;
  initials: string;
  title: string;
  introduction: string;
  summary: string;
  location?: string;
  availability?: string;
  email?: string;
  resume?: `/resume/${string}.pdf`;
  socials: LinkItem[];
  focus?: {
    status: string;
    goals?: string[];
    exploring?: string[];
    interests?: string[];
    projectSlugs?: string[];
  };
  facts?: { value: string; label: string }[];
};

export type Skill = { name: string; category: string; description: string; tools: string[] };
export type Service = {
  title: string;
  description: string;
  capabilities: string[];
  technologies: string[];
  responsibilities: string[];
  problems: string[];
  approach?: string;
};
export type TimelineItem = {
  title: string;
  organization: string;
  period: string;
  kind: "Employment" | "Internship" | "Education" | "Certification" | "Achievement";
  details: string[];
};

export type ProjectImage = {
  src: `/images/projects/${string}`;
  alt: string;
  width: number;
  height: number;
};
export type Project = {
  slug: string;
  title: string;
  category: string;
  status: string;
  summary: string;
  technologies: string[];
  featured?: boolean;
  cover?: ProjectImage & { caption?: string };
  screenshots?: ProjectImage[];
  liveUrl?: string;
  repositoryUrl?: string;
  problem?: string;
  objectives?: string[];
  contributions?: string[];
  architecture?: string;
  features?: string[];
  challenges?: string[];
  solutions?: string[];
  results?: string[];
  relatedSlugs?: string[];
};

export type Portfolio = {
  profile: Profile | null;
  services: Service[];
  skills: Skill[];
  projects: Project[];
  timeline: TimelineItem[];
  principles: { title: string; description: string }[];
  strengths: { title: string; evidence: string }[];
};
