import { ApexOptions } from 'apexcharts';
import BaseChart from './BaseChart';
import genHSLColorsCSS from '../../utils/colors';

interface IPieChart {
  title: string;
  series: number[];
  labels: string[];
}

export default function PieChart({
  title,
  labels,
  series,
}: IPieChart) {
  if (labels.length === 0 || series.length === 0) return <></>;

  const options: ApexOptions = {
    chart: {
      type: 'pie',
      height: 300,
    },
    series,
    labels,
    colors: genHSLColorsCSS(series.length),
    title: {
      text: title,
    },
  };
  
  return (
    <div className='border p-2 rounded h-full'>
      <BaseChart options={options} />
    </div>
  );
}