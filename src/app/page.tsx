'use client';

import { useScrollSpy } from '@/hooks/useScrollSpy'; // Asegurate de tener este hook creado
import { LavaLampBackground } from '@/components/LavaLampBackground';
import HeroSection from '@/components/sections/hero/HeroSection';
import { AboutSection } from '@/components/sections/about/AboutSection';
import ProjectsSection from '@/components/sections/projects/ProjectsSection';
import ContactSection from '@/components/sections/contact/contactsection';
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';

export default function HomePage() {
  // Activa el scroll-spy y actualiza el hash dinámicamente según la sección visible
  const activeSection = useScrollSpy(['inicio', 'sobre-mi', 'proyectos', 'contacto'], 80);

  return (
    <main className="scroll-smooth relative min-h-screen overflow-hidden">
      <LavaLampBackground />
      <Header />

      <div className="relative z-10 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md pt-20">
        {/* Hero Section */}
        <section id="inicio" className="scroll-mt-20">
          <HeroSection />
        </section>

        {/* About Section */}
        <section id="sobre-mi" className="scroll-mt-20">
          <AboutSection />
        </section>

        {/* Projects Section */}
        <section id="proyectos" className="scroll-mt-20">
          <div className="max-w-7xl mx-4 md:mx-auto my-12 border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-2xl min-h-[600px]">
            <ProjectsSection />
          </div>
        </section>
        <ContactSection/>
        {/* Footer / Contact Section */}
        <section id="contacto" className="scroll-mt-20">
          <Footer />
        </section>
      </div>
    </main>
  );
}
