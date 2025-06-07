export interface Project {
  id: string;
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  thumbnail: string;
  images: string[];
  link?: string;
  year: number;
  client?: string;
}

export const projectsData: Project[] = [
  {
    id: "1",
    title: "Sistema de Gestión Bibliotecaria",
    client: "Biblioteca Pública de Montecarlo Misiones",
    year: 2023,
    description: "Sistema integral para la gestión de préstamos, inventario y usuarios de la biblioteca municipal. Permite el control completo del flujo de libros, alta de préstamos y generación de reportes estadísticos.",
    features: [
      "CRUD completo de libros y usuarios",
      "Sistema de préstamos con fechas de vencimiento",
      "Cálculo automático de multas por mora",
      "Generación de reportes en PDF",
      "Búsqueda avanzada con filtros múltiples"
    ],
    technologies: ["Python", "SQL (SQLite)", "Tkinter", "ReportLab (PDF)"],
    thumbnail: "/images/projects/biblioteca/thumb.jpg",
    images: [
      "/images/projects/biblioteca/1.png",
      "/images/projects/biblioteca/2.png"
    ]
  },
  {
    id: "2",
    title: "Sitio Web Institucional",
    client: "ISIPP 1206",
    year: 2024,
    description: "Plataforma informativa moderna para el instituto educativo, mostrando su oferta académica, instalaciones y proceso de admisión. Diseñada para ser accesible y con excelente performance en dispositivos móviles.",
    features: [
      "Presentación interactiva de carreras",
      "Galeria de instalaciones",
      "Formulario de contacto integrado",
      "Blog de novedades",
      "Diseño responsive priorizando móviles"
    ],
    technologies: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
    thumbnail: "/images/projects/isipp/thumb.jpg",
    images: [
      "/images/projects/isipp/1.png",
      "/images/projects/isipp/2.png"
    ],
    link: "https://isipp1206.edu.ar"
  }
];