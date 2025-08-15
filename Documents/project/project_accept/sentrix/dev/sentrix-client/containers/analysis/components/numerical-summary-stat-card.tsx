'use client';

import React from 'react';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

import WaveSvg from '@/components/svg/wave-svg';

interface MetricDataProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  percentage: string;
  trend: 'up' | 'down' | 'neutral';
  color: string;
}

const NumericalSummaryStatCard = ({ icon, title, value, percentage, trend, color }: MetricDataProps) => {
  const isNeutral = trend === 'neutral';
  const isPositive = trend === 'up';

  const TrendIcon: LucideIcon | null = isNeutral ? null : isPositive ? TrendingUp : TrendingDown;

  const colorClass = isPositive ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500';

  return (
    <div className={`bg-white rounded-2xl transition-shadow duration-300 overflow-hidden h-full`}>
      <div className="flex items-start gap-3 p-2 h-12">
        <div>{icon}</div>
        <h3 className="text-gray-600 font-medium text-sm line-clamp-2 leading-tight" title={title}>
          {title}
        </h3>
      </div>

      <div className="relative h-16 p-2">
        <div className="flex items-end justify-between relative z-10 h-full">
          <div className="flex-1">
            <div className="text-base font-bold text-gray-900">{value}</div>
          </div>

          <div className="flex items-center gap-1 text-xs font-medium">
            {!isNeutral && TrendIcon && <TrendIcon size={14} className={`${colorClass} stroke-2`} />}
            <span className={`font-semibold ${colorClass}`}>{percentage}</span>
          </div>
        </div>

        {/* <div className="absolute inset-0 overflow-hidden">
          <WaveSvg className="absolute bottom-0 left-0 w-full" color={color} />
        </div> */}
      </div>
    </div>
  );
};

export default NumericalSummaryStatCard;
