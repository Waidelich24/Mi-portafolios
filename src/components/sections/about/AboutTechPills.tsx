"use client";
import { motion } from "framer-motion";

const TECHNOLOGIES = [
  'React',
  'TypeScript',
  'Node.js',
  'Tailwind CSS',
  'SQL',
  'Python',
  'C#',
  'Git',
];

export const AboutTechPills = () => {
  return (
    <div className="flex flex-wrap gap-3 pl-3">
      {TECHNOLOGIES.map((tech, index) => (
        <motion.span
          key={tech}
          className="px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-secondary-600 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          {tech}
        </motion.span>
      ))}
    </div>
  );
};
