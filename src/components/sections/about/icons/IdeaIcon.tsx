"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IdeaIconProps {
  isVisible: boolean;
  reduceMotion: boolean;
  animationTrigger: number;
}

export const IdeaIcon = ({ isVisible, reduceMotion, animationTrigger }: IdeaIconProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const previousTriggerRef = useRef(animationTrigger);

  useEffect(() => {
    // Detectar cuando el trigger cambia
    if (animationTrigger !== previousTriggerRef.current) {
      previousTriggerRef.current = animationTrigger;
      
      if (isVisible && !reduceMotion) {
        setIsAnimating(true);
        
        // Duración de la animación: 1.2 segundos
        const timer = setTimeout(() => {
          setIsAnimating(false);
        }, 3000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [animationTrigger, isVisible, reduceMotion]);

  if (reduceMotion) {
    return (
      <div className="flex h-16 w-16 items-center justify-center">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-gray-400">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V16c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z" 
            stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <path d="M9 18h6v2H9z" fill="currentColor" opacity="0.5"/>
        </svg>
      </div>
    );
  }

  return (
    <div className="relative flex h-16 w-16 items-center justify-center">
      <motion.div
        className="relative"
        animate={isAnimating ? {
          scale: [1, 1.15, 1.08, 1.12, 1],
          transition: { 
            duration: 1.2,
            times: [0, 0.2, 0.5, 0.8, 1],
            ease: "easeInOut"
          }
        } : {}}
      >
        {/* SVG del foco */}
        <svg 
          width="44" 
          height="44" 
          viewBox="0 0 24 24" 
          className="relative z-10"
          style={{
            filter: 'grayscale(100%)',
          }}
        >
          <path 
            d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V16c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z" 
            fill={isAnimating ? "#ffffff" : "#cccccc"} 
            stroke="white" 
            strokeWidth="1.2"
            strokeOpacity="0.3"
          />
          <path 
            d="M9 18h6v2H9z" 
            fill="white" 
            fillOpacity={isAnimating ? "0.8" : "0.5"}
          />
        </svg>

        {/* Efectos de luz */}
        <AnimatePresence>
          {isAnimating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: [0, 0.7, 0.3, 0.5, 0],
                scale: [0.5, 1.8, 1.4, 1.6, 2],
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 1.2,
                times: [0, 0.3, 0.6, 0.8, 1],
                ease: "easeOut"
              }}
              className="absolute inset-0 bg-white rounded-full blur-xl"
              style={{ top: '-50%', left: '-50%', width: '200%', height: '200%' }}
            />
          )}
        </AnimatePresence>

        {/* Rayos de luz */}
        <AnimatePresence>
          {isAnimating && (
            <>
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <motion.div
                  key={angle}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 0.4, 0.2, 0.3, 0],
                    scale: [0, 1.2, 0.8, 1, 0],
                    rotate: angle,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 1.2,
                    times: [0, 0.2, 0.5, 0.8, 1],
                    delay: i * 0.05,
                    ease: "easeOut"
                  }}
                  className="absolute w-1 h-12 bg-gradient-to-t from-white to-transparent"
                  style={{
                    transformOrigin: 'bottom center',
                    bottom: '50%',
                    left: '50%',
                    width: '2px',
                    height: '30px',
                    marginLeft: '-1px',
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};