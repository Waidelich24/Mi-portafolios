// hooks/useSmoothScroll.ts
export function useSmoothScroll() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Ajusta este valor según el tamaño de tu header
        behavior: 'smooth'
      });
    }
  };

  return scrollTo;
}