// components/sections/projects/ProjectCard.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "../../../data/projectsData";

type ProjectCardProps = {
  project: Project;
  isReversed: boolean;
};

export function ProjectCard({ project, isReversed }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
        isExpanded ? "md:col-span-2" : ""
      }`}
    >
      {/* Contenido del proyecto (siempre visible) */}
      <div 
        className={`cursor-pointer p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm ${
          isExpanded ? "border-b border-gray-200 dark:border-gray-700" : ""
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={`flex ${isReversed ? "flex-row-reverse" : "flex-row"} items-center gap-4`}>
          <div className="flex-shrink-0">
            <Image 
              src={project.thumbnail} 
              alt={project.title} 
              width={80}
              height={80}
              className="w-20 h-20 object-cover rounded-lg"
            />
          </div>
          <div className="flex-grow">
            <h3 className="text-xl font-semibold dark:text-white">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
              {project.description.substring(0, 100)}...
            </p>
          </div>
        </div>
      </div>

      {/* Detalles expandidos */}
      {isExpanded && (
        <div className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <div className={`flex flex-col md:flex-row ${isReversed ? "md:flex-row-reverse" : ""} gap-8`}>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-2 dark:text-white">{project.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold dark:text-white">Tecnologías:</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ver Proyecto
                </a>
              )}
            </div>

            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-2">
                {project.images.map((image, idx) => (
                  <Image
                    key={idx}
                    src={image}
                    alt={`Captura del proyecto ${project.title} ${idx + 1}`}
                    width={200}
                    height={150}
                    className="w-full h-auto object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}