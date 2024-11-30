interface IInput {
  label: string;
  type?: string;
  onChange: (arg: any) => void;
  placeholder: string;
  defaultValue?: any;
  required?: boolean;
  disabled?: boolean;
  hideAsterisk?: boolean;
}

export default function Textarea({
  label,
  onChange,
  placeholder,
  defaultValue,
  disabled,
  hideAsterisk,
  required,
}: IInput) {
  const handleChange = (e: any) => {
    onChange(e.target.value);
  };

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
      <textarea
        disabled={disabled}
        defaultValue={defaultValue}
        className="inline border p-2 rounded w-full resize-none"
        onChange={handleChange}
        placeholder={placeholder}
        rows={5}
      />
    </div>
  );
}
