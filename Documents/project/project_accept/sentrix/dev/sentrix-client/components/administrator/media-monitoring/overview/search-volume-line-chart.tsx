'use client';

import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const searchVolumeLineData = {
  series: [
    {
      name: 'Positif',
      data: [19, 20, 9, 25, 10, 14, 32, 12, 6, 21, 0, 20],
    },
    {
      name: 'Netral',
      data: [5, 8, 12, 7, 3, 1, 14, 2, 15, 4, 10, 12],
    },
    {
      name: 'Negatif',
      data: [25, 30, 15, 40, 20, 22, 35, 15, 42, 15, 38, 38],
    },
  ],
  options: {
    chart: {
      height: 300,
      type: 'line',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    colors: ['#2563EB', '#10B981', '#EF4444'],
    markers: {
      size: 5,
      strokeWidth: 2,
      fillOpacity: 1,
      strokeOpacity: 1,
      colors: ['#2563EB', '#10B981', '#EF4444'],
      strokeColors: '#fff',
    },
    xaxis: {
      categories: [
        '17 Jul 00:00',
        '17 Jul 05:00',
        '17 Jul 10:00',
        '17 Jul 15:00',
        '17 Jul 20:00',
        '18 Jul 01:00',
        '18 Jul 06:00',
        '18 Jul 11:00',
        '18 Jul 16:00',
        '18 Jul 20:00',
        '18 Jul 23:00',
        '19 Jul 00:00',
      ],
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      min: 0,
      max: 60,
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px',
        },
      },
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 4,
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
      fontSize: '14px',
      markers: {
        width: 22,
        height: 12,
        radius: 6,
      },
    },
    tooltip: {
      theme: 'light',
    },
  },
};

const SearchVolumeLineChart = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="panel p-6 w-[70%]">
      {isMounted && (
        <ReactApexChart
          series={searchVolumeLineData.series}
          options={searchVolumeLineData.options as ApexOptions}
          type="line"
          height={344}
          width="100%"
        />
      )}
    </div>
  );
};

export default SearchVolumeLineChart;
