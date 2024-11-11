interface ITable {
  columns: string[];
  data: any[][];
}

export default function Table({
  columns = [],
  data = [],
}: ITable) {
  return (
    <table className="border">
      <tr className="bg-primary text-white">
        {columns?.map(col => (
          <th className="p-2">
            {col}
          </th>
        ))}
      </tr>
      {data?.map(row => (
        <tr className="[&:nth-child(odd)]:bg-gray-200 [&:nth-child(even)]:bg-white">
          {row?.map(cel => (
            <td className="p-2">
              {cel}
            </td>
          ))}
        </tr>
      ))}
    </table>
  )
}