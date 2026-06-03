import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  depth?: 'low' | 'medium' | 'high';
}

export default function GlassCard({
  children,
  className = '',
  glow = false,
  depth = 'medium'
}: GlassCardProps) {
  const depthClass = {
    low: 'glass-low',
    medium: 'glass-medium',
    high: 'glass-high'
  }[depth];

  const glowClass = glow ? 'glass-glow' : '';

  return (
    <div
      className={`glass ${depthClass} ${glowClass} rounded-2xl p-6 md:p-8 backdrop-blur-[20px] transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
