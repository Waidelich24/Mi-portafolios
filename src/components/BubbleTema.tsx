// components/BubbleTema.tsx
'use client';

import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function BubbleTema() {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <button
        onClick={toggleTheme}
        className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all
                 border border-neutral-200 dark:border-gray-700 flex items-center justify-center
                 group relative overflow-hidden"
        aria-label="Cambiar tema"
      >
        {/* Fondo animado */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-600 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: darkMode ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {darkMode ? (
          <SunIcon className="w-6 h-6 text-yellow-400" />
        ) : (
          <MoonIcon className="w-6 h-6 text-indigo-600" />
        )}
        
        {/* Tooltip */}
        <span className="absolute right-full mr-2 px-2 py-1 text-sm rounded bg-neutral-100 dark:bg-gray-700 text-neutral-800 dark:text-gray-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          {darkMode ? 'Cambiar a claro' : 'Cambiar a oscuro'}
        </span>
      </button>
    </motion.div>
  );
}