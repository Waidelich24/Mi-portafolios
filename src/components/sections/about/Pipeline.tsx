"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PipelineIcon } from "./PipelineIcon";

const pipelineSteps = [
  { type: "idea" as const, label: "Idea" },
  { type: "design" as const, label: "Diseño" },
  { type: "development" as const, label: "Desarrollo" },
  { type: "deploy" as const, label: "Deploy" },
];

export const Pipeline = ({ reduceMotion }: { reduceMotion: boolean }) => {

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // 🔥 Loop continuo
  useEffect(() => {
    if (activeIndex === null) return;
    if (reduceMotion) return;

    const timer = setTimeout(() => {
      setActiveIndex(prev => {
        if (prev === null) return 0;
        return (prev + 1) % pipelineSteps.length;
      });
    }, 2500); // duración entre animaciones

    return () => clearTimeout(timer);
  }, [activeIndex, reduceMotion]);

  return (
    <motion.div
      onViewportEnter={() => setActiveIndex(0)}
      viewport={{ once: true }}
      className="relative rounded-2xl border border-white/10 bg-black/20 p-8 backdrop-blur-sm"
    >
      <div className="absolute left-[15%] right-[15%] top-[38%] hidden h-px bg-gradient-to-r from-transparent via-red-400/30 to-transparent md:block" />

      <div className="grid gap-6 md:grid-cols-4">
        {pipelineSteps.map((step, index) => (
          <PipelineIcon
            key={step.label}
            type={step.type}
            label={step.label}
            index={index}
            isActive={activeIndex === index}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </motion.div>
  );
};
