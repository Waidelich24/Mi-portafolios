import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/data/projectsData";

interface ProjectListProps {
  projects: Project[];
  selectedProject: number;
  setSelectedProject: (index: number) => void;
  openImageAtIndex: (index: number) => void; // Solo esta prop para abrir imágenes
  setImageLoadError: (msg: string | null) => void;
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

export default function ProjectList({
  projects,
  selectedProject,
  setSelectedProject,
  openImageAtIndex,
  setImageLoadError,
}: ProjectListProps) {

  const handleImageClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    openImageAtIndex(index);
    setImageLoadError(null);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageLoadError(`Error al cargar: ${(e.target as HTMLImageElement).src}`);
    console.error("Error loading image:", e);
  };

  return (
    <div className="md:w-1/3 p-4 space-y-2 overflow-y-auto max-h-[600px] custom-scrollbar">
      <h3 className="text-xl font-bold mb-4 dark:text-white pl-2">Proyectos Destacados</h3>

      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          onClick={() => setSelectedProject(index)}
          className={`p-3 rounded-lg cursor-pointer transition-all flex items-center gap-3 ${
            selectedProject === index
              ? "border-l-4 border-[#800020] bg-[#800020]/20 dark:bg-[#8B0000]/30"
              : "hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
          }`}
        >
          <div
            className="relative w-10 h-10 rounded overflow-hidden"
            onClick={(e) => handleImageClick(e, index)}
          >
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              sizes="40px"
              onError={handleImageError}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-medium dark:text-white truncate">{project.title}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">{project.client}</p>
          </div>

          {selectedProject === index && (
            <motion.span
              className="text-primary"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
