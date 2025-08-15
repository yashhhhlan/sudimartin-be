'use client';

import React, { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import IconCategoryMention from '@/components/icon/icon-category-mention';

import { IRootState } from '@/store';

import { CategoryMentionStatsData } from '@/types/api';

interface CategoryMentionChartProps {
  data?: CategoryMentionStatsData;
}

const CategoryMentionChart = ({ data }: CategoryMentionChartProps) => {
  const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const chartData = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        categories: ['No Data'],
        values: [0],
        total: 0,
      };
    }

    const categories = data.map((item) => item.category);
    const values = data.map((item) => item.mention.length);
    const total = data.reduce((sum, item) => sum + item.mention.length, 0);

    return {
      categories,
      values,
      total,
    };
  }, [data]);

  const chartOptions: any = useMemo(
    () => ({
      series: [
        {
          name: 'Mentions',
          data: chartData.values,
        },
      ],
      options: {
        chart: {
          height: 360,
          type: 'bar',
          fontFamily: 'Nunito, sans-serif',
          toolbar: {
            show: false,
          },
          events: {},
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 2,
          colors: ['transparent'],
        },
        colors: ['#2196F3'],
        dropShadow: {
          enabled: true,
          blur: 3,
          color: '#515365',
          opacity: 0.4,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            borderRadius: 14,
            borderRadiusApplication: 'end',
          },
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
          fontSize: '14px',
          itemMargin: {
            horizontal: 8,
            vertical: 8,
          },
        },
        grid: {
          borderColor: isDark ? '#191e3a' : '#e0e6ed',
          padding: {
            left: 20,
            right: 20,
          },
        },
        xaxis: {
          categories: chartData.categories,
          axisBorder: {
            show: true,
            color: isDark ? '#3b3f5c' : '#e0e6ed',
          },
        },
        yaxis: {
          tickAmount: 6,
          opposite: isRtl ? true : false,
          labels: {
            offsetX: isRtl ? -10 : 0,
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: isDark ? 'dark' : 'light',
            type: 'vertical',
            shadeIntensity: 0.3,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.8,
            stops: [0, 100],
          },
        },
        tooltip: {
          marker: {
            show: true,
          },
        },
      },
    }),
    [chartData, isDark, isRtl, router],
  );

  return (
    <div className="panel h-full p-0 lg:col-span-2 w-2/3">
      <div className="mb-5 flex gap-2 items-center border-b border-dashed border-white-light p-5  dark:border-[#1b2e4b] dark:text-white-light">
        <IconCategoryMention />
        <h5 className="text-base font-semibold ">Penyebutan Berdarkan Kategori Media</h5>
      </div>

      {isMounted && (
        <ReactApexChart
          options={chartOptions.options}
          series={chartOptions.series}
          type="bar"
          height={'360'}
          width={'100%'}
        />
      )}
    </div>
  );
};

export default CategoryMentionChart;
