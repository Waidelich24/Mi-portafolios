"use client";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

interface TimelineItem { year: string; focus: string; detail: string }

export const AboutTimeline = () => {
  const { t, tRaw } = useTranslation();
  const studyPath = tRaw<TimelineItem[]>('about.roadmap.items');

  return (
    <motion.div className="backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 rounded-2xl shadow-xl p-6 border border-white/20 dark:border-gray-700/50" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 }}>
      <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-primary-500 to-secondary-400 bg-clip-text text-transparent">{t('about.roadmap.title')}</h4>
      <div className="space-y-6 relative">
        <div className="absolute left-5 top-0 h-full w-0.5 bg-gradient-to-b from-primary-400 to-secondary-500 dark:from-primary-500 dark:to-secondary-600" />
        {studyPath.map((item, i) => (
          <motion.div key={i} className="flex gap-4 pl-8 relative" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.15 }}>
            <div className="absolute left-0 mt-1 w-3 h-3 rounded-full bg-primary-500 ring-4 ring-primary-200 dark:ring-primary-900/50" />
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 rounded-full text-sm mb-2">{item.year}</span>
              <h5 className="text-lg font-semibold">{item.focus}</h5>
              <p className="text-gray-600 dark:text-gray-300">{item.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};