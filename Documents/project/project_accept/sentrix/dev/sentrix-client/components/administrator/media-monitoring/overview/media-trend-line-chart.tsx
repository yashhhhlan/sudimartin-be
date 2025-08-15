'use client';

import FormSelect from '@/components/form-select';
import { ApexOptions } from 'apexcharts';
import { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

type Point = { x: string; y: number };

const useChartData = (): Point[] =>
  useMemo(
    () => [
      { x: '17 Jul 00:00', y: 19 },
      { x: '17 Jul 05:00', y: 20 },
      { x: '17 Jul 10:00', y: 9 },
      { x: '17 Jul 15:00', y: 25 },
      { x: '17 Jul 20:00', y: 10 },
      { x: '18 Jul 01:00', y: 14 },
      { x: '18 Jul 06:00', y: 32 },
      { x: '18 Jul 11:00', y: 12 },
      { x: '18 Jul 16:00', y: 6 },
      { x: '18 Jul 20:00', y: 21 },
      { x: '18 Jul 23:00', y: 0 },
      { x: '19 Jul 00:00', y: 20 },
    ],
    [],
  );

const buildOptions = (data: Point[]): ApexOptions => ({
  chart: { type: 'area', height: 300, toolbar: { show: false }, zoom: { enabled: false } },
  stroke: { curve: 'smooth', width: 2, colors: ['#2F80ED'] },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.2,
      opacityTo: 0,
      stops: [0, 90, 100],
      colorStops: [
        { offset: 0, color: '#2F80ED', opacity: 0.25 },
        { offset: 100, color: '#2F80ED', opacity: 0 },
      ],
    },
  },
  colors: ['#2F80ED'],
  markers: { size: 6, colors: ['#2F80ED'], strokeColors: '#fff', strokeWidth: 2, hover: { size: 7 } },
  dataLabels: { enabled: false },
  xaxis: {
    type: 'category',
    labels: { datetimeFormatter: { month: 'MMM dd HH:mm' }, style: { colors: '#6B7280', fontSize: '12px' } },
    tickAmount: 6,
  },
  yaxis: {
    min: 0,
    max: 60,
    tickAmount: 6,
    labels: { style: { colors: '#6B7280', fontSize: '12px' } },
  },
  grid: { borderColor: '#E5E7EB', strokeDashArray: 4 },
  tooltip: { theme: 'light', x: { format: 'dd MMM HH:mm' } },
  legend: {
    show: true,
    showForSingleSeries: true,
    position: 'top',
    horizontalAlign: 'center',
    labels: { colors: '#111827' },
  },

  series: [{ name: 'Media Cetak', data }],
});

const MediaTrendLineChart = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const data = useChartData();
  const opts = useMemo(() => buildOptions(data), [data]);

  return (
    <div className="w-full space-y-4 panel">
      <div className="flex items-center gap-4">
        <FormSelect
          label=""
          placeholder="Pergerakan Data"
          data={[{ label: 'Pergerakan Data', value: '1' }]}
          value="1"
          onChange={() => {}}
          className="w-44"
        />
        <FormSelect
          label=""
          placeholder="Sentimen"
          data={[{ label: 'Sentimen', value: '1' }]}
          value="1"
          onChange={() => {}}
          className="w-36"
        />
        <FormSelect
          label=""
          placeholder="Sumber Data"
          data={[{ label: 'Sumber Data', value: '1' }]}
          value="1"
          onChange={() => {}}
          className="w-40"
        />
      </div>

      {isMounted && <ReactApexChart type="area" height={300} width="100%" options={opts} series={opts.series} />}
    </div>
  );
};

export default MediaTrendLineChart;
