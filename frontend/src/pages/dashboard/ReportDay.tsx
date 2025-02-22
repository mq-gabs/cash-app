import { useEffect, useState } from "react";
import { TMonthReport } from "../../utils/types";
import PieChart from "../../components/charts/PieChart";
import HorizontalBarChart from "../../components/charts/HorizontalBarChart";
import SummaryList from "../../components/dashboard/SummaryList";
import Select from "../../components/Select";
import { monthsOptions, yearsOptions } from "./helpers";
import toast from "react-hot-toast";
import { formatCurrency, formatPercentage } from "../../utils/formaters";
import Card from "./Card";
import { PiChartLineDownBold, PiChartLineUpBold } from "react-icons/pi";
import { FaCashRegister } from "react-icons/fa";
import { RiDiscountPercentFill } from "react-icons/ri";
import { GiTwoCoins } from "react-icons/gi";
import { atLeast2Digits, validateDateDay } from "../../utils";
import { useApi } from "../../hooks/use-api";
import ReportLoading from "../../components/loading/ReportLoading";

const daysOptions = [...Array(31)].map((_, i) => ({
  id: String(i + 1),
  label: atLeast2Digits(i + 1),
  name: atLeast2Digits(i + 1),
}));

export default function ReportDay() {
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
  const totalRevenue = servicesRevenue.series.reduce(
    (acc, curr) => acc + curr,
    0
  );

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

  const currentDate = new Date();

  const [day, setDay] = useState(atLeast2Digits(currentDate.getDate()));
  const [month, setMonth] = useState(
    atLeast2Digits(currentDate.getMonth() + 1)
  );
  const [year, setYear] = useState(String(currentDate.getFullYear()));

  const loadReport = async () => {
    if (!day || !month || !year) {
      toast.error("Selecione um período!");
      return;
    }

    const response: TMonthReport = await callApi({
      method: "GET",
      path: `/reports/day`,
      params: {
        month: Number(month),
        year: Number(year),
        day: Number(day),
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
  };

  const isValidDateDay = () => {
    const tDay = validateDateDay(year, month, day);

    if (tDay !== day) {
      setDay(tDay);
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (!isValidDateDay()) return;

    loadReport();
  }, [day, month, year]);

  if (isLoading) return <ReportLoading />;

  return (
    <div>
      <div className="mb-4 flex gap-2 justify-center">
        <Select
          options={daysOptions}
          label="Dia"
          onChange={(v) => setDay(v)}
          value={day}
          hideAsterisk
        />
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
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 xl:flex-row">
          <div className="flex-1">
            <HorizontalBarChart
              labels={servicesRevenue.labels}
              series={servicesRevenue.series}
              title={`Faturamento por serviço - ${formatCurrency(
                totalRevenue * 100
              )}`}
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
