import IconMetricsSocialMediaReach from '@/components/icon/icon-metrics-social-media-reach';
import IconMetricsIcon from '@/components/icon/icon-metrics-mention';
import IconMetricsNonSocialMediaReach from '@/components/icon/icon-metrics-non-social-media-reach';
import IconMetricsPositiveMention from '@/components/icon/icon-metrics-positive-mention';
import IconMetricsNegativeMention from '@/components/icon/icon-metrics-negative-mention';
import IconMetricsAVE from '@/components/icon/icon-metrics-ave';

import { MetricStatsData } from '@/types/api';
import MetricsCard from './metrics-card';

interface MetricsRowProps {
  metrics: MetricStatsData;
}

const METRICS_CONFIGS = [
  { key: 'mention', icon: <IconMetricsIcon />, name: 'Penyebutan' },
  {
    key: 'socialMediaReach',
    icon: <IconMetricsSocialMediaReach />,
    name: 'Jangkauan Media Sosial',
  },
  {
    key: 'nonSocialReach',
    icon: <IconMetricsNonSocialMediaReach />,
    name: 'Jangkauan Non-Media Sosial',
  },
  {
    key: 'positiveMention',
    icon: <IconMetricsPositiveMention />,
    name: 'Positif',
  },
  {
    key: 'negativeMention',
    icon: <IconMetricsNegativeMention />,
    name: 'Negative',
  },
  { key: 'ave', icon: <IconMetricsAVE />, name: 'Nilai PR (Rp)' },
] as const;

const MetricsRow = ({ metrics }: MetricsRowProps) => {
  return (
    <div className="grid grid-cols-3 xl:grid-cols-6 gap-4 w-full">
      {METRICS_CONFIGS.map((config) => (
        <MetricsCard key={config.key} icon={config.icon} name={config.name} data={metrics[config.key]} />
      ))}
    </div>
  );
};

export default MetricsRow;
