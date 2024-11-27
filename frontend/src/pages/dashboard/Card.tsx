import { IconType } from "react-icons";

interface ICard {
  label: string;
  value: number | string;
  className?: string
  Icon?: IconType;
}

export default function Card({
  label,
  value,
  className = '',
  Icon,
}: ICard) {
  return (
    <div className={`shadow-md shadow-gray-600 h-[100px] p-2 rounded flex flex-col justify-between ${className}`}>
      <p className="text-xl font-bold flex gap-2 items-center">
        {Icon && <Icon size={25} />}
        {label}
        </p>
      <p className="font-bold text-2xl text-right">
        {value}
      </p>
    </div>
  );
}
