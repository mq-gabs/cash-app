interface ISelect {
  label: string
  options: { id: string, name: any, label: any }[];
  onChange: (v: any) => void;
  value: any;
}

export default function Select({
  label,
  onChange,
  options = [],
  value,
}: ISelect) {
  const handleChange = (e: any) => {
    const { value: val } = e.target;

    onChange(val);
  }

  return (
    <div>
      <label className="block" htmlFor={label}>{label} <span className="text-red-500">*</span></label>
      <select value={value} className="bg-white border rounded p-2 w-full" onChange={handleChange} name={label} id={label}>
        {options.map(({ id, label, name }) => (
          <option key={id} value={name}>{label}</option>
        ))}
      </select>
    </div>
  )
}