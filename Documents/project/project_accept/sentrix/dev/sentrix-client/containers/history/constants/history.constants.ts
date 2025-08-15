import { ApexOptions } from "apexcharts";


const HistoryChartOption: ApexOptions = {
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

export const HistoryChart = {
    series: [
      {
        name: '',
        data: [31, 40, 28, 51, 42, 109, 100],
        color: "#E7515A",
      },
    ],
    options: HistoryChartOption
  }

