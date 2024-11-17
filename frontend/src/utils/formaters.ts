import { format } from "date-fns";

export function formatDate(date: Date | string) {
  if (typeof date === "string") {
    date = new Date(date);
  }
  console.log({ date });

  return format(date, "dd/MM/yyyy");
}

export function formatCurrency(value: number) {
  return `R$ ${(value / 100).toFixed(2)}`;
}
