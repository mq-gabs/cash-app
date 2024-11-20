import { ApexOptions } from "apexcharts";
import BaseChart from "./BaseChart";

interface IHorizontalBarChart {
  labels: string[];
  series: number[];
  title: string;
}

export default function HorizontalBarChart({
  labels,
  series,
  title,
}: IHorizontalBarChart) {
  if (labels.length === 0 || series.length === 0) return <></>;

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 300,
    },
    series: [{
      data: series,
      name: 'Faturamento (R$)',
      color: '#333'
    }],
    xaxis: {
      categories: labels,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadiusApplication: 'end',
        borderRadius: 2,
        colors: {
          ranges: [{
            color: '#333'
          }]
        }
      },
    },
    title: {
      text: title,
    },
  };

  return (
    <div className="border p-2 rounded">
      <BaseChart options={options} />
    </div>
  )
}