'use client';

import { getSentimentSummary } from '@/server/actions/sentiments/get-sentiment-summary';
import { useSidebarFilterStore } from '@/store/sidebar-filter-store';
import { useQuery } from '@tanstack/react-query';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const chartOption: ApexOptions = {
  chart: {
    type: 'donut',
    height: 300,
    fontFamily: 'Nunito, sans-serif',
  },
  colors: ['#1B55E2', '#FE2C55', '#00C86E'],
  labels: ['Positif', 'Negatif', 'Netral'],
  legend: {
    show: true,
    position: 'bottom',
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

const SentimentSummaryDonutChart = () => {
  const { startDate, endDate, project } = useSidebarFilterStore();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ['sentiment-summary', startDate, endDate, project],
    queryFn: () =>
      getSentimentSummary({
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

  return (
    <ReactApexChart series={data?.data?.series || []} options={chartOption} type="donut" height={350} width={'100%'} />
  );
};

export default SentimentSummaryDonutChart;
