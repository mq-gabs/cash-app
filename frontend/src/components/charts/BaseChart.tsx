import ApexCharts, { ApexOptions } from "apexcharts";
import { useEffect, useRef } from "react";

interface IBaseChart {
  options: ApexOptions;
}

export default function BaseChart({ options }: IBaseChart) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = new ApexCharts(ref.current, options);
    if (ref.current) {
      chart.render();
    }
  }, [ref]);

  return <div ref={ref} />;
}
