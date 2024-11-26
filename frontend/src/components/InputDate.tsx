import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "../utils/formaters";

interface IInputDate {
  value: string;
  setValue: (v: string) => void;
  label: string;
}

const options = [
  {
    id: '1',
    label: 'Hoje',
  },
  {
    id: '2',
    label: 'Outra data',
  },
];

const daysLabels: number[] = [];

for (let i = 1; i <= 31; i++) {
  daysLabels.push(i);
}

export default function InputDate({
  label,
  setValue,
  value,
}: IInputDate) {
  const [selected, setSelected] = useState<'1' | '2'>('1');

  const ref = useRef<HTMLInputElement>(null);

  const handleChangeSelected = (id: any) => {
    setSelected(id);

    if (id === '1') {
      setValue(new Date().toJSON());
    }

    if (id === '2') {
      setValue('');
    }
  }

  const handleOnFocus = () => {
    if (ref.current) {
      ref.current.click();
    }
  }

  const handleChangeDate = (e: any) => {
    let { value: val } = e.target;

    val = val.replaceAll(/[^0-9/]/g, '');
    val = val.slice(0, 10);

    setValue(val);
  }

  useEffect(() => {
    handleChangeSelected('1');
  }, []);

  return (
    <div>
      <label htmlFor={label}>{label} <span className="text-red-500">*</span></label>
      <div className="bg-gray-200 rounded-3xl w-fit mb-2">
        <ul className="flex justify-between gap-2 text-sm px-1 py-1">
          {options.map(({
            id,
            label,
          }) => (
            <li key={id} onClick={() => handleChangeSelected(id)} className={clsx({
              "px-3 py-1 rounded-3xl cursor-pointer": true,
              "hover:bg-gray-400 hover:text-white": id !== selected,
              "bg-primary text-white": id === selected,
            })}>
              {label}
            </li>
          ))}
        </ul>
      </div>
      {selected === '1' && (
        <div className="border p-2 rounded">
          {formatDate(new Date())}
        </div>
      )}
      {selected === '2' && (
        <div className="relative">
          <input onChange={handleChangeDate} placeholder="dd/mm/aaaa" onFocus={handleOnFocus} type="" className="border rounded p-2 pl-8 w-full" value={value} />
          <input ref={ref} className="w-[20px] absolute left-2 top-2 hover:bg-gray-300 rounded" onChange={e => setValue(formatDate(e.target.value))} type="date" />
        </div>
      )}
    </div>
  )
}