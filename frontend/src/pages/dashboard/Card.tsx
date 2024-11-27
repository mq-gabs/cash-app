interface ICard {
  label: string;
  value: number | string;
  className?: string
}

export default function Card({
  label,
  value,
  className = '',
}: ICard) {
  return (
    <div className={`shadow-lg shadow-gray-600 h-[100px] p-2 rounded flex flex-col justify-between ${className}`}>
      <p className="text-xl font-bold">{label}</p>
      <p className="font-bold text-2xl text-right">
        {value}
      </p>
    </div>
  );
}
