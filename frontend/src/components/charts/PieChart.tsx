import { ApexOptions } from 'apexcharts';
import BaseChart from './BaseChart';
import genHSLColorsCSS from '../../utils/colors';
import EmptyChart from './EmptyChart';

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
  const isEmpty = labels.length === 0 || series.length === 0;

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
      {isEmpty ?  (
        <EmptyChart title={title} />        
      ) : (
        <BaseChart options={options} />
      )}
    </div>
  );
}