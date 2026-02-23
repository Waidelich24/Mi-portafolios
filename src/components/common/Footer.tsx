"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { PrimaryButton } from "@/components/ui/buttons/PrimaryButton";
import { useTranslation } from "@/hooks/useTranslation";

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const navItems = [
    { id: 'inicio', label: t('navigation.home') },
    { id: 'sobre-mi', label: t('navigation.about') },
    { id: 'proyectos', label: t('navigation.projects') },
    { id: 'contacto', label: t('navigation.contact') },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.footer initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={footerVariants} className="bg-gradient-to-b from-white/50 to-white/30 dark:from-gray-900/70 dark:to-gray-900/50 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-red-700 via-red-600 to-red-500 bg-clip-text text-transparent">{t('brand.author')}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('footer.description')}</p>
            <div className="flex space-x-4">
              <motion.a href="https://github.com/Waidelich24" target="_blank" rel="noopener noreferrer" whileHover={{ y: -3, scale: 1.1 }} className="text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"><FaGithub className="w-5 h-5" /></motion.a>
              <motion.a href="https://www.linkedin.com/in/angel-waidelich-579270326/o" target="_blank" rel="noopener noreferrer" whileHover={{ y: -3, scale: 1.1 }} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><FaLinkedin className="w-5 h-5" /></motion.a>
              <motion.a href="mailto:waidelich24@gmail.com" whileHover={{ y: -3, scale: 1.1 }} className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"><FaEnvelope className="w-5 h-5" /></motion.a>
            </div>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-white">{t('footer.navTitle')}</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <motion.li key={item.id} whileHover={{ x: 5 }}>
                  <button onClick={() => scrollToSection(item.id)} className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-500 transition-colors text-sm">{item.label}</button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-white">{t('footer.contactTitle')}</h3>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{t('contact.items.locationValue')}</p>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <p className="text-gray-600 dark:text-gray-400 text-sm">waidelich24@gmail.com</p>
            </div>
          </motion.div>

          <motion.div variants={item} className="space-y-4 flex flex-col items-center text-center">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold dark:text-white">{t('footer.projectTitle')}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs">{t('footer.projectDescription')}</p>
            </div>
            <Image src="/Perfilimage-rounded.png" alt={t('footer.avatarAlt')} width={96} height={96} className="w-24 h-24 rounded-full object-cover shadow-lg mx-auto" />
            <PrimaryButton onClick={() => scrollToSection('contacto')} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white text-sm font-medium mt-4">{t('actions.contactNow')}</PrimaryButton>
          </motion.div>
        </div>

        <motion.div variants={item} className="border-t border-gray-200 dark:border-gray-800 my-8" />

        <motion.div variants={item} className="text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {currentYear} {t('brand.author')}. {t('footer.copyright')}</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}