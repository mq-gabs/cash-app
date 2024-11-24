import { useEffect, useState } from "react";
import { callApi } from "../../api";
import Main from "../../components/Main";
import PageTitle from "../../components/PageTitle";
import { TMonthReport } from "../../utils/types";
import PieChart from "../../components/charts/PieChart";
import HorizontalBarChart from "../../components/charts/HorizontalBarChart";
import SummaryList from "../../components/dashboard/SummaryList";
import Select from "../../components/Select";
import { monthsOptions, yearsOptions } from "./helpers";
import toast from "react-hot-toast";
import LineChart from "../../components/charts/LineChart";
import { formatMonthView } from "../../utils/formaters";

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
  const [monthDayView, setMonthDayView] = useState<{
    labels: string[];
    series: number[];
  }>({
    labels: [],
    series: [],
  });

  const currentDate = new Date();

  const [month, setMonth] = useState(String(currentDate.getMonth() + 1));
  const [year, setYear] = useState(String(currentDate.getFullYear()));

  const [isLoading, setIsLoading] = useState(false);

  const loadReport = async () => {
    if (!month || !year) {
      toast.error("Selecione um período!");
      return;
    }

    setIsLoading(true);

    const response: TMonthReport = await callApi({
      method: "GET",
      path: `/reports/month`,
      params: {
        month: Number(month),
        year: Number(year),
      },
    });

    setIsLoading(false);

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

    const monthView = formatMonthView(
      response.services_analysis.month_view,
      Number(month),
      Number(year)
    );

    const [monthViewLabels, monthViewSeries] = monthView.reduce(
      (acc, curr) => {
        acc[0].push(curr.label);
        acc[1].push(curr.count);

        return acc;
      },
      [[], []] as [string[], number[]]
    );

    setMonthDayView({
      labels: monthViewLabels,
      series: monthViewSeries,
    });
  };

  useEffect(() => {
    loadReport();
  }, [month, year]);

  return (
    <Main>
      <div className="mb-4">
        <PageTitle text="Dashboard" />
      </div>
      {!isLoading && (
        <div>
          <div className="mb-4 flex gap-2">
            <Select
              options={monthsOptions}
              label="Mês"
              onChange={(v) => setMonth(v)}
              value={month}
              hideAsterisk
            />
            <Select
              options={yearsOptions}
              label="Ano"
              onChange={(v) => setYear(v)}
              value={year}
              hideAsterisk
            />
          </div>
          <div>
            <LineChart
              labels={monthDayView.labels}
              series={monthDayView.series}
              title="Atendimentos ao longo do mês"
            />
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
                  title="Comparação de serviços"
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
        </div>
      )}
    </Main>
  );
}
