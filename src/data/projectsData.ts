export interface Project {
  id: string;
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  thumbnail: string;
  images: string[];
  link?: string;
  year: number;
  client?: string;
}

export const projectsData: Project[] = [];
