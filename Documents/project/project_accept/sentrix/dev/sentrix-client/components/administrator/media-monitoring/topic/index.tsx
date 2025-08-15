'use client';
import IconCalendar from '@/components/icon/icon-calendar';
import IconProjectDate from '@/components/icon/icon-project-date';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const topikChartOption: ApexOptions = {
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false
    },
  },
  plotOptions: {
    bar: {
      distributed: true,
      horizontal: true,
      dataLabels: {
        position: 'top'
      }
    }
  },
  dataLabels: {
    enabled: true,
    formatter: (val: number) => new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(val),
    offsetX: 20,
      style: {
        fontSize: "12px",
        colors: ["#3B3F5C"],
      },
  },
  legend: {
    show: false
  },
  colors: [
    '#8168B1',
    '#039BE5',
    '#94E189',
    '#5266A8',
    '#FFBB44',
    '#06D6A0',
    '#FF5B75',
    '#E3FF44',
    '#FF0032',
    '#25F4EE'
  ],
  xaxis: {
    categories: [
      'Pertumbuhan Ekonomi Era Pemerintahan Prabowo',
      'Kebijakan Tarif Impor AS terhadap Indonesia',
      'Inflasi pada Perekonomian',
      'Dukungan Peningkatan Kapasitas UMKM Melalui Subsidi Bunga',
      'Kenaikan PPN',
      'Program Hilirisasi Era Pemerintah Prabowo',
      'Efisiensi Anggaran era Pemerintahan Prabowo',
      'Fluktuasi Pergerakan IHSG',
      'Program Beras Bansos',
      'Penguatan Ekonomi dan Keuangan Syariah'
    ]
  },
}

const pergerakanSentimenChartOption: ApexOptions = {
  chart: {
    type: 'bar',
    height: 350,
    stacked: true,
    stackType: '100%',
    toolbar: {
      show: false
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: "120px",
    },
  },
  xaxis: {
    categories: ["Inflasi Maret"],
  },
  grid: {
    show: true,
    borderColor: '#888EA84D',
    strokeDashArray: 5,
    position: 'back',
    xaxis: {
      lines: {
        show: true,
      }
    },
    yaxis: {
      lines: {
        show: false,
      }
    }
  },
  legend: {
    show: true,
    position: 'top',
    showForSingleSeries: true,
    markers: {
      shape: 'rect',
    }
  },
}

const pergerakanDataChartOption: ApexOptions = {
  chart: {
    height: 350,
    type: 'area',
    toolbar: {
      show: false
    },
  },
  legend: {
    show: true,
    position: 'top',
    showForSingleSeries: true,
  },
  dataLabels: {
    enabled: false
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
      }
    },
    yaxis: {
      lines: {
        show: true,
      }
    }
  },
  labels: ['17 Jul 00:00', '17 Jul 00:00', '17 Jul 00:00', '17 Jul 00:00', '17 Jul 00:00', '17 Jul 00:00', '17 Jul 00:00'],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.1,
      opacityTo: 0.9,
      stops: [0, 90, 100]
    }
  },
}

const topikChart: any = {
  series: [{
    name: "Jumlah Topik",
    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
  }],
  options: topikChartOption
}

const pergerakanSentimenChart: any = {
  series: [
    {
      name: 'Positif',
      data: [76],
      color: "#1B55E2"
    },
    {
      name: 'Negatif',
      data: [23],
      color: "#FE2C55"
    },
    {
      name: 'Netral',
      data: [240],
      color: "#00C86E"
    },
  ],
  options: pergerakanSentimenChartOption
}

const pergerakanDataChart: any = {
  series: [
    {
      name: 'Inflasi Maret',
      data: [31, 40, 28, 51, 42, 109, 100],
      color: "#1B55E2"
    },
  ],
  options: pergerakanDataChartOption
}

const Topic = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className='space-y-6'>
      <div className="space-y-12">
        <div className="space-y-2">
          <h1 className="font-bold text-[#0E1726] text-2xl">Topik</h1>
          <div className="flex gap-2 items-center">
            <IconProjectDate />
            <div className="font-semibold text-sm">17 Jul 2025 - 18 Jul 2025</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="panel h-full col-span-1 flex flex-col space-y-4 bg-primary text-white">
          <h5 className="text-md font-semibold">Semua Kanal</h5>

          <div className='flex space-x-4 items-center'>
            <span><IconCalendar /></span>
            <span className='font-bold text-2xl'>65.8rb</span>
          </div>
        </div>

        <div className="panel h-full col-span-1 flex flex-col space-y-4">
          <h5 className="text-md font-semibold">Semua Kanal</h5>

          <div className='flex space-x-4 items-center'>
            <span><IconCalendar /></span>
            <span className='font-bold text-2xl'>65.8rb</span>
          </div>
        </div>

        <div className="panel h-full col-span-1 flex flex-col space-y-4">
          <h5 className="text-md font-semibold">Semua Kanal</h5>

          <div className='flex space-x-4 items-center'>
            <span><IconCalendar /></span>
            <span className='font-bold text-2xl'>65.8rb</span>
          </div>
        </div>

        <div className="panel h-full col-span-1 flex flex-col space-y-4">
          <h5 className="text-md font-semibold">Semua Kanal</h5>

          <div className='flex space-x-4 items-center'>
            <span><IconCalendar /></span>
            <span className='font-bold text-2xl'>65.8rb</span>
          </div>
        </div>

        <div className="panel h-full col-span-1 flex flex-col space-y-4">
          <h5 className="text-md font-semibold">Semua Kanal</h5>

          <div className='flex space-x-4 items-center'>
            <span><IconCalendar /></span>
            <span className='font-bold text-2xl'>65.8rb</span>
          </div>
        </div>

        <div className="panel h-full col-span-1 flex flex-col space-y-4">
          <h5 className="text-md font-semibold">Semua Kanal</h5>

          <div className='flex space-x-4 items-center'>
            <span><IconCalendar /></span>
            <span className='font-bold text-2xl'>65.8rb</span>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1'>
        <div className="panel h-full">
          <h5 className="text-lg font-semibold">Topik</h5>
          {isMounted ? (
            <ReactApexChart
              series={topikChart.series}
              options={topikChart.options}
              type="bar"
              height={350}
              width={'100%'}
            />
          ) : (
            <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
              <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className='grid grid-cols-2 gap-4'>
          <div className="panel h-full col-span-2">
            <h5 className="text-lg font-semibold">Persentase Sentimen</h5>
            {isMounted ? (
              <ReactApexChart
                series={pergerakanSentimenChart.series}
                options={pergerakanSentimenChart.options}
                type="bar"
                height={350}
                width={'100%'}
              />
            ) : (
              <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
              </div>
            )}
          </div>
          <div className="panel h-full col-span-2">
            <h5 className="text-lg font-semibold">Pergerakan Data</h5>
            {isMounted ? (
              <ReactApexChart
                series={pergerakanDataChart.series}
                options={pergerakanDataChart.options}
                type="area"
                height={350}
                width={'100%'}
              />
            ) : (
              <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic;
