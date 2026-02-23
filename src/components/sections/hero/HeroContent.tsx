"use client";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { PrimaryButton } from "@/components/ui/buttons/PrimaryButton";
import HeroBulletPoints from "./HeroBulletPoints";
import { useTranslation } from "@/hooks/useTranslation";

export default function HeroContent() {
  const { t } = useTranslation();

  return (
    <motion.div
      className="lg:w-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8 md:p-10"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-snug text-neutral-900 dark:text-white mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="block bg-gradient-to-r from-primary-500 to-secondary-600 dark:from-primary-400 dark:to-secondary-500 bg-clip-text text-transparent">
          {t('brand.author')}
        </span>
        <span className="block mt-2 text-2xl md:text-3xl lg:text-4xl font-medium text-gray-600 dark:text-gray-300">
          {t('hero.role')}
        </span>
      </motion.h1>

      <motion.p className="text-lg md:text-xl text-neutral-600 dark:text-gray-300 mb-8 leading-relaxed" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
        {t('hero.description')} <span className="font-semibold text-primary-500 dark:text-primary-400">{t('hero.stack')}</span>, {t('hero.descriptionEnd')}
      </motion.p>

      <HeroBulletPoints />

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex justify-start gap-4 mt-10">
        <PrimaryButton href="#proyectos">
          {t('hero.cta')}
          <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
        </PrimaryButton>
      </motion.div>
    </motion.div>
  );
}