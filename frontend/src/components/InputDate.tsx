import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "../utils/formaters";

interface IInputDate {
  value?: string;
  setValue: (v: string) => void;
  label: string;
}

const options = [
  {
    id: "1",
    label: "Hoje",
  },
  {
    id: "2",
    label: "Outra data",
  },
];

const daysLabels: number[] = [];

for (let i = 1; i <= 31; i++) {
  daysLabels.push(i);
}

export default function InputDate({ label, setValue, value }: IInputDate) {
  const [selected, setSelected] = useState<"1" | "2">("1");

  const ref = useRef<HTMLInputElement>(null);

  const handleChangeSelected = (id: any) => {
    setSelected(id);

    if (id === "1") {
      setValue(new Date().toJSON());
    }

    if (id === "2") {
      setValue("");
    }
  };

  useEffect(() => {
    handleChangeSelected("1");
  }, []);

  const handleClick = (e: any) => {
    e.preventDefault();

    if (ref.current) {
      ref.current.showPicker();
    }
  };

  return (
    <div>
      <label htmlFor={label}>
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="bg-gray-200 rounded-3xl w-fit mb-2">
        <ul className="flex justify-between gap-2 text-sm px-1 py-1">
          {options.map(({ id, label }) => (
            <li
              key={id}
              onClick={() => handleChangeSelected(id)}
              className={clsx({
                "px-3 py-1 rounded-3xl cursor-pointer": true,
                "hover:bg-secondary hover:text-white": id !== selected,
                "bg-primary text-white": id === selected,
              })}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
      {selected === "1" && (
        <div className="border p-2 rounded">{formatDate(new Date())}</div>
      )}
      {selected === "2" && (
        <div className="relative" onClick={handleClick}>
          <input
            placeholder="dd/mm/aaaa"
            className="border rounded p-2 pl-8 w-full"
            value={value ? formatDate(value) : ""}
          />
          <input
            ref={ref}
            className="w-[20px] absolute left-2 top-2 hover:bg-gray-300 rounded"
            onChange={(e) =>
              setValue(new Date(e.target.value).toJSON().replace("Z", "-03:00"))
            }
            type="date"
          />
        </div>
      )}
    </div>
  );
}
