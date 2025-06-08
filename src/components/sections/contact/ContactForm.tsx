import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "emailjs-com";
import { EmailJSResponseStatus } from 'emailjs-com';

interface ContactFormProps {
  onSubmit: (formData: { 
    name: string; 
    email: string; 
    message: string 
  }) => Promise<EmailJSResponseStatus | void>;
}

export const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "captcha">("idle");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");

    if (!captchaToken) {
      setSubmitStatus("captcha");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setCaptchaToken(null);
    } catch (error) {
      console.error("Error al enviar email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 gap-6">
        {/* Campo Nombre */}
        <div className="space-y-2">
          <label htmlFor="name" className="form-label">Nombre</label>
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              required
              className="form-input w-full px-5 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm transition-all duration-300"
            />
          </motion.div>
        </div>

        {/* Campo Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="form-label">Email</label>
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
              className="form-input w-full px-5 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm transition-all duration-300"
            />
          </motion.div>
        </div>

        {/* Campo Mensaje */}
        <div className="space-y-2">
          <label htmlFor="message" className="form-label">Mensaje</label>
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Cuéntame sobre tu proyecto..."
              rows={6}
              required
              className="form-input w-full px-5 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm transition-all duration-300 resize-none"
            />
          </motion.div>
        </div>
      </div>

      {/* ReCAPTCHA con animación */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6"
      >
        <ReCAPTCHA
          sitekey="6LdoLVkrAAAAAKqjvugIJGOjgPzaUSHObZBWHx7h"
          onChange={(token) => setCaptchaToken(token)}
          className="recaptcha-container"
        />
      </motion.div>

      {/* Mensajes de estado */}
      {submitStatus === "captcha" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-lg bg-red-100/80 dark:bg-red-900/50 border border-red-200 dark:border-red-800 flex items-center gap-2"
        >
          <span className="text-red-600 dark:text-red-300">⚠️ Por favor verifica que no eres un robot.</span>
        </motion.div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        {/* Mensajes de feedback */}
        <div className="flex-1 min-h-[40px]">
          {submitStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-3 rounded-lg bg-green-100/80 dark:bg-green-900/50 border border-green-200 dark:border-green-800 flex items-center gap-2"
            >
              <span className="text-green-700 dark:text-green-300">✓ Mensaje enviado con éxito!</span>
            </motion.div>
          )}
          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-3 rounded-lg bg-red-100/80 dark:bg-red-900/50 border border-red-200 dark:border-red-800 flex items-center gap-2"
            >
              <span className="text-red-700 dark:text-red-300">✗ Error al enviar. Intenta nuevamente.</span>
            </motion.div>
          )}
        </div>

        {/* Botón de enviar */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="button-primary flex items-center gap-3 px-8 py-3.5 rounded-xl text-white font-medium shadow-lg hover:shadow-primary-500/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          style={{
            background: 'linear-gradient(135deg, #800020 0%, #9A2A3A 100%)',
            boxShadow: '0 4px 15px rgba(128, 0, 32, 0.2)'
          }}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </>
          ) : (
            <>
              <FiSend className="text-lg" />
              Enviar mensaje
            </>
          )}
        </motion.button>
      </div>
    </form>
  );
};