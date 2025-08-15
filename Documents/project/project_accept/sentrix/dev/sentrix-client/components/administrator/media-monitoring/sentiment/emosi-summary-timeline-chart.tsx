'use client';

import { getEmotionSummaryTimeline } from '@/server/emotions/get-emotion-summary-timeline';
import { useSidebarFilterStore } from '@/store/sidebar-filter-store';
import { EMOSI_ICONS } from '@/types/constant';
import { useQuery } from '@tanstack/react-query';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const EmosiSummaryTimelineChart = () => {
  const { startDate, endDate, project } = useSidebarFilterStore();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ['emosi-summary-timeline', startDate, endDate, project],
    queryFn: () =>
      getEmotionSummaryTimeline({
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
      height: 400,
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: 'top',
      formatter(legendName) {
        return `
        <div style="display: flex; align-items: center;">
          <span style="margin-right: 5px;">${EMOSI_ICONS[legendName]}</span>
          <span>${legendName}</span>
        </div>
      `;
      },
      markers: {
        size: 0,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 5,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    grid: {
      show: true,
      borderColor: '#888EA84D',
      strokeDashArray: 5,
      position: 'back',
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    labels: data?.data?.labels || [],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.1,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
  };

  const chartSeries = [
    {
      name: 'Sedih',
      data: data?.data?.sedihValue || [],
      color: '#C93672',
    },
    {
      name: 'Kagum',
      data: data?.data?.kagumValue || [],
      color: '#2B8B9B',
    },
    {
      name: 'Marah',
      data: data?.data?.marahValue || [],
      color: '#FE2C55',
    },
    {
      name: 'Tidak Suka',
      data: data?.data?.tidakSukaValue || [],
      color: '#FFBB44',
    },
    {
      name: 'Takut',
      data: data?.data?.takutValue || [],
      color: '#2C2B2D',
    },
    {
      name: 'Suka',
      data: data?.data?.sukaValue || [],
      color: '#00C86E',
    },
    {
      name: 'Netral',
      data: data?.data?.netralValue || [],
      color: '#2196F3',
    },
  ];

  return <ReactApexChart series={chartSeries} options={chartOption} type="area" height={400} width={'100%'} />;
};

export default EmosiSummaryTimelineChart;
