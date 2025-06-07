// src/types.ts

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  year?: string;
  client?: string;
  url?: string;
}
