import { ApexOptions } from "apexcharts";
import BaseChart from "./BaseChart";
import EmptyChart from "./EmptyChart";

interface ILineChart {
  title: string;
  labels: string[];
  series: number[];
}

export default function LineChart({
  labels,
  series,
  title,
}: ILineChart) {
  const isEmpty = labels.length === 0 || series.length === 0;

  const options: ApexOptions = {
    series: [{
      name: 'Atendimentos',
      data: series,
    }],
    chart: {
      type: 'line',
      height: 300,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: title,
    },
    xaxis: {
      categories: labels,
    },
  };

  return (
    <div className="border rounded p-2">
      {isEmpty ? (
        <EmptyChart title={title} />
      ) : (
        <BaseChart options={options} />
      )}
    </div>
  )
}