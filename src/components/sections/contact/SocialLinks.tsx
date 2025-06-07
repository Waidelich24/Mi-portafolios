import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

export const SocialLinks = () => {
  const socialLinks: SocialLink[] = [
    { icon: <FaGithub />, href: "https://github.com/Waidelich24", label: "GitHub" },
    { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/in/angel-waidelich-579270326/", label: "LinkedIn" },
    { icon: <FaInstagram />, href: "https://www.instagram.com/angel_waidelich25/", label: "Instagram" }
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold dark:text-white mb-4">Redes sociales</h3>
      <div className="flex gap-4">
        {socialLinks.map((social, index) => (
          <motion.a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full border transition-all
              bg-gray-100 text-gray-700 border-transparent
              hover:bg-blue-100 hover:text-blue-600
              dark:bg-white dark:text-white dark:border-red-500
              dark:hover:bg-red-500 dark:hover:text-white"
            aria-label={social.label}
          >
            {social.icon}
          </motion.a>
        ))}
      </div>
    </div>
  );
};
