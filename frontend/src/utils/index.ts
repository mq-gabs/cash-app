export function rand() {
  return Math.random() * 1e6;
}

export function genYearsOptions() {
  const currentYear = new Date().getFullYear();

  const yearsOptions = [];

  for (let i = currentYear; i >= 1900; i--) {
    yearsOptions.push({
      id: String(i),
      label: String(i),
      name: String(i),
    });
  }

  return yearsOptions;
}

export function atLeast2Digits(value: number) {
  return value.toLocaleString("pt-br", {
    minimumIntegerDigits: 2,
  });
}

export function validateDateDay(year: string, month: string, day: string) {
  if (month && Number(month) === 2 && day && Number(day) > 29) {
    if (year && Number(year) % 4 === 0) {
      day = "29";
    } else {
      day = "28";
    }
  }

  if (
    [4, 6, 9, 11].includes(Number(month)) &&
    month &&
    day &&
    Number(day) > 30
  ) {
    day = "30";
  }

  return day;
}
