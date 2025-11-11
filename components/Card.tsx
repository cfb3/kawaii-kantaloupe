import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: 'small' | 'medium' | 'large';
  borderColor?: 'green' | 'pink' | 'orange' | 'purple';
}

export default function Card({
  children,
  className = '',
  hoverable = true,
  padding = 'medium',
  borderColor = 'green'
}: CardProps) {
  const baseClasses = 'bg-white rounded-3xl shadow-md transition-all duration-300 relative';

  const hoverClasses = hoverable
    ? 'hover:-translate-y-1 hover:shadow-xl'
    : '';

  const paddingClasses = {
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  };

  const borderClasses = {
    green: 'border-3 border-green',
    pink: 'border-3 border-pink',
    orange: 'border-3 border-orange',
    purple: 'border-3 border-purple'
  };

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${paddingClasses[padding]} ${borderClasses[borderColor]} ${className}`}
    >
      {children}
    </div>
  );
}
