"use client";
import { motion } from "framer-motion";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-transparent">

      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-5 bg-[url('/grid-pattern.svg')] bg-repeat" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Contenido */}
          <HeroContent />
          
          {/* Imagen */}
          <HeroImage />
        </div>
      </div>
    </section>
  );
}