/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Colores base (light mode)
        primary: '#800020',
        'primary-100': '#FFE5E5',
        'primary-500': '#9A2A3A',
        'primary-900': '#5C0011',

        secondary: '#DC2626',
        'secondary-300': '#FCA5A5',
        'secondary-700': '#B91C1C',

        // Colores para dark mode (usando rojo oscuro en lugar de rosa)
        'dark-primary': '#8B0000',           // reemplaza #B83280
        'dark-primary-100': '#FFCCCC',       // reemplaza #FCE7F3
        'dark-primary-500': '#A4161A',       // reemplaza #DB2777
        'dark-primary-900': '#5C0000',       // reemplaza #831843

        'dark-neutral-50': '#1F2937',
        'dark-neutral-200': '#374151',
        'dark-neutral-600': '#D1D5DB',
        'dark-neutral-900': '#F9FAFB'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
