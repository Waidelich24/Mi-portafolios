"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import ProjectList from "./ProjectList";
import ProjectDetails from "./ProjectDetails";
import ImageModal from "./ImageModal";
import { Project } from "@/data/projectsData";
import { useTranslation } from "@/hooks/useTranslation";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<number>(0);
  const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(null);
  const [imageLoadError, setImageLoadError] = useState<string | null>(null);
  const { tRaw } = useTranslation();

  const projects = tRaw<Project[]>('projects.items');
  const prevExpandedIndex = useRef<number | null>(null);

  useEffect(() => {
    if (expandedImageIndex !== null) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [expandedImageIndex]);

  useEffect(() => {
    if (prevExpandedIndex.current !== null && expandedImageIndex === null) {
      const section = document.getElementById("proyectos");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    prevExpandedIndex.current = expandedImageIndex;
  }, [expandedImageIndex]);

  if (!projects.length) return null;

  const currentImages = projects[selectedProject].images;

  return (
    <section id="proyectos" className="projects-section">
      {expandedImageIndex !== null && (
        <div className="projects-debug">
          <div>DEBUG: expandedImageIndex = {expandedImageIndex}</div>
          {imageLoadError && <div className="projects-debug-error">{imageLoadError}</div>}
        </div>
      )}

      <div className="projects-container">
        <ProjectList projects={projects} selectedProject={selectedProject} setSelectedProject={setSelectedProject} openImageAtIndex={setExpandedImageIndex} setImageLoadError={setImageLoadError} />

        <AnimatePresence mode="wait">
          <ProjectDetails key={selectedProject} project={projects[selectedProject]} openImageAtIndex={setExpandedImageIndex} setImageLoadError={setImageLoadError} />
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {expandedImageIndex !== null && <ImageModal images={currentImages} currentIndex={expandedImageIndex} onClose={() => setExpandedImageIndex(null)} onPrev={() => setExpandedImageIndex((prev) => (prev && prev > 0 ? prev - 1 : prev))} onNext={() => setExpandedImageIndex((prev) => (prev !== null && prev < currentImages.length - 1 ? prev + 1 : prev))} />}
      </AnimatePresence>
    </section>
  );
}
