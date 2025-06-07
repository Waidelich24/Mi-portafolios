"use client";
import { motion } from "framer-motion";

export const AboutImage = () => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      whileHover={{ y: -10 }}
    >
      <motion.div
        className="overflow-hidden rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800"
        whileInView={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src="/Perfilimage.png"
          alt="Foto de perfil"
          className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
        />
      </motion.div>

      {/* Badge flotante animado */}
      <motion.div
        className="absolute -bottom-5 -right-5 bg-gradient-to-r from-primary-500 to-secondary-600 text-white px-4 py-2 rounded-lg shadow-lg font-medium"
        initial={{ scale: 0, rotate: -20 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        3+ años
      </motion.div>
    </motion.div>
  );
};