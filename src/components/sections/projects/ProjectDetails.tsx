import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/data/projectsData";

interface ProjectDetailsProps {
  project: Project;
  openImageAtIndex: (index: number) => void;
  setImageLoadError: (msg: string | null) => void;
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProjectDetails({
  project,
  openImageAtIndex,
  setImageLoadError,
}: ProjectDetailsProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageLoadError(`Error al cargar la imagen: ${(e.target as HTMLImageElement).src}`);
  };

  return (
    <motion.div
      key={project.id}
      className="project-details"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeIn}
    >
      {/* Encabezado */}
      <motion.header variants={fadeIn} className="project-details-header">
        <div className="project-details-header-left">
          <motion.h2 className="project-title" variants={fadeInUp}>
            {project.title}
          </motion.h2>
          <motion.p className="project-client" variants={fadeInUp}>
            <span className="font-semibold">Cliente:</span> {project.client}
          </motion.p>
          <motion.span className="project-year" variants={fadeInUp}>
            {project.year}
          </motion.span>
        </div>

        {project.link && (
          <motion.a
            variants={fadeInUp}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary"
            whileHover={{ scale: 1.05 }}
          >
            Visitar Sitio
            <svg
              className="icon-external-link"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </motion.a>
        )}
      </motion.header>

      {/* Contenido principal */}
      <div className="project-details-content">
        {/* Descripción y características */}
        <div className="project-description-features">
          <motion.div variants={fadeIn}>
            <h3 className="section-title" >Descripción</h3>
            <motion.p className="project-description" variants={fadeIn}>
              {project.description}
            </motion.p>
          </motion.div>

          <motion.div variants={fadeIn}>
            <h3 className="section-title">Características</h3>
            <motion.ul
              className="project-features-list"
              variants={{
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
              }}
              initial="hidden"
              animate="visible"
            >
              {project.features.map((feature, index) => (
                <motion.li
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ x: 5, color: "#800020" }}

                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feature}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* Tecnologías */}
<motion.div variants={fadeIn} className="project-technologies">
  <h3 className="section-title">Tecnologías</h3>
  <motion.div
    className="flex flex-wrap gap-3 pl-3"
    variants={{
      visible: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } },
    }}
    initial="hidden"
    animate="visible"
  >
    {project.technologies.map((tech, index) => (
      <motion.span
        key={tech}
        className="px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-[#800020] to-[#9A2A3A] shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
      >
        {tech}
      </motion.span>
    ))}
  </motion.div>
</motion.div>

      </div>

      {/* Galería */}
      <motion.div variants={fadeIn} className="project-gallery">
        <h3 className="section-title">Galería</h3>
        <motion.div
          className="gallery-grid"
          variants={{
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
          }}
          initial="hidden"
          animate="visible"
        >
          {project.images.map((image, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="gallery-item"
              whileHover={{ y: -5 }}
            >
              <div
                className="gallery-image-wrapper"
                onClick={(e) => {
                  e.preventDefault();
                  openImageAtIndex(idx);
                  setImageLoadError(null);
                }}
                role="button"
                tabIndex={0}
              >
                <Image
                  src={image}
                  alt={`Captura ${idx + 1}`}
                  fill
                  className="gallery-image"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={handleImageError}
                  priority={idx === 0}
                />
              </div>
              <p className="gallery-caption">Captura {idx + 1}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
