'use client';

import { getEmotionSummary } from '@/server/emotions/get-emotion-summary';
import { useSidebarFilterStore } from '@/store/sidebar-filter-store';
import { EMOSI_ICONS } from '@/types/constant';
import { useQuery } from '@tanstack/react-query';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const EmosiSummaryDonutChart = () => {
  const { startDate, endDate, project } = useSidebarFilterStore();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ['emotion-summary', startDate, endDate, project],
    queryFn: () =>
      getEmotionSummary({
        startDate: startDate?.toString() ?? '',
        endDate: endDate?.toString() ?? '',
        project,
      }),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (!isMounted) return null;
  if (isLoading || isFetching) {
    return (
      <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
        <span className="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-black !border-l-transparent dark:border-white"></span>
      </div>
    );
  }

  if (isError || !data?.success) {
    return (
      <div className="min-h-[325px] h-full flex items-center justify-center bg-red-50 dark:bg-red-900/10">
        <div className="text-center">
          <div className="text-red-500 mb-2">⚠️ Error loading chart data</div>
          <button onClick={() => refetch()} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 rounded-md text-sm">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const chartOption: ApexOptions = {
    chart: {
      type: 'donut',
      height: 300,
      fontFamily: 'Nunito, sans-serif',
    },
    colors: ['#C93672', '#2B8B9B', '#FE2C55', '#FFBB44', '#2C2B2D', '#00C86E', '#2196F3'],
    labels: data?.data?.labels || [],
    legend: {
      show: true,
      position: 'left',
      formatter(legendName, opts) {
        return `
          <div style="display: flex; align-items: center;">
            <span style="width: 24px;">${EMOSI_ICONS[legendName]}</span>
            <span>${legendName}</span>
          </div>
      `;
      },
      markers: {
        size: 0,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <ReactApexChart series={data?.data?.series || []} options={chartOption} type="donut" height={350} width={'100%'} />
  );
};

export default EmosiSummaryDonutChart;
