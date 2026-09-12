import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface BrandLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showText?: boolean;
  textClassName?: string;
  className?: string;
  animated?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  textClassName,
  className,
  animated = true,
}) => {
  const [useCustomImg, setUseCustomImg] = useState(true);

  const sizeMap = {
    xs: { icon: 'w-6 h-6', text: 'text-sm', badge: 'text-[9px] px-1 py-0.2' },
    sm: { icon: 'w-8 h-8', text: 'text-base', badge: 'text-[10px] px-1.5 py-0.5' },
    md: { icon: 'w-10 h-10', text: 'text-lg', badge: 'text-[10px] px-1.5 py-0.5' },
    lg: { icon: 'w-12 h-12', text: 'text-xl', badge: 'text-xs px-2 py-0.5' },
    xl: { icon: 'w-16 h-16', text: 'text-2xl', badge: 'text-xs px-2 py-1' },
    hero: { icon: 'w-24 h-24 sm:w-28 sm:h-28', text: 'text-3xl sm:text-4xl', badge: 'text-xs px-2.5 py-1' },
  };

  const currentSize = sizeMap[size];

  const logoIcon = (
    <div className={cn('relative flex items-center justify-center shrink-0 group', currentSize.icon, className)}>
      {/* 3D Glowing Halo Background Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-peach-500/30 via-emerald-500/20 to-amber-400/30 blur-md group-hover:blur-lg transition-all duration-300 pointer-events-none" />

      {/* Main 3D Nexus Vector Logo / Custom Image */}
      {useCustomImg ? (
        <img
          src="/assets/logo.svg"
          alt="NEXORA Logo"
          onError={() => setUseCustomImg(false)}
          className="w-full h-full object-contain relative z-10 drop-shadow-[0_4px_12px_rgba(249,115,22,0.35)] transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full relative z-10 drop-shadow-[0_4px_12px_rgba(249,115,22,0.35)] transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <filter id="coreGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="emGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#34d399" />
              <stop offset="100%" stop-color="#064e3b" />
            </linearGradient>
            <linearGradient id="peachGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ea580c" />
              <stop offset="100%" stop-color="#fde047" />
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="100" rx="85" ry="36" fill="none" stroke="url(#peachGrad)" strokeWidth="2.5" strokeDasharray="6,6" opacity="0.6" transform="rotate(-28 100 100)" />
          <ellipse cx="100" cy="100" rx="85" ry="36" fill="none" stroke="url(#emGrad)" strokeWidth="2.5" opacity="0.5" transform="rotate(35 100 100)" />
          <polygon points="100,24 162,60 162,140 100,176 38,140 38,60" fill="#022c22" stroke="#064e3b" strokeWidth="2" />
          <polygon points="100,100 38,60 38,140 100,176" fill="url(#emGrad)" opacity="0.95" />
          <polygon points="100,100 162,60 162,140 100,176" fill="url(#peachGrad)" opacity="0.9" />
          <polygon points="100,24 162,60 100,100 38,60" fill="#ffffff" fillOpacity="0.4" />
          <polygon points="100,55 135,78 135,122 100,145 65,122 65,78" fill="url(#peachGrad)" filter="url(#coreGlowFilter)" opacity="0.85" />
          <path d="M 82 124 L 82 76 L 118 124 L 118 76" fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );

  return (
    <div className="inline-flex items-center gap-3 select-none">
      {animated ? (
        <motion.div
          whileHover={{ scale: 1.05, rotateZ: 2 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {logoIcon}
        </motion.div>
      ) : (
        logoIcon
      )}

      {showText && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className={cn('font-extrabold tracking-wider text-peach-50 font-sans leading-none', currentSize.text, textClassName)}>
              NEXORA
            </span>
            <span className={cn('uppercase font-bold tracking-widest bg-peach-500/20 text-peach-300 rounded border border-peach-500/30', currentSize.badge)}>
              CRM
            </span>
          </div>
          {size !== 'xs' && (
            <span className="text-[10px] text-peach-200/70 font-medium truncate mt-0.5 tracking-tight">
              Enterprise SaaS
            </span>
          )}
        </div>
      )}
    </div>
  );
};
