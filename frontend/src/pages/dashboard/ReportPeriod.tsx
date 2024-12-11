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
  id: String(i),
  label: atLeast2Digits(i + 1),
  name: atLeast2Digits(i + 1),
}));

export default function ReportPeriod() {
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

  const [startDay, setStartDay] = useState(
    atLeast2Digits(currentDate.getDate())
  );
  const [startMonth, setStartMonth] = useState(
    atLeast2Digits(currentDate.getMonth() + 1)
  );
  const [startYear, setStartYear] = useState(String(currentDate.getFullYear()));
  const [endDay, setEndDay] = useState(atLeast2Digits(currentDate.getDate()));
  const [endMonth, setEndMonth] = useState(
    atLeast2Digits(currentDate.getMonth() + 1)
  );
  const [endYear, setEndYear] = useState(String(currentDate.getFullYear()));

  const loadReport = async () => {
    if (!startDay || !startMonth || !startYear) {
      toast.error("Selecione um período!");
      return;
    }

    const response: TMonthReport = await callApi({
      method: "GET",
      path: `/reports/period`,
      params: {
        start_at: new Date(`${startYear}-${startMonth}-${startDay}`),
        end_at: new Date(`${endYear}-${endMonth}-${endDay}`),
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
    let isValid = true;

    const tStartDay = validateDateDay(startYear, startMonth, startDay);

    if (tStartDay !== startDay) {
      setStartDay(tStartDay);
      isValid = false;
    }

    const tEndDay = validateDateDay(endYear, endMonth, endDay);

    if (tEndDay !== endDay) {
      setEndDay(tEndDay);
      isValid = false;
    }

    return isValid;
  };

  useEffect(() => {
    if (!isValidDateDay()) return;

    loadReport();
  }, [startDay, startMonth, startYear, endDay, endMonth, endYear]);

  if (isLoading) return <ReportLoading />;

  return (
    <div>
      <div className="flex gap-32 justify-center">
        <div>
          <div className="font-bold">A partir de</div>
          <div className="mb-4 flex gap-2">
            <Select
              options={daysOptions}
              label="Dia"
              onChange={(v) => setStartDay(v)}
              value={startDay}
              hideAsterisk
            />
            <Select
              options={monthsOptions}
              label="Mês"
              onChange={(v) => setStartMonth(v)}
              value={startMonth}
              hideAsterisk
            />
            <Select
              options={yearsOptions}
              label="Ano"
              onChange={(v) => setStartYear(v)}
              value={startYear}
              hideAsterisk
            />
          </div>
        </div>
        <div>
          <div className="font-bold">Até</div>
          <div className="mb-4 flex gap-2">
            <Select
              options={daysOptions}
              label="Dia"
              onChange={(v) => setEndDay(v)}
              value={endDay}
              hideAsterisk
            />
            <Select
              options={monthsOptions}
              label="Mês"
              onChange={(v) => setEndMonth(v)}
              value={endMonth}
              hideAsterisk
            />
            <Select
              options={yearsOptions}
              label="Ano"
              onChange={(v) => setEndYear(v)}
              value={endYear}
              hideAsterisk
            />
          </div>
        </div>
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
