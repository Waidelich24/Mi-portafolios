"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import ProjectList from "./ProjectList";
import ProjectDetails from "./ProjectDetails";
import ImageModal from "./ImageModal";
import { projectsData } from "@/data/projectsData";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<number>(0);
  const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(null);
  const [imageLoadError, setImageLoadError] = useState<string | null>(null);

  const prevExpandedIndex = useRef<number | null>(null);

  // Bloquea scroll al abrir imagen, y restaura al cerrar
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

  // 🔁 Vuelve a la sección de proyectos al cerrar el modal
  useEffect(() => {
    if (prevExpandedIndex.current !== null && expandedImageIndex === null) {
      const section = document.getElementById("proyectos");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    prevExpandedIndex.current = expandedImageIndex;
  }, [expandedImageIndex]);

  const currentImages = projectsData[selectedProject].images;

  function openImageAtIndex(index: number) {
    setExpandedImageIndex(index);
    setImageLoadError(null);
  }

  function closeModal() {
    setExpandedImageIndex(null);
  }

  function prevImage() {
    if (expandedImageIndex !== null && expandedImageIndex > 0) {
      setExpandedImageIndex(expandedImageIndex - 1);
    }
  }

  function nextImage() {
    if (expandedImageIndex !== null && expandedImageIndex < currentImages.length - 1) {
      setExpandedImageIndex(expandedImageIndex + 1);
    }
  }

  return (
    <section id="proyectos" className="projects-section">
      {expandedImageIndex !== null && (
        <div className="projects-debug">
          <div>DEBUG: expandedImageIndex = {expandedImageIndex}</div>
          {imageLoadError && <div className="projects-debug-error">{imageLoadError}</div>}
        </div>
      )}

      <div className="projects-container">
        <ProjectList
          projects={projectsData}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          openImageAtIndex={openImageAtIndex}
          setImageLoadError={setImageLoadError}
        />

        <AnimatePresence mode="wait">
          <ProjectDetails
            key={selectedProject}
            project={projectsData[selectedProject]}
            openImageAtIndex={openImageAtIndex}
            setImageLoadError={setImageLoadError}
          />
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {expandedImageIndex !== null && (
          <ImageModal
            images={currentImages}
            currentIndex={expandedImageIndex}
            onClose={closeModal}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
