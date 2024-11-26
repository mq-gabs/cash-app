import { Dispatch, SetStateAction } from "react";
import Input from "./Input";
import { TFilterField } from "../utils/types";

interface IFilter {
  fields: TFilterField[];
  setFilters: Dispatch<SetStateAction<Object>>;
  onClear: () => void;
}

export default function Filter({ fields, setFilters, onClear }: IFilter) {
  const handleChangeFieldsValues = (
    name: IFilter["fields"][0]["name"],
    value: any
  ) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1 className="text-lg font-bold">Pesquisar por</h1>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {fields.map((props) => (
          <Input
            {...props}
            hideAsterisk
            onChange={(v) => handleChangeFieldsValues(props.name, v)}
          />
        ))}
        <p className="underline text-blue-500 mt-auto cursor-pointer" onClick={onClear}>Limpar</p>
      </div>
    </div>
  );
}
