"use client";
import { motion } from "framer-motion";

const bulletPoints = [
  "Experiencia en soluciones Full Stack",
  "Conocimiento en desarrollo móvil",
  "En búsqueda activa de nuevas oportunidades"
];

export default function HeroBulletPoints() {
  return (
    <div className="space-y-4 mb-8">
      {bulletPoints.map((point, index) => (
        <motion.div
          key={index}
          className="flex items-center gap-3"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 + index * 0.1 }}
        >
          <div className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" />
          <span className="text-neutral-600 dark:text-gray-300">{point}</span>
        </motion.div>
      ))}
    </div>
  );
}