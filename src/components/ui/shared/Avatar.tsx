import React from 'react';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-16 h-16',
  lg: 'w-20 h-20',
  xl: 'w-28 h-28'
};

export default function Avatar({ src, alt, size = 'md', className = '' }: AvatarProps) {
  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden ${className}`}>
      {src ? (
        <img 
          src={src} 
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600">
          <span className="text-2xl font-bold">{alt.charAt(0).toUpperCase()}</span>
        </div>
      )}
    </div>
  );
}