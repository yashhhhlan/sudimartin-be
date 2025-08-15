'use client';

import { useCallback, useMemo } from 'react';

import IconNumericalSummary from '@/components/icon/icon-numerical-summary';
import IconNumericalSummarySocialMediaMention from '@/components/icon/icon-numerical-summary-social-media-mention';
import IconNumericalSummaryNonSocialMediaMention from '@/components/icon/icon-numerical-summary-non-social-media-mention';
import IconNumericalSummaryContentGenerated from '@/components/icon/icon-numerical-summary-content-generated';
import IconNumericalSummaryPositiveMention from '@/components/icon/icon-numerical-summary-positive-mention';
import IconNumericalSummaryNegativeMention from '@/components/icon/icon-numerical-summary-negative-mention';
import IconNumericalSummaryNeutralMention from '@/components/icon/icon-numerical-summary-neutral-mention';
import IconNumericalSummarySocialMediaInteraction from '@/components/icon/icon-numerical-summary-social-media-interaction';
import IconNumericalSummarySocialMediaLikes from '@/components/icon/icon-numerical-summary-social-media-likes';
import IconNumericalSummarySocialMediaShares from '@/components/icon/icon-numerical-summary-social-media-shares';
import NumericalSummaryStatCard from './numerical-summary-stat-card';

import { MetricStatsData } from '@/types/api';

interface NumericalSummaryData {
  icon: React.ReactNode;
  title: string;
  value: string;
  percentage: string;
  trend: 'up' | 'down' | 'neutral';
  color: string;
}

interface NumericalSummaryStatProps {
  metrics: MetricStatsData;
}

const METRIC_CONFIGS = [
  {
    key: 'socialMediaMention',
    icon: <IconNumericalSummarySocialMediaMention />,
    title: 'Penyebutan media sosial',
    color: 'bg-blue-100',
    widgetType: 'social-media-mention',
  },
  {
    key: 'nonSocialMediaMention',
    icon: <IconNumericalSummaryNonSocialMediaMention />,
    title: 'Penyebutan non-media sosial',
    color: 'bg-cyan-100',
    widgetType: 'non-social-media-mention',
  },
  {
    key: 'userGeneratedContent',
    icon: <IconNumericalSummaryContentGenerated />,
    title: 'Konten buatan pengguna',
    color: 'bg-purple-100',
    widgetType: 'user-generated-content-mention',
  },
  {
    key: 'positiveMention',
    icon: <IconNumericalSummaryPositiveMention />,
    title: 'Positif',
    color: 'bg-green-100',
    widgetType: 'positive-mention',
  },
  {
    key: 'negativeMention',
    icon: <IconNumericalSummaryNegativeMention />,
    title: 'Negatif',
    color: 'bg-red-100',
    widgetType: 'negative-mention',
  },
  {
    key: 'neutralMention',
    icon: <IconNumericalSummaryNeutralMention />,
    title: 'Netral',
    color: 'bg-gray-100',
    widgetType: 'neutral-mention',
  },
  {
    key: 'interaction',
    icon: <IconNumericalSummarySocialMediaInteraction />,
    title: 'Interaksi media sosial',
    color: 'bg-yellow-100',
    widgetType: 'social-media-interaction',
  },
  {
    key: 'socialMediaLikes',
    icon: <IconNumericalSummarySocialMediaLikes />,
    title: 'Menyukai',
    color: 'bg-pink-100',
    widgetType: 'social-media-likes',
  },
  {
    key: 'numberOfShares',
    icon: <IconNumericalSummarySocialMediaShares />,
    title: 'Membagikan',
    color: 'bg-indigo-100',
    widgetType: 'number-of-shares',
  },
] as const;

const NumericalSummaryStat = ({ metrics }: NumericalSummaryStatProps) => {
  const getTrend = (growth: number): 'up' | 'down' | 'neutral' => {
    if (growth > 0) return 'up';
    if (growth < 0) return 'down';
    return 'neutral';
  };

  const formatGrowth = useCallback((growth: number) => {
    if (growth === 0) return '0.0%';
    const sign = growth > 0 ? '+' : '';
    return `${sign}${growth.toFixed(1)}%`;
  }, []);

  const data: NumericalSummaryData[] = useMemo(() => {
    return METRIC_CONFIGS.map((config) => {
      const metric = metrics[config.key as keyof typeof metrics];
      const growth = metric?.growth || 0;

      return {
        icon: config.icon,
        title: config.title,
        value: metric?.totalFormatted || '0',
        percentage: formatGrowth(growth),
        trend: getTrend(growth),
        color: config.color,
      };
    });
  }, [formatGrowth, metrics]);

  return (
    <div className="p-5 bg-white rounded-md shadow-md w-1/3">
      <div className="mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <IconNumericalSummary />
          <h5 className="text-base font-semibold">Statistik</h5>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 h-full">
          {data.map((metric, index) => (
            <NumericalSummaryStatCard key={METRIC_CONFIGS[index].key} {...metric} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NumericalSummaryStat;
