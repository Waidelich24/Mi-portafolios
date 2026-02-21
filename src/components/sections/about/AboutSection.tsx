"use client";

import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback, useEffect, useState, useRef } from "react";
import type { Engine } from "tsparticles-engine";
import { Metrics } from "./Metrics";
import { Pipeline } from "./Pipeline";
import { Roadmap } from "./Roadmap";
import "./AboutSection.css";

export const AboutSection = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detectar preferencia de movimiento reducido
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionPreference = () => setReduceMotion(mediaQuery.matches);
    handleMotionPreference();
    mediaQuery.addEventListener("change", handleMotionPreference);
    return () => mediaQuery.removeEventListener("change", handleMotionPreference);
  }, []);

  // Detectar desktop
  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth >= 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // Intersection Observer
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      id="about"
      className="relative overflow-hidden py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Partículas (solo desktop) */}
      {isDesktop && (
        <Particles
          id="about-particles"
          init={particlesInit}
          options={{
            fpsLimit: 60,
            particles: {
              number: {
                value: 30,
                density: { enable: true, area: 800 },
              },
              color: { value: "#ef4444" },
              opacity: { value: 0.2, random: true },
              size: { value: 2, random: true },
              move: {
                enable: true,
                speed: 0.5,
                direction: "none",
                random: true,
                outMode: "out",
              },
              links: { enable: false },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
              },
              modes: {
                repulse: { distance: 80, duration: 0.4 },
              },
            },
            detectRetina: true,
          }}
          className="absolute inset-0 -z-10"
        />
      )}

      {/* Fondos decorativos */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-red-500/5 dark:bg-red-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-red-600/5 dark:bg-red-600/10 blur-3xl" />
      </div>

      <div ref={sectionRef} className="container relative z-10 mx-auto px-4 md:px-6">

        {/* Título */}
        <motion.h2
          className="mb-12 text-center text-4xl font-bold text-gray-900 dark:text-white md:text-5xl transition-colors"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Sobre Mí
          </span>
        </motion.h2>

        {/* Bloque 1 */}
        <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:gap-12">

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500 dark:text-red-400">
              Desarrollador Full Stack
            </p>

            <h3 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-4xl transition-colors">
              Enfocado en construir productos escalables
            </h3>

            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg transition-colors">
              Especializado en crear soluciones digitales innovadoras con React,
              Node.js y arquitecturas escalables. Más de 3 años transformando ideas
              en productos funcionales con enfoque en experiencia de usuario,
              rendimiento y decisiones técnicas sostenibles.
            </p>
          </motion.div>

          {/* Metrics */}
          <Metrics />
        </div>

        {/* Bloque 2: Pipeline */}
        <div className="mb-16">
          <Pipeline reduceMotion={reduceMotion} />
        </div>

        {/* Bloque 3: Roadmap */}
        <Roadmap />
      </div>
    </motion.section>
  );
};
