// components/Roadmap.tsx
"use client";

import { motion } from "framer-motion";

const ROADMAP = [
  {
    year: "2023",
    focus: "Fundamentos de Programación",
    detail:
      "Inicio en desarrollo con Python, estructuras de datos y pensamiento lógico orientado a resolución de problemas.",
  },
  {
    year: "2024",
    focus: "Desarrollo de Aplicaciones",
    detail:
      "Construcción de aplicaciones con C#, bases de datos SQL y primeros proyectos reales orientados a producto.",
  },
  {
    year: "2025",
    focus: "Full Stack & Arquitectura",
    detail:
      "Especialización en React, Node.js, Tailwind y diseño de arquitecturas modernas y escalables.",
  },
];

export const Roadmap = () => {
  return (
    <section className="relative rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.02] p-12 transition-colors">

      <motion.h4
        className="mb-20 text-center text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Mi Evolución Profesional
      </motion.h4>

      <div className="relative max-w-6xl mx-auto">

        {/* Línea alineada */}
        <div className="absolute left-0 right-0 top-[210px] h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

        <div className="relative grid md:grid-cols-3 gap-12">

          {ROADMAP.map((item, index) => (
            <motion.div
              key={item.year}
              className="relative flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >

              {/* 🔥 Card con contraste real */}
              <div className="
                mb-12 
                rounded-xl 
                border 
                border-gray-200 
                dark:border-white/10
                bg-white 
                dark:bg-black/30 
                p-6 
                shadow-md 
                dark:shadow-none
                transition-all 
                hover:scale-[1.03]
              ">

                <span className="inline-block rounded-full bg-red-500/10 px-4 py-1 text-xs font-semibold tracking-wider text-red-500 dark:text-red-400 mb-3">
                  {item.year}
                </span>

                <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.focus}
                </h5>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.detail}
                </p>
              </div>

              {/* Punto */}
              <div className="relative z-10 h-4 w-4 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.7)] ring-4 ring-red-500/20" />

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};
