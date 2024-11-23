import { formatCurrency } from "../../utils/formaters";

interface ISummaryList {
  title: string;
  count: number;
  cost: number;
  data: {
    id: string;
    name: string;
    value: number;
  }[];
}

export default function SummaryList({
  title,
  count,
  data,
  cost,
}: ISummaryList) {
  return (
    <div className="border rounded">
      <div className="rounded-tl rounded-tr bg-primary text-white p-2 flex justify-between font-bold">
        <p>
          {title} ({count})
        </p>
        <p>{formatCurrency(cost)}</p>
      </div>
      <div>
        <ul>
          {data.map(({ id, name, value }) => (
            <li key={id} className="p-2 [&:nth-child(odd)]:bg-gray-200 [&:nth-child(even)]:bg-white">
              <div className="flex justify-between">
                <p>{name}</p>
                <p>{formatCurrency(value)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}