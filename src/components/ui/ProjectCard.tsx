import React from 'react';
import { Project } from '@/types/index'; // Definiremos tipos después

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <div className="project-card">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="technologies">
        {project.technologies.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
    </div>
  );
}