import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

    const variants = {
      primary:
        'bg-forest-900 text-peach-100 hover:bg-forest-850 hover:text-white focus:ring-peach-500 shadow-sm dark:bg-emerald-700 dark:hover:bg-emerald-600 dark:text-peach-50 border border-peach-400/20',
      secondary:
        'bg-peach-100/80 text-forest-950 hover:bg-peach-200 focus:ring-peach-400 dark:bg-forest-850 dark:text-peach-100 dark:hover:bg-forest-800 border border-peach-300/60 dark:border-forest-700',
      outline:
        'bg-transparent border border-peach-300/80 text-forest-950 hover:bg-peach-50 focus:ring-peach-500 dark:border-forest-700 dark:text-peach-200 dark:hover:bg-forest-850',
      ghost:
        'bg-transparent text-slate-700 hover:bg-peach-100/70 hover:text-forest-950 focus:ring-peach-400 dark:text-peach-200 dark:hover:bg-forest-850 dark:hover:text-peach-100 border border-transparent',
      danger:
        'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 shadow-sm dark:bg-rose-600 dark:hover:bg-rose-500 border border-transparent',
      success:
        'bg-forest-700 text-peach-50 hover:bg-forest-600 focus:ring-peach-400 shadow-sm dark:bg-emerald-600 dark:hover:bg-emerald-500 border border-transparent',
    };

    const sizes = {
      xs: 'text-xs px-2.5 py-1 gap-1.5',
      sm: 'text-xs px-3 py-1.5 gap-1.5 font-medium',
      md: 'text-sm px-4 py-2 gap-2',
      lg: 'text-base px-5 py-2.5 gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
