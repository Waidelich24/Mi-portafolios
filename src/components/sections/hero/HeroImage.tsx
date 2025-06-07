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
  const grayscale = useMotionValue(15);
  const contrast = useMotionValue(110);
  const brightness = useMotionValue(100);

  // Efecto de rotación 3D al mover el mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    
    rotateX.set((y - 0.5) * 10); // Rotación más suave
    rotateY.set((0.5 - x) * 10);
    scale.set(1.03); // Escala más sutil
    shadow.set(25);
    grayscale.set(5); // Reduce el grayscale al interactuar
    contrast.set(115);
    brightness.set(105);
  };

  const handleMouseLeave = () => {
    animate(rotateX, 0, { duration: 0.5 });
    animate(rotateY, 0, { duration: 0.5 });
    animate(scale, 1, { duration: 0.5 });
    animate(shadow, 0, { duration: 0.5 });
    animate(grayscale, 15, { duration: 0.7 });
    animate(contrast, 110, { duration: 0.7 });
    animate(brightness, 100, { duration: 0.7 });
  };

  // Efecto de borde dinámico sutil
  useEffect(() => {
    const interval = setInterval(() => {
      animate(
        borderRadius,
        [9999, 50, 9999],
        {
          duration: 10, // Más lento
          ease: "easeInOut"
        }
      );
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Plantillas para efectos visuales
  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
  const boxShadow = useMotionTemplate`0 ${shadow}px 40px -10px rgba(128, 0, 32, 0.2)`;
  const imageFilter = useMotionTemplate`grayscale(${grayscale}%) contrast(${contrast}%) brightness(${brightness}%)`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        y: [0, -10, 0], // Movimiento más sutil
      }}
      transition={{ 
        x: { duration: 0.8 },
        y: { 
          duration: 8, // Más lento
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      className="lg:w-1/2 flex justify-center mt-10 lg:mt-0 cursor-pointer"
    >
      <motion.div
        className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 overflow-hidden shadow-xl group"
        style={{
          transform,
          boxShadow,
          borderRadius: useMotionTemplate`${borderRadius}px`
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Imagen principal con efectos controlados */}
        <motion.img 
          src="/Perfilimage.png" 
          alt="Angel Waidelich"
          className="w-full h-full object-cover"
          style={{
            filter: imageFilter,
            transform: useMotionTemplate`scale(${scale})`,
            borderRadius: useMotionTemplate`${borderRadius}px`
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Efecto de luz sutil */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-primary-500/10 opacity-0"
          style={{
            mixBlendMode: "soft-light",
            borderRadius: useMotionTemplate`${borderRadius}px`
          }}
          whileHover={{ opacity: 0.4 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Borde animado elegante */}
        <motion.div 
          className="absolute inset-0 border-[3px] border-transparent pointer-events-none"
          style={{
            borderImage: useMotionTemplate`linear-gradient(45deg, 
              rgba(128, 0, 32, 0.3), 
              rgba(154, 42, 58, 0.1), 
              rgba(128, 0, 32, 0.3)) 1`,
            borderRadius: useMotionTemplate`${borderRadius}px`
          }}
          animate={{
            borderImageSlice: [1, 0.8, 1],
            borderWidth: ["3px", "5px", "3px"]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Resplandor sutil al hover */}
        <motion.div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: useMotionTemplate`inset 0 0 ${shadow}px rgba(128, 0, 32, 0.15)`,
            opacity: useMotionValue(0),
            borderRadius: useMotionTemplate`${borderRadius}px`
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Reflejo sutil */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent opacity-0 pointer-events-none"
          style={{
            borderRadius: useMotionTemplate`${borderRadius}px ${borderRadius}px 0 0`
          }}
          whileHover={{ opacity: 0.2 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
}