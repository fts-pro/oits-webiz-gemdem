
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  benefits?: string[];
  caseStudyPlaceholder?: string;
  category?: string;
  techStack?: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  fullDescription?: string;
  problem?: string;
  solution?: string;
  outcomes?: string[];
  technologies?: string[];
  link?: string;
  demoVideoUrl?: string | { mp4: string; webm: string };
  captionsUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface TechDomain {
  id: string;
  label: string;
  skills: { name: string; level: number }[];
}

export enum SectionId {
  HOME = 'home',
  SERVICES = 'services',
  PROCESS = 'process',
  ABOUT = 'about',
  PORTFOLIO = 'portfolio',
  CONTACT = 'contact',
}
