'use client';

import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import FormSelect from '@/components/form-select';

const TrendDataLineChart = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const trendDataLineData = {
    series: [
      {
        name: 'Berita',
        data: [650, 580, 450, 200, 170, 150, 160, 280, 320, 280, 220, 180, 150],
      },
      {
        name: 'Twitter (X)',
        data: [150, 170, 190, 210, 240, 280, 320, 340, 200, 150, 120, 180, 650],
      },
      {
        name: 'TikTok',
        data: [650, 500, 300, 150, 80, 20, 10, 180, 320, 300, 250, 200, 150],
      },
      {
        name: 'Youtube',
        data: [20, 25, 30, 35, 40, 45, 50, 30, 20, 25, 35, 45, 50],
      },
    ],
    options: {
      chart: {
        height: 400,
        type: 'line',
        toolbar: { show: false },
        zoom: { enabled: false },
        background: 'transparent',
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      colors: ['#3B82F6', '#9CA3AF', '#1F2937', '#EF4444'],
      markers: {
        size: 0,
      },
      xaxis: {
        categories: ['16 Jul', '', '16 Jul', '', '17 Jul', '', '18 Jul', '', '19 Jul', '', '20 Jul', '', '20 Jul'],
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '12px',
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        min: 0,
        max: 800,
        tickAmount: 4,
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '12px',
          },
          formatter: function (val: number) {
            return val.toString();
          },
        },
      },
      grid: {
        borderColor: '#E5E7EB',
        strokeDashArray: 0,
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
      legend: {
        show: false,
      },
      tooltip: {
        theme: 'light',
        shared: true,
        intersect: false,
      },
    },
  };

  const legendData = [
    {
      name: 'Berita',
      color: '#3B82F6',
      value: '44.0rb',
      percentage: '-5.69%',
      isNegative: true,
    },
    {
      name: 'Twitter (X)',
      color: '#9CA3AF',
      value: '16.6rb',
      percentage: '+15.09%',
      isNegative: false,
    },
    {
      name: 'TikTok',
      color: '#1F2937',
      value: '979',
      percentage: '-17.1%',
      isNegative: true,
    },
    {
      name: 'Youtube',
      color: '#EF4444',
      value: '553',
      percentage: '+45.53%',
      isNegative: false,
    },
  ];

  return (
    <div className="panel w-[60%]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Trend Data</h2>
        <FormSelect
          label=""
          placeholder="Sumber Data"
          data={[{ label: 'Sumber Data', value: '1' }]}
          value="1"
          onChange={() => {}}
          className="w-36"
        />
      </div>

      <div className="mb-4 flex-1">
        {isMounted && (
          <ReactApexChart
            series={trendDataLineData.series}
            options={trendDataLineData.options as ApexOptions}
            type="line"
            height={350}
            width="100%"
          />
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {legendData.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-4 h-3 rounded" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm font-medium text-gray-700">{item.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-gray-900">{item.value}</span>
              <span className={`text-sm font-medium ${item.isNegative ? 'text-red-500' : 'text-green-500'}`}>
                {item.percentage}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendDataLineChart;
