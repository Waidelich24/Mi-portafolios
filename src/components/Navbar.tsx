// components/Navbar.tsx
import { ThemeSwitcher } from "./ThemeSwitcher";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-dark-neutral-50/80 backdrop-blur-sm border-b border-neutral-200 dark:border-dark-neutral-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl font-bold text-primary-500 dark:text-dark-primary-500">
            AngelWaidelich
          </span>
        </div>
        <nav className="flex items-center gap-6">
          <a href="#projects" className="text-neutral-600 dark:text-dark-neutral-600 hover:text-primary-500 dark:hover:text-dark-primary-500 transition-colors">
            Proyectos
          </a>
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  );
}