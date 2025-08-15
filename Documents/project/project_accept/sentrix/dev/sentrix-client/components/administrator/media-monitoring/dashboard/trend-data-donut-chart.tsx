'use client';

import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import TrendDataSentiment from './trend-data-sentiment';

import { getChartFontSize, getChartSize } from '@/utils/responsive-sizes';

import useBreakpoint from '@/hooks/use-breakpoint';

interface TrendData {
  series: number[];
  options: ApexOptions;
}

const TrendDataDonutChart = () => {
  const [isMounted, setIsMounted] = useState(false);
  const breakpoint = useBreakpoint();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const chartSize = getChartSize(breakpoint);
  const fontSize = getChartFontSize(breakpoint);

  const trendDataDonutData: TrendData = {
    series: [22.78, 71.04, 6.18],
    options: {
      chart: {
        type: 'donut',
        fontFamily: 'inherit',
      },
      labels: ['Positif', 'Netral', 'Negatif'],
      colors: ['#00E396', '#008FFB', '#FF4560'],
      legend: {
        show: false,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            labels: {
              show: true,
              name: {
                show: false,
              },
              value: {
                show: false,
              },
              total: {
                show: true,
                showAlways: true,
                label: 'Mention',
                fontSize: fontSize,
                fontWeight: 400,
                color: '#9CA3AF',
                formatter: function (w) {
                  return `Mention
63524
-7.87%`;
                },
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: function (val: number) {
            return val.toFixed(2) + '%';
          },
        },
      },
    },
  };

  return (
    <div className="w-[40%] panel flex">
      <div className="flex items-center justify-center w-full gap-4">
        <div className="relative">
          {isMounted && (
            <div className="relative">
              <ReactApexChart
                series={trendDataDonutData.series}
                options={trendDataDonutData.options}
                type="donut"
                height={chartSize.height}
                width={chartSize.width}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="2xl:text-sm lg:text-xs text-gray-400 font-normal">Mention</div>
                <div className="2xl:text-3xl lg:text-xl font-bold text-gray-900 my-1">63524</div>
                <div className="2xl:text-base lg:text-sm font-semibold text-red-500">-7.87%</div>
              </div>
            </div>
          )}
        </div>
        <TrendDataSentiment />
      </div>
    </div>
  );
};

export default TrendDataDonutChart;
