'use client';

import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const searchVolumeDonutData = {
  series: [31, 49, 14],
  options: {
    chart: {
      height: 300,
      type: 'donut',
      toolbar: { show: false },
    },
    stroke: { show: false },
    labels: ['Positif', 'Netral', 'Negatif'],
    colors: ['#2563EB', '#10B981', '#EF4444'],
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      markers: {
        width: 12,
        height: 12,
        radius: 6,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return Math.round(val) + '%';
      },
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        colors: ['#fff'],
      },
    },
  },
};

const SearchVolumeDonutChart = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="panel p-6 w-[30%]">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Search Volume</h3>
      {isMounted && (
        <ReactApexChart
          series={searchVolumeDonutData.series}
          options={searchVolumeDonutData.options as ApexOptions}
          type="donut"
          height={300}
          width="100%"
        />
      )}
    </div>
  );
};

export default SearchVolumeDonutChart;
