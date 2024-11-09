interface IInput {
  label: string;
  type?: string;
  onChange: (arg: any) => void;
  placeholder: string;
}

export default function Input({
  label,
  type = "text",
  onChange = () => { },
  placeholder,
}: IInput) {
  const handleChange = (e: any) => {
    onChange(e.target.value);
  }

  return (
    <div>
      <label htmlFor={label} className="block">{label}</label>
      <input className="inline border p-2 rounded w-full" type={type} onChange={handleChange} placeholder={placeholder} />
    </div>
  )
}