"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export const GlobalParticles = () => {
  const { theme } = useTheme();
  
  return (
    <>
      {[...Array(60)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${
            theme === 'dark' ? 'bg-green-500/20' : 'bg-primary/40'
          } blur-sm`}
          initial={{
            x: Math.random() * 100,
            y: Math.random() * 100,
            opacity: 0.6,
            scale: Math.random() * 0.8 + 0.7
          }}
          animate={{
            x: Math.random() * 100,
            y: Math.random() * 100,
            transition: {
              duration: Math.random() * 12 + 8,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
          style={{
            width: Math.random() * 20 + 10,
            height: Math.random() * 20 + 10,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}
    </>
  );
};