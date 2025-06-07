import { motion } from "framer-motion";  // Añade esta importación
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

interface ContactItem {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
}

export const ContactInfo = () => {
  const contactItems: ContactItem[] = [
    {
      icon: <FiMail className="text-xl" />,
      title: "Email",
      value: "waidelich24@gmail.com",
      href: "mailto:waidelich24@gmail.com"
    },
    {
      icon: <FiMapPin className="text-xl" />,
      title: "Ubicación",
      value: "Montecarlo, Misiones, Argentina"
    },
    {
      icon: <FiPhone className="text-xl" />,
      title: "Teléfono",
      value: "+54 9 3751 342631",
      href: "tel:+5493751342631"
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold dark:text-white">Información de contacto</h3>
      <div className="space-y-4">
        {contactItems.map((item, index) => (
          <motion.div key={index} whileHover={{ x: 5 }} className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg">
              {item.icon}
            </div>
            <div>
              <h4 className="font-medium dark:text-white">{item.title}</h4>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">{item.value}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};