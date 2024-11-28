export function rand() {
  return Math.random();
}

export function genYearsOptions() {
  const currentYear = new Date().getFullYear();

  const yearsOptions = [];

  for (let i = currentYear; i >= 1900; i--) {
    yearsOptions.push({
      id: String(i),
      label: i,
      name: String(i),
    });
  }

  return yearsOptions;
}

export function atLeast2Digits(value: number) {
  return value.toLocaleString('pt-br', {
    minimumIntegerDigits: 2,
  });
}