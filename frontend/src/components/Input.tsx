interface IInput {
  label: string;
  type?: string;
  onChange: (arg: any) => void;
  placeholder: string;
  defaultValue?: any;
  required?: boolean;
}

export default function Input({
  label,
  type = "text",
  onChange = () => { },
  placeholder,
  defaultValue,
  required = false,
}: IInput) {
  const handleChange = (e: any) => {
    onChange(e.target.value);
  }

  return (
    <div>
      <label htmlFor={label} className="block">
        {label}
        {' '}
        {required ? <span className="text-red-500">*</span> : <span className="text-gray-400 text-sm">(opcional)</span>}
      </label>
      <input defaultValue={defaultValue} className="inline border p-2 rounded w-full" type={type} onChange={handleChange} placeholder={placeholder} />
    </div>
  )
}