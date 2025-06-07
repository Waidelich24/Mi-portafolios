import { useEffect, useState } from 'react';

export function useScrollSpy(ids: string[], offset = 0) {
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
    handleScroll(); // llama al cargar
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ids, offset]);

  return activeId;
}
