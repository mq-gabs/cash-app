import { useEffect, useState } from "react";
import { callApi } from "../api";
import Main from "../components/Main";
import PageTitle from "../components/PageTitle";
import { TMonthReport } from "../utils/types";
import PieChart from "../components/charts/PieChart";
import HorizontalBarChart from "../components/charts/HorizontalBarChart";

export default function Dashboard() {
  const [servicesCount, setServicesCount] = useState<{
    series: number[];
    labels: string[];
  }>({
    series: [],
    labels: [],
  });
  const [servicesRenenue, setServicesRevenue] = useState<{
    series: number[];
    labels: string[];
  }>({
    series: [],
    labels: [],
  });

  console.log({ servicesCount, servicesRenenue });

  const loadReport = async () => {
    const response: TMonthReport = await callApi({
      method: "GET",
      path: `/reports/month`,
      params: {
        month: 11,
        year: 2024,
      },
    });

    if (!response) return;

    const [revenueLabels, revenueSeries] = response.services_analysis.revenue.reduce(
      (acc, curr) => {
        acc[0].push(curr.name);
        acc[1].push(curr.revenue / 100);

        return acc;
      },
      [[], []] as [string[], number[]]
    );

    const [countLabels, countSeries] = response.services_analysis.count.reduce(
      (acc, curr) => {
        acc[0].push(curr.name);
        acc[1].push(curr.count);

        return acc;
      },
      [[], []] as [string[], number[]]
    )

    setServicesCount({
      series: countSeries,
      labels: countLabels,
    });
    setServicesRevenue({
      series: revenueSeries,
      labels: revenueLabels,
    });
  };

  useEffect(() => {
    loadReport();
  }, []);

  return (
    <Main>
      <div className="mb-4">
        <PageTitle text="Dashboard" />
      </div>
      <div className="flex flex-col gap-2 xl:flex-row">
        <div className="flex-1">
          <HorizontalBarChart
            labels={servicesRenenue.labels}
            series={servicesRenenue.series}
            title="Faturamento por serviço (R$)"
          />
        </div>
        <div className="flex-1">
          <PieChart
            labels={servicesCount.labels}
            series={servicesCount.series}
            title="Quantidade de serviços"
          />
        </div>
      </div>
    </Main>
  );
}
