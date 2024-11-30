import { useState } from "react";
import Main from "../../components/Main";
import PageTitle from "../../components/PageTitle";
import clsx from "clsx";
import ReportDay from "./ReportDay";
import ReportMonth from "./ReportMonth";
import ReportYear from "./ReportYear";
import ReportPeriod from "./ReportPeriod";

enum EReportOptions {
  DAY = "DAY",
  MONTH = "MONTH",
  YEAR = "YEAR",
  PERIOD = "PERIOD",
}

const periodOptions = [
  {
    id: "1",
    label: "Dia",
    name: EReportOptions.DAY,
  },
  {
    id: "2",
    label: "Mês",
    name: EReportOptions.MONTH,
  },
  {
    id: "3",
    label: "Ano",
    name: EReportOptions.YEAR,
  },
  {
    id: "4",
    label: "Período",
    name: EReportOptions.PERIOD,
  },
];

const reportComponents = {
  [EReportOptions.DAY]: ReportDay,
  [EReportOptions.MONTH]: ReportMonth,
  [EReportOptions.YEAR]: ReportYear,
  [EReportOptions.PERIOD]: ReportPeriod,
};

export default function Dashboard() {
  const [periodSelected, setPeriodSelected] = useState<EReportOptions>(
    EReportOptions.DAY
  );

  const Report = reportComponents[periodSelected];

  return (
    <Main>
      <PageTitle text="Dashboard" className="mb-2" />
      <div>
        <div className="mb-2 flex justify-center">
          <ul className="flex gap-8 p-1 bg-gray-200 rounded-full w-fit">
            {periodOptions.map(({ id, label, name }) => (
              <li
                key={id}
                className={clsx({
                  "px-5 py-1 rounded-full cursor-pointer": true,
                  "bg-primary text-white": periodSelected === name,
                  "hover:bg-secondary hover:text-white":
                    periodSelected !== name,
                })}
                onClick={() => setPeriodSelected(name)}
              >
                <p className="uppercase font-bold">{label}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Report />
        </div>
      </div>
    </Main>
  );
}
