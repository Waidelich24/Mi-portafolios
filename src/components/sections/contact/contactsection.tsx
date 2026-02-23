"use client";

import { motion } from "framer-motion";
import { ContactInfo } from "./ContactInfo";
import { SocialLinks } from "./SocialLinks";
import { ContactForm } from "./ContactForm";
import { useTranslation } from "@/hooks/useTranslation";

const ContactSection = () => {
  const { t } = useTranslation();

  const handleSubmit = async (formData: { name: string; email: string; message: string }) => {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(t('contact.status.error'));
    }
  };

  return (
    <section id="contacto" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t('contact.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="p-8 rounded-xl bg-white/50 dark:bg-gray-800/50 shadow-lg backdrop-blur-sm space-y-10">
            <ContactInfo />
            <SocialLinks />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }} viewport={{ once: true }} className="p-8 rounded-xl bg-white/50 dark:bg-gray-800/50 shadow-lg backdrop-blur-sm">
            <ContactForm onSubmit={handleSubmit} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
