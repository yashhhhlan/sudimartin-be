'use client';

import { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

import IconReach from '@/components/icon/icon-reach';

import { IRootState } from '@/store';

import { ReachStatsSummaryData } from '@/types/api';

interface ReachChartProps {
  data?: ReachStatsSummaryData;
  color?: string[]; 
  title?: string; 
  seriesAName?: string; 
  seriesBName?: string; 
}

const ReachChart = ({ data, color = [], title = 'Jangkauan', seriesAName, seriesBName }: ReachChartProps) => {
  const isDark = useSelector(
    (state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode
  );
  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const chartData = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        valueA: [0, 0, 0, 0, 0, 0, 0],
        valueB: [0, 0, 0, 0, 0, 0, 0],
        labels: ['No Data'],
        totalValueA: 0,
        totalValueB: 0,
        seriesAName: 'Series A',
        seriesBName: 'Series B',
      };
    }

    const valueA = data.map((item) => item.valueA);
    const valueB = data.map((item) => item.valueB);
    const labels = data.map((item) => item.date);

    const totalValueA = valueA.reduce((sum, val) => sum + val, 0);
    const totalValueB = valueB.reduce((sum, val) => sum + val, 0);

    return {
      valueA,
      valueB,
      labels,
      totalValueA,
      totalValueB,
      seriesAName,
      seriesBName
    };
  }, [data, seriesAName, seriesBName]);

  const chartOptions = useMemo(
    () => ({
      series: [
        {
          name: chartData.seriesAName,
          data: chartData.valueA,
        },
        {
          name: chartData.seriesBName,
          data: chartData.valueB,
        },
      ],
      options: {
        chart: {
          height: 325,
          type: 'area' as const,
          fontFamily: 'Nunito, sans-serif' as const,
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          curve: 'smooth' as const,
          width: 2,
          lineCap: 'square' as const,
        },
        dropShadow: {
          enabled: true,
          opacity: 0.2,
          blur: 10,
          left: -7,
          top: 22,
        },
        colors: color.length ? color : isDark ? ['#2196F3', '#00C86E'] : ['#2196F3', '#00C86E'],
        labels: chartData.labels,
        xaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            show: true,
          },
          labels: {
            offsetX: isRtl ? 2 : 0,
            offsetY: 5,
            style: {
              fontSize: '12px' as const,
              cssClass: 'apexcharts-xaxis-title' as const,
            },
          },
        },
        yaxis: {
          tickAmount: 6,
          opposite: isRtl ? true : false,
          labels: {
            offsetX: isRtl ? -10 : -10,
          },
        },
        grid: {
          borderColor: isDark ? '#191E3A' : '#E0E6ED',
          strokeDashArray: 5,
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
        legend: {
          position: 'top' as const,
          horizontalAlign: 'right' as const,
          fontSize: '16px' as const,
          markers: {
            width: 10,
            height: 10,
            offsetX: -2,
          },
          itemMargin: {
            horizontal: 10,
            vertical: 5,
          },
        },
        tooltip: {
          marker: {
            show: true,
          },
          x: {
            show: false,
          },
        },
        fill: {
          type: 'gradient' as const,
          gradient: {
            shadeIntensity: 1,
            inverseColors: !1,
            opacityFrom: isDark ? 0.19 : 0.28,
            opacityTo: 0.05,
            stops: isDark ? [100, 100] : [45, 100],
          },
        },
      },
    }),
    [chartData, isDark, isRtl]
  );

  return (
    <div className="panel h-full p-0 lg:col-span-2 w-1/2 text-base">
      <div className="flex gap-2 items-center border-white-light p-5  dark:border-[#1b2e4b] dark:text-white-light">
        <IconReach />
        <h5 className="text-base font-semibold">{title}</h5>
      </div>

      {isMounted ? (
        <ReactApexChart
          series={chartOptions.series}
          options={chartOptions.options}
          type="area"
          height={325}
          width={'100%'}
        />
      ) : (
        <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
          <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
        </div>
      )}
    </div>
  );
};

export default ReachChart;
