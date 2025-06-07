// components/GlobalBackground.tsx
"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export const GlobalBackground = () => {
  const { theme } = useTheme();
  
  // Colores para light theme (mantenemos tus originales)
  const lightColors = {
    base: "rgba(220, 38, 38, 0.05)",
    accent: "rgba(220, 38, 38, 0.1)",
    gradient: "radial-gradient(circle at 50% 50%, #fef2f2 0%, #ffffff 100%)"
  };

  // Colores para dark theme (versión Shrek)
  const darkColors = {
    base: "rgba(110, 180, 60, 0.1)",      // Verde Shrek semi-transparente
    accent: "rgba(80, 150, 40, 0.2)",     // Verde Shrek más intenso
    gradient: "radial-gradient(circle at 50% 50%, #0a2008 0%, #051a05 100%)" // Degradé de verdes oscuros
  };

  const colors = theme === "dark" ? darkColors : lightColors;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      {/* Base layer */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: colors.gradient,
          transition: "background 0.5s ease"
        }}
      />
      
      {/* Dynamic grid */}
      <div 
        className="absolute inset-0 opacity-20 dark:opacity-30 transition-opacity duration-500" 
        style={{ 
          backgroundImage: `linear-gradient(${colors.accent} 1px, transparent 1px), linear-gradient(90deg, ${colors.accent} 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      />
      
      {/* Animated particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          initial={{
            opacity: 0,
            x: Math.random() * 100,
            y: Math.random() * 100,
            scale: Math.random() * 0.5 + 0.3
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            transition: {
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
          style={{
            backgroundColor: colors.base,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: "blur(0.5px)",
            transition: "background-color 0.5s ease"
          }}
        />
      ))}
    </div>
  );
};