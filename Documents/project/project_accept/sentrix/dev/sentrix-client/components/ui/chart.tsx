import { IRootState } from "@/store";
import { ApexOptions } from "apexcharts";
import * as React from "react"
import ReactApexChart from "react-apexcharts"
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

interface Props {
    type?:
      | "line"
      | "area"
      | "bar"
      | "pie"
      | "donut"
      | "radialBar"
      | "scatter"
      | "bubble"
      | "heatmap"
      | "candlestick"
      | "boxPlot"
      | "radar"
      | "polarArea"
      | "rangeBar"
      | "rangeArea"
      | "treemap";
    series?: ApexOptions["series"];
    width?: string | number;
    height?: string | number;
    options?: ApexOptions | any;
    [key: string]: any;
  }

function AreaChart({ series = [], options = {} }: Props) {
  const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  const router = useRouter();
  const _series: any = [ {
        name: 'Social Media',
        data: [80, 50, 30, 45, 40, 10, 15],
      }];
  const _options: ApexOptions =  {
      chart: {
        height: 325,
        type: 'area',
        fontFamily: 'Nunito, sans-serif',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
        events:{
          dataPointSelection: (e: any, chart?: any, options?: any)=> { 
            e.stopPropagation();
            router.push(`/dashboard/features/tv-ads-monitoring/tv-ads-monitoring-details?id=${options.dataPointIndex}`);
          }
        }
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: 'smooth',
        width: 2,
        lineCap: 'square',
      },
      colors: isDark ? ['#2196F3', '#00C86E'] : ['#2196F3', '#00C86E'],
      markers: {
        discrete: [
          {
            seriesIndex: 0,
            dataPointIndex: 6,
            fillColor: '#2196F3',
            strokeColor: 'transparent',
            size: 7,
          },
          {
            seriesIndex: 1,
            dataPointIndex: 5,
            fillColor: '#00C86E',
            strokeColor: 'transparent',
            size: 7,
          },
        ],
      },
      labels: ['2025-06-01', '2025-06-02', '2025-06-03', '2025-06-04', '2025-06-05', '2025-06-06', '2025-06-07'],
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
            fontSize: '12px',
            cssClass: 'apexcharts-xaxis-title',
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
        position: 'top',
        horizontalAlign: 'right',
        fontSize: '16px',
        markers: {
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
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: !1,
          opacityFrom: isDark ? 0.19 : 0.28,
          opacityTo: 0.05,
          stops: isDark ? [100, 100] : [45, 100],
        },
      },
        };
  return (
    <ReactApexChart series={[..._series, ...series!]} options={{..._options,...options}} type="area" height={325} width={'100%'} />
  )
}

function BarChart({ series = [], options = {} }: Props) {
  const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  const router = useRouter();
  const _options: ApexOptions =  {
      chart: {
        height: 360,
        type: 'bar',
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: false,
        },
        events:{
          dataPointSelection: (e: any, chart?: any, options?: any)=> { 
            e.stopPropagation();
            router.push(`/dashboard/features/tv-ads-monitoring/tv-ads-monitoring-details?id=${options.dataPointIndex}`);
          }
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        colors: ['transparent'],
      },
      colors: ['#ffbb44'],
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
    };
  return (
    <ReactApexChart series={series} options={{..._options,...options}} type="bar" height={'350'} width={'100%'} />
  )
}

function DonutChart({ series = [], options = {} }: Props) {
  const router = useRouter();
  const _options: ApexOptions =  {
            chart: {
                type: 'donut',
                height: '200',
                fontFamily: 'Nunito, sans-serif',
                events:{
                  dataPointSelection: (e: any, chart?: any, options?: any)=> { 
                    e.stopPropagation();
                    router.push(`/dashboard/features/tv-ads-monitoring/tv-ads-monitoring-details?id=${options.dataPointIndex}`);
                  }
                }
            },
            legend: {
                position: 'bottom'
            },
        };
  return (
    <ReactApexChart series={series} options={{..._options,...options}} type="donut" height={'340'} width={'100%'} />
  )
}

export { AreaChart, BarChart, DonutChart }
