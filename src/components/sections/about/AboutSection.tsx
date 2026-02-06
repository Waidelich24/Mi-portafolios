"use client";

import { motion } from "framer-motion";
import { AboutCard } from "./AboutCard";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback, useEffect, useState } from "react";
import type { Engine } from "tsparticles-engine";

export const AboutSection = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth >= 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <motion.section
      id="about"
      className="py-24 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Fondo de partículas solo en escritorio */}
      {isDesktop && (
        <Particles
          id="about-particles"
          init={particlesInit}
          options={{
            fpsLimit: 60,
            particles: {
              number: {
                value: 30,
                density: {
                  enable: true,
                  value_area: 800,
                },
              },
              color: {
                value: "#3B82F6",
              },
              opacity: {
                value: 0.3,
                random: true,
              },
              size: {
                value: 3,
                random: true,
              },
              move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                out_mode: "out",
              },
              links: {
                enable: false,
              },
            },
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
              },
              modes: {
                repulse: {
                  distance: 100,
                  duration: 0.4,
                },
              },
            },
            detectRetina: true,
          }}
          className="absolute inset-0 -z-10"
        />
      )}

      {/* Fondos decorativos */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500 rounded-full filter blur-3xl opacity-10 dark:opacity-20" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary-500 rounded-full filter blur-3xl opacity-10 dark:opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.h2
          className="text-5xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-primary-400 to-secondary-600 bg-clip-text text-transparent">
            Sobre Mí
          </span>
        </motion.h2>

        <AboutCard />
      </div>
    </motion.section>
  );
};
