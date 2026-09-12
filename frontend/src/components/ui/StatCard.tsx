import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: number; // percentage, e.g. 14.5 or -3.2
  changePeriod?: string; // e.g. 'vs last month'
  icon: React.ReactNode;
  iconBg?: string;
  subtitle?: string;
  className?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changePeriod = 'vs previous period',
  icon,
  iconBg = 'bg-peach-100 dark:bg-forest-900/60 text-forest-800 dark:text-peach-200 border-peach-200 dark:border-forest-800',
  subtitle,
  className,
  onClick,
}) => {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const isNeutral = change !== undefined && change === 0;

  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white dark:bg-forest-900/80 border border-peach-200/60 dark:border-forest-800 rounded-2xl p-5 shadow-xs transition-all duration-200',
        onClick && 'cursor-pointer hover:border-peach-400/60 hover:shadow-md hover:-translate-y-0.5',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center border shadow-xs', iconBg)}>
          {icon}
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {value}
        </span>
      </div>

      {change !== undefined && (
        <div className="flex items-center gap-1.5 text-xs">
          <span
            className={cn(
              'inline-flex items-center gap-0.5 font-semibold px-1.5 py-0.5 rounded-md',
              isPositive && 'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/50',
              isNegative && 'text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/50',
              isNeutral && 'text-slate-600 bg-slate-100 dark:text-slate-400 dark:bg-slate-800'
            )}
          >
            {isPositive && <TrendingUp className="w-3 h-3" />}
            {isNegative && <TrendingDown className="w-3 h-3" />}
            {isNeutral && <Minus className="w-3 h-3" />}
            <span>{Math.abs(change)}%</span>
          </span>
          <span className="text-slate-400 dark:text-slate-500">{changePeriod}</span>
        </div>
      )}

      {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>}
    </div>
  );
};
