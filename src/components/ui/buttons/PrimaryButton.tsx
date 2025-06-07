import React from 'react';
import { motion } from 'framer-motion';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  download?: boolean;
  as?: React.ElementType;
}

export const PrimaryButton = motion(
  React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
    ({ children, href, download, className = '', as, ...props }, ref) => {
      
      const baseClasses = 'button-primary px-6 py-3 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2';

      const Component = as || (href ? 'a' : 'button');
      
      return (
        <Component
          ref={ref}
          href={href}
          download={download}
          className={`${baseClasses} ${className}`}
          {...props}
        >
          {children}
        </Component>
      );
    }
  )
);
