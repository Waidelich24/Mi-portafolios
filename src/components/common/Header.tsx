// components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

function useScrollSpy(ids: string[], offset = 0) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= offset + 100 && rect.bottom > offset + 100) {
          if (window.location.hash !== `#${id}`) {
            window.history.replaceState(null, '', `#${id}`);
          }
          setActiveId(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ids, offset]);

  return activeId;
}

function useSmoothScroll() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return scrollTo;
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'sobre-mi', label: 'Sobre mí' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'contacto', label: 'Contacto' },
  ];
  
  const ids = navItems.map(item => item.id);
  const activeId = useScrollSpy(ids, 100);
  const scrollTo = useSmoothScroll();

  useEffect(() => {
    setMounted(true);
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (id: string) => {
    scrollTo(id);
    closeMenu();
  };

  if (!mounted) return null;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full top-0 left-0 z-50 backdrop-blur-md transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 shadow-lg' 
          : 'bg-white/70 dark:bg-gray-900/70 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <motion.a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('inicio');
          }}
          className="text-xl font-bold flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <span className="bg-primary text-white p-2 rounded-lg shadow-md dark:bg-dark-primary">
            MP
          </span>
          <span className="text-primary dark:text-dark-primary font-bold">
            MiPortafolio
          </span>
        </motion.a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex gap-2">
            {navItems.map((item, index) => (
              <motion.li 
                key={item.id}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className="relative px-4 py-2 flex items-center group"
                >
                  <motion.span
                    className={`relative z-10 font-medium text-sm transition-colors ${
                      activeId === item.id 
                        ? 'text-primary-500 dark:text-dark-primary-500' 
                        : 'text-gray-700 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-dark-primary-100'
                    }`}
                  >
                    {item.label}
                  </motion.span>
                  
                  <motion.span
                    className={`absolute bottom-1 left-0 w-full h-0.5 ${
                      activeId === item.id 
                        ? 'bg-primary-500 dark:bg-dark-primary-500 scale-x-100' 
                        : 'bg-primary dark:bg-dark-primary scale-x-0'
                    }`}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0 }}
                  />
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Theme Switcher */}
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:shadow-md transition-all
                     border border-neutral-200 dark:border-gray-700 relative overflow-hidden
                     group flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Cambiar tema"
          >
            <motion.span
              className="absolute inset-0 bg-primary dark:bg-dark-primary opacity-0 group-hover:opacity-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: darkMode ? 0.1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={darkMode ? 'dark' : 'light'}
                initial={{ rotate: -30, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 30, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {darkMode ? (
                  <SunIcon className="w-5 h-5 text-dark-primary-100" />
                ) : (
                  <MoonIcon className="w-5 h-5 text-primary" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:shadow-md transition-all
                     border border-neutral-200 dark:border-gray-700"
            aria-label="Cambiar tema"
          >
            {darkMode ? (
              <SunIcon className="w-5 h-5 text-dark-primary-100" />
            ) : (
              <MoonIcon className="w-5 h-5 text-primary" />
            )}
          </button>

          <motion.button
            onClick={toggleMenu}
            className="text-gray-700 dark:text-gray-300 focus:outline-none"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <ul className="px-6 pb-4 pt-2 space-y-3">
              {navItems.map((item) => (
                <motion.li
                  key={item.id}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    className={`block w-full py-2 px-3 rounded-lg transition-colors ${
                      activeId === item.id 
                        ? 'text-primary-500 dark:text-dark-primary-500 bg-primary-100 dark:bg-dark-primary-900' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-dark-primary-900'
                    }`}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}