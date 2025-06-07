"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ContactInfo } from "./ContactInfo";
import { SocialLinks } from "./SocialLinks";
import { ContactForm } from "./ContactForm";
import emailjs from "emailjs-com";

const ContactSection = () => {
  const handleSubmit = async (formData: { name: string; email: string; message: string }) => {
    return emailjs.send(
      "service_ug53z2m",
      "template_svwi8li",
      {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
      },
      "dF0CJvls729mF8yR8"
    );
  };

  return (
    <section id="contacto" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Contacto</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente o quieres trabajar juntos? Envíame un mensaje y te responderé lo antes posible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="p-8 rounded-xl bg-white/50 dark:bg-gray-800/50 shadow-lg backdrop-blur-sm space-y-10"
          >
            <ContactInfo />
            <SocialLinks />
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="p-8 rounded-xl bg-white/50 dark:bg-gray-800/50 shadow-lg backdrop-blur-sm"
          >
            <ContactForm onSubmit={handleSubmit} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;