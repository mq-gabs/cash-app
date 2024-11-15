interface IInput {
  label: string;
  type?: string;
  onChange: (arg: any) => void;
  placeholder: string;
  defaultValue?: any;
}

export default function Input({
  label,
  type = "text",
  onChange = () => { },
  placeholder,
  defaultValue
}: IInput) {
  const handleChange = (e: any) => {
    onChange(e.target.value);
  }

  return (
    <div>
      <label htmlFor={label} className="block">{label}</label>
      <input defaultValue={defaultValue} className="inline border p-2 rounded w-full" type={type} onChange={handleChange} placeholder={placeholder} />
    </div>
  )
}