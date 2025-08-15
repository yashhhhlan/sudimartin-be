'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import { MetricData } from '@/types/api';

interface MetricsCardProps {
  icon: React.ReactNode;
  name: string;
  data?: MetricData;
}

const MetricsCard = ({ icon, name, data }: MetricsCardProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const chartData = useMemo(() => data?.trend?.map((item) => item.value) || [0, 0, 0, 0, 0, 0, 0], [data?.trend]);

  const chartOptions = useMemo(
    () =>
      ({
        series: [{ data: chartData }],
        options: {
          chart: {
            height: 45,
            type: 'line',
            sparkline: { enabled: true },
          },
          stroke: { width: 2 },
          markers: { size: 0 },
          colors: ['#00ab55'],
          grid: { padding: { top: 0, bottom: 0, left: 0 } },
          tooltip: {
            x: { show: false },
            y: { title: { formatter: () => '' } },
          },
          responsive: [
            {
              breakPoint: 576,
              options: {
                chart: { height: 95 },
                grid: { padding: { top: 45, bottom: 0, left: 0 } },
              },
            },
          ],
        },
      }) as any,
    [chartData],
  );

  const total = data?.totalFormatted || '0';
  const growth = data?.growth || 0;

  const formatGrowth = useCallback((growth: number) => {
    if (growth === 0) return '0.0%';
    const sign = growth >= 0 ? '+' : '';
    return `${sign}${growth.toFixed(1)}%`;
  }, []);

  const getGrowthColor = useCallback((growth: number) => {
    if (growth > 0) return 'text-success';
    if (growth < 0) return 'text-danger';
    return 'text-gray-500';
  }, []);

  return (
    <div className={`panel w-full`}>
      <div className="mb-5 flex items-center font-semibold">
        <div className="grid h-10 w-10 shrink-0 place-content-center rounded-full">{icon}</div>
        <div className="ltr:ml-2 rtl:mr-2">
          <h6 className="text-dark dark:text-white-light">{name}</h6>
        </div>
      </div>
      <div className="mb-5">
        {isMounted && (
          <ReactApexChart
            series={chartOptions.series}
            options={chartOptions.options}
            type="line"
            height={45}
            width="100%"
          />
        )}
      </div>
      <div className="flex items-center justify-between text-base font-bold">
        {total}
        <span className={`text-sm font-normal ${getGrowthColor(growth)}`}>{formatGrowth(growth)}</span>
      </div>
    </div>
  );
};

export default MetricsCard;
