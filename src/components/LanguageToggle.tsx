'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import type { Language } from '@/context/LanguageContext';
import { Check, ChevronDown } from 'lucide-react';
import ReactCountryFlag from 'react-country-flag';

const languageOptions: { code: Language; label: string; countryCode: string }[] = [
  { code: 'en', label: 'English', countryCode: 'GB' },
  { code: 'es', label: 'Español', countryCode: 'ES' },
  { code: 'pt', label: 'Português', countryCode: 'BR' },
];

export function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languageOptions.find(opt => opt.code === language);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-neutral-200 dark:border-gray-700 text-sm font-medium hover:border-neutral-300 dark:hover:border-gray-600 transition-colors"
        whileTap={{ scale: 0.97 }}
        aria-label={t('actions.languageToggle')}
        aria-expanded={isOpen}
      >
        {currentLanguage && (
          <ReactCountryFlag
            countryCode={currentLanguage.countryCode}
            svg
            style={{
              width: '20px',
              height: '15px',
            }}
            className="rounded-sm"
          />
        )}
        <span className="hidden sm:inline">{currentLanguage?.label}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-neutral-200 dark:border-gray-700 overflow-hidden z-50"
          >
            {languageOptions.map((option) => (
              <motion.button
                key={option.code}
                onClick={() => {
                  setLanguage(option.code);
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.1 }}
              >
                <ReactCountryFlag
                  countryCode={option.countryCode}
                  svg
                  style={{
                    width: '20px',
                    height: '15px',
                  }}
                  className="rounded-sm"
                />
                <span className="flex-1 text-left">{option.label}</span>
                {language === option.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Check className="w-4 h-4 text-blue-500" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}