import './globals.css'; // Aquí van los estilos globales

export const metadata = {
  title: 'Mi Portafolio',
  description: 'Desarrollador Fullstack',
  icons: {  // 👈 Añade esta sección para los iconos
    icon: [  // Puedes especificar múltiples formatos
      '/favicon.ico',  // Archivo .ico tradicional
      {
        media: '(prefers-color-scheme: dark)',
        url: '/favicon.ico',  // Opcional: favicon para modo oscuro
        href: '/favicon.ico',
      },
    ],
    shortcut: ['/favicon.png'],  // Icono para accesos directos
    apple: '/apple-touch-icon.png',  // Icono para dispositivos Apple
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}