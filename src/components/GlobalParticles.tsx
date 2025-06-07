"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useMemo, useEffect, useState } from "react";

export const GlobalParticles = () => {
  const { theme } = useTheme();

  // Estado para saber si estamos en cliente y ancho de ventana
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check inicial y listener resize
    const checkWidth = () => setIsDesktop(window.innerWidth >= 768);
    checkWidth();

    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // Memoizar partículas para evitar cambios en cada render
  const particles = useMemo(() =>
    [...Array(30)].map(() => ({
      size: Math.random() * 20 + 10,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      destX: Math.random() * 100,
      destY: Math.random() * 100,
      duration: Math.random() * 12 + 8,
      scale: Math.random() * 0.8 + 0.7,
    })), []
  );

  if (!isDesktop) return null;

  return (
    <>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${
            theme === "dark" ? "bg-green-500/20" : "bg-primary/40"
          }`}
          initial={{
            x: p.initialX,
            y: p.initialY,
            opacity: 0.6,
            scale: p.scale,
          }}
          animate={{
            x: p.destX,
            y: p.destY,
            transition: {
              duration: p.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            filter: "blur(2px)",
          }}
        />
      ))}
    </>
  );
};
