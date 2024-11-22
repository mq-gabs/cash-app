import { useEffect, useState } from "react";
import { callApi } from "../api";
import Main from "../components/Main";
import PageTitle from "../components/PageTitle";
import { TMonthReport } from "../utils/types";
import PieChart from "../components/charts/PieChart";
import HorizontalBarChart from "../components/charts/HorizontalBarChart";
import SummaryList from "../components/dashboard/SummaryList";

export default function Dashboard() {
  const [servicesCount, setServicesCount] = useState<{
    series: number[];
    labels: string[];
  }>({
    series: [],
    labels: [],
  });
  const [servicesRevenue, setServicesRevenue] = useState<{
    series: number[];
    labels: string[];
  }>({
    series: [],
    labels: [],
  });
  const [employeesPaymentsSummary, setEmployeesPaymentsSummary] = useState<{
    count: number;
    cost: number;
    data: {
      id: string;
      name: string;
      value: number;
    }[];
  }>({
    cost: 0,
    count: 0,
    data: [],
  });
  const [otherPaymentsSummary, setOtherPaymentsSummary] = useState<{
    count: number;
    cost: number;
    data: {
      id: string;
      name: string;
      value: number;
    }[];
  }>({
    cost: 0,
    count: 0,
    data: [],
  });

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

    const [revenueLabels, revenueSeries] =
      response.services_analysis.revenue.reduce(
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
    );

    setServicesCount({
      series: countSeries,
      labels: countLabels,
    });
    setServicesRevenue({
      series: revenueSeries,
      labels: revenueLabels,
    });
    setEmployeesPaymentsSummary({
      cost: response.employees_analysis.cost,
      count: response.employees_analysis.count,
      data: response.employees_analysis.employees_payments,
    });
    setOtherPaymentsSummary({
      cost: response.other_payments_analysis.cost,
      count: response.other_payments_analysis.count,
      data: response.other_payments_analysis.other_payments.map(
        ({ id, title, value }) => ({
          id,
          name: title,
          value,
        })
      ),
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
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 xl:flex-row">
          <div className="flex-1">
            <HorizontalBarChart
              labels={servicesRevenue.labels}
              series={servicesRevenue.series}
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
        <div className="flex flex-col gap-2">
          <SummaryList
            title="Pagamentos"
            cost={employeesPaymentsSummary?.cost}
            count={employeesPaymentsSummary?.count}
            data={employeesPaymentsSummary?.data}
          />
          <SummaryList
            title="Outros gastos"
            cost={otherPaymentsSummary?.cost}
            count={otherPaymentsSummary?.count}
            data={otherPaymentsSummary?.data}
          />
        </div>
      </div>
    </Main>
  );
}
