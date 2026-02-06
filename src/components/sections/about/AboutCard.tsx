"use client";
import { motion } from "framer-motion";
import { AboutImage } from "./AboutImage";
import { AboutTechPills } from "./AboutTechPills";
import { AboutTimeline } from "./AboutTimeline";
import { PrimaryButton } from "../../ui/buttons/PrimaryButton";

export const AboutCard = () => {
  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {/* Columna izquierda - Imagen */}
      <AboutImage />

      {/* Columna derecha - Contenido */}
      <div className="space-y-8">
        <motion.div
          className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-secondary-400 bg-clip-text text-transparent">
            Desarrollador Full Stack
          </h3>
          
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Especializado en crear soluciones digitales innovadoras con React, 
              Node.js y arquitecturas escalables. Más de 3 años transformando ideas 
              en productos funcionales.
            </p>
            <p>
              Mi enfoque combina diseño atractivo con funcionalidad robusta, 
              priorizando siempre la experiencia del usuario y las mejores prácticas.
            </p>
          </div>

<div className="mt-6">
  <h4 className="font-semibold mb-3 text-lg">Tecnologías:</h4>
  <AboutTechPills />
</div>

<div className="mt-8">
  <PrimaryButton 
    href="/cv.pdf" 
    download 
    className="w-full sm:w-auto"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    Descargar CV
  </PrimaryButton>
</div>

        </motion.div>

        {/* Timeline de experiencia */}
        <AboutTimeline />
      </div>
    </motion.div>
  );
};