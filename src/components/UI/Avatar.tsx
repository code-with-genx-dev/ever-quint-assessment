import type React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap: Record<string, string> = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md', className = '' }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-full object-cover border-2 cursor-pointer  ${sizeMap[size]} ${className}`}
      loading="lazy"
    />
  );
};

export default Avatar;
