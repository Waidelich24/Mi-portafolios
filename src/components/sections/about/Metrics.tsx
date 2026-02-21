"use client";

import { motion } from "framer-motion";

const metrics = [
  { value: "+3", label: "años desarrollando" },
  { value: "3", label: "proyectos reales desplegados" },
  { value: "7+", label: "tecnologías dominadas" },
];

export const Metrics = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {metrics.map((metric, index) => (
        <motion.article
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
          whileHover={{ y: -4 }}
          className="
            group 
            rounded-2xl 
            border 
            p-5 
            shadow-lg 
            backdrop-blur-sm 
            transition-all 
            duration-300

            /* LIGHT MODE */
            border-gray-200
            bg-white
            hover:border-red-400/40
            hover:shadow-red-500/10

            /* DARK MODE */
            dark:border-white/10
            dark:bg-white/[0.06]
            dark:hover:border-red-400/30
            dark:hover:shadow-red-500/10
          "
        >
          <p className="text-3xl font-bold text-red-500 dark:text-red-400">
            {metric.value}
          </p>

          <p className="
            mt-1 
            text-sm 
            text-gray-600 
            dark:text-gray-300
            transition-colors
          ">
            {metric.label}
          </p>
        </motion.article>
      ))}
    </div>
  );
};
