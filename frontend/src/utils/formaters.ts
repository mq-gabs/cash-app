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

function insertDots(value: string) {
  const sValue = value.split('').reverse();

  const SIZE = 3;
  const N_SLICES = Math.ceil(value.length / SIZE);

  const splited = [...Array(N_SLICES)].map((_, index) => {
    return sValue.slice(index * SIZE, (index + 1) * SIZE);
  });

  const rejoin = splited.map(v => v.reverse().join('')).reverse().join('.');

  return rejoin;
}

export function formatCurrency(value: number) {
  let isNegative = value < 0;

  if (isNegative) {
    value = Math.abs(value);
  }

  const fixedValue = (value / 100).toFixed(2);

  const [int, dec] = fixedValue.split('.');

  const intWithDots = insertDots(int);

  let finalValue = [intWithDots, dec].join(',')

  if (isNegative) {
    finalValue = `-${finalValue}`;
  }

  return `R$ ${finalValue}`;
}

export function formatPercentage(value: number) {
  return `${(value * 100).toFixed(1)} %`
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