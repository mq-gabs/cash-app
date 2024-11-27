import { formatCurrency } from "../utils/formaters";

interface IInputCurrency {
  label: string;
  type?: string;
  onChange: (arg: any) => void;
  placeholder: string;
  value: number;
  required?: boolean;
  disabled?: boolean;
  hideAsterisk?: boolean;
}


export default function InputCurrency({
  label,
  onChange,
  placeholder,
  value,
  disabled,
  hideAsterisk,
  required,
  type,
}: IInputCurrency) {
  const handleChange = (e: any) => {
    let val: string = e?.target?.value;

    onChange(Number(val.replace(/\D/g, '')));
  } 

  return (
    <div>
    <label htmlFor={label} className="block">
      {label}{" "}
      {!hideAsterisk && (
        <>
          {required ? (
            <span className="text-red-500">*</span>
          ) : (
            <span className="text-gray-400 text-sm">(opcional)</span>
          )}
        </>
      )}
    </label>
    <input
      disabled={disabled}
      value={formatCurrency(value)}
      className="inline border p-2 rounded w-full"
      type={type}
      onChange={handleChange}
      placeholder={placeholder}
    />
  </div>
  )
}