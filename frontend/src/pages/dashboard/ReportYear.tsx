import { useEffect, useState } from "react";
import { TMonthReport } from "../../utils/types";
import PieChart from "../../components/charts/PieChart";
import HorizontalBarChart from "../../components/charts/HorizontalBarChart";
import SummaryList from "../../components/dashboard/SummaryList";
import Select from "../../components/Select";
import { yearsOptions } from "./helpers";
import toast from "react-hot-toast";
import {
  formatCurrency,
  formatPercentage,
  formatYearView,
} from "../../utils/formaters";
import Card from "./Card";
import { PiChartLineDownBold, PiChartLineUpBold } from "react-icons/pi";
import { FaCashRegister } from "react-icons/fa";
import { RiDiscountPercentFill } from "react-icons/ri";
import { GiTwoCoins } from "react-icons/gi";
import LineChart from "../../components/charts/LineChart";
import { useApi } from "../../hooks/use-api";

export default function ReportYear() {
  const { callApi, isLoading } = useApi();

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
  const [generalAnalysis, setGeneralAnalysis] = useState<
    TMonthReport["general_analysis"]
  >({
    cost: 0,
    profit: 0,
    profit_margin: 0,
    revenue: 0,
  });
  const [yearView, setYearView] = useState<{
    labels: string[];
    series: number[];
  }>({
    labels: [],
    series: [],
  });

  const currentDate = new Date();

  const [year, setYear] = useState(String(currentDate.getFullYear()));

  const loadReport = async () => {
    if (!year) {
      toast.error("Selecione um período!");
      return;
    }

    const response: TMonthReport = await callApi({
      method: "GET",
      path: `/reports/year`,
      params: {
        year: Number(year),
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

    setGeneralAnalysis(response.general_analysis);

    const formattedYearAnalysis = formatYearView(
      response.services_analysis.year_view
    );

    setYearView(formattedYearAnalysis);
  };

  useEffect(() => {
    loadReport();
  }, [year]);

  if (isLoading) return <></>;

  return (
    <div>
      <div className="mb-4 gap-2 flex justify-center">
        <Select
          options={yearsOptions}
          label="Ano"
          onChange={(v) => setYear(v)}
          value={year}
          hideAsterisk
        />
      </div>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4">
        <Card
          className="bg-blue-400 text-white"
          Icon={FaCashRegister}
          label="Faturamento"
          value={formatCurrency(generalAnalysis.revenue)}
        />
        <Card
          className="bg-orange-700 text-white"
          label="Custos"
          value={formatCurrency(generalAnalysis.cost)}
          Icon={GiTwoCoins}
        />
        <Card
          className="bg-green-600 text-white"
          Icon={
            generalAnalysis.profit < 0 ? PiChartLineDownBold : PiChartLineUpBold
          }
          label={generalAnalysis.profit < 0 ? "Prejuízo" : "Lucro"}
          value={formatCurrency(generalAnalysis.profit)}
        />
        <Card
          className="bg-teal-800 text-white"
          label="Margem de lucro"
          value={formatPercentage(generalAnalysis.profit_margin)}
          Icon={RiDiscountPercentFill}
        />
      </div>
      <div className="mb-2">
        <LineChart
          labels={yearView.labels}
          series={yearView.series}
          title="Atendimentos ao longo do ano"
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
            redirectPath="pagamento"
          />
          <SummaryList
            title="Outros gastos"
            cost={otherPaymentsSummary?.cost}
            count={otherPaymentsSummary?.count}
            data={otherPaymentsSummary?.data}
            redirectPath="outro"
          />
        </div>
      </div>
    </div>
  );
}
