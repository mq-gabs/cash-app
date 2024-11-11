import { format } from "date-fns";

export function formatDate(date: Date | string) {
  if (typeof date === "string") {
    date = new Date(date);
  }

  return format(date, "dd/MM/yyyy");
}
