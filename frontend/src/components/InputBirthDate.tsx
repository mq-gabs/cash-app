import { useEffect, useState } from "react";
import { atLeast2Digits, genYearsOptions } from "../utils";
import { months } from "../utils/formaters";
import Select from "./Select";

interface IBirthDateInput {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

const daysOptions = [...Array(31)].map((_, i) => ({
  id: String(i),
  label: atLeast2Digits(i + 1),
  name: atLeast2Digits(i + 1),
}));

const monthsOptions = months.map((monthName, index) => ({
  id: monthName,
  label: monthName,
  name: atLeast2Digits(index + 1),
}));

const yearsOptions = genYearsOptions();

export default function InputBirthDate({
  label,
  onChange,
  value,
}: IBirthDateInput) {

  const [dYear, dMonth, dDay] = !value ? ['', '', ''] : new Date(value).toJSON().split('T')[0].split('-');
  
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const handleChange = () => {
    if (day && month && year) {
      onChange(new Date(`${year}-${month}-${day}`).toJSON());
      return;
    }

    onChange('');
  }
  
  useEffect(() => {
    handleChange();
  }, [day, month, year]);

  useEffect(() => {
    setDay(dDay);
    setMonth(dMonth);
    setYear(dYear);
  }, [dDay, dMonth, dYear]);

  return (
    <div>
      <label htmlFor={label} className="block">{label}</label>
      <div className="flex gap-2">
        <Select
          label="Dia"
          onChange={v => setDay(v)}
          options={daysOptions}
          value={day}
          hideAsterisk
        />
        <Select
          label="Mês"
          onChange={v => setMonth(v)}
          options={monthsOptions}
          value={month}
          hideAsterisk
        />
        <Select
          label="Ano"
          onChange={v => setYear(v)}
          options={yearsOptions}
          value={year}
          hideAsterisk
        />
      </div>
    </div>
  )
}