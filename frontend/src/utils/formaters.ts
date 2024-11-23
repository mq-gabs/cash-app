import { format } from "date-fns";
import { TMonthDayView, TMonthView } from "../pages/dashboard/types";

export function formatDate(date: Date | string) {
  if (typeof date === "string") {
    date = new Date(date);
  }
  return format(date, "dd/MM/yyyy");
}

export function unformatDate(date: string) {
  return new Date(date.split('/').reverse().join('-'));
}

export function formatCurrency(value: number) {
  return `R$ ${(value / 100).toFixed(2)}`;
}

export const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export function formatMonthView(monthView: TMonthView, monthIndex: number, year: number): TMonthDayView[] {
  const monthDayView = Object.values(monthView).map((val, index) => ({
    label: String(index + 1),
    count: val,
  }))

  if ([1,3,5,7,8,10,12].includes(monthIndex)) {
    return monthDayView;
  }

  if ([4,6,9,11].includes(monthIndex)) {
    monthDayView.pop()
    return monthDayView;
  }

  if (year % 4 === 0) {
    return monthDayView.slice(0,29);
  }

  return monthDayView.slice(0, 28);
}