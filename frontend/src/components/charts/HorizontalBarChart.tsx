import { ApexOptions } from "apexcharts";
import BaseChart from "./BaseChart";
import EmptyChart from "./EmptyChart";

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
  const isEmpty = labels.length === 0 || series.length === 0;

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 300,
    },
    series: [
      {
        data: series,
        name: "Faturamento (R$)",
        color: "#99747B",
      },
    ],
    xaxis: {
      categories: labels,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadiusApplication: "end",
        borderRadius: 2,
        colors: {
          ranges: [
            {
              color: "#99747B",
            },
          ],
        },
      },
    },
    title: {
      text: title,
    },
  };

  return (
    <div className="border p-2 rounded">
      {isEmpty ? <EmptyChart title={title} /> : <BaseChart options={options} />}
    </div>
  );
}
