"use client";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { useEffect } from "react";

export default function HeroImage() {
  // Valores para efectos de movimiento
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);
  const borderRadius = useMotionValue(9999);
  const shadow = useMotionValue(0);

  // Efecto de rotación 3D al mover el mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    
    rotateX.set((y - 0.5) * 15);
    rotateY.set((0.5 - x) * 15);
    scale.set(1.05);
    shadow.set(30);
  };

  const handleMouseLeave = () => {
    animate(rotateX, 0, { duration: 0.5 });
    animate(rotateY, 0, { duration: 0.5 });
    animate(scale, 1, { duration: 0.5 });
    animate(shadow, 0, { duration: 0.5 });
  };

  // Efecto de borde dinámico
  useEffect(() => {
    const interval = setInterval(() => {
      animate(
        borderRadius,
        [9999, 50, 9999],
        {
          duration: 8,
          ease: "easeInOut"
        }
      );
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  // Plantilla para transformación 3D
  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
  const boxShadow = useMotionTemplate`0 ${shadow}px 50px -12px rgba(128, 0, 32, 0.25)`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        y: [0, -15, 0],
      }}
      transition={{ 
        x: { duration: 0.8 },
        y: { 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      className="lg:w-1/2 flex justify-center mt-10 lg:mt-0 cursor-pointer"
    >
      <motion.div
        className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 overflow-hidden shadow-2xl group"
        style={{
          transform,
          boxShadow,
          borderRadius: useMotionTemplate`${borderRadius}px`
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Imagen principal con múltiples efectos */}
        <motion.img 
          src="/Perfilimage.png" 
          alt="Angel Waidelich"
          className="w-full h-full object-cover"
          style={{
            filter: useMotionTemplate`grayscale(${useMotionValue(15)}%) 
                              contrast(110%) 
                              brightness(${useMotionValue(1)})`,
            transform: useMotionTemplate`scale(${useMotionValue(1)})`
          }}
          whileHover={{
            filter: "grayscale(0%) contrast(120%) brightness(1.05)",
            transform: "scale(1.03)"
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Efecto de luz dinámica */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-primary-500/5 opacity-0"
          style={{
            mixBlendMode: "overlay",
            opacity: useMotionValue(0)
          }}
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Borde animado */}
        <motion.div 
          className="absolute inset-0 border-4 border-transparent"
          style={{
            borderImage: useMotionTemplate`linear-gradient(45deg, 
              rgba(128, 0, 32, 0.3), 
              rgba(154, 42, 58, 0.1), 
              rgba(128, 0, 32, 0.3)) 1`,
            borderRadius: useMotionTemplate`${borderRadius}px`
          }}
          animate={{
            borderImageSlice: [1, 0.5, 1],
            borderWidth: ["4px", "8px", "4px"]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Efecto de partículas sutiles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-primary-500 rounded-full"
              style={{
                width: Math.random() * 5 + 2 + 'px',
                height: Math.random() * 5 + 2 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                opacity: useMotionValue(0.3)
              }}
              animate={{
                y: [0, (Math.random() - 0.5) * 30],
                x: [0, (Math.random() - 0.5) * 30],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Resplandor al hover */}
        <motion.div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: useMotionTemplate`0 0 ${shadow}px rgba(128, 0, 32, 0.3)`,
            opacity: useMotionValue(0)
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}