import { useState } from "react";
import Main from "../../components/Main";
import PageTitle from "../../components/PageTitle";
import clsx from "clsx";
import DayReport from "./DayReport";
import MonthReport from "./MonthReport";

enum EReportOptions {
  DAY = "DAY",
  MONTH = "MONTH",
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
];

const reportComponents = {
  [EReportOptions.DAY]: DayReport,
  [EReportOptions.MONTH]: MonthReport,
};

export default function Dashboard() {
  const [periodSelected, setPeriodSelected] = useState<EReportOptions>(
    EReportOptions.DAY
  );

  const Report = reportComponents[periodSelected];

  return (
    <Main>
      <PageTitle text="Dashboard" className="mb-4" />
      <div>
        <div className="mb-2">
          <ul className="flex gap-8 p-1 bg-gray-300 rounded-full w-fit">
            {periodOptions.map(({ id, label, name }) => (
              <li
                key={id}
                className={clsx({
                  "px-3 py-1 rounded-full cursor-pointer": true,
                  "bg-gray-700": periodSelected === name,
                  "hover:bg-gray-500": periodSelected !== name,
                })}
                onClick={() => setPeriodSelected(name)}
              >
                <p className="text-white text-2xl">{label}</p>
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
